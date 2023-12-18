# Val Town API

You can access individual vals by giving them an HTTP endpoint, but that’s not all you can do with the Val Town API: we also provide endpoints that let you create and update vals, see likes and comments, and a lot more.

## Aliases

These endpoints accept a token parameter for private vals.

### GET /v1/alias/{username}

```ts
import { alias } from "https://esm.town/v/neverstew/alias";

export let aliasExample = alias({
  username: "stevekrouse",
});
```

### GET /v1/alias/{username}/{handle}

```ts
import { alias } from "https://esm.town/v/neverstew/alias";

export const aliasValExample = alias({
  username: "stevekrouse",
  valName: "parentReference",
  // for private vals, pass your val town api token
  // token: @me.secrets.valtownToken,
});
```

## Authentication

The Val Town APIs accept Bearer Token authentication for full access to your Val Town account. You can use the schemes below to give more scoped access to run specific vals.

Keep your Val Town API token extremely guarded because it conveys access to your entire account and all of its environment variables. Never expose this token on the client.

### Val Town Authentication

Val Town’s API uses Bearer Authentication, which means you pass an HTTP Header `Authorization: Bearer <token>`.

If you don’t pass an authentication token, your code will be run as an anonymous user and only have access to public vals. For example, unauthenticated access to a private val will fail:

```ts
import { fetch } from "https://esm.town/v/std/fetch";

export const privateAPIUnauthenticated = (
  await fetch("https://api.val.town/v1/run/stevekrouse.example3")
).status;
```

Authenticated use will have read access to the authenticated user’s private vals and environment variables, write access to the authenticated user’s vals, and the ability to send the authenticated user emails via `std/email`.

```ts
import { fetchJSON } from "https://esm.town/v/stevekrouse/fetchJSON";

export const privateAPIAuthenticated = fetchJSON(
  "https://api.val.town/v1/run/stevekrouse.example3",
  {
    method: "GET",
    headers: { Authorization: "Bearer " + Deno.env.get("valtown") },
  }
);
```

If you want to experiment with calling the Val Town API from within Val Town (as is shown above), you should copy-and-paste one of your Val Town API tokens into your environment variables.

### Custom Authentication

You can roll arbitrary authentication schemes in user space. For example, I find it useful to simply supply a custom `auth` header from my Clerk webhooks that I check like a password against a value I store in my environment variables:

```ts
import { discordWebhook } from "https://esm.town/v/stevekrouse/discordWebhook";

// # New Val Town User (on Clerk) -> Val Town Discord notification
// Translates one kind of webhook (Clerk) into another (Discord)
export async function handleDiscordNewUser(req: express.Request, res) {
  // check custom auth secret sent from clerk
  if (req.get("auth") !== process.env.clerkNonSensitive)
    return res.end("Unauthorized");
  await discordWebhook({
    url: Deno.env.get("discordUserEvents"),
    content:
      req.body.data.email_addresses[0].email_address +
      " " +
      req.body.data.profile_image_url,
  });
  res.end("Success");
}
```

I call this value `clerkNonSensitive` because this value doesn’t protect any data. It merely makes it impossible for anyone to trigger this public API endpoint without the password. The worst that could happen if this password leaks is that our team temporarily gets spam discord messages. Then I could just change the password to a new value. For more sensitive use-cases, you’ll want to sign & possibly encrypt the conveyed data using standard authentication methods.

### Hiding Code

You can hide the code of a public API by wrapping a private Val in a public val. Below I show `hiddenAPI` which you can see and call via API, but you notice that it calls` @stevekrouse.hiddenAPIInternal` which is private and can’t be inspected.

```ts
import { hiddenAPIInternal } from "https://esm.town/v/stevekrouse/hiddenAPIInternal";

export let hiddenAPI = (...args) => hiddenAPIInternal(...args);
```

## Eval

The Eval API lets you run arbitrary JavaScript/TypeScript, with full access to the Val Town runtime.

Vals created via this API will not appear in the authenticated user’s workspace but they will be created and can be accessed (and moved into the user’s workspace) via their direct link on the frontend: `https://val.town/v/{handle}.{val}`.

### GET /v1/eval/{expression}

One of the more fun parts of the Eval API is that you can explore it fully in the URL bar. For the following examples, click on the URLs to test them out yourself.

You can evaluate simple expression, like `https://api.val.town/v1/eval/1+1` which returns `2`.

You can compute with references to public vals, like `https://api.val.town/v1/eval/@stevekrouse.example1+1`.

You can even call vals: `https://api.val.town/v1/eval/@stevekrouse.add(@stevekrouse.example1, @stevekrouse.example2)`

### POST /v1/eval

Pass the `code` expression to be evaluated via a JSON-encoded body, like so:

```ts
import { fetchJSON } from "https://esm.town/v/stevekrouse/fetchJSON";

export let evalPost1 = fetchJSON(
  "https://api.val.town/v1/eval",
  {
    method: "POST",
    body: JSON.stringify({ code: "1+1" }),
  },
);
```

You can also pass arguments if the `code` parameter represents a function:

```ts
import { fetchJSON } from "https://esm.town/v/stevekrouse/fetchJSON";

export let evalPost2 = fetchJSON(
  "https://api.val.town/v1/eval",
  {
    method: "POST",
    body: JSON.stringify({ code: "(a,b) => a+b", args: [1, 2] }),
  },
);
```

## My Resources

When using the Val Town API, some of the most common functions operate on things that you own. For these kinds of operations, there are the “me” routes.

### GET /v1/me

This is the same as /v1/users/{your_user_id}

