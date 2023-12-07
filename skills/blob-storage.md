# std/blob – Val Town blob storage

Val Town now comes with blob storage built-in. You can store any data: text, JSON, images. Blob storage is scoped globally to your account. If you set a blob in one val, you can retrieve it by the same key in another val. It’s backed by Cloudflare R2.

Blob-stored data counts towards your total Val Town storage – 10mb on the free plan and 1gb on pro. Check our pricing page to learn more.

## Usage

import { blob } from "https://esm.town/v/std/blob";

```ts
await blob.setJSON('myKey', { foo: 'bar' });
export let blobDemo = await blob.getJSON('myKey');
```

### JSON

These functions are the ones most commonly used for storing JSON data, including simple strings.

- `async getJSON(key: string)`: Retrieves a blob as JSON for a given key. Returns `undefined` if the key is not found.
- `async setJSON(key: string, value: any)`: Sets a blob for a given key with a value that is automatically converted to JSON.

[](https://www.val.town/v/std/blob#list-keys)

### List keys

- `async list(prefix?: string)`: List your blob keys. optionally provide a prefix to filter the query.

[](https://www.val.town/v/std/blob#delete-keys)

### Delete keys

- `async delete(key: string)`: Delete the specified key.

[](https://www.val.town/v/std/blob#lower-level-getset)

## Lower-level get/set

We do provide access to the lower-level getter and setters, which are useful if you are storing non-JSON or binary data, need to stream in your response or request data, or do anything else lower-leve.

- `async get(key: string)`: Retrieves a blob for a given key.
- `async set(key: string, value: string | BodyInit)`: Sets the blob value for a given key. See [BodyInit](https://deno.land/api@v1.38.1?s=BodyInit).

## Source code

```ts
// @std/blob
import { API_URL } from "https://esm.town/v/std/API_URL";
import { ValTownBlobError } from "https://esm.town/v/std/ValTownBlobError";
import { ValTownBlobNotFoundError } from "https://esm.town/v/std/ValTownBlobNotFoundError";

export const blob = {
  get: get,
  set: set,
  list: list,
  delete: delete_,
  getJSON: getJSON,
  setJSON: setJSON,
};

async function list(prefix?: string): Promise<{ key: string; size: number; lastModified: string }[]> {
  let querystring = prefix ? `?prefix=${encodeURIComponent(prefix)}` : "";
  const res = await fetch(`${API_URL}/v1/blob${querystring}`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get("valtown")}`,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new ValTownBlobError(body ? body : "Error listing blobs");
  }
  return res.json();
}

async function delete_(key: string) {
  const res = await fetch(`${API_URL}/v1/blob/${encodeURIComponent(key)}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Deno.env.get("valtown")}`,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new ValTownBlobError(body ? body : "Error deleting blob");
  }
}

async function get(key: string) {
  const res = await fetch(`${API_URL}/v1/blob/${encodeURIComponent(key)}`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get("valtown")}`,
    },
  });
  if (res.status === 404) {
    throw new ValTownBlobNotFoundError();
  }
  if (!res.ok) {
    const body = await res.text();
    throw new ValTownBlobError(body ? body : "Error getting blob data");
  }
  return res;
}

async function set(key: string, value: BodyInit) {
  const res = await fetch(`${API_URL}/v1/blob/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("valtown")}`,
    },
    body: value,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new ValTownBlobError(body ? body : "Error setting blob data");
  }
}

async function getJSON(key: string) {
  try {
    const res = await get(key);
    return res.json();
  } catch (e) {
    if (e instanceof ValTownBlobNotFoundError) {
      return undefined;
    }
    throw e;
  }
}

async function setJSON(key: string, value: any) {
  return set(key, JSON.stringify(value));
}
```

# Related topics

[+]blob-storage-examples
[+]sqlite-storage