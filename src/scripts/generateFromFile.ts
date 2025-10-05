import fs from "fs";
import fetch from "node-fetch";

(async () => {
  const bdd = fs.readFileSync("bdd/auth.feature", "utf-8"); // put your 10 scenarios here
  const res = await fetch("http://localhost:4000/tool", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tool: "playwright.generateTest",
      input: { bdd }
    })
  });
  console.log(await res.json());
})();


/*
npx ts-node scripts/generateFromFile.ts

output
tests/generated/valid_login.spec.ts
tests/generated/invalid_login.spec.ts
tests/generated/logout.spec.ts
Open one—you’ll see Playwright code generated from your BDD with real selectors (because of the RAG lookup).

===
✅ run the test 
npx playwright test tests/generated


*/