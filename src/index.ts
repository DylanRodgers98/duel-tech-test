import { promises as fs } from "fs";
import * as path from "path";
import { MeiliSearch } from "meilisearch";
import { randomUUID } from "crypto";

const primaryKey = "user_id";

const client = new MeiliSearch({
  host: "http://localhost:7700",
  apiKey: "aSampleMasterKey",
});

const indexFiles = async (paths: string[]) => {
  const failedFiles: string[] = [];
  const files: any[] = [];

  for (const path of paths) {
    try {
      const file = await fs.readFile(path);
      const contents = JSON.parse(file.toString());
      contents[primaryKey] ??= randomUUID();
      files.push(contents);
    } catch (err) {
      failedFiles.push(path);
    }
  }

  console.log(`num failed files: ${failedFiles.length}`);
  console.log(`indexing ${files.length} users`);
  client
    .index("users")
    .addDocuments(files, { primaryKey })
    .then((res) => console.log(res));
};

async function getFilesInDirectory(dir: string): Promise<void> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const paths = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(dir, dirent.name));

  await indexFiles(paths);
}

// Example usage:
getFilesInDirectory("./data");
