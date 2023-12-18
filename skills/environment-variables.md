# Environment variables (secrets)

The proper place to store secrets, keys, API tokens is in [https://val.town/settings/secrets](https://val.town/settings/secrets).

⚠️ Any public or unlisted code can be run by others via the [Run API](https://docs.val.town/api/run). Be careful about publishing any code that references your secrets because it could allow others the ability to use your secrets (but not see what they are).

Environment variables (secrets) can be accessed via `process.env` or `Deno.env`.

## `Deno.env` (preferred)

```ts
export let sdk = new SomeSDK(Deno.env.get("someSdkSecret"))
```

The `Den.env` API is preferred because it doesn't require an import and it's more performant.

## `process.env`

```ts
import process from "node:process"
export let sdk = new SomeSDK(process.env.someSdkSecret)
```

This is the conventional way to access environment variables when you’re in a Node.js environment. In Node.js, `process` is an always-available global variable, but since Val Town targets Deno, you’ll need to import it first.

## Related topics

[+]permissions
[+]blob-storage