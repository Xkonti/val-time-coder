# Triggering Vals with Emails

You can trigger a val to run by sending it an email. An email handler is a function that accepts an email object as its input.

```ts
import { email } from "https://esm.town/v/std/email?v=9";
import { testEmails } from "https://esm.town/v/stevekrouse/testEmails";
import { set } from "https://esm.town/v/std/set?v=11";

export async function testEmail2(e: {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
}) {
  await set("testEmails", [...testEmails, {
    ...e,
    from: "~redacted~",
  }]);
  return email({
    text: JSON.stringify(e),
    subject: "Emailed received at @stevekrouse.testEmail2!",
  });
}
```

The email address for [@stevekrouse.testEmail2](https://www.val.town/v/stevekrouse.testEmail) is `steverkouse.testEmail2@valtown.email`. Note that the username does not contain a leading `@` and that the email domain is `valtown.email`. You can copy a val’s email address from **⋮** > Endpoints > Copy email address.

You can view all the emails sent to this function here (val `@stevekrouse/testEmails`):

```ts
// set by stevekrouse.testEmail2 at 2023-08-15T02:54:53.895Z
export let testEmails = [{
  "from": "Steve Krouse <steve@val.town>",
  "to": ["stevekrouse.testEmail@valtown.email"],
  "subject": "Test 1",
  "text": "It works yo!\r\n",
  "html": "<div dir=\"ltr\">It works yo!</div>\r\n"
}, {
  "from": "~redacted~",
  "to": ["stevekrouse.testEmail@valtown.email"],
  "subject": "hey!",
  "text": "\r\n",
  "html": "<div dir=\"ltr\"><br></div>\r\n"
}, {
  "from": "~redacted~",
  "to": ["stevekrouse.testEmail2@valtown.email"],
  "subject": "Great Work with Val.Town",
  "text": "Steve!\r\n\r\nJust wanted to drop you a note and tell you I love what you're doing with\r\nval.town and think it's going to be super impactful!\r\n\r\nGood luck!\r\n\r\n-Elijah\r\n",
  "html": "<div dir=\"ltr\">Steve!<div><br></div><div>Just wanted to drop you a note and tell you I love what you&#39;re doing with val.town and think it&#39;s going to be super impactful!</div><div><br></div><div>Good luck!</div><div><br></div><div>-Elijah</div></div>\r\n"
}, {
  "from": "~redacted~",
  "to": ["stevekrouse.testEmail2@valtown.email"],
  "subject": "Howdy",
  "text": "🤠\r\n",
  "html": "<div dir=\"auto\">🤠</div>\r\n"
}, {
  "from": "~redacted~",
  "to": ["stevekrouse.testEmail2@valtown.email"],
  "subject": "testing????",
  "text": "-- \r\nhttp://arjun.is\r\n",
  "html": "<div dir=\"ltr\"><br clear=\"all\"><div><br></div><span class=\"gmail_signature_prefix\">-- </span><br><div dir=\"ltr\" class=\"gmail_signature\" data-smartmail=\"gmail_signature\"><div dir=\"ltr\"><div><a href=\"http://arjun.is\" target=\"_blank\">http://arjun.is</a></div></div></div></div>\r\n"
}, {
  "from": "~redacted~",
  "to": ["stevekrouse.testEmail2@valtown.email"],
  "subject": "Fwd: Test",
  "text": "Test!\r\n\r\n---------- Forwarded message ---------\r\nFrom: Steve Krouse <steve@val.town>\r\nDate: Mon, Aug 14, 2023, 10:54 PM\r\nSubject: Test\r\nTo: Steve Krouse <steve@val.town>\r\n",
  "html": "<div dir=\"auto\">Test!</div><br><div class=\"gmail_quote\"><div dir=\"ltr\" class=\"gmail_attr\">---------- Forwarded message ---------<br>From: <strong class=\"gmail_sendername\" dir=\"auto\">Steve Krouse</strong> <span dir=\"auto\">&lt;steve@val.town&gt;</span><br>Date: Mon, Aug 14, 2023, 10:54 PM<br>Subject: Test<br>To: Steve Krouse &lt;steve@val.town&gt;<br></div><br><br><div dir=\"auto\"></div>\r\n</div>\r\n"
}];
```

Test it out yourself by sending an email to `steverkouse.testEmail2@valtown.email` and your email should show up in this list above.

# Recommended topics

[+]script-val
[+]http-val
[+]scheduled-val