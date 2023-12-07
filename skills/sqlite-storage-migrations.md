# Migrations with SQLite

Migrations can be difficult in traditional server environments: you need to execute some SQL, but this should only happen once. In Val Town, managing migrations is easy.

The best way to run migrations in Val Town is to write a single val and keep updating it with each migration. Because vals have versions, each version of a val is run exactly once.

Let’s look at an example…

In our first migration, we create a users table:

```ts
// @andreterron/sqlite-migrations v1
import { sqlite } from "https://esm.town/v/std/sqlite?v=2";

export const dbMigrations = await sqlite.execute(`
  create table users (
    id integer primary key autoincrement,
    email text not null unique
  )
`);
```

Later, we realize we also want to store names. We update the same val to alter the table:

```ts
// @andreterron/sqlite-migrations v2
import { sqlite } from "https://esm.town/v/std/sqlite?v=2";

export const dbMigrations = await sqlite.execute(`
  alter table users
  add column name text
`);
```

# Related topics

[+]sqlite-storage
[+]sqlite-storage-examples
[+]sqlite-storage-orms
[+]blob-storage