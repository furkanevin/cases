import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    setupFiles: ['./__tests__/setup.ts'],
    testTimeout: 10000,
    // Test files share one Postgres database. Run them serially so each
    // file's `beforeAll` reset doesn't race with another file's queries.
    fileParallelism: false,
  },
});
