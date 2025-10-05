import fetch from "node-fetch";
import * as process from "process";
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || "";  // set in .env
/**
 * Fetches a Figma file JSON using its fileKey
 */
export async function getFigmaFile(fileKey: string) {
  if (!FIGMA_TOKEN) {
    throw new Error("Missing Figma API Token. Set FIGMA_TOKEN in your .env");
  }

  const url = `https://api.figma.com/v1/files/${fileKey}`;
  const res = await fetch(url, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  });

  if (!res.ok) {
    throw new Error(`Figma API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Recursively walk through Figma nodes and flatten them into component JSON
 */
export function flattenFigmaToComponents(json: any) {
  const components: any[] = [];

  function walk(node: any, path: string[] = []) {
    const currentPath = [...path, node.name || node.id];

    // Use switch statement for node types
    switch (node.type) {
      case "TEXT":
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          text: node.characters || "",
          path: currentPath.join(" > "),
        });
        break;
      case "BUTTON":
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          label: node.characters || "",
          path: currentPath.join(" > "),
        });
        break;
      case "FRAME":
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          path: currentPath.join(" > "),
        });
        break;
      case "DROPDOWN":
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          options: node.options || [],
          selected: node.selected || null,
          path: currentPath.join(" > "),
        });
        break;
      case "CHECKBOX":
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          checked: node.checked || false,
          path: currentPath.join(" > "),
        });
        break;
      case "RADIO":
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          checked: node.checked || false,
          path: currentPath.join(" > "),
        });
        break;
      case "IMAGE":
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          url: node.url || "",
          path: currentPath.join(" > "),
        });
        break;
      case "ICON":
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          iconType: node.iconType || "",
          path: currentPath.join(" > "),
        });
        break;
      // Add more cases for other types as needed
      default:
        // Handle unknown node types
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          path: currentPath.join(" > "),
          // Optionally add all other properties
          ...node
        });
        break;
    }

    if (node.children) {
      node.children.forEach((child: any) => walk(child, currentPath));
    }
  }

  walk(json.document);
  return components;
}
