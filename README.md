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
============================================
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

==============
step by step flow of converting figma documents to bdd TESTS inside the framework 

Here is the sequence and steps for converting Figma documents to BDD tests, based on your files:

1. figma.ts
getFigmaFile(fileKey): Fetches the Figma file JSON using the Figma API.
flattenFigmaToComponents(json): Recursively walks through the Figma document and flattens it into a list of UI components.
2. extractFigma.ts
Reads the Figma file key from the command line.
Calls getFigmaFile(fileKey) to fetch the Figma file.
Calls flattenFigmaToComponents(data) to extract components.
Prints the extracted components as JSON.
3. runTestGen.ts
Reads the Figma file key from the command line.
Step 1: Calls getFigmaFile(fileKey) to fetch the Figma file.
Step 2: Calls flattenFigmaToComponents(data) to extract components.
Step 3: Calls ingestFigmaComponents(components) to ingest components into the vector DB.
Step 4: Calls generateBDDCases("Login Page") to generate BDD test cases using the ingested components and prints them.
4. generateTests.ts
generateBDDCases(target):
Calls retrieveContext("Test cases for " + target) to get relevant UI context from the vector DB.
Builds a prompt with the context and target.
Calls callLLM(prompt) to generate BDD test cases using an LLM.
Full Sequence
Fetch Figma file:
getFigmaFile(fileKey) (from figma.ts)

Extract components:
flattenFigmaToComponents(data) (from figma.ts)

Ingest components into vector DB:
ingestFigmaComponents(components) (from runTestGen.ts)

Retrieve context and generate BDD tests:
generateBDDCases("Login Page") (from generateTests.ts)

Uses RAG (retrieves context from vector DB)
Uses LLM to generate BDD scenarios
Output:
BDD test cases printed to console (from runTestGen.ts)

Summary:
Figma file → Extracted components → Ingested to vector DB → Context retrieved → LLM generates BDD tests.

=============


