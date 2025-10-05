import express from "express";

export function defineTool(name: string, schema: any, handler: Function) {
  return { name, schema, handler };
}

export function startMcpServer({ tools }: { tools: any[] }) {
  const app = express();
  app.use(express.json());

  app.post("/tool", async (req, res) => {
    const { tool, input } = req.body;
    const found = tools.find((t) => t.name === tool);
    if (!found) {
      return res.status(404).json({ error: `Tool not found: ${tool}` });
    }

    try {
      const result = await found.handler(input);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`✅ Local MCP server running on http://localhost:${port}`);
    console.log(
      `Available tools: ${tools.map((t) => t.name).join(", ")}`
    );
  });
}
