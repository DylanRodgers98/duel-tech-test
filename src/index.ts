import { indexFilesInDirectory } from './seed.js';
import { startServer } from './server.js';

console.log('seeding data');
await indexFilesInDirectory(`${process.cwd()}/data`);

console.log('starting server');
const server = startServer();

process.on('SIGTERM', () => {
  console.warn('SIGTERM received, shutting down server');
  server.close(() => console.warn('server shut down'));
});
