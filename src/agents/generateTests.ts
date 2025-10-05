import { retrieveContext } from "../rag/retrieve";
import { callLLM } from "../llm";

const BDD_PROMPT = `
You are a QA Automation Engineer.
Using the CONTEXT below (from Figma UI components), write at least 10 test cases in Gherkin BDD format.
Include positive, negative, edge cases, and error scenarios.

CONTEXT:
{{context}}

Format:
Feature: ...
Scenario: ...
  Given ...
  When ...
  Then ...
`;

export async function generateBDDCases(target: string) {
  const context = await retrieveContext(`Test cases for ${target}`);
  const prompt = BDD_PROMPT.replace("{{context}}", context.join("\n"));

  const output = await callLLM(prompt);
  return output;
}
