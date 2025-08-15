import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

// Configure the Google Generative AI Adapter
const serviceAdapter = new GoogleGenerativeAIAdapter({
  apiKey: process.env.GOOGLE_API_KEY,
  // Add any additional config options here
});

// Configure CopilotRuntime to use FastAPI backend for actions
const runtime = new CopilotRuntime({
  remoteEndpoints: [
    {
      url: process.env.NEXT_PUBLIC_COPILOTKIT_API_URL || "http://localhost:8000/copilotkit",
    },
  ],
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
