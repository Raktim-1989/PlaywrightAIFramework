import { getFigmaFile, flattenFigmaToComponents } from "../sources/figma";

(async () => {
  try {
    const fileKey = process.argv[2]; // pass via CLI
    if (!fileKey) throw new Error("Usage: ts-node extractFigma.ts <FILE_KEY>");

    const data = await getFigmaFile(fileKey);
    const components = flattenFigmaToComponents(data);

    console.log("Extracted components:");
    console.log(JSON.stringify(components, null, 2));
  } catch (err) {
    console.error(err);
  }
})();
// Usage: ts-node src/scripts/extractFigma.ts <FIGMA_FILE_KEY>      

// Ensure FIGMA_TOKEN is set in your environment variables
// Example: FIGMA_TOKEN=your_token_here ts-node src/scripts/extractFigma.ts <FIGMA_FILE_KEY>
// Output: JSON array of components printed to console
// Example output:
/*
[
  {
    "id": "123:456",
    "name": "Submit Button",
    "type": "BUTTON",
    "text": "Submit",
    "path": "Root > Form > Submit Button"
  },
  {
    "id": "123:789",
    "name": "Header Text",
    "type": "TEXT",
    "text": "Welcome to Our App",
    "path": "Root > Header > Header Text"
  }
]
*/      
// Note: This is a simplified example. Real-world Figma files may require more complex handling.
// The flattening logic can be extended to capture more properties as needed.
// Make sure to install dependencies: npm install node-fetch
// And set up TypeScript if not already done: npm install -D typescript @types/node
// This script assumes you have a basic understanding of TypeScript and Node.js environment setup.
// The FIGMA_TOKEN should have appropriate permissions to access the file specified by FILE_KEY.
// For more details on Figma API, refer to: https://www.figma.com/developers/api
// This script is intended for educational purposes and may need adjustments for production use.
// Always handle sensitive information like API tokens securely and avoid hardcoding them.
// You can enhance this script to save output to a file or integrate with other tools as needed.
// This script is a starting point for extracting UI components from Figma for various applications.
// Consider adding error handling for network issues or invalid file keys.
// You can also modify the filtering criteria in flattenFigmaToComponents to suit your needs.
// The output format can be adjusted based on how you plan to use the extracted data.
// This script can be integrated into larger workflows for design-to-development processes.
// Feel free to expand the functionality to include more Figma node types or properties.
// Always test with different Figma files to ensure robustness and reliability of the extraction logic.
// Remember to respect Figma's API rate limits when making multiple requests.
// This script can be part of a CI/CD pipeline to automate design updates in your projects.



/*
Step 3: Run It
npm install node-fetch
Set your API token in .env: FIGMA_TOKEN=your-figma-token-here
Run: npx ts-node src/scripts/extractFigma.ts <YOUR_FIGMA_FILE_KEY>
✅ You’ll see JSON output like:
[
  {
    "id": "123:456",
    "name": "Username",
    "type": "TEXT",
    "text": "Username",
    "path": "Login Screen > Username"
  },
  {
    "id": "123:789",
    "name": "Login",
    "type": "BUTTON",
    "text": "",
    "path": "Login Screen > Login"
  }
]
*/