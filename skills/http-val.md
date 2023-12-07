# HTTP Val (Web API Handler)

**The Web API lets you expose Vals to the internet, where they can receive requests and return responses.** It’s built on the web-standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects, so it’s compatible with a number of web frameworks like [Hono](https://hono.dev/) and [Peko](https://github.com/sejori/peko).

We recommend you use the Web API for vals that produce APIs and web pages.

The maximum size for requests at the time of this writing is 2mb.

## Recommendations

Usage of the Hono framework is encouraged for anything but the most basic use cases.
## Basic examples

A val that works with the Web API takes a Request object as input and needs to return a Response object.

The most basic example can ignore the request and just return a response, even using a shorthand method like [Response.json, which is part of the web standard](https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static).

```ts
export const jsonOkExample = () => Response.json({ ok: true });
```

A slightly more built-out val can return HTML along with the correct Content-Type header:

```ts
export const htmlExample = () =>
  new Response("<h1>Hello, world</h1>", {
    headers: {
      "Content-Type": "text/html",
    },
  });
```

Now let’s work with the request: this echoes request headers back in the response:

```ts
export const headersExample = (request: Request) => {
  return Response.json(Object.fromEntries(request.headers.entries()));
};
```

We can grab query parameters using the web standard [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams) class:

```ts
export const queryParams = (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  return Response.json(Object.fromEntries(searchParams.entries()));
};
```

# Recommended topics

[+]http-jsx
[+]http-api
[+]script-val
[+]scheduled-val
[+]email-val