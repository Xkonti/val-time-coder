# `std/sqlite` – Val Town SQLite

Val Town now comes with a SQLite database built-in. You can store store and query any relational data. It’s backed by [Turso](https://turso.tech/).

```ts
import { sqlite } from "https://esm.town/v/std/sqlite";

await sqlite.execute(`create table if not exists popes(value)`);
await sqlite.execute({
  sql: `insert into popes values (?), (?)`,
  args: ["innocent", "benedict"],
});
let popes = await sqlite.execute(`select * from popes`);
export let sqliteExample = popes.rows.map(r => r[0]);

// returns: Array(2) ["innocent", "benedict"]
```

Val Town comes with SQLite built-in. SQLite is a lightweight, standard database that supports SQL queries, indexing, and more. It’s a great way to store structured data. It’s backed by Turso.

You can store 10mb on the free plan and up to 1gb on the paid plan. Contact us if you need more.

## Functions

The `sqlite` val includes the functions:

- `async execute(statement)`: Executes the statement on your database
- `async batch(statements, mode?)`: Executes multiple statements in a transaction on your database. Optionally passing the transaction mode.

## Usage

```ts
import { sqlite } from "https://esm.town/v/std/sqlite";
export const rows = (await sqlite.execute("SELECT datetime();")).rows[0];
```

## Error handling

Queries can return a `LibsqlError`` for conflicts or other SQLite errors.

## Source code

```ts
// @std/sqlite
import { API_URL } from "https://esm.town/v/std/API_URL";
import { LibsqlError, type ResultSet, type TransactionMode } from "npm:@libsql/client";
import { z } from "npm:zod";

export const sqlite = {
  execute,
  batch,
};

// ------------
// Functions
// ------------

async function execute(statement: InStatement): Promise<ResultSet> {
  const res = await fetch(`${API_URL}/v1/sqlite/execute`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("valtown")}`,
    },
    body: JSON.stringify({ statement }),
  });
  if (!res.ok) {
    throw createResError(await res.text());
  }
  return res.json();
}

async function batch(statements: InStatement[], mode?: TransactionMode): Promise<ResultSet[]> {
  const res = await fetch(`${API_URL}/v1/sqlite/batch`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("valtown")}`,
    },
    body: JSON.stringify({ statements, mode }),
  });
  if (!res.ok) {
    throw createResError(await res.text());
  }
  return res.json();
}

function createResError(body: string) {
  try {
    const e = zLibsqlError.parse(JSON.parse(body));
    // e.message already contains the code, and LibsqlError adds the
    // code to the beginning, so we remove it here
    const msg = e.message.replace(e.code, "").replace(/^:\s+/, "");
    return new LibsqlError(msg, e.code, e.rawCode);
  } catch (_) {
    // Failed to parse libsql error
  }
  return new Error(body);
}

// ------------
// Helpers
// ------------

const zLibsqlError = z.object({
  message: z.string(),
  code: z.string(),
  rawCode: z.number().optional(),
});

// We patch these types to only support JSON values
export type InValue = null | string | number | boolean;
export type InArgs = Array<InValue> | Record<string, InValue>;
export type InStatement = {
  sql: string;
  args: InArgs;
} | string;
```

# Related topics

[+]sqlite-storage-examples
[+]blob-storage
[+]sqlite-storage-migrations
[+]sqlite-storage-orms