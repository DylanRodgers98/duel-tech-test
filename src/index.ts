import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import * as path from "path";
import { meilisearch } from "./services/meilisearch.js";

const primaryKey = "user_id";

const indexFiles = async (paths: string[]) => {
  const files: any[] = [];
  const failedFilePaths: string[] = [];

  for (const path of paths) {
    try {
      const file = await fs.readFile(path);
      const contents = JSON.parse(file.toString());
      contents[primaryKey] ??= randomUUID();
      files.push(contents);
    } catch (err) {
      console.error(`${path}:`, err);
      failedFilePaths.push(path);
    }
  }

  if (failedFilePaths.length) {
    console.log(`failed to load ${failedFilePaths.length} files`);
  }

  console.log("setting up users index");
  const usersIndex = meilisearch.index("users");
  await usersIndex.deleteAllDocuments();
  await usersIndex.updateSortableAttributes(["joined_at"]);
  await usersIndex.updateFilterableAttributes([
    "joined_at",
    "advocacy_programs",
  ]);

  console.log(`indexing ${files.length} users`);
  await usersIndex.addDocuments(files, { primaryKey });
};

async function indexFilesInDirectory(dir: string): Promise<void> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const paths = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(dir, dirent.name));

  await indexFiles(paths);
}

indexFilesInDirectory("./data");
