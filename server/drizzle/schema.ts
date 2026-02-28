import { mysqlTable, int, varchar, text, timestamp, enum as mysqlEnum, unique } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  openId: varchar('openId', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 320 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['user', 'admin']).default('user'),
  createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updatedAt').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

export const projects = mysqlTable('projects', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  emoji: varchar('emoji', { length: 10 }).notNull(),
  difficulty: mysqlEnum('difficulty', ['beginner', 'intermediate', 'advanced']).notNull(),
  createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updatedAt').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

export const codeSnippets = mysqlTable('code_snippets', {
  id: int('id').primaryKey().autoincrement(),
  projectId: int('projectId').notNull().references(() => projects.id),
  language: varchar('language', { length: 50 }).notNull(),
  code: text('code').notNull(),
  fileName: varchar('fileName', { length: 255 }).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type CodeSnippet = typeof codeSnippets.$inferSelect;
export type NewCodeSnippet = typeof codeSnippets.$inferInsert;
