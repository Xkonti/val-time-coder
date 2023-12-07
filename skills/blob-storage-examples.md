# Examples of usage of Blob Storage

```ts
// @stevekrouse/blobDemo
import { blob } from "https://esm.town/v/std/blob?v=3";
await blob.setJSON("myKey", { foo: "bar" });
export let blobDemo = await blob.getJSON("myKey");
```

```ts
// @andreterron/exampleSetBlobJson
import { blob } from "https://esm.town/v/std/blob?v=3";
export let exampleSetBlobJson = await blob.setJSON("stateExample1", { foo: "bar" });
```

```ts
// @andreterron/exampleGetBlobJson
import { blob } from "https://esm.town/v/std/blob?v=3";
export let exampleGetBlobJson = await blob.getJSON("stateExample1");
```

```ts
// @std/docsBlobCounterDemo
import { blob } from "https://esm.town/v/std/blob";

const KEY = "blob_counter";

const oldState = await blob.getJSON(KEY) ?? 0;
console.log("Old value", oldState);

await blob.setJSON(KEY, oldState + 1);

const newState = await blob.getJSON(KEY);
console.log("New value", newState);

export let docsBlobCounterDemo = undefined;
```

```ts
// @andreterron/blobSavePictureExample
import { blob } from "https://esm.town/v/std/blob?v=3";
import Jimp from "npm:jimp";

export async function blobSavePictureExample() {
  // Read my profile picture
  const img = await Jimp.read("https://val.town/avatar/ec6d37b4-1291-4ea3-93b7-d7972929dc8b?size=32");

  // Resize and flip
  const buffer = await img
    .resize(128, 128)
    .flip(false, true)
    .getBufferAsync(Jimp.MIME_PNG);

  // Save picture to blob storage
  await blob.set("profilePicture", buffer);
}
```

```ts
// @andreterron/blobReadPictureExample
import { blob } from "https://esm.town/v/std/blob?v=3";
import Jimp from "npm:jimp";

export async function blobReadPictureExample(request: Request): Promise<Response> {
  // Return the picture as a response
  const stored = await blob.get("profilePicture");
  return new Response(stored.body, {
    headers: {
      "Content-Type": Jimp.MIME_PNG,
    },
  });
}
```

# Related topics

[+]blob-storage
[+]sqlite-storage