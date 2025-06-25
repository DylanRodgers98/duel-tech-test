import { MeiliSearch } from "meilisearch";

export const meilisearch = new MeiliSearch({
  host: "http://localhost:7700",
  apiKey: "aSampleMasterKey",
});
