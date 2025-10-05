// src/rag/embeddings.ts
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * embedBatch:
 * Converts a list of texts into embedding vectors using OpenAI.
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  return response.data.map((d) => d.embedding);
}
