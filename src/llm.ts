import fetch from "node-fetch";

export async function callLLM(prompt: string): Promise<string> {
  // Example: calling Ollama locally
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "qwen2.5:latest", prompt }),
  });

  const data = await res.json() as { response?: string };
  return data.response || "";
}
