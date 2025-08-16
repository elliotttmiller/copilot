module.exports = {

"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/copilot/copilot.ai/pages/api/copilotkit.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Next.js API route: proxies POST requests to FastAPI /copilotkit endpoint for CrewAI orchestration (pages router)
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
const backendUrl = "http://localhost:8000/copilotkit";
const handler = async (req, res)=>{
    // Only allow POST requests
    if (req.method !== "POST") {
        res.status(405).json({
            error: "Method Not Allowed"
        });
        return;
    }
    // Forward headers and raw body
    // Convert headers to plain object for fetch, but always set content-type to application/json
    const headers = {};
    Object.entries(req.headers).forEach(([key, value])=>{
        if (typeof value === "string") headers[key] = value;
        else if (Array.isArray(value)) headers[key] = value.join(", ");
    });
    headers["content-type"] = "application/json";
    // Remove content-length header to avoid mismatch
    delete headers["content-length"];
    const response = await fetch(backendUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body)
    });
    const contentType = response.headers.get("content-type") || "application/json";
    const result = await response.text();
    res.status(response.status).setHeader("Content-Type", contentType).send(result);
};
const __TURBOPACK__default__export__ = handler;
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6a8cad49._.js.map