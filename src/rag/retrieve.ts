import { ChromaClient } from "chromadb";
import { embedBatch } from "./embeddings";

export async function retrieveContext(query: string, k = 5) {
  const client = new ChromaClient();
  const collection = await client.getOrCreateCollection({ name: "figma_components" });

  const queryEmbeddings = await embedBatch([query]);
  const results = await collection.query({
    queryEmbeddings,
    nResults: k,
  });

  return results.documents.flat();
}
