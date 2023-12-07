## `std/email` – Sending emails

`std/email` is the web-standard way to send emails from the Val Town standard library.

If you leave off the `to` field, it will default to emailing you, the owner of the Val Town account that calls it.

If you have Val Town Pro, you can send emails to anyone (not just yourself) from any val email address (`username.valname@valtown.email`).

```ts
import { email } from "https://esm.town/v/std/email";

email({
  to: "tim@apple.com",
  text: "emails emails emails!",
})
```

### Examples - Basic usage

```ts
import { email } from "https://esm.town/v/std/email?v=9";

export let emailExample = email({
  text: "hi me!",
  subject: "email from Val Town 👋",
  from: "stevekrouse.emailExample@valtown.email",
});
```

### Examples - Sending an attachment

```ts
import { email } from "https://esm.town/v/std/email?v=9";

export const stdEmailAttachmentExample = email({
  attachments: [{
    content: btoa("hello attachments!"),
    filename: "test.txt",
    type: "text",
    disposition: "attachment",
  }],
});
```

### @std/email Val

```ts
import { API_URL } from "https://esm.town/v/std/API_URL";
import { parseSendGridEmail } from "https://esm.town/v/stevekrouse/parseSendGridEmail?v=8";
import { parseSendGridEmails } from "https://esm.town/v/stevekrouse/parseSendGridEmails?v=10";
import process from "node:process";

export const email = async (data: {
  to?: (IAddress | string)[] | IAddress | string;
  from?: IAddress | string;
  cc?: (IAddress | string)[] | IAddress | string;
  bcc?: (IAddress | string)[] | IAddress | string;
  subject?: string;
  replyTo?: (IAddress | string)[] | IAddress | string;
  html?: string;
  text?: string;
  attachments?: AttachmentData[];
}) => {
  let result = await fetch(
    `${API_URL}/v1/email`,
    {
      method: "POST",
      body: JSON.stringify({
        to: parseSendGridEmails(data.to),
        from: data.from && parseSendGridEmail(data.from),
        cc: parseSendGridEmails(data.cc),
        bcc: parseSendGridEmails(data.bcc),
        replyToList: parseSendGridEmails(data.replyTo),
        subject: data.subject,
        html: data.html,
        text: data.text,
        attachments: data.attachments,
      }),
      headers: {
        authorization: "Bearer " + process.env.valtown,
      },
    },
  ).then(r => r.json());
  if (result?.message !== "Email accepted to be sent") {
    let message = result?.message ?? result?.error ?? JSON.stringify(result);
    throw new Error("Val Town Email Error: " + message);
  }
  return result;
};
interface IAddress {
  email: string;
  name?: string;
}
interface AttachmentData {
  content: string;
  filename: string;
  type?: string;
  disposition?: string;
  contentId?: string;
}
```

# Recommended topics

[+]email-val
[+]introduction
[+]http-val
[+]scheduled-val