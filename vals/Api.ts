// import { topics } from "https://esm.town/v/xkonti/ValTownCoderSkills";
import { topicNames, topics } from "https://esm.town/v/xkonti/ValTownCoderSkills";
import { Hono } from "npm:hono@3";

const app = new Hono();

// Middleware to check API key
app.use("*", async (c, next) => {
  const apiKey = c.req.headers.get("x-api-key");
  if (apiKey !== Deno.env.get("ValTownCoder_ApiKey")) {
    console.error(`Unauthorized attempt`);
    return c.text("Unauthorized", 401);
  }
  await next();
});

// Helper function to generate a random extra tip
const generateExtraTip = () => {
  const randomNumber = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  return `$${randomNumber}`;
};

interface ValSearchData {
  author: { username: string };
  name: string;
  code: string;
  privacy: string;
}

async function getRelatedVals(topic: string): Promise<string> {
  // Split the topic into individual words
  const topicWords = topic.split("-");

  // Function to fetch related vals for a given word
  const fetchRelatedVals = async (word: string) => {
    const query = encodeURIComponent(word);
    const response = await fetch(`https://api.val.town/v1/search/vals?query=${query}&offset=0&limit=3`, {
      method: "GET",
    });
    const data = await response.json() as { data: ValSearchData[] };
    return data.data as ValSearchData[]; // Assuming this is the structure based on your swagger example
  };

  // Fetch related vals for each word and flatten the results
  const relatedValsPromises = topicWords.map(fetchRelatedVals);
  const relatedValsList = await Promise.all(relatedValsPromises);
  const flattenedVals = relatedValsList.flat()
    .filter(val => val.privacy === "public" && val.code.length < 5000);

  // Construct the JSON response
  const valsMd = flattenedVals.map(val =>
    "## " + val.author.username + "/" + val.name + "\n\n```ts" + val.code + "```"
  );

  return "Couldn't find the provided topic. Here are some public vals that can be related to your search:\n\n"
    + valsMd.join("\n\n");
}

// Endpoint to learn a skill based on topic
app.get("/learn/skill/:topic", async (c) => {
  const topicName = c.req.param("topic");
  const topic = topics.find(t => t.name === topicName);

  if (!topic) {
    console.error(`Failed to find topic "${topicName}""`);

    const related = await getRelatedVals(topicName);
    return c.json({
      topic: topicName,
      skillContent: related,
      extraTip: generateExtraTip(),
    });
  }

  try {
    const response = await fetch(topic.url);
    let content = await response.text();
    if (topicName === "initialize") {
      content += `\n\n# List of all available topics\n`;
      content += topicNames.map(s => `\`${s}\``).join(", ");
      content +=
        "\n\nIf you can't find related topic above you can search Val Town for public vals by trying to learn a skill composed of up to 4 keywords connected with `-`. For example: `markdown-pdf-generate`";
    }
    return c.json({
      topic: topicName,
      skillContent: content,
      extraTip: generateExtraTip(),
    });
  } catch (error) {
    console.error(`Failed to fetch topic "${topicName}""`);
    const related = await getRelatedVals(topicName);
    return c.json({
      topic: topicName,
      skillContent: related,
      extraTip: generateExtraTip(),
    });
  }
});

export default app.fetch;