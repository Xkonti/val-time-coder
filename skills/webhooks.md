# Creating a webhook

A webhook is another name for a `Request` that is sent between two services on the web. They “hook” into the events that one service creates and notify another service of what happens. In other words, webhooks allow you to get realtime notifications.

You can create a webhook handler in Val Town and then register it with the service you want the notification from. Webhooks are usually created via Val Town `HTTP Val` , because it can accept standard HTTP requests.

## Create a webhook handler

Vals that conform to the `HTTP Val` pattern accept a `Request` as an argument and return a `Response`.

Here’s an example that connects the `Clerk` authentication service and `Discord`.

```ts
import { discordWebhook } from "https://esm.town/v/stevekrouse/discordWebhook?v=3";
import process from "node:process";

// # New Val Town User (on Clerk) -> Val Town Discord notification
// Translates one kind of webhook (Clerk) into another (Discord)
export async function handleDiscordNewUser(req: Request) {
  // check custom auth secret sent from clerk
  if (req.headers.get("auth") !== process.env.clerkNonSensitive)
    return new Response("Unauthorized", { status: 401 });
  const body = await req.json();
  await discordWebhook({
    url: process.env.newUserDiscord,
    content: body.data.email_addresses[0].email_address +
      " " +
      body.data.profile_image_url,
  });
  return new Response("Success");
}
```

The val above has three parts:

- It accepts a `Request` and checks that it really is from the Clerk by comparing an environment variable.
- It sends a `Request` to Discord to send a message to a channel and `await`s the response.
- It sends a `Response` back to Clerk so that it knows the webhook succeeded.

## Registering webhooks

Copy your val’s web endpoint using the menu and paste it into your webhook provider. The webhook provider will POST events to your Val. For example `https://usrname-valname.web.val.run`.

You can debug the requests by checking the arguments object in the `Evaluations tab`.

