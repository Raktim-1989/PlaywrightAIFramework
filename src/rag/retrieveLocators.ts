import { ChromaClient } from "chromadb";
import { embedBatch } from "./embeddings";

export async function retrieveLocators(query: string, k = 5) {
  const client = new ChromaClient();
  const col = await client.getOrCreateCollection({ name: "locators" });

  const queryEmbedding = await embedBatch([query]);
  const results = await col.query({
    queryEmbeddings: queryEmbedding,
    nResults: k
  });

  return results.documents.flat().join("\n");
}
