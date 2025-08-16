const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root-of-the-server]__21626e76._.js");
runtime.getOrInstantiateRuntimeModule("[project]/copilot/copilot.ai/pages/_app.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/copilot/copilot.ai/pages/_app.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
