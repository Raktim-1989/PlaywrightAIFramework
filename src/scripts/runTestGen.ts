import { getFigmaFile, flattenFigmaToComponents } from "../sources/figma";
import { ingestFigmaComponents } from "../rag/ingest";
import { generateBDDCases } from "../agents/generateTests";

(async () => {
  const fileKey = process.argv[2];
  if (!fileKey) throw new Error("Usage: ts-node runTestGen.ts <FIGMA_FILE_KEY>");

  // Step 1: Extract from Figma
  const data = await getFigmaFile(fileKey);
  const components = flattenFigmaToComponents(data);

  // Step 2: Ingest into vector DB
  await ingestFigmaComponents(components);

  // Step 3: Generate test cases
  const bdd = await generateBDDCases("Login Page");
  console.log("Generated Test Cases:\n", bdd);
})();

/*
ts-node src/scripts/runTestGen.ts <FIGMA_FILE_KEY>
*/
/*
EXAMPLE OUTPUT 

======
Feature: Login functionality

Scenario: Successful login
  Given the user navigates to the Login page
  When they enter valid Username and Password
  And click the "Login" button
  Then they should see the Dashboard

Scenario: Login with empty fields
  Given the user is on the Login page
  When they click "Login" without entering anything
  Then they should see the error message "Invalid username or password"

Scenario: Login with invalid password
  Given the user is on the Login page
  When they enter "user1" and "wrongpass"
  And click "Login"
  Then the error message should be displayed
=======

*/
