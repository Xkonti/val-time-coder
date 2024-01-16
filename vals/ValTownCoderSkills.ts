import { fetchJSON } from "https://esm.town/v/stevekrouse/fetchJSON";

// GitHub API endpoint to fetch contents of the skills folder
const GITHUB_API_URL = "https://api.github.com/repos/Xkonti/val-town-coder/contents/skills";

// Fetch the list of files in the skills directory
const files = await fetchJSON(GITHUB_API_URL);

// Export names of topics and skip "initialize"
export const topicNames = files
  .filter(file => file.type === "file" && file.name.endsWith(".md"))
  .map(file => file.name.replace(".md", ""))
  .filter(name => name !== "initialize");

// Filter and map the files to the required format
export const topics = files
  .filter(file => file.type === "file" && file.name.endsWith(".md"))
  .map(file => ({
    name: file.name.replace(".md", ""),
    url: file.download_url,
  }));