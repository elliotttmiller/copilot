// Next.js API route: proxies POST requests to FastAPI /copilotkit endpoint for CrewAI orchestration (pages router)
import type { NextApiRequest, NextApiResponse } from "next";

const backendUrl = "http://localhost:8000/copilotkit";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  // Forward headers and raw body
  // Convert headers to plain object for fetch, but always set content-type to application/json
  const headers: Record<string, string> = {};
  Object.entries(req.headers).forEach(([key, value]) => {
    if (typeof value === "string") headers[key] = value;
    else if (Array.isArray(value)) headers[key] = value.join(", ");
  });
  headers["content-type"] = "application/json";
  // Remove content-length header to avoid mismatch
  delete headers["content-length"];
  const response = await fetch(backendUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(req.body),
  });

  const contentType = response.headers.get("content-type") || "application/json";
  const result = await response.text();
  res.status(response.status).setHeader("Content-Type", contentType).send(result);
};

export default handler;
