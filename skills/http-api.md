## Implementing APIs - Routing

One of the coolest things about the Request/Response API is that it works with modern web frameworks, so you can use routing and their helper methods!

### Hono

Here’s an example with [Hono](https://hono.dev/):

```ts
import { Hono } from "npm:hono@3";

const app = new Hono();
app.get("/", (c) => c.text("Hello world!"));
app.get("/yeah", (c) => c.text("Routing!"));
export default app.fetch;
```

### Elysia

This is how you can use [Elysia](https://elysiajs.com/) with Val Town.

```ts
export const elysiaExample = async (req) => {
  const { Elysia } = await import("https://esm.sh/elysia@0.7.15");
  const app = new Elysia()
    .get("/", () => "Hello Elysia");
  return app.fetch(req);
};
```
### Peko

And one with [Peko](https://peko.deno.dev/):

```ts
export const pekoExample = async (request) => {
  const Peko = await import("https://deno.land/x/peko@2.0.0/mod.ts");
  const server = new Peko.Router();
  server.get("/", () => new Response("Yes? There’s something at /hello"));
  server.get("/hello", () => new Response("Hello world!"));
  return server.requestHandler(request);
};
```

### nhttp

And [nhttp](https://github.com/nhttp/nhttp):

```ts
export const nhttpExample = async (request) => {
  const { nhttp } = await import("npm:nhttp-land@1");
  const app = nhttp();
  app.get("/", () => {
    return "Hello, World";
  });
  app.get("/cat", () => {
    return { name: "cat" };
  });
  return app.handleRequest(request);
};
```

### itty-router

A super tiny example with [itty-router](https://itty.dev/itty-router):

```ts
export const ittyRouterExample = async (request: Request) => {
  const { Router, json } = await import("npm:itty-router@4");
  const router = Router();
  router.get("/", () => "Hi");
  return router.handle(request).then(json);
};
```




# Recommended topics

[+]http-val
[+]http-jsx