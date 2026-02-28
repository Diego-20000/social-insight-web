import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../../drizzle/schema';

let db: Database | null = null;

export type Database = ReturnType<typeof drizzle>;

export async function initializeDatabase(): Promise<Database> {
  if (db) return db;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'artprograms',
  });

  db = drizzle(connection, { schema, mode: 'default' });
  console.log('Database connected successfully');

  return db;
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}
