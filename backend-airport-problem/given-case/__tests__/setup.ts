import { sqlClient } from '../src/db/client';
import { afterAll } from 'vitest';

afterAll(async () => {
  await sqlClient.end({ timeout: 5 });
});
