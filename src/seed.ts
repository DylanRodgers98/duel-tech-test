import { promises as fs } from 'fs';
import * as path from 'path';
import { meilisearch } from './services/meilisearch.js';
import { Advocate, advocateSchema } from './domain/advocate.js';
import { ZodError, z } from 'zod/v4';

const primaryKey = 'user_id';

const indexFiles = async (paths: string[]) => {
  const advocates: Advocate[] = [];
  const failedFilePaths: string[] = [];

  for (const path of paths) {
    try {
      const file = await fs.readFile(path);
      const contents = JSON.parse(file.toString());
      const advocate = advocateSchema.parse(contents);
      advocates.push(advocate);
    } catch (err) {
      const error = err instanceof ZodError ? z.prettifyError(err) : err;
      console.error(`${path}:\n${error}\n`);
      failedFilePaths.push(path);
    }
  }

  if (failedFilePaths.length) {
    console.log(`failed to load ${failedFilePaths.length} files`);
  }

  console.log(`indexing ${advocates.length} advocates`);
  const advocatesIndex = meilisearch.index('advocates');
  await advocatesIndex.addDocuments(advocates, { primaryKey });
  await advocatesIndex.updateSortableAttributes(['joined_at']);
  await advocatesIndex.updateFilterableAttributes([
    'joined_at',
    'advocacy_programs',
  ]);
};

export const indexFilesInDirectory = async (dir: string): Promise<void> => {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const paths = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(dir, dirent.name));

  await indexFiles(paths);
};
