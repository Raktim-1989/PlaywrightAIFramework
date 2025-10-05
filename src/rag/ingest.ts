import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChromaClient } from "chromadb";
import { embedBatch } from "./embeddings";

export async function ingestFigmaComponents(components: any[]) {
  const client = new ChromaClient();
  const collection = await client.getOrCreateCollection({ name: "figma_components" });

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
  const texts = components.map(
    (c) => `${c.name} (${c.type}) - ${c.text || ""} at path ${c.path}`
  );

  const docs = await splitter.splitText(texts.join("\n"));
  const vectors = await embedBatch(docs);

  await collection.add({
    ids: docs.map((_, i) => `doc_${i}`),
    embeddings: vectors,
    documents: docs
  });

  console.log("✅ Figma components ingested into vector DB");
}