```ts
import { fetchJSON } from "https://esm.town/v/stevekrouse/fetchJSON?v=41";

export let getMe = fetchJSON(`https://api.val.town/v1/me`, {
  headers: {
    Authorization: `Bearer ${Deno.env.get("valtownToken")}`,
  },
});
```

### GET /v1/me/runs

This is currently the only way to list runs across multiple vals.

```ts
import { runs } from "https://esm.town/v/stevekrouse/runs?v=17";

export let getRuns = runs({
  token: Deno.env.get("valtownToken"),
  error: false,
  limit: 10,
  offset: 0,
  // last 30 minutes
  since: new Date(Number(new Date()) - 1800000),
  until: new Date(),
});
```

### GET /v1/me/likes

```ts
import { likes } from "https://esm.town/v/neverstew/likes";

export let getLikes = likes({
  token: Deno.env.get("valtownToken"),
  limit: 10,
  offset: 0,
});
```

### GET /v1/me/comments

```ts
import { comments } from "https://esm.town/v/neverstew/comments";

export let getComments = comments({
  token: Deno.env.get("valtownToken"),
  relationship: "any",
  limit: 10,
  offset: 0,
  // last 30 minutes
  since: new Date(Number(new Date()) - 1800000),
  until: new Date(),
});
```

## Run

The Run API lets you run any Val as an API. Unauthenticated use will only have access to public vals. If you run a JSON Val, it simply returns that Val. A function Val will be executed its author’s permissions, so it will be able to read and write to author’s public and private vals, read their environment variables, and send them emails via `std/email`.

You pass `args` to Run API function calls via a JSON-encoded array. While it may feel a bit clunky to always pass an array (even when passing a single argument), this is a clean and expressive way to accept any number of arguments.

### GET /v1/run/{handle}.{val}

```ts
import { fetchJSON } from "https://esm.town/v/stevekrouse/fetchJSON";

export let runGET = fetchJSON(
  `https://api.val.town/v1/run/stevekrouse.add?args=${JSON.stringify([1, 2])}`,
);
```

### POST /v1/run/{handle}.{val}

```ts
import { fetchJSON } from "https://esm.town/v/stevekrouse/fetchJSON";

export let runPOST = fetchJSON(
  `https://api.val.town/v1/run/stevekrouse.add`,
  {
    method: "POST",
    body: JSON.stringify({
      args: [1, 2],
    }),
  },
);
```

## Users

### GET /v1/users/{user_id}

```ts
import { user } from "https://esm.town/v/neverstew/user";

export const userExample = user({
  id: "a0bf3b31-15a5-4d5c-880e-4b1e22c9bc18",
});
```

### GET /v1/users/{user_id}/vals

```ts
import { userVals } from "https://esm.town/v/neverstew/userVals";

export const userValsExample = userVals({
  id: "a0bf3b31-15a5-4d5c-880e-4b1e22c9bc18",
});
```

## Vals

The vals endpoints allow you to manipulate vals.

### POST /v1/vals

```ts
import { createVal } from "https://esm.town/v/neverstew/createVal";

export const postVals = createVal({
  token: Deno.env.get("valtownToken"),
  code: "const two = 1 + 1;",
});
```

### GET /v1/vals/{val_id}

```ts
import { val } from "https://esm.town/v/neverstew/val";

export const getVal = val({
  id: "7f9019e4-dbf8-4ebe-b8cd-67730697624e",
});
```

### DELETE /v1/vals/{val_id}

```ts
import { deleteVal } from "https://esm.town/v/neverstew/deleteVal";

export const deleteValExample = deleteVal({
  token: Deno.env.get("valtownToken"),
  id: "1f32d4c1-332e-4135-889f-8df408924a9d",
});
```

### GET /v1/vals/{val_id}/versions

```ts
import { valVersions } from "https://esm.town/v/neverstew/valVersions";

export const getValVersions = valVersions({
  token: Deno.env.get("valtownToken"),
  id: "0cfbf317-18a4-4da5-b887-b75bb8a33108",
});
```

### POST /v1/vals/{val_id}/versions

```ts
import { createValVersion } from "https://esm.town/v/neverstew/createValVersion";
import { val as val2 } from "https://esm.town/v/neverstew/val";

export let createValVersionExample = (() =>
  val2({
    token: Deno.env.get("valtownToken"),
    id: "543ae134-636f-43a7-bd7f-f766a3d52b47",
  })
    .then((val) => ({ id: val.id, code: val.code }))
    .then(({ id, code }) =>
      createValVersion({
        token: Deno.env.get("valtownToken"),
        code: `// my inserted comment
      ${code}`,
        valId: id,
      })
    ))();
```

### GET /v1/vals/{val_id}/versions/{version}

```ts
import { valVersion } from "https://esm.town/v/neverstew/valVersion";

export const getValVersion = valVersion({
  token: Deno.env.get("valtownToken"),
  id: "7f9019e4-dbf8-4ebe-b8cd-67730697624e",
  version: 4,
});
```

### DELETE /v1/vals/{val_id}/versions/{version}

```ts
import { deleteValVersion } from "https://esm.town/v/neverstew/deleteValVersion";

export let deleteValVersionExample = deleteValVersion({
  token: Deno.env.get("valtownToken"),
  id: "543ae134-636f-43a7-bd7f-f766a3d52b47",
  version: 1,
});
```

### GET /v1/vals/{val_id}/runs

```ts
import { valRuns } from "https://esm.town/v/neverstew/valRuns";

export const valRunsExample = valRuns({
  token: Deno.env.get("valtownToken"),
  id: "ae941dc9-97e5-4e2e-a25a-e07b733230ae",
  limit: 1,
  offset: 1,
});
```