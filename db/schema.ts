import {
  mysqlTable,
  varchar,
  json,
  index,
  int,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const account = mysqlTable(
  'account',
  {
    id: varchar('id', { length: 191 }).notNull().primaryKey(),
    userId: varchar('user_id', { length: 191 }).notNull(),
    attributes: json('attributes').notNull(),
  },
  account => ({
    userIdx: index('user_idx').on(account.userId),
  })
);

export const user = mysqlTable(
  'user',
  {
    id: varchar('id', { length: 191 }).notNull().primaryKey(),
    accountId: varchar('account_id', { length: 191 }).notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    imageUrl: varchar('image_url', { length: 191 }),
    credits: int('credits').default(30).notNull(),
    firstName: varchar('first_name', { length: 191 }),
    lastName: varchar('last_name', { length: 191 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  user => ({
    emailIdx: index('email_idx').on(user.email),
  })
);

export const prompt = mysqlTable('prompt', {
  id: varchar('id', { length: 191 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 191 }).notNull(),
  service: varchar('service', { length: 191 }).notNull(),
  price: int('price').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
