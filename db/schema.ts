import {
  mysqlTable,
  varchar,
  json,
  index,
  int,
  timestamp,
  decimal,
  mysqlEnum,
  text,
} from 'drizzle-orm/mysql-core';

export const account = mysqlTable(
  'account',
  {
    id: varchar('id', { length: 191 }).notNull().primaryKey(),
    userId: varchar('user_id', { length: 191 }).notNull().unique(),
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
    accountId: varchar('account_id', { length: 191 }).notNull().unique(),
    email: varchar('email', { length: 191 }).notNull().unique(),
    imageUrl: text('image_url'),
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

export const prompt = mysqlTable(
  'prompt',
  {
    id: varchar('id', { length: 191 }).notNull().primaryKey(),
    userId: varchar('user_id', { length: 191 }).notNull(),
    service: mysqlEnum('service', [
      'grammar',
      'article',
      'paraphrase',
      'seo',
      'summarize',
    ]).notNull(),
    price: int('price').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  prompt => ({
    userIdIdx: index('user_id_idx').on(prompt.userId),
  })
);

export const payment = mysqlTable(
  'payment',
  {
    id: varchar('id', { length: 191 }).notNull().primaryKey(),
    userId: varchar('user_id', { length: 191 }).notNull(),
    amount: int('amount').notNull(),
    price: decimal('price', { precision: 5, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  payment => ({
    userIdIdx: index('user_id_idx').on(payment.userId),
  })
);
