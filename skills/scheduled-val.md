# Scheduling vals

You can schedule code to run repeatedly on Val Town. Want to check an RSS
feed every hour, or send a reminder email every day? This is how to do it:
just create a scheduled function and specify when it should run.

## Type Signature

Scheduled functions should take an `Interval` object as a parameter. Besides
that, they can do and return anything - the return value is ignored.

```ts
export function intervalHandler(interval: Interval) {
  console.log("Interval ran!");
}
```

The interval type has the following shape:

```ts
interface Interval {
  lastRunAt: Date | undefined;
}
```

## Schedule types

There are two kinds of schedules: either simple intervals, like "run every two hours",
or you can use cron syntax to define more complex schedules.

You can consult [crontab.guru](https://crontab.guru/) for help on writing cron expressions.
Using cron, you can write expressions like

```
0 */2 1 * *
```

Which will run the val _At minute 0 past every 2nd hour on day-of-month 1._. It's a powerful syntax.

Cron expressions are evaluated in the [UTC timezone](https://en.wikipedia.org/wiki/Coordinated_Universal_Time),
so if you want to specify a certain hour in your local timezone, you may need to adjust
the cron expression.

## Example

Scheduled Vals can optionally accept one argument, which includes some metadata
about the interval. For example, you can get the most recent time the interval
was run to filter out data that was already seen:

```ts
export const scheduleExampleTwo = async (interval: Interval) => {
  const { default: RssParser } = await import("npm:rss-parser");
  const parser = new RssParser();
  const feed = await parser.parseURL("http://feeds.bbci.co.uk/news/rss.xml");
  const newItems = feed.items.filter((item) =>
    new Date(item.pubDate) > interval.lastRunAt
  );
  return `${newItems.length} new items!`;
};
```

[+]introduction
[+]http-val
[+]email-val