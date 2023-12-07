## Server rendering JSX

Val Town supports server-rendered JSX. This lets you use JSX syntax to construct your HTML string. It does not include any client-side JSX framework features, such a re-rendering on the client.

To use JSX, you’ll need to insert what TypeScript calls a “[per-file pragma](https://www.typescriptlang.org/tsconfig#jsxImportSource)” - a comment that uses `@jsxImportSource` to specify where the JSX methods are going to come from.

### Preact

A good default is [Preact](https://github.com/preactjs/preact), which provides a nice `preact-render-to-string` module that lets you quickly turn that JSX object into a string that you can use for a response.

```ts
/** @jsxImportSource https://esm.sh/preact */
import { render } from "npm:preact-render-to-string";

export const preactExample = () =>
  new Response(render(<div>Test {1 + 1}</div>), {
    headers: {
      "Content-Type": "text/html",
    },
  });
```

### React

```ts
/** @jsxImportSource https://esm.sh/react */
import { renderToString } from "npm:react-dom/server";

export const reactExample = () =>
  new Response(renderToString(<div>Test {1 + 1}</div>), {
    headers: {
      "Content-Type": "text/html",
    },
  });	
```

### Vue

```ts
/** @jsxImportSource https://esm.sh/vue */
import { renderToString } from "npm:vue/server-renderer";

export const vueExample = async () =>
  new Response(await renderToString(<div>Test {1 + 1}</div>), {
    headers: {
      "Content-Type": "text/html",
    },
  });
```

### Solid

```ts
/** @jsxImportSource https://esm.sh/solid-jsx */
import { renderToString } from "npm:solid-js/web";

export const solidExample = async () =>
  new Response(await renderToString(() => <div>Test {1 + 1}</div>), {
    headers: {
      "Content-Type": "text/html",
    },
  });
```

# Recommended topics

[+]http-val
[+]http-api