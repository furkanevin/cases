import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

const connectionString =
  process.env.DATABASE_URL ?? 'postgres://aerocity:aerocity@localhost:55432/aerocity_dev';

export const sqlClient = postgres(connectionString, { max: 10 });
export const db = drizzle(sqlClient, { schema });
export type DB = typeof db;
