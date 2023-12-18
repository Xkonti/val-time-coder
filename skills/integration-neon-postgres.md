# Neon Postgres integration

Neon provides a PostgreSQL database with an API accessible over HTTP and a JavaScript SDK. This lets you use a more convential relational database model in your vals.

## Setup

1. Login to your Neon account, then create a project.
2. During project creation, you should get a dialog with connection details. Select the PostgreSQL connection URL highlighted in green without the quotation marks around it, then copy it.
3. Go to Val Town, click on your profile picture and click **Env Variables**.
4. Create a new environment variable with the name `neon_url` and paste the connection URL you copied earlier as the value.

You can then use deno-postgres to connect to the database like so:

```ts
import * as postgres from "https://deno.land/x/postgres/mod.ts";
const client = new postgres.Client(Deno.env.get("neon_url"));
await client.connect();
export const testPostgres = await client.queryObject`select CURRENT_TIME;`;
```

Note that you might need to change the environment variable name according to the key you set earlier.

While writing your code, remember that you should use prepared statements for any queries containing user data (or any query that has to change with new data) to prevent SQL injection attacks. You can find the 3 ways of going about this at https://deno-postgres.com/#/?id=prepared-statements-and-query-arguments.

## Recommended alternatives

[+]sqlite-storage