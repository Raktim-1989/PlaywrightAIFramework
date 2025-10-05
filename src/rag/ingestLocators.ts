import { ChromaClient } from "chromadb";
import { embedBatch } from "./embeddings";
import fs from "fs";

export async function ingestLocatorsFromPOMs(pomDir: string) {
      
  // read Playwright POM files
  // extract locators like page.getByRole(), page.getByLabel(), etc.
  // store them in the vector DB

  const client = new ChromaClient();
  const collection = await client.getOrCreateCollection({ name: "locators" });

  const entries: string[] = [];

  // Simplified: scan POMs for getByRole/getByLabel
  const files = fs.readdirSync(pomDir).filter(f => f.endsWith(".ts"));
  for (const file of files) {
    const content = fs.readFileSync(`${pomDir}/${file}`, "utf-8");
    const matches = content.match(/page\.(getBy\w+.*)/g) || [];
    matches.forEach(m => entries.push(`${file} locator: ${m}`));
  }

  const vectors = await embedBatch(entries);

  await collection.add({
    ids: entries.map((_, i) => `locator_${i}`),
    embeddings: vectors,
    documents: entries
  });

  console.log(`✅ Ingested ${entries.length} locators from POMs into vector DB`);
}

/*
output
===
👉 Here your locators DB contains text like:
"Login button: page.getByRole('button', { name: 'Login' })"
"Username field: page.getByLabel('Username')"
"Cart link: page.getByRole('link', { name: 'Cart (1)' })"
You can now query this DB to find locators relevant to user tasks.
*/


