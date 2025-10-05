# AIPlaywrightFramework

AI-powered Playwright test generation framework with MCP integration.

## Features
- Playwright test automation
- AI-powered test generation
- Model Context Protocol (MCP) integration
- RAG-based locator management

## Installation
```bash
npm install
```

## Usage
Run the MCP server:
```bash
npm run mcp:server
```
=====
Here’s the step-by-step flow for converting 10 BDD tests to Playwright tests in your framework:

Prepare your BDD feature file:

Place your 10 BDD scenarios in auth.feature.
Start required services:

Start Ollama (for LLM): ollama serve &
Start ChromaDB (for vector storage): docker run -p 8000:8000 chromadb/chromadb:latest
Build Locators DB (RAG):

Run: npx ts-node src/rag/ingestLocators.ts
This ingests locators from your Playwright POM files into the vector DB.
Start the MCP server:

Run: npx ts-node src/mcp/server.ts
This exposes tools like playwright.generateTest via HTTP.
Generate Playwright tests from BDD:

Run: npx ts-node scripts/generateFromFile.ts
This script reads your BDD file, sends it to the MCP server (/tool endpoint), and calls the tool playwright.generateTest.
The MCP server maps this to the function generatePlaywrightFromBDD, which:
Splits the BDD into scenarios and steps.
Uses stepToPlaywright (which calls the LLM and RAG for locators) to convert each BDD step into Playwright code.
Writes each scenario as a .spec.ts file in tests/generated.
Run the generated Playwright tests:

Run: npx playwright test tests/generated
This executes all the generated test files.
Summary:
Your BDD scenarios are read, sent to the MCP server, converted to Playwright code using LLM + RAG, and saved as test files. You then run these tests with Playwright.

====

