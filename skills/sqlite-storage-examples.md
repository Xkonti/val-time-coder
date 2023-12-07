# Examples of usage of SQLite Storage

Creating tables:
```ts
// @andreterron/createSqliteTable
import { sqlite } from "https://esm.town/v/std/sqlite?v=2";

export const createSqliteTable = await sqlite.execute(`create table if not exists kv(
  key text unique, 
  value text
)`);
```

Selecting data:
```ts
// @andreterron/selectFromSqlite
import { sqlite } from "https://esm.town/v/std/sqlite?v=2";

export const selectFromSqlite = await sqlite.execute(
  `select key, value from kv`,
);
```

Inserting data:
```ts
// @andreterron/insertIntoSqlite
import { sqlite } from "https://esm.town/v/std/sqlite?v=2";

export const insertIntoSqlite = await sqlite.execute({
  sql: `insert into kv(key, value) values (:key, :value)`,
  args: { key: "specialkey", value: "specialvalue" },
});
```

Deleting data:
```ts
// @andreterron/deleteFromSqlite
import { sqlite } from "https://esm.town/v/std/sqlite?v=2";

export const deleteFromSqlite = await sqlite.execute({
  sql: `delete from kv where key = :key`,
  args: { key: "specialkey" },
});
```

Batches:
```ts
// @andreterron/batchSqlite
import { sqlite } from "https://esm.town/v/std/sqlite?v=2";

const charge = 10;

export const batchSqlite = await sqlite.batch([
  `create table if not exists accounts(person_id text unique, balance integer)`,
  {
    sql: `update accounts set balance = balance - :charge where person_id = 'Bob'`,
    args: { charge },
  },
  {
    sql: `update accounts set balance = balance + :charge where person_id = 'Alice'`,
    args: { charge },
  },
]);
```

# Related topics

[+]sqlite-storage
[+]blob-storage
[+]sqlite-storage-migrations
[+]sqlite-storage-orms