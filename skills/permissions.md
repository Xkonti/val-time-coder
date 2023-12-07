# Exposing your vals to the internet

Public vals are great because they can be called from anywhere, anytime, instantly. They can also be called BY ANYONE.

Since anyone can call your public endpoints, if they interact with some data that should only be changed by yourself, you will need to make sure that those endpoints check for some kind of secret that only you know.

Here’s an example of a val exposed using the [🌐 HTTP Val](https://docs.val.town/api/web), secured with a secret that only I know.

```ts
import process from "node:process";

export const secretEndpoint = (req: Request) => {
  const secretHeader = req.headers.get("Authorization");
  if (secretHeader !== process.env.supersecrettoken)
    return new Response("Unauthorized", { status: 401 });
  return new Response("My deepest darkest secret");
};
```

If I called it without supplying the secret, I’ll be denied access:

```ts
import { fetch } from "https://esm.town/v/std/fetch";

export const secretEndpointFailure = fetch(
  "https://neverstew-secretEndpoint.web.val.run",
);
```

By supplying the secret in a header, I’m allowed access:

```ts
import { fetch } from "https://esm.town/v/std/fetch";

export const secretEndpointSuccess = fetch(
  "https://neverstew-secretEndpoint.web.val.run",
  { headers: { Authorization: "birdsarentreal" } },
);
```

The rest of this article will focus on various common combinations of public and private vals that you’re likely to come across and how those interact with the permissions system.

# Public code referencing private data

It is safe for a a public val to reference one of your private vals or one of your secrets. Private vals and secrets are like environment variables in this way - others can see that they’re being used, but not their values.

For example, I created a private val, `example3`. You won’t be able to see or reference `example3` but I can use it in `example4` which is public.

```ts
import { example3 } from "https://esm.town/v/stevekrouse/example3";

export const example4 = "Hi, " + example3;
```

You can _infer_ that the value of `example3` is `"Stevie"` because of how it’s used here. This is why you have to be careful about publishing vals that reference private data. Typically you will reference private data in a way that makes it impossible for others to infer what it is, like you would with an environment variable credentials. Below I am passing my secrets to an Upstash Redis store. You can see that I’m using these secrets and the output of this computation, but you can’t get those values, nor can you rerun this script with my secrets.

```ts
import process from "node:process";

export const upstashJSONEx = (async () => {
  const { Redis } = await import("npm:@upstash/redis");
  const redis = new Redis({
    url: process.env.upstashURL,
    token: process.env.upstashToken,
  });
  await redis.set("json-ex-1", { a: { b: "nested json" } });
  return ((await redis.get("json-ex-1")) as any).a.b;
})();
```

# Using another’s vals as a library

Using another’s val is like using a library from npm. The code runs entirely in your sandbox and they don’t get any access to your evaluation logs. In this way it is safe to pass other’s code your private data and secrets.

```ts
import process from "node:process";
import { gpt3 } from "https://esm.town/v/patrickjm/gpt3?v=4";

export let librarySecretEx = gpt3({
  prompt: "what is the meaning of life?",
  openAiKey: process.env.openai,
});
```

# Related topics

[+]environment-variables
[+]http-val