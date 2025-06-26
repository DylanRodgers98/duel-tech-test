import { MeiliSearch } from 'meilisearch';

const host = process.env.MEILISEARCH_HOST || 'http://localhost:7700';
const apiKey = process.env.MEILISEARCH_API_KEY || 'aSampleMasterKey';

export const meilisearch = new MeiliSearch({
  host,
  apiKey,
});
