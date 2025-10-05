import { callLLM } from "../llm";
import { retrieveLocators } from "../rag/retrieveLocators";

export async function stepToPlaywright(step: string): Promise<string> {
  // Pull UI/POM context for grounding
  const context = await retrieveLocators(step);

  const prompt = `
  You are an expert QA Automation Engineer using Playwright + TypeScript.
  Convert the following BDD step into valid Playwright code.
  Use the provided CONTEXT to map UI elements to locators.
  Prefer getByRole/getByLabel over CSS selectors.
  Return ONLY TypeScript code.

  CONTEXT:
  ${context}

  STEP:
  ${step}
  `;

  return await callLLM(prompt);
}
