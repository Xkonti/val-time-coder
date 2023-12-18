# Importing

One of the best features of Val Town is the ability to import modules. There are thousands of modules written in JavaScript and TypeScript that you can instantly import to extend and supercharge your vals.

Val Town supports importing code from a variety of sources, including other vals on Val Town, NPM, esm.sh, deno.land. You can also import code from arbitrary URLs if they provide the correct Content-Type header and contain JavaScript or TypeScript. Imports in Val Town work the same as in Deno, so you can learn more from their docs.

## Importing vals

A val can reference other vals. You will get helpful autocomplete for importing other vals if you type the @ symbol.

```ts
import { example1 } from "https://esm.town/v/stevekrouse/example1";
```

All vals are hosted on `https://esm.town/v/username/valname?v=version`, and are available for import on Val Town, Deno, Bun, and most JavaScript runtimes. In this way, Val Town builds upon the new http-style imports, to make a lightweight package registry, but where each snippet of code is a package.

Private vals are only importable with the `DENO_AUTH_TOKEN`` environment variable set, which we automatically set for you, allowing only you to import your private vals.

## NPM

To import an npm module, like `zod``, add `npm:` in front of the name:
  
  ```ts
  import { z } from "npm:zod";
  ```

  ## HTTP Imports

  To import from a URL, like from `esm.sh`, you just specify the full url. For example, to import `zod` from `esm.sh`:

  ```ts
  import { z } from "https://esm.sh/zod";
  ```

  ## Node builtins

  If you want to import a Node.js built-in module, add `node:` in front of its name. For example, to import the `crypto` module, use this, which is the same as what Node.js themselves officially recommend:

  ```ts
  import { createHmac } from "node:crypto";
  ```

## Debugging imports

### Look for examples
Whenever you go to use a new npm library, we recommend first searching to see if anyone has used that library before. You can find the most common packages here.

Or you could look for examples related to cheerio by searching for it or even more pointedly by searching for [`import("npm:cheerio")`](https://www.val.town/search?q=import(%22npm:cheerio%22).

### Log keys
It’s often not clear how a library will expose its methods. It can be helpful to log the keys of whatever object they return to you. That will tell you if you need to import it off of default or not, and what is available to you.

```ts
export const debugCheerioEx = (async () => {
  var cheerio = await import("npm:cheerio");
  console.log(Object.keys(cheerio));
})();
```

```console
[
  'contains', 'default',
  'html',     'load',
  'merge',    'parseHTML',
  'root',     'text',
  'xml'
]
```

### Look for Deno compatibility

Not all modules are compatible with Deno. Some modules are written with only Node.js or a browser environment in mind, and won’t work with Deno. While Deno implements most of the functionality of Node.js and some of the functionality of browsers – so many modules will “just work” in it, some won’t.

Also, some modules are written with the assumption that they can access system resources, compile C code, and more, so they won’t work in a secure environment like Val Town.

As always, ask in our Discord if you want help.