import { createApp } from './app';

const port = Number(process.env.PORT ?? 8080);
const app = createApp();

console.log(`[aerocity] listening on :${port}`);

export default {
  port,
  fetch: app.fetch,
};
