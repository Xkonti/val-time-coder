# Script vals

Script vals are free form JavaScript, TypeScript, or JSX. They are useful for testing, saving utility functions, and one-off operations. Script vals can be run manually by clicking the "Run" button on the val page.

## No exports

A script val doesn't have to export anything. This is useful for testing and debugging.

```ts
console.log("Hello world!");
```

## Exporting a value

Script vals can export a value. This is useful for caching data, calculating reference tables or to simply store some data manually.

Example of a val that exports a list of objects. This val has to be first ran manually to calculate the output and then can be referenced by other vals to reuse the data:

```ts
const names = [
  "blob-storage",
  "sqlite-storage",
];

export const topics = names.map(name => ({
  name: name,
  url: `https://raw.githubusercontent.com/Xkonti/val-town-coder/main/skills/${name}.md`,
}));
```

## Exporting a function

Exporting a function is useful for creating a utility function that can be used in other vals.

```ts
export const getDevToPublicPosts = async (username: string) => {
  let data = await fetch(`https://dev.to/api/articles?username=${username}`);
  return await data.json();
};
```

## Exporting multiple

You can export multiple values from a script val. This is useful for creating a library of utility functions. You can also export a mix of values and functions with code execution in-between.

```ts
// Code execution when ran manually
console.log("This val was ran at: " + new Date());

// Exporting a value
export username = "SomeUser";

// Exporting a function
export const getDevToPublicPosts = async (username: string) => {
  let data = await fetch(`https://dev.to/api/articles?username=${username}`);
  return await data.json();
};

// More code execution
export const lastData = await getDevToPublicPosts(username);

// Exporting interface / type
export interface Post {
  title: string;
  url: string;
}

// Exporting a multiple at once
export default {
  username,
  getDevToPublicPosts,
  lastData,
};
```

# Val Town Standard Library

Val Town has an ever-growing standard library of useful vals. You can import them like any other val. You can also import specific versions of the val by appending `?v=1` to the import URL. This is useful for locking down the version of the val to prevent breaking changes.

It is recommended to prioritize using the standard library over importing NPM packages. This is because the standard library is optimized for Val Town and is guaranteed to work. NPM packages might not work due to missing dependencies or other issues.

The Standard Library provides the following vals:
- `blob` - a simple key-value store for storing small pieces of data
- `email` - a function for sending emails
- `sqlite` - a SQLite database API