import { promises as fs } from "fs";
import * as path from "path";
import { MeiliSearch } from "meilisearch";
import { randomUUID } from "crypto";

const primaryKey = "user_id";

const meilisearch = new MeiliSearch({
  host: "http://localhost:7700",
  apiKey: "aSampleMasterKey",
});

const indexFiles = async (paths: string[]) => {
  const files: unknown[] = [];
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

  console.log(`indexing ${files.length} users`);
  await meilisearch.index("users").addDocuments(files, { primaryKey });
};

async function indexFilesInDirectory(dir: string): Promise<void> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const paths = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(dir, dirent.name));

  await indexFiles(paths);
}

indexFilesInDirectory("./data");
