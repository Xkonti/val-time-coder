# Connecting to SQLite with ORMs

Writing SQL is really fast and it’s great for small projects. As your projects grow, you might want to take advantage of an ORM or query builder instead. Here are a few examples of how to do that with popular tools.

## Drizzle

```ts
// @stevekrouse/sqliteDrizzleExample
import { sqlite } from "https://esm.town/v/std/sqlite";
import { sql } from "npm:drizzle-orm";
import { drizzle } from "npm:drizzle-orm/libsql";
import { integer, sqliteTable, text } from "npm:drizzle-orm/sqlite-core";

const db = drizzle(sqlite as any);
const kv = sqliteTable("kv", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
export let sqliteDrizzleExample = db.select().from(kv).all();
```

## Prisma

🚫 Prisma isn’t supported in Val Town because it relies on functionality that only exists in a classic server environment.

## Sequelize

🚫 Sequelize isn’t supported in Val Town because it relies on specific database drivers and is not extensible.

# Related topics

[+]sqlite-storage
[+]sqlite-storage-examples
[+]sqlite-storage-migrations
[+]blob-storage