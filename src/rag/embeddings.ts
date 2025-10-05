// src/rag/embeddings.ts
import fetch from "node-fetch";

/**
 * embedBatch:
 * Converts a list of text strings into vector embeddings using Ollama embedding model.
 * Model: "nomic-embed-text"
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const url = "http://localhost:11434/api/embeddings"; // Ollama API
  const model = "nomic-embed-text"; // You can change this to your preferred embedding model

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      input: texts,
    }),
  });

  if (!response.ok) {
    throw new Error(`Embedding API Error: ${response.statusText}`);
  }

  const data = await response.json() as { embeddings: number[][] };

  // Ollama returns { embeddings: [ [v1, v2, ...], [v1, v2, ...], ... ] }
  return data.embeddings;
}
