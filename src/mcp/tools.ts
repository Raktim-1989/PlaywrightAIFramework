import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { stepToPlaywright } from "../agents/stepTranslator";

/**
 * Tool: playwright.generateTest
 * Converts a BDD string into Playwright test automation code (.spec.ts files)
 */
export async function generatePlaywrightFromBDD(input: { bdd: string }) {
  const { bdd } = input;
  const lines = bdd.split("\n").map(l => l.trim());

  let currentScenario = "";
  let steps: string[] = [];
  const outputs: Record<string, string> = {};

  async function flushScenario() {
    if (!currentScenario || steps.length === 0) return;

    const code = `
      import { test, expect } from '@playwright/test';

      test('${currentScenario}', async ({ page }) => {
        await page.goto('/'); // adjust AUT base URL here
        ${steps.join("\n        ")}
      });
    `;

    const fileName = currentScenario.replace(/\s+/g, "_").toLowerCase();
    const filePath = path.join("tests/generated", `${fileName}.spec.ts`);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, code, "utf-8");

    outputs[filePath] = code;

    currentScenario = "";
    steps = [];
  }

  for (const line of lines) {
    if (line.startsWith("Scenario:")) {
      await flushScenario();
      currentScenario = line.replace("Scenario:", "").trim();
    } else if (/^(Given|When|Then|And)/.test(line)) {
      const code = await stepToPlaywright(line); // LLM + RAG step translator
      steps.push(code);
    }
  }

  await flushScenario();

  return {
    message: `✅ Generated ${Object.keys(outputs).length} Playwright test(s)`,
    files: outputs
  };
}

/**
 * Tool: playwright.runTests
 * Executes Playwright tests (all or matching a pattern) and returns results/logs
 */
export async function runPlaywrightTests(input: { pattern?: string }) {
  const { pattern } = input;
  const cmd = pattern
    ? `npx playwright test ${pattern}`
    : `npx playwright test tests/generated`;

  return new Promise((resolve) => {
    exec(cmd, { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
      if (err) {
        resolve({
          message: "❌ Playwright tests failed",
          error: stderr || err.message,
          output: stdout
        });
      } else {
        resolve({
          message: "✅ Playwright tests executed successfully",
          output: stdout
        });
      }
    });
  });
}
