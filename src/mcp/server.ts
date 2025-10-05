import { startMcpServer, defineTool } from "./sdk";
import { generatePlaywrightFromBDD, runPlaywrightTests } from "./tools";

const tools = [
  defineTool("playwright.generateTest", { bdd: "string" }, generatePlaywrightFromBDD),
  defineTool("playwright.runTests", { pattern: { type: "string", optional: true } }, runPlaywrightTests)
];

startMcpServer({ tools });
