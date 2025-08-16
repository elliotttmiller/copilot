(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-2KQ6HEWZ.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/utils/json-schema.ts
__turbopack_context__.s({
    "actionParametersToJsonSchema": ()=>actionParametersToJsonSchema,
    "convertJsonSchemaToZodSchema": ()=>convertJsonSchemaToZodSchema,
    "jsonSchemaToActionParameters": ()=>jsonSchemaToActionParameters
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/zod/v3/external.js [client] (ecmascript) <export * as z>");
;
function actionParametersToJsonSchema(actionParameters) {
    let parameters = {};
    for (let parameter of actionParameters || []){
        parameters[parameter.name] = convertAttribute(parameter);
    }
    let requiredParameterNames = [];
    for (let arg of actionParameters || []){
        if (arg.required !== false) {
            requiredParameterNames.push(arg.name);
        }
    }
    return {
        type: "object",
        properties: parameters,
        required: requiredParameterNames
    };
}
function jsonSchemaToActionParameters(jsonSchema) {
    if (jsonSchema.type !== "object" || !jsonSchema.properties) {
        return [];
    }
    const parameters = [];
    const requiredFields = jsonSchema.required || [];
    for (const [name, schema] of Object.entries(jsonSchema.properties)){
        const parameter = convertJsonSchemaToParameter(name, schema, requiredFields.includes(name));
        parameters.push(parameter);
    }
    return parameters;
}
function convertJsonSchemaToParameter(name, schema, isRequired) {
    const baseParameter = {
        name,
        description: schema.description
    };
    if (!isRequired) {
        baseParameter.required = false;
    }
    switch(schema.type){
        case "string":
            return {
                ...baseParameter,
                type: "string",
                ...schema.enum && {
                    enum: schema.enum
                }
            };
        case "number":
        case "boolean":
            return {
                ...baseParameter,
                type: schema.type
            };
        case "object":
            if (schema.properties) {
                const attributes = [];
                const requiredFields = schema.required || [];
                for (const [propName, propSchema] of Object.entries(schema.properties)){
                    attributes.push(convertJsonSchemaToParameter(propName, propSchema, requiredFields.includes(propName)));
                }
                return {
                    ...baseParameter,
                    type: "object",
                    attributes
                };
            }
            return {
                ...baseParameter,
                type: "object"
            };
        case "array":
            if (schema.items.type === "object" && "properties" in schema.items) {
                const attributes = [];
                const requiredFields = schema.items.required || [];
                for (const [propName, propSchema] of Object.entries(schema.items.properties || {})){
                    attributes.push(convertJsonSchemaToParameter(propName, propSchema, requiredFields.includes(propName)));
                }
                return {
                    ...baseParameter,
                    type: "object[]",
                    attributes
                };
            } else if (schema.items.type === "array") {
                throw new Error("Nested arrays are not supported");
            } else {
                return {
                    ...baseParameter,
                    type: "".concat(schema.items.type, "[]")
                };
            }
        default:
            return {
                ...baseParameter,
                type: "string"
            };
    }
}
function convertAttribute(attribute) {
    var _a, _b, _c;
    switch(attribute.type){
        case "string":
            return {
                type: "string",
                description: attribute.description,
                ...attribute.enum && {
                    enum: attribute.enum
                }
            };
        case "number":
        case "boolean":
            return {
                type: attribute.type,
                description: attribute.description
            };
        case "object":
        case "object[]":
            const properties = (_a = attribute.attributes) == null ? void 0 : _a.reduce((acc, attr)=>{
                acc[attr.name] = convertAttribute(attr);
                return acc;
            }, {});
            const required = (_b = attribute.attributes) == null ? void 0 : _b.filter((attr)=>attr.required !== false).map((attr)=>attr.name);
            if (attribute.type === "object[]") {
                return {
                    type: "array",
                    items: {
                        type: "object",
                        ...properties && {
                            properties
                        },
                        ...required && required.length > 0 && {
                            required
                        }
                    },
                    description: attribute.description
                };
            }
            return {
                type: "object",
                description: attribute.description,
                ...properties && {
                    properties
                },
                ...required && required.length > 0 && {
                    required
                }
            };
        default:
            if ((_c = attribute.type) == null ? void 0 : _c.endsWith("[]")) {
                const itemType = attribute.type.slice(0, -2);
                return {
                    type: "array",
                    items: {
                        type: itemType
                    },
                    description: attribute.description
                };
            }
            return {
                type: "string",
                description: attribute.description
            };
    }
}
function convertJsonSchemaToZodSchema(jsonSchema, required) {
    if (jsonSchema.type === "object") {
        const spec = {};
        if (!jsonSchema.properties || !Object.keys(jsonSchema.properties).length) {
            return !required ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object(spec).optional() : __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object(spec);
        }
        for (const [key, value] of Object.entries(jsonSchema.properties)){
            spec[key] = convertJsonSchemaToZodSchema(value, jsonSchema.required ? jsonSchema.required.includes(key) : false);
        }
        let schema = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object(spec).describe(jsonSchema.description);
        return required ? schema : schema.optional();
    } else if (jsonSchema.type === "string") {
        let schema = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe(jsonSchema.description);
        return required ? schema : schema.optional();
    } else if (jsonSchema.type === "number") {
        let schema = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe(jsonSchema.description);
        return required ? schema : schema.optional();
    } else if (jsonSchema.type === "boolean") {
        let schema = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().describe(jsonSchema.description);
        return required ? schema : schema.optional();
    } else if (jsonSchema.type === "array") {
        let itemSchema = convertJsonSchemaToZodSchema(jsonSchema.items, true);
        let schema = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(itemSchema).describe(jsonSchema.description);
        return required ? schema : schema.optional();
    }
    throw new Error("Invalid JSON schema");
}
;
 //# sourceMappingURL=chunk-2KQ6HEWZ.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-TNIC7CGS.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// package.json
__turbopack_context__.s({
    "scarf_client_default": ()=>scarf_client_default,
    "version": ()=>version
});
var version = "1.10.2";
// src/telemetry/scarf-client.ts
var SCARF_BASE_URL = "https://copilotkit.gateway.scarf.sh/".concat(version);
var ScarfClient = class {
    async logEvent(properties) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), 3e3);
            const queryParams = new URLSearchParams();
            Object.entries(properties).forEach((param)=>{
                let [key, value] = param;
                if (value !== null && value !== void 0) {
                    queryParams.append(key, String(value));
                }
            });
            const url = "".concat(SCARF_BASE_URL, "?").concat(queryParams.toString());
            const response = await fetch(url, {
                method: "GET",
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error("HTTP error! status: ".concat(response.status));
            }
        } catch (e) {}
    }
    constructor(){}
};
var scarf_client_default = new ScarfClient();
;
 //# sourceMappingURL=chunk-TNIC7CGS.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-QBDBRDYF.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BANNER_ERROR_NAMES": ()=>BANNER_ERROR_NAMES,
    "COPILOTKIT_VERSION": ()=>COPILOTKIT_VERSION,
    "COPILOT_CLOUD_ERROR_NAMES": ()=>COPILOT_CLOUD_ERROR_NAMES,
    "ConfigurationError": ()=>ConfigurationError,
    "CopilotKitAgentDiscoveryError": ()=>CopilotKitAgentDiscoveryError,
    "CopilotKitApiDiscoveryError": ()=>CopilotKitApiDiscoveryError,
    "CopilotKitError": ()=>CopilotKitError,
    "CopilotKitErrorCode": ()=>CopilotKitErrorCode,
    "CopilotKitLowLevelError": ()=>CopilotKitLowLevelError,
    "CopilotKitMisuseError": ()=>CopilotKitMisuseError,
    "CopilotKitRemoteEndpointDiscoveryError": ()=>CopilotKitRemoteEndpointDiscoveryError,
    "CopilotKitVersionMismatchError": ()=>CopilotKitVersionMismatchError,
    "ERROR_CONFIG": ()=>ERROR_CONFIG,
    "ERROR_NAMES": ()=>ERROR_NAMES,
    "ErrorVisibility": ()=>ErrorVisibility,
    "MissingPublicApiKeyError": ()=>MissingPublicApiKeyError,
    "ResolvedCopilotKitError": ()=>ResolvedCopilotKitError,
    "Severity": ()=>Severity,
    "UpgradeRequiredError": ()=>UpgradeRequiredError,
    "ensureStructuredError": ()=>ensureStructuredError,
    "getPossibleVersionMismatch": ()=>getPossibleVersionMismatch,
    "isMacOS": ()=>isMacOS,
    "isStructuredCopilotKitError": ()=>isStructuredCopilotKitError,
    "parseJson": ()=>parseJson,
    "tryMap": ()=>tryMap
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$TNIC7CGS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-TNIC7CGS.mjs [client] (ecmascript)");
// src/utils/errors.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/graphql/error/GraphQLError.mjs [client] (ecmascript)");
;
;
// src/utils/index.ts
function parseJson(json) {
    let fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "unset";
    try {
        return JSON.parse(json);
    } catch (e) {
        return fallback === "unset" ? null : fallback;
    }
}
function tryMap(items, callback) {
    return items.reduce((acc, item, index, array)=>{
        try {
            acc.push(callback(item, index, array));
        } catch (error) {
            console.error(error);
        }
        return acc;
    }, []);
}
function isMacOS() {
    return /Mac|iMac|Macintosh/i.test(navigator.userAgent);
}
// src/index.ts
var COPILOTKIT_VERSION = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$TNIC7CGS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["version"];
// src/utils/errors.ts
var Severity = /* @__PURE__ */ ((Severity2)=>{
    Severity2["CRITICAL"] = "critical";
    Severity2["WARNING"] = "warning";
    Severity2["INFO"] = "info";
    return Severity2;
})(Severity || {});
var ErrorVisibility = /* @__PURE__ */ ((ErrorVisibility2)=>{
    ErrorVisibility2["BANNER"] = "banner";
    ErrorVisibility2["TOAST"] = "toast";
    ErrorVisibility2["SILENT"] = "silent";
    ErrorVisibility2["DEV_ONLY"] = "dev_only";
    return ErrorVisibility2;
})(ErrorVisibility || {});
var ERROR_NAMES = {
    COPILOT_ERROR: "CopilotError",
    COPILOT_API_DISCOVERY_ERROR: "CopilotApiDiscoveryError",
    COPILOT_REMOTE_ENDPOINT_DISCOVERY_ERROR: "CopilotKitRemoteEndpointDiscoveryError",
    COPILOT_KIT_AGENT_DISCOVERY_ERROR: "CopilotKitAgentDiscoveryError",
    COPILOT_KIT_LOW_LEVEL_ERROR: "CopilotKitLowLevelError",
    COPILOT_KIT_VERSION_MISMATCH_ERROR: "CopilotKitVersionMismatchError",
    RESOLVED_COPILOT_KIT_ERROR: "ResolvedCopilotKitError",
    CONFIGURATION_ERROR: "ConfigurationError",
    MISSING_PUBLIC_API_KEY_ERROR: "MissingPublicApiKeyError",
    UPGRADE_REQUIRED_ERROR: "UpgradeRequiredError"
};
var BANNER_ERROR_NAMES = [
    ERROR_NAMES.CONFIGURATION_ERROR,
    ERROR_NAMES.MISSING_PUBLIC_API_KEY_ERROR,
    ERROR_NAMES.UPGRADE_REQUIRED_ERROR,
    ERROR_NAMES.COPILOT_API_DISCOVERY_ERROR,
    ERROR_NAMES.COPILOT_REMOTE_ENDPOINT_DISCOVERY_ERROR,
    ERROR_NAMES.COPILOT_KIT_AGENT_DISCOVERY_ERROR
];
var COPILOT_CLOUD_ERROR_NAMES = BANNER_ERROR_NAMES;
var CopilotKitErrorCode = /* @__PURE__ */ ((CopilotKitErrorCode2)=>{
    CopilotKitErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
    CopilotKitErrorCode2["NOT_FOUND"] = "NOT_FOUND";
    CopilotKitErrorCode2["AGENT_NOT_FOUND"] = "AGENT_NOT_FOUND";
    CopilotKitErrorCode2["API_NOT_FOUND"] = "API_NOT_FOUND";
    CopilotKitErrorCode2["REMOTE_ENDPOINT_NOT_FOUND"] = "REMOTE_ENDPOINT_NOT_FOUND";
    CopilotKitErrorCode2["AUTHENTICATION_ERROR"] = "AUTHENTICATION_ERROR";
    CopilotKitErrorCode2["MISUSE"] = "MISUSE";
    CopilotKitErrorCode2["UNKNOWN"] = "UNKNOWN";
    CopilotKitErrorCode2["VERSION_MISMATCH"] = "VERSION_MISMATCH";
    CopilotKitErrorCode2["CONFIGURATION_ERROR"] = "CONFIGURATION_ERROR";
    CopilotKitErrorCode2["MISSING_PUBLIC_API_KEY_ERROR"] = "MISSING_PUBLIC_API_KEY_ERROR";
    CopilotKitErrorCode2["UPGRADE_REQUIRED_ERROR"] = "UPGRADE_REQUIRED_ERROR";
    return CopilotKitErrorCode2;
})(CopilotKitErrorCode || {});
var BASE_URL = "https://docs.copilotkit.ai";
var getSeeMoreMarkdown = (link)=>"See more: [".concat(link, "](").concat(link, ")");
var ERROR_CONFIG = {
    ["NETWORK_ERROR" /* NETWORK_ERROR */ ]: {
        statusCode: 503,
        troubleshootingUrl: "".concat(BASE_URL, "/troubleshooting/common-issues#i-am-getting-a-network-errors--api-not-found"),
        visibility: "banner" /* BANNER */ ,
        severity: "critical" /* CRITICAL */ 
    },
    ["NOT_FOUND" /* NOT_FOUND */ ]: {
        statusCode: 404,
        troubleshootingUrl: "".concat(BASE_URL, "/troubleshooting/common-issues#i-am-getting-a-network-errors--api-not-found"),
        visibility: "banner" /* BANNER */ ,
        severity: "critical" /* CRITICAL */ 
    },
    ["AGENT_NOT_FOUND" /* AGENT_NOT_FOUND */ ]: {
        statusCode: 500,
        troubleshootingUrl: "".concat(BASE_URL, "/coagents/troubleshooting/common-issues#i-am-getting-agent-not-found-error"),
        visibility: "banner" /* BANNER */ ,
        severity: "critical" /* CRITICAL */ 
    },
    ["API_NOT_FOUND" /* API_NOT_FOUND */ ]: {
        statusCode: 404,
        troubleshootingUrl: "".concat(BASE_URL, "/troubleshooting/common-issues#i-am-getting-a-network-errors--api-not-found"),
        visibility: "banner" /* BANNER */ ,
        severity: "critical" /* CRITICAL */ 
    },
    ["REMOTE_ENDPOINT_NOT_FOUND" /* REMOTE_ENDPOINT_NOT_FOUND */ ]: {
        statusCode: 404,
        troubleshootingUrl: "".concat(BASE_URL, "/troubleshooting/common-issues#i-am-getting-copilotkits-remote-endpoint-not-found-error"),
        visibility: "banner" /* BANNER */ ,
        severity: "critical" /* CRITICAL */ 
    },
    ["AUTHENTICATION_ERROR" /* AUTHENTICATION_ERROR */ ]: {
        statusCode: 401,
        troubleshootingUrl: "".concat(BASE_URL, "/troubleshooting/common-issues#authentication-errors"),
        visibility: "banner" /* BANNER */ ,
        severity: "critical" /* CRITICAL */ 
    },
    ["MISUSE" /* MISUSE */ ]: {
        statusCode: 400,
        troubleshootingUrl: null,
        visibility: "dev_only" /* DEV_ONLY */ ,
        severity: "warning" /* WARNING */ 
    },
    ["UNKNOWN" /* UNKNOWN */ ]: {
        statusCode: 500,
        visibility: "toast" /* TOAST */ ,
        severity: "critical" /* CRITICAL */ 
    },
    ["CONFIGURATION_ERROR" /* CONFIGURATION_ERROR */ ]: {
        statusCode: 400,
        troubleshootingUrl: null,
        severity: "warning" /* WARNING */ ,
        visibility: "banner" /* BANNER */ 
    },
    ["MISSING_PUBLIC_API_KEY_ERROR" /* MISSING_PUBLIC_API_KEY_ERROR */ ]: {
        statusCode: 400,
        troubleshootingUrl: null,
        severity: "critical" /* CRITICAL */ ,
        visibility: "banner" /* BANNER */ 
    },
    ["UPGRADE_REQUIRED_ERROR" /* UPGRADE_REQUIRED_ERROR */ ]: {
        statusCode: 402,
        troubleshootingUrl: null,
        severity: "warning" /* WARNING */ ,
        visibility: "banner" /* BANNER */ 
    },
    ["VERSION_MISMATCH" /* VERSION_MISMATCH */ ]: {
        statusCode: 400,
        troubleshootingUrl: null,
        visibility: "dev_only" /* DEV_ONLY */ ,
        severity: "info" /* INFO */ 
    }
};
var CopilotKitError = class extends __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GraphQLError"] {
    constructor({ message = "Unknown error occurred", code, severity, visibility }){
        const name = ERROR_NAMES.COPILOT_ERROR;
        const config = ERROR_CONFIG[code];
        const { statusCode } = config;
        var _ref;
        const resolvedVisibility = (_ref = visibility !== null && visibility !== void 0 ? visibility : config.visibility) !== null && _ref !== void 0 ? _ref : "toast" /* TOAST */ ;
        const resolvedSeverity = severity !== null && severity !== void 0 ? severity : "severity" in config ? config.severity : void 0;
        super(message, {
            extensions: {
                name,
                statusCode,
                code,
                visibility: resolvedVisibility,
                severity: resolvedSeverity,
                troubleshootingUrl: "troubleshootingUrl" in config ? config.troubleshootingUrl : null,
                originalError: {
                    message,
                    stack: new Error().stack
                }
            }
        });
        this.code = code;
        this.name = name;
        this.statusCode = statusCode;
        this.severity = resolvedSeverity;
        this.visibility = resolvedVisibility;
    }
};
var CopilotKitMisuseError = class extends CopilotKitError {
    constructor({ message, code = "MISUSE" /* MISUSE */  }){
        const docsLink = "troubleshootingUrl" in ERROR_CONFIG[code] && ERROR_CONFIG[code].troubleshootingUrl ? getSeeMoreMarkdown(ERROR_CONFIG[code].troubleshootingUrl) : null;
        const finalMessage = docsLink ? "".concat(message, ".\n\n").concat(docsLink) : message;
        super({
            message: finalMessage,
            code
        });
        this.name = ERROR_NAMES.COPILOT_API_DISCOVERY_ERROR;
    }
};
var getVersionMismatchErrorMessage = (param)=>{
    let { reactCoreVersion, runtimeVersion, runtimeClientGqlVersion } = param;
    return "Version mismatch detected: @copilotkit/runtime@".concat(runtimeVersion !== null && runtimeVersion !== void 0 ? runtimeVersion : "", " is not compatible with @copilotkit/react-core@").concat(reactCoreVersion, " and @copilotkit/runtime-client-gql@").concat(runtimeClientGqlVersion, ". Please ensure all installed copilotkit packages are on the same version.");
};
var CopilotKitVersionMismatchError = class extends CopilotKitError {
    constructor({ reactCoreVersion, runtimeVersion, runtimeClientGqlVersion }){
        const code = "VERSION_MISMATCH" /* VERSION_MISMATCH */ ;
        super({
            message: getVersionMismatchErrorMessage({
                reactCoreVersion,
                runtimeVersion,
                runtimeClientGqlVersion
            }),
            code
        });
        this.name = ERROR_NAMES.COPILOT_KIT_VERSION_MISMATCH_ERROR;
    }
};
var CopilotKitApiDiscoveryError = class extends CopilotKitError {
    constructor(params = {}){
        var _params_url;
        const url = (_params_url = params.url) !== null && _params_url !== void 0 ? _params_url : "";
        let operationSuffix = "";
        if (url == null ? void 0 : url.includes("/info")) operationSuffix = "when fetching CopilotKit info";
        else if (url.includes("/actions/execute")) operationSuffix = "when attempting to execute actions.";
        else if (url.includes("/agents/state")) operationSuffix = "when attempting to get agent state.";
        else if (url.includes("/agents/execute")) operationSuffix = "when attempting to execute agent(s).";
        var _params_message;
        const message = (_params_message = params.message) !== null && _params_message !== void 0 ? _params_message : params.url ? "Failed to find CopilotKit API endpoint at url ".concat(params.url, " ").concat(operationSuffix) : "Failed to find CopilotKit API endpoint.";
        var _params_code;
        const code = (_params_code = params.code) !== null && _params_code !== void 0 ? _params_code : "API_NOT_FOUND" /* API_NOT_FOUND */ ;
        const errorMessage = "".concat(message, ".\n\n").concat(getSeeMoreMarkdown(ERROR_CONFIG[code].troubleshootingUrl));
        super({
            message: errorMessage,
            code
        });
        this.name = ERROR_NAMES.COPILOT_API_DISCOVERY_ERROR;
    }
};
var CopilotKitRemoteEndpointDiscoveryError = class extends CopilotKitApiDiscoveryError {
    constructor(params){
        var _ref;
        const message = (_ref = params == null ? void 0 : params.message) !== null && _ref !== void 0 ? _ref : (params == null ? void 0 : params.url) ? "Failed to find or contact remote endpoint at url ".concat(params.url) : "Failed to find or contact remote endpoint";
        const code = "REMOTE_ENDPOINT_NOT_FOUND" /* REMOTE_ENDPOINT_NOT_FOUND */ ;
        super({
            message,
            code
        });
        this.name = ERROR_NAMES.COPILOT_REMOTE_ENDPOINT_DISCOVERY_ERROR;
    }
};
var CopilotKitAgentDiscoveryError = class extends CopilotKitError {
    constructor(params){
        const { agentName, availableAgents } = params;
        const code = "AGENT_NOT_FOUND" /* AGENT_NOT_FOUND */ ;
        const seeMore = getSeeMoreMarkdown(ERROR_CONFIG[code].troubleshootingUrl);
        let message;
        if (availableAgents.length) {
            const agentList = availableAgents.map((agent)=>agent.name).join(", ");
            if (agentName) {
                message = "Agent '".concat(agentName, "' was not found. Available agents are: ").concat(agentList, ". Please verify the agent name in your configuration and ensure it matches one of the available agents.\n\n").concat(seeMore);
            } else {
                message = "The requested agent was not found. Available agents are: ".concat(agentList, ". Please verify the agent name in your configuration and ensure it matches one of the available agents.\n\n").concat(seeMore);
            }
        } else {
            message = "".concat(agentName ? "Agent '".concat(agentName, "'") : "The requested agent", " was not found. Please set up at least one agent before proceeding. ").concat(seeMore);
        }
        super({
            message,
            code
        });
        this.name = ERROR_NAMES.COPILOT_KIT_AGENT_DISCOVERY_ERROR;
    }
};
var CopilotKitLowLevelError = class extends CopilotKitError {
    constructor({ error, url, message }){
        let code = "NETWORK_ERROR" /* NETWORK_ERROR */ ;
        const errorCode = error.code;
        const errorMessage = message !== null && message !== void 0 ? message : resolveLowLevelErrorMessage({
            errorCode,
            url
        });
        super({
            message: errorMessage,
            code
        });
        this.name = ERROR_NAMES.COPILOT_KIT_LOW_LEVEL_ERROR;
    }
};
var ResolvedCopilotKitError = class extends CopilotKitError {
    constructor({ status, message, code, isRemoteEndpoint, url }){
        let resolvedCode = code;
        if (!resolvedCode) {
            switch(status){
                case 400:
                    throw new CopilotKitApiDiscoveryError({
                        message,
                        url
                    });
                case 404:
                    throw isRemoteEndpoint ? new CopilotKitRemoteEndpointDiscoveryError({
                        message,
                        url
                    }) : new CopilotKitApiDiscoveryError({
                        message,
                        url
                    });
                default:
                    resolvedCode = "UNKNOWN" /* UNKNOWN */ ;
                    break;
            }
        }
        super({
            message,
            code: resolvedCode
        });
        this.name = ERROR_NAMES.RESOLVED_COPILOT_KIT_ERROR;
    }
};
var ConfigurationError = class extends CopilotKitError {
    constructor(message){
        super({
            message,
            code: "CONFIGURATION_ERROR" /* CONFIGURATION_ERROR */ 
        });
        this.name = ERROR_NAMES.CONFIGURATION_ERROR;
        this.severity = "warning" /* WARNING */ ;
    }
};
var MissingPublicApiKeyError = class extends ConfigurationError {
    constructor(message){
        super(message);
        this.name = ERROR_NAMES.MISSING_PUBLIC_API_KEY_ERROR;
        this.severity = "critical" /* CRITICAL */ ;
    }
};
var UpgradeRequiredError = class extends ConfigurationError {
    constructor(message){
        super(message);
        this.name = ERROR_NAMES.UPGRADE_REQUIRED_ERROR;
        this.severity = "warning" /* WARNING */ ;
    }
};
function isStructuredCopilotKitError(error) {
    var _a;
    return error instanceof CopilotKitError || error instanceof CopilotKitLowLevelError || (error == null ? void 0 : error.name) && error.name.includes("CopilotKit") || ((_a = error == null ? void 0 : error.extensions) == null ? void 0 : _a.code) !== void 0;
}
function ensureStructuredError(error, converter) {
    return isStructuredCopilotKitError(error) ? error : converter(error);
}
async function getPossibleVersionMismatch(param) {
    let { runtimeVersion, runtimeClientGqlVersion } = param;
    if (!runtimeVersion || runtimeVersion === "" || !runtimeClientGqlVersion) return;
    if (COPILOTKIT_VERSION !== runtimeVersion || COPILOTKIT_VERSION !== runtimeClientGqlVersion || runtimeVersion !== runtimeClientGqlVersion) {
        return {
            runtimeVersion,
            runtimeClientGqlVersion,
            reactCoreVersion: COPILOTKIT_VERSION,
            message: getVersionMismatchErrorMessage({
                runtimeVersion,
                runtimeClientGqlVersion,
                reactCoreVersion: COPILOTKIT_VERSION
            })
        };
    }
    return;
}
var resolveLowLevelErrorMessage = (param)=>{
    let { errorCode, url } = param;
    const troubleshootingLink = ERROR_CONFIG["NETWORK_ERROR" /* NETWORK_ERROR */ ].troubleshootingUrl;
    const genericMessage = function() {
        let description = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "Failed to fetch from url ".concat(url, ".");
        return "".concat(description, ".\n\nPossible reasons:\n- -The server may have an error preventing it from returning a response (Check the server logs for more info).\n- -The server might be down or unreachable\n- -There might be a network issue (e.g., DNS failure, connection timeout) \n- -The URL might be incorrect\n- -The server is not running on the specified port\n\n").concat(getSeeMoreMarkdown(troubleshootingLink));
    };
    if (url.includes("/info")) return genericMessage("Failed to fetch CopilotKit agents/action information from url ".concat(url, "."));
    if (url.includes("/actions/execute")) return genericMessage("Fetch call to ".concat(url, " to execute actions failed."));
    if (url.includes("/agents/state")) return genericMessage("Fetch call to ".concat(url, " to get agent state failed."));
    if (url.includes("/agents/execute")) return genericMessage("Fetch call to ".concat(url, " to execute agent(s) failed."));
    switch(errorCode){
        case "ECONNREFUSED":
            return "Connection to ".concat(url, " was refused. Ensure the server is running and accessible.\n\n").concat(getSeeMoreMarkdown(troubleshootingLink));
        case "ENOTFOUND":
            return "The server on ".concat(url, " could not be found. Check the URL or your network configuration.\n\n").concat(getSeeMoreMarkdown(ERROR_CONFIG["NOT_FOUND" /* NOT_FOUND */ ].troubleshootingUrl));
        case "ETIMEDOUT":
            return "The connection to ".concat(url, " timed out. The server might be overloaded or taking too long to respond.\n\n").concat(getSeeMoreMarkdown(troubleshootingLink));
        default:
            return;
    }
};
;
 //# sourceMappingURL=chunk-QBDBRDYF.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-GYZIHHE6.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/constants/index.ts
__turbopack_context__.s({
    "COPILOT_CLOUD_API_URL": ()=>COPILOT_CLOUD_API_URL,
    "COPILOT_CLOUD_CHAT_URL": ()=>COPILOT_CLOUD_CHAT_URL,
    "COPILOT_CLOUD_PUBLIC_API_KEY_HEADER": ()=>COPILOT_CLOUD_PUBLIC_API_KEY_HEADER,
    "COPILOT_CLOUD_VERSION": ()=>COPILOT_CLOUD_VERSION
});
var COPILOT_CLOUD_API_URL = "https://api.cloud.copilotkit.ai";
var COPILOT_CLOUD_VERSION = "v1";
var COPILOT_CLOUD_CHAT_URL = "".concat(COPILOT_CLOUD_API_URL, "/copilotkit/").concat(COPILOT_CLOUD_VERSION);
var COPILOT_CLOUD_PUBLIC_API_KEY_HEADER = "X-CopilotCloud-Public-Api-Key";
;
 //# sourceMappingURL=chunk-GYZIHHE6.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-VNNKZIFB.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/utils/random-id.ts
__turbopack_context__.s({
    "dataToUUID": ()=>dataToUUID,
    "isValidUUID": ()=>isValidUUID,
    "randomId": ()=>randomId,
    "randomUUID": ()=>randomUUID
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v4.js [client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__validate$3e$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/validate.js [client] (ecmascript) <export default as validate>");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v5$3e$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v5.js [client] (ecmascript) <export default as v5>");
;
function randomId() {
    return "ck-" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
}
function randomUUID() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
}
function dataToUUID(input, namespace) {
    const BASE_NAMESPACE = "e4b01160-ff74-4c6e-9b27-d53cd930fe8e";
    const boundNamespace = namespace ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v5$3e$__["v5"])(namespace, BASE_NAMESPACE) : BASE_NAMESPACE;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v5$3e$__["v5"])(input, boundNamespace);
}
function isValidUUID(uuid) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__validate$3e$__["validate"])(uuid);
}
;
 //# sourceMappingURL=chunk-VNNKZIFB.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-6W2UEO2M.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/utils/console-styling.ts
__turbopack_context__.s({
    "ConsoleColors": ()=>ConsoleColors,
    "ConsoleStyles": ()=>ConsoleStyles,
    "logCopilotKitPlatformMessage": ()=>logCopilotKitPlatformMessage,
    "logStyled": ()=>logStyled,
    "publicApiKeyRequired": ()=>publicApiKeyRequired,
    "styledConsole": ()=>styledConsole
});
var ConsoleColors = {
    /** Primary brand blue - for titles and links */ primary: "#007acc",
    /** Success green - for positive messaging */ success: "#22c55e",
    /** Purple - for feature highlights */ feature: "#a855f7",
    /** Red - for calls-to-action */ cta: "#ef4444",
    /** Cyan - for closing statements */ info: "#06b6d4",
    /** Inherit console default - for body text */ inherit: "inherit",
    /** Warning style */ warning: "#f59e0b"
};
var ConsoleStyles = {
    /** Large header style */ header: "color: ".concat(ConsoleColors.warning, "; font-weight: bold; font-size: 16px;"),
    /** Section header style */ section: "color: ".concat(ConsoleColors.success, "; font-weight: bold;"),
    /** Feature highlight style */ highlight: "color: ".concat(ConsoleColors.feature, "; font-weight: bold;"),
    /** Call-to-action style */ cta: "color: ".concat(ConsoleColors.success, "; font-weight: bold;"),
    /** Info style */ info: "color: ".concat(ConsoleColors.info, "; font-weight: bold;"),
    /** Link style */ link: "color: ".concat(ConsoleColors.primary, "; text-decoration: underline;"),
    /** Body text - inherits console theme */ body: "color: ".concat(ConsoleColors.inherit, ";"),
    /** Warning style */ warning: "color: ".concat(ConsoleColors.cta, "; font-weight: bold;")
};
function logCopilotKitPlatformMessage() {
    console.log("%cCopilotKit Warning%c\n\nuseCopilotChatHeadless_c provides full compatibility with CopilotKit's newly released Headless UI feature set. To enable this premium feature, add your public license key, available for free at:\n\n%chttps://cloud.copilotkit.ai%c\n\nAlternatively, useCopilotChat is available for basic programmatic control, and does not require an API key.\n\nTo learn more about premium features, read the documentation here:\n\n%chttps://docs.copilotkit.ai/premium%c", ConsoleStyles.header, ConsoleStyles.body, ConsoleStyles.cta, ConsoleStyles.body, ConsoleStyles.link, ConsoleStyles.body);
}
function publicApiKeyRequired(feature) {
    console.log("\n%cCopilotKit Warning%c \n\nIn order to use ".concat(feature, ", you need to add your CopilotKit API key, available for free at https://cloud.copilotkit.ai.\n    ").trim(), ConsoleStyles.header, ConsoleStyles.body);
}
function logStyled(template, styles) {
    console.log(template, ...styles);
}
var styledConsole = {
    /** Log a success message */ success: (message)=>logStyled("%c✅ ".concat(message), [
            ConsoleStyles.section
        ]),
    /** Log an info message */ info: (message)=>logStyled("%cℹ️ ".concat(message), [
            ConsoleStyles.info
        ]),
    /** Log a feature highlight */ feature: (message)=>logStyled("%c✨ ".concat(message), [
            ConsoleStyles.highlight
        ]),
    /** Log a call-to-action */ cta: (message)=>logStyled("%c🚀 ".concat(message), [
            ConsoleStyles.cta
        ]),
    /** Log the CopilotKit platform promotion */ logCopilotKitPlatformMessage,
    /** Log a `publicApiKeyRequired` warning */ publicApiKeyRequired
};
;
 //# sourceMappingURL=chunk-6W2UEO2M.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-stringify-position/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Point} Point
 * @typedef {import('unist').Position} Position
 */ /**
 * @typedef NodeLike
 * @property {string} type
 * @property {PositionLike | null | undefined} [position]
 *
 * @typedef PointLike
 * @property {number | null | undefined} [line]
 * @property {number | null | undefined} [column]
 * @property {number | null | undefined} [offset]
 *
 * @typedef PositionLike
 * @property {PointLike | null | undefined} [start]
 * @property {PointLike | null | undefined} [end]
 */ /**
 * Serialize the positional info of a point, position (start and end points),
 * or node.
 *
 * @param {Node | NodeLike | Point | PointLike | Position | PositionLike | null | undefined} [value]
 *   Node, position, or point.
 * @returns {string}
 *   Pretty printed positional info of a node (`string`).
 *
 *   In the format of a range `ls:cs-le:ce` (when given `node` or `position`)
 *   or a point `l:c` (when given `point`), where `l` stands for line, `c` for
 *   column, `s` for `start`, and `e` for end.
 *   An empty string (`''`) is returned if the given value is neither `node`,
 *   `position`, nor `point`.
 */ __turbopack_context__.s({
    "stringifyPosition": ()=>stringifyPosition
});
function stringifyPosition(value) {
    // Nothing.
    if (!value || typeof value !== 'object') {
        return '';
    }
    // Node.
    if ('position' in value || 'type' in value) {
        return position(value.position);
    }
    // Position.
    if ('start' in value || 'end' in value) {
        return position(value);
    }
    // Point.
    if ('line' in value || 'column' in value) {
        return point(value);
    }
    // ?
    return '';
}
/**
 * @param {Point | PointLike | null | undefined} point
 * @returns {string}
 */ function point(point) {
    return index(point && point.line) + ':' + index(point && point.column);
}
/**
 * @param {Position | PositionLike | null | undefined} pos
 * @returns {string}
 */ function position(pos) {
    return point(pos && pos.start) + '-' + point(pos && pos.end);
}
/**
 * @param {number | null | undefined} value
 * @returns {number}
 */ function index(value) {
    return value && typeof value === 'number' ? value : 1;
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile-message/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Node, Point, Position} from 'unist'
 */ /**
 * @typedef {object & {type: string, position?: Position | undefined}} NodeLike
 *
 * @typedef Options
 *   Configuration.
 * @property {Array<Node> | null | undefined} [ancestors]
 *   Stack of (inclusive) ancestor nodes surrounding the message (optional).
 * @property {Error | null | undefined} [cause]
 *   Original error cause of the message (optional).
 * @property {Point | Position | null | undefined} [place]
 *   Place of message (optional).
 * @property {string | null | undefined} [ruleId]
 *   Category of message (optional, example: `'my-rule'`).
 * @property {string | null | undefined} [source]
 *   Namespace of who sent the message (optional, example: `'my-package'`).
 */ __turbopack_context__.s({
    "VFileMessage": ()=>VFileMessage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-stringify-position/lib/index.js [client] (ecmascript)");
;
class VFileMessage extends Error {
    /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */ // eslint-disable-next-line complexity
    constructor(causeOrReason, optionsOrParentOrPlace, origin){
        super();
        if (typeof optionsOrParentOrPlace === 'string') {
            origin = optionsOrParentOrPlace;
            optionsOrParentOrPlace = undefined;
        }
        /** @type {string} */ let reason = '';
        /** @type {Options} */ let options = {};
        let legacyCause = false;
        if (optionsOrParentOrPlace) {
            // Point.
            if ('line' in optionsOrParentOrPlace && 'column' in optionsOrParentOrPlace) {
                options = {
                    place: optionsOrParentOrPlace
                };
            } else if ('start' in optionsOrParentOrPlace && 'end' in optionsOrParentOrPlace) {
                options = {
                    place: optionsOrParentOrPlace
                };
            } else if ('type' in optionsOrParentOrPlace) {
                options = {
                    ancestors: [
                        optionsOrParentOrPlace
                    ],
                    place: optionsOrParentOrPlace.position
                };
            } else {
                options = {
                    ...optionsOrParentOrPlace
                };
            }
        }
        if (typeof causeOrReason === 'string') {
            reason = causeOrReason;
        } else if (!options.cause && causeOrReason) {
            legacyCause = true;
            reason = causeOrReason.message;
            options.cause = causeOrReason;
        }
        if (!options.ruleId && !options.source && typeof origin === 'string') {
            const index = origin.indexOf(':');
            if (index === -1) {
                options.ruleId = origin;
            } else {
                options.source = origin.slice(0, index);
                options.ruleId = origin.slice(index + 1);
            }
        }
        if (!options.place && options.ancestors && options.ancestors) {
            const parent = options.ancestors[options.ancestors.length - 1];
            if (parent) {
                options.place = parent.position;
            }
        }
        const start = options.place && 'start' in options.place ? options.place.start : options.place;
        /**
     * Stack of ancestor nodes surrounding the message.
     *
     * @type {Array<Node> | undefined}
     */ this.ancestors = options.ancestors || undefined;
        /**
     * Original error cause of the message.
     *
     * @type {Error | undefined}
     */ this.cause = options.cause || undefined;
        /**
     * Starting column of message.
     *
     * @type {number | undefined}
     */ this.column = start ? start.column : undefined;
        /**
     * State of problem.
     *
     * * `true` — error, file not usable
     * * `false` — warning, change may be needed
     * * `undefined` — change likely not needed
     *
     * @type {boolean | null | undefined}
     */ this.fatal = undefined;
        /**
     * Path of a file (used throughout the `VFile` ecosystem).
     *
     * @type {string | undefined}
     */ this.file = '';
        // Field from `Error`.
        /**
     * Reason for message.
     *
     * @type {string}
     */ this.message = reason;
        /**
     * Starting line of error.
     *
     * @type {number | undefined}
     */ this.line = start ? start.line : undefined;
        // Field from `Error`.
        /**
     * Serialized positional info of message.
     *
     * On normal errors, this would be something like `ParseError`, buit in
     * `VFile` messages we use this space to show where an error happened.
     */ this.name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringifyPosition"])(options.place) || '1:1';
        /**
     * Place of message.
     *
     * @type {Point | Position | undefined}
     */ this.place = options.place || undefined;
        /**
     * Reason for message, should use markdown.
     *
     * @type {string}
     */ this.reason = this.message;
        /**
     * Category of message (example: `'my-rule'`).
     *
     * @type {string | undefined}
     */ this.ruleId = options.ruleId || undefined;
        /**
     * Namespace of message (example: `'my-package'`).
     *
     * @type {string | undefined}
     */ this.source = options.source || undefined;
        // Field from `Error`.
        /**
     * Stack of message.
     *
     * This is used by normal errors to show where something happened in
     * programming code, irrelevant for `VFile` messages,
     *
     * @type {string}
     */ this.stack = legacyCause && options.cause && typeof options.cause.stack === 'string' ? options.cause.stack : '';
        // The following fields are “well known”.
        // Not standard.
        // Feel free to add other non-standard fields to your messages.
        /**
     * Specify the source value that’s being reported, which is deemed
     * incorrect.
     *
     * @type {string | undefined}
     */ this.actual = undefined;
        /**
     * Suggest acceptable values that can be used instead of `actual`.
     *
     * @type {Array<string> | undefined}
     */ this.expected = undefined;
        /**
     * Long form description of the message (you should use markdown).
     *
     * @type {string | undefined}
     */ this.note = undefined;
        /**
     * Link to docs for the message.
     *
     * > 👉 **Note**: this must be an absolute URL that can be passed as `x`
     * > to `new URL(x)`.
     *
     * @type {string | undefined}
     */ this.url = undefined;
    }
}
VFileMessage.prototype.file = '';
VFileMessage.prototype.name = '';
VFileMessage.prototype.reason = '';
VFileMessage.prototype.message = '';
VFileMessage.prototype.stack = '';
VFileMessage.prototype.column = undefined;
VFileMessage.prototype.line = undefined;
VFileMessage.prototype.ancestors = undefined;
VFileMessage.prototype.cause = undefined;
VFileMessage.prototype.fatal = undefined;
VFileMessage.prototype.place = undefined;
VFileMessage.prototype.ruleId = undefined;
VFileMessage.prototype.source = undefined;
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minpath.browser.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// A derivative work based on:
// <https://github.com/browserify/path-browserify>.
// Which is licensed:
//
// MIT License
//
// Copyright (c) 2013 James Halliday
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// A derivative work based on:
//
// Parts of that are extracted from Node’s internal `path` module:
// <https://github.com/nodejs/node/blob/master/lib/path.js>.
// Which is licensed:
//
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
__turbopack_context__.s({
    "minpath": ()=>minpath
});
const minpath = {
    basename,
    dirname,
    extname,
    join,
    sep: '/'
};
/* eslint-disable max-depth, complexity */ /**
 * Get the basename from a path.
 *
 * @param {string} path
 *   File path.
 * @param {string | null | undefined} [extname]
 *   Extension to strip.
 * @returns {string}
 *   Stem or basename.
 */ function basename(path, extname) {
    if (extname !== undefined && typeof extname !== 'string') {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let index = path.length;
    /** @type {boolean | undefined} */ let seenNonSlash;
    if (extname === undefined || extname.length === 0 || extname.length > path.length) {
        while(index--){
            if (path.codePointAt(index) === 47 /* `/` */ ) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now.
                if (seenNonSlash) {
                    start = index + 1;
                    break;
                }
            } else if (end < 0) {
                // We saw the first non-path separator, mark this as the end of our
                // path component.
                seenNonSlash = true;
                end = index + 1;
            }
        }
        return end < 0 ? '' : path.slice(start, end);
    }
    if (extname === path) {
        return '';
    }
    let firstNonSlashEnd = -1;
    let extnameIndex = extname.length - 1;
    while(index--){
        if (path.codePointAt(index) === 47 /* `/` */ ) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now.
            if (seenNonSlash) {
                start = index + 1;
                break;
            }
        } else {
            if (firstNonSlashEnd < 0) {
                // We saw the first non-path separator, remember this index in case
                // we need it if the extension ends up not matching.
                seenNonSlash = true;
                firstNonSlashEnd = index + 1;
            }
            if (extnameIndex > -1) {
                // Try to match the explicit extension.
                if (path.codePointAt(index) === extname.codePointAt(extnameIndex--)) {
                    if (extnameIndex < 0) {
                        // We matched the extension, so mark this as the end of our path
                        // component
                        end = index;
                    }
                } else {
                    // Extension does not match, so our result is the entire path
                    // component
                    extnameIndex = -1;
                    end = firstNonSlashEnd;
                }
            }
        }
    }
    if (start === end) {
        end = firstNonSlashEnd;
    } else if (end < 0) {
        end = path.length;
    }
    return path.slice(start, end);
}
/**
 * Get the dirname from a path.
 *
 * @param {string} path
 *   File path.
 * @returns {string}
 *   File path.
 */ function dirname(path) {
    assertPath(path);
    if (path.length === 0) {
        return '.';
    }
    let end = -1;
    let index = path.length;
    /** @type {boolean | undefined} */ let unmatchedSlash;
    // Prefix `--` is important to not run on `0`.
    while(--index){
        if (path.codePointAt(index) === 47 /* `/` */ ) {
            if (unmatchedSlash) {
                end = index;
                break;
            }
        } else if (!unmatchedSlash) {
            // We saw the first non-path separator
            unmatchedSlash = true;
        }
    }
    return end < 0 ? path.codePointAt(0) === 47 /* `/` */  ? '/' : '.' : end === 1 && path.codePointAt(0) === 47 /* `/` */  ? '//' : path.slice(0, end);
}
/**
 * Get an extname from a path.
 *
 * @param {string} path
 *   File path.
 * @returns {string}
 *   Extname.
 */ function extname(path) {
    assertPath(path);
    let index = path.length;
    let end = -1;
    let startPart = 0;
    let startDot = -1;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find.
    let preDotState = 0;
    /** @type {boolean | undefined} */ let unmatchedSlash;
    while(index--){
        const code = path.codePointAt(index);
        if (code === 47 /* `/` */ ) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now.
            if (unmatchedSlash) {
                startPart = index + 1;
                break;
            }
            continue;
        }
        if (end < 0) {
            // We saw the first non-path separator, mark this as the end of our
            // extension.
            unmatchedSlash = true;
            end = index + 1;
        }
        if (code === 46 /* `.` */ ) {
            // If this is our first dot, mark it as the start of our extension.
            if (startDot < 0) {
                startDot = index;
            } else if (preDotState !== 1) {
                preDotState = 1;
            }
        } else if (startDot > -1) {
            // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension.
            preDotState = -1;
        }
    }
    if (startDot < 0 || end < 0 || // We saw a non-dot character immediately before the dot.
    preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return '';
    }
    return path.slice(startDot, end);
}
/**
 * Join segments from a path.
 *
 * @param {Array<string>} segments
 *   Path segments.
 * @returns {string}
 *   File path.
 */ function join() {
    for(var _len = arguments.length, segments = new Array(_len), _key = 0; _key < _len; _key++){
        segments[_key] = arguments[_key];
    }
    let index = -1;
    /** @type {string | undefined} */ let joined;
    while(++index < segments.length){
        assertPath(segments[index]);
        if (segments[index]) {
            joined = joined === undefined ? segments[index] : joined + '/' + segments[index];
        }
    }
    return joined === undefined ? '.' : normalize(joined);
}
/**
 * Normalize a basic file path.
 *
 * @param {string} path
 *   File path.
 * @returns {string}
 *   File path.
 */ // Note: `normalize` is not exposed as `path.normalize`, so some code is
// manually removed from it.
function normalize(path) {
    assertPath(path);
    const absolute = path.codePointAt(0) === 47 /* `/` */ ;
    // Normalize the path according to POSIX rules.
    let value = normalizeString(path, !absolute);
    if (value.length === 0 && !absolute) {
        value = '.';
    }
    if (value.length > 0 && path.codePointAt(path.length - 1) === 47 /* / */ ) {
        value += '/';
    }
    return absolute ? '/' + value : value;
}
/**
 * Resolve `.` and `..` elements in a path with directory names.
 *
 * @param {string} path
 *   File path.
 * @param {boolean} allowAboveRoot
 *   Whether `..` can move above root.
 * @returns {string}
 *   File path.
 */ function normalizeString(path, allowAboveRoot) {
    let result = '';
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let index = -1;
    /** @type {number | undefined} */ let code;
    /** @type {number} */ let lastSlashIndex;
    while(++index <= path.length){
        if (index < path.length) {
            code = path.codePointAt(index);
        } else if (code === 47 /* `/` */ ) {
            break;
        } else {
            code = 47; /* `/` */ 
        }
        if (code === 47 /* `/` */ ) {
            if (lastSlash === index - 1 || dots === 1) {
            // Empty.
            } else if (lastSlash !== index - 1 && dots === 2) {
                if (result.length < 2 || lastSegmentLength !== 2 || result.codePointAt(result.length - 1) !== 46 /* `.` */  || result.codePointAt(result.length - 2) !== 46 /* `.` */ ) {
                    if (result.length > 2) {
                        lastSlashIndex = result.lastIndexOf('/');
                        if (lastSlashIndex !== result.length - 1) {
                            if (lastSlashIndex < 0) {
                                result = '';
                                lastSegmentLength = 0;
                            } else {
                                result = result.slice(0, lastSlashIndex);
                                lastSegmentLength = result.length - 1 - result.lastIndexOf('/');
                            }
                            lastSlash = index;
                            dots = 0;
                            continue;
                        }
                    } else if (result.length > 0) {
                        result = '';
                        lastSegmentLength = 0;
                        lastSlash = index;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    result = result.length > 0 ? result + '/..' : '..';
                    lastSegmentLength = 2;
                }
            } else {
                if (result.length > 0) {
                    result += '/' + path.slice(lastSlash + 1, index);
                } else {
                    result = path.slice(lastSlash + 1, index);
                }
                lastSegmentLength = index - lastSlash - 1;
            }
            lastSlash = index;
            dots = 0;
        } else if (code === 46 /* `.` */  && dots > -1) {
            dots++;
        } else {
            dots = -1;
        }
    }
    return result;
}
/**
 * Make sure `path` is a string.
 *
 * @param {string} path
 *   File path.
 * @returns {asserts path is string}
 *   Nothing.
 */ function assertPath(path) {
    if (typeof path !== 'string') {
        throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
    }
} /* eslint-enable max-depth, complexity */ 
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minproc.browser.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Somewhat based on:
// <https://github.com/defunctzombie/node-process/blob/master/browser.js>.
// But I don’t think one tiny line of code can be copyrighted. 😅
__turbopack_context__.s({
    "minproc": ()=>minproc
});
const minproc = {
    cwd
};
function cwd() {
    return '/';
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minurl.shared.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Checks if a value has the shape of a WHATWG URL object.
 *
 * Using a symbol or instanceof would not be able to recognize URL objects
 * coming from other implementations (e.g. in Electron), so instead we are
 * checking some well known properties for a lack of a better test.
 *
 * We use `href` and `protocol` as they are the only properties that are
 * easy to retrieve and calculate due to the lazy nature of the getters.
 *
 * We check for auth attribute to distinguish legacy url instance with
 * WHATWG URL instance.
 *
 * @param {unknown} fileUrlOrPath
 *   File path or URL.
 * @returns {fileUrlOrPath is URL}
 *   Whether it’s a URL.
 */ // From: <https://github.com/nodejs/node/blob/6a3403c/lib/internal/url.js#L720>
__turbopack_context__.s({
    "isUrl": ()=>isUrl
});
function isUrl(fileUrlOrPath) {
    return Boolean(fileUrlOrPath !== null && typeof fileUrlOrPath === 'object' && 'href' in fileUrlOrPath && fileUrlOrPath.href && 'protocol' in fileUrlOrPath && fileUrlOrPath.protocol && // @ts-expect-error: indexing is fine.
    fileUrlOrPath.auth === undefined);
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minurl.browser.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "urlToPath": ()=>urlToPath
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minurl$2e$shared$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minurl.shared.js [client] (ecmascript)");
;
;
function urlToPath(path) {
    if (typeof path === 'string') {
        path = new URL(path);
    } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minurl$2e$shared$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isUrl"])(path)) {
        /** @type {NodeJS.ErrnoException} */ const error = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + path + '`');
        error.code = 'ERR_INVALID_ARG_TYPE';
        throw error;
    }
    if (path.protocol !== 'file:') {
        /** @type {NodeJS.ErrnoException} */ const error = new TypeError('The URL must be of scheme file');
        error.code = 'ERR_INVALID_URL_SCHEME';
        throw error;
    }
    return getPathFromURLPosix(path);
}
/**
 * Get a path from a POSIX URL.
 *
 * @param {URL} url
 *   URL.
 * @returns {string}
 *   File path.
 */ function getPathFromURLPosix(url) {
    if (url.hostname !== '') {
        /** @type {NodeJS.ErrnoException} */ const error = new TypeError('File URL host must be "localhost" or empty on darwin');
        error.code = 'ERR_INVALID_FILE_URL_HOST';
        throw error;
    }
    const pathname = url.pathname;
    let index = -1;
    while(++index < pathname.length){
        if (pathname.codePointAt(index) === 37 /* `%` */  && pathname.codePointAt(index + 1) === 50 /* `2` */ ) {
            const third = pathname.codePointAt(index + 2);
            if (third === 70 /* `F` */  || third === 102 /* `f` */ ) {
                /** @type {NodeJS.ErrnoException} */ const error = new TypeError('File URL path must not include encoded / characters');
                error.code = 'ERR_INVALID_FILE_URL_PATH';
                throw error;
            }
        }
    }
    return decodeURIComponent(pathname);
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Node, Point, Position} from 'unist'
 * @import {Options as MessageOptions} from 'vfile-message'
 * @import {Compatible, Data, Map, Options, Value} from 'vfile'
 */ /**
 * @typedef {object & {type: string, position?: Position | undefined}} NodeLike
 */ __turbopack_context__.s({
    "VFile": ()=>VFile
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2d$message$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile-message/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minpath.browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minproc$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minproc.browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minurl$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minurl.browser.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minurl$2e$shared$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/minurl.shared.js [client] (ecmascript)");
;
;
;
;
/**
 * Order of setting (least specific to most), we need this because otherwise
 * `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
 * stem can be set.
 */ const order = [
    'history',
    'path',
    'basename',
    'stem',
    'extname',
    'dirname'
];
class VFile {
    /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */ get basename() {
        return typeof this.path === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].basename(this.path) : undefined;
    }
    /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */ set basename(basename) {
        assertNonEmpty(basename, 'basename');
        assertPart(basename, 'basename');
        this.path = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].join(this.dirname || '', basename);
    }
    /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */ get dirname() {
        return typeof this.path === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].dirname(this.path) : undefined;
    }
    /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */ set dirname(dirname) {
        assertPath(this.basename, 'dirname');
        this.path = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].join(dirname || '', this.basename);
    }
    /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */ get extname() {
        return typeof this.path === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].extname(this.path) : undefined;
    }
    /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */ set extname(extname) {
        assertPart(extname, 'extname');
        assertPath(this.dirname, 'extname');
        if (extname) {
            if (extname.codePointAt(0) !== 46 /* `.` */ ) {
                throw new Error('`extname` must start with `.`');
            }
            if (extname.includes('.', 1)) {
                throw new Error('`extname` cannot contain multiple dots');
            }
        }
        this.path = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].join(this.dirname, this.stem + (extname || ''));
    }
    /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */ get path() {
        return this.history[this.history.length - 1];
    }
    /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */ set path(path) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minurl$2e$shared$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isUrl"])(path)) {
            path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minurl$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["urlToPath"])(path);
        }
        assertNonEmpty(path, 'path');
        if (this.path !== path) {
            this.history.push(path);
        }
    }
    /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */ get stem() {
        return typeof this.path === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].basename(this.path, this.extname) : undefined;
    }
    /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */ set stem(stem) {
        assertNonEmpty(stem, 'stem');
        assertPart(stem, 'stem');
        this.path = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].join(this.dirname || '', stem + (this.extname || ''));
    }
    // Normal prototypal methods.
    /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */ fail(causeOrReason, optionsOrParentOrPlace, origin) {
        // @ts-expect-error: the overloads are fine.
        const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
        message.fatal = true;
        throw message;
    }
    /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */ info(causeOrReason, optionsOrParentOrPlace, origin) {
        // @ts-expect-error: the overloads are fine.
        const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
        message.fatal = undefined;
        return message;
    }
    /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */ message(causeOrReason, optionsOrParentOrPlace, origin) {
        const message = new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2d$message$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["VFileMessage"](// @ts-expect-error: the overloads are fine.
        causeOrReason, optionsOrParentOrPlace, origin);
        if (this.path) {
            message.name = this.path + ':' + message.name;
            message.file = this.path;
        }
        message.fatal = false;
        this.messages.push(message);
        return message;
    }
    /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */ toString(encoding) {
        if (this.value === undefined) {
            return '';
        }
        if (typeof this.value === 'string') {
            return this.value;
        }
        const decoder = new TextDecoder(encoding || undefined);
        return decoder.decode(this.value);
    }
    /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */ constructor(value){
        /** @type {Options | VFile} */ let options;
        if (!value) {
            options = {};
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minurl$2e$shared$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isUrl"])(value)) {
            options = {
                path: value
            };
        } else if (typeof value === 'string' || isUint8Array(value)) {
            options = {
                value
            };
        } else {
            options = value;
        }
        /* eslint-disable no-unused-expressions */ /**
     * Base of `path` (default: `process.cwd()` or `'/'` in browsers).
     *
     * @type {string}
     */ // Prevent calling `cwd` (which could be expensive) if it’s not needed;
        // the empty string will be overridden in the next block.
        this.cwd = 'cwd' in options ? '' : __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minproc$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minproc"].cwd();
        /**
     * Place to store custom info (default: `{}`).
     *
     * It’s OK to store custom data directly on the file but moving it to
     * `data` is recommended.
     *
     * @type {Data}
     */ this.data = {};
        /**
     * List of file paths the file moved between.
     *
     * The first is the original path and the last is the current path.
     *
     * @type {Array<string>}
     */ this.history = [];
        /**
     * List of messages associated with the file.
     *
     * @type {Array<VFileMessage>}
     */ this.messages = [];
        /**
     * Raw value.
     *
     * @type {Value}
     */ this.value;
        // The below are non-standard, they are “well-known”.
        // As in, used in several tools.
        /**
     * Source map.
     *
     * This type is equivalent to the `RawSourceMap` type from the `source-map`
     * module.
     *
     * @type {Map | null | undefined}
     */ this.map;
        /**
     * Custom, non-string, compiled, representation.
     *
     * This is used by unified to store non-string results.
     * One example is when turning markdown into React nodes.
     *
     * @type {unknown}
     */ this.result;
        /**
     * Whether a file was saved to disk.
     *
     * This is used by vfile reporters.
     *
     * @type {boolean}
     */ this.stored;
        /* eslint-enable no-unused-expressions */ // Set path related properties in the correct order.
        let index = -1;
        while(++index < order.length){
            const field = order[index];
            // Note: we specifically use `in` instead of `hasOwnProperty` to accept
            // `vfile`s too.
            if (field in options && options[field] !== undefined && options[field] !== null) {
                // @ts-expect-error: TS doesn’t understand basic reality.
                this[field] = field === 'history' ? [
                    ...options[field]
                ] : options[field];
            }
        }
        /** @type {string} */ let field;
        // Set non-path related properties.
        for(field in options){
            // @ts-expect-error: fine to set other things.
            if (!order.includes(field)) {
                // @ts-expect-error: fine to set other things.
                this[field] = options[field];
            }
        }
    }
}
/**
 * Assert that `part` is not a path (as in, does not contain `path.sep`).
 *
 * @param {string | null | undefined} part
 *   File path part.
 * @param {string} name
 *   Part name.
 * @returns {undefined}
 *   Nothing.
 */ function assertPart(part, name) {
    if (part && part.includes(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].sep)) {
        throw new Error('`' + name + '` cannot be a path: did not expect `' + __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$minpath$2e$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["minpath"].sep + '`');
    }
}
/**
 * Assert that `part` is not empty.
 *
 * @param {string | undefined} part
 *   Thing.
 * @param {string} name
 *   Part name.
 * @returns {asserts part is string}
 *   Nothing.
 */ function assertNonEmpty(part, name) {
    if (!part) {
        throw new Error('`' + name + '` cannot be empty');
    }
}
/**
 * Assert `path` exists.
 *
 * @param {string | undefined} path
 *   Path.
 * @param {string} name
 *   Dependency name.
 * @returns {asserts path is string}
 *   Nothing.
 */ function assertPath(path, name) {
    if (!path) {
        throw new Error('Setting `' + name + '` requires `path` to be set too');
    }
}
/**
 * Assert `value` is an `Uint8Array`.
 *
 * @param {unknown} value
 *   thing.
 * @returns {value is Uint8Array}
 *   Whether `value` is an `Uint8Array`.
 */ function isUint8Array(value) {
    return Boolean(value && typeof value === 'object' && 'byteLength' in value && 'byteOffset' in value);
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unified/lib/callable-instance.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CallableInstance": ()=>CallableInstance
});
const CallableInstance = /**
       * @this {Function}
       * @param {string | symbol} property
       * @returns {(...parameters: Array<unknown>) => unknown}
       */ function(property) {
    const self = this;
    const constr = self.constructor;
    const proto = // Prototypes do exist.
    // type-coverage:ignore-next-line
    constr.prototype;
    const value = proto[property];
    /** @type {(...parameters: Array<unknown>) => unknown} */ const apply = function() {
        return value.apply(apply, arguments);
    };
    Object.setPrototypeOf(apply, proto);
    // Not needed for us in `unified`: we only call this on the `copy`
    // function,
    // and we don't need to add its fields (`length`, `name`)
    // over.
    // See also: GH-246.
    // const names = Object.getOwnPropertyNames(value)
    //
    // for (const p of names) {
    //   const descriptor = Object.getOwnPropertyDescriptor(value, p)
    //   if (descriptor) Object.defineProperty(apply, p, descriptor)
    // }
    return apply;
};
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unified/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('trough').Pipeline} Pipeline
 *
 * @typedef {import('unist').Node} Node
 *
 * @typedef {import('vfile').Compatible} Compatible
 * @typedef {import('vfile').Value} Value
 *
 * @typedef {import('../index.js').CompileResultMap} CompileResultMap
 * @typedef {import('../index.js').Data} Data
 * @typedef {import('../index.js').Settings} Settings
 */ /**
 * @typedef {CompileResultMap[keyof CompileResultMap]} CompileResults
 *   Acceptable results from compilers.
 *
 *   To register custom results, add them to
 *   {@linkcode CompileResultMap}.
 */ /**
 * @template {Node} [Tree=Node]
 *   The node that the compiler receives (default: `Node`).
 * @template {CompileResults} [Result=CompileResults]
 *   The thing that the compiler yields (default: `CompileResults`).
 * @callback Compiler
 *   A **compiler** handles the compiling of a syntax tree to something else
 *   (in most cases, text) (TypeScript type).
 *
 *   It is used in the stringify phase and called with a {@linkcode Node}
 *   and {@linkcode VFile} representation of the document to compile.
 *   It should return the textual representation of the given tree (typically
 *   `string`).
 *
 *   > **Note**: unified typically compiles by serializing: most compilers
 *   > return `string` (or `Uint8Array`).
 *   > Some compilers, such as the one configured with
 *   > [`rehype-react`][rehype-react], return other values (in this case, a
 *   > React tree).
 *   > If you’re using a compiler that doesn’t serialize, expect different
 *   > result values.
 *   >
 *   > To register custom results in TypeScript, add them to
 *   > {@linkcode CompileResultMap}.
 *
 *   [rehype-react]: https://github.com/rehypejs/rehype-react
 * @param {Tree} tree
 *   Tree to compile.
 * @param {VFile} file
 *   File associated with `tree`.
 * @returns {Result}
 *   New content: compiled text (`string` or `Uint8Array`, for `file.value`) or
 *   something else (for `file.result`).
 */ /**
 * @template {Node} [Tree=Node]
 *   The node that the parser yields (default: `Node`)
 * @callback Parser
 *   A **parser** handles the parsing of text to a syntax tree.
 *
 *   It is used in the parse phase and is called with a `string` and
 *   {@linkcode VFile} of the document to parse.
 *   It must return the syntax tree representation of the given file
 *   ({@linkcode Node}).
 * @param {string} document
 *   Document to parse.
 * @param {VFile} file
 *   File associated with `document`.
 * @returns {Tree}
 *   Node representing the given file.
 */ /**
 * @typedef {(
 *   Plugin<Array<any>, any, any> |
 *   PluginTuple<Array<any>, any, any> |
 *   Preset
 * )} Pluggable
 *   Union of the different ways to add plugins and settings.
 */ /**
 * @typedef {Array<Pluggable>} PluggableList
 *   List of plugins and presets.
 */ // Note: we can’t use `callback` yet as it messes up `this`:
//  <https://github.com/microsoft/TypeScript/issues/55197>.
/**
 * @template {Array<unknown>} [PluginParameters=[]]
 *   Arguments passed to the plugin (default: `[]`, the empty tuple).
 * @template {Node | string | undefined} [Input=Node]
 *   Value that is expected as input (default: `Node`).
 *
 *   *   If the plugin returns a {@linkcode Transformer}, this
 *       should be the node it expects.
 *   *   If the plugin sets a {@linkcode Parser}, this should be
 *       `string`.
 *   *   If the plugin sets a {@linkcode Compiler}, this should be the
 *       node it expects.
 * @template [Output=Input]
 *   Value that is yielded as output (default: `Input`).
 *
 *   *   If the plugin returns a {@linkcode Transformer}, this
 *       should be the node that that yields.
 *   *   If the plugin sets a {@linkcode Parser}, this should be the
 *       node that it yields.
 *   *   If the plugin sets a {@linkcode Compiler}, this should be
 *       result it yields.
 * @typedef {(
 *   (this: Processor, ...parameters: PluginParameters) =>
 *     Input extends string ? // Parser.
 *        Output extends Node | undefined ? undefined | void : never :
 *     Output extends CompileResults ? // Compiler.
 *        Input extends Node | undefined ? undefined | void : never :
 *     Transformer<
 *       Input extends Node ? Input : Node,
 *       Output extends Node ? Output : Node
 *     > | undefined | void
 * )} Plugin
 *   Single plugin.
 *
 *   Plugins configure the processors they are applied on in the following
 *   ways:
 *
 *   *   they change the processor, such as the parser, the compiler, or by
 *       configuring data
 *   *   they specify how to handle trees and files
 *
 *   In practice, they are functions that can receive options and configure the
 *   processor (`this`).
 *
 *   > **Note**: plugins are called when the processor is *frozen*, not when
 *   > they are applied.
 */ /**
 * Tuple of a plugin and its configuration.
 *
 * The first item is a plugin, the rest are its parameters.
 *
 * @template {Array<unknown>} [TupleParameters=[]]
 *   Arguments passed to the plugin (default: `[]`, the empty tuple).
 * @template {Node | string | undefined} [Input=undefined]
 *   Value that is expected as input (optional).
 *
 *   *   If the plugin returns a {@linkcode Transformer}, this
 *       should be the node it expects.
 *   *   If the plugin sets a {@linkcode Parser}, this should be
 *       `string`.
 *   *   If the plugin sets a {@linkcode Compiler}, this should be the
 *       node it expects.
 * @template [Output=undefined] (optional).
 *   Value that is yielded as output.
 *
 *   *   If the plugin returns a {@linkcode Transformer}, this
 *       should be the node that that yields.
 *   *   If the plugin sets a {@linkcode Parser}, this should be the
 *       node that it yields.
 *   *   If the plugin sets a {@linkcode Compiler}, this should be
 *       result it yields.
 * @typedef {(
 *   [
 *     plugin: Plugin<TupleParameters, Input, Output>,
 *     ...parameters: TupleParameters
 *   ]
 * )} PluginTuple
 */ /**
 * @typedef Preset
 *   Sharable configuration.
 *
 *   They can contain plugins and settings.
 * @property {PluggableList | undefined} [plugins]
 *   List of plugins and presets (optional).
 * @property {Settings | undefined} [settings]
 *   Shared settings for parsers and compilers (optional).
 */ /**
 * @template {VFile} [File=VFile]
 *   The file that the callback receives (default: `VFile`).
 * @callback ProcessCallback
 *   Callback called when the process is done.
 *
 *   Called with either an error or a result.
 * @param {Error | undefined} [error]
 *   Fatal error (optional).
 * @param {File | undefined} [file]
 *   Processed file (optional).
 * @returns {undefined}
 *   Nothing.
 */ /**
 * @template {Node} [Tree=Node]
 *   The tree that the callback receives (default: `Node`).
 * @callback RunCallback
 *   Callback called when transformers are done.
 *
 *   Called with either an error or results.
 * @param {Error | undefined} [error]
 *   Fatal error (optional).
 * @param {Tree | undefined} [tree]
 *   Transformed tree (optional).
 * @param {VFile | undefined} [file]
 *   File (optional).
 * @returns {undefined}
 *   Nothing.
 */ /**
 * @template {Node} [Output=Node]
 *   Node type that the transformer yields (default: `Node`).
 * @callback TransformCallback
 *   Callback passed to transforms.
 *
 *   If the signature of a `transformer` accepts a third argument, the
 *   transformer may perform asynchronous operations, and must call it.
 * @param {Error | undefined} [error]
 *   Fatal error to stop the process (optional).
 * @param {Output | undefined} [tree]
 *   New, changed, tree (optional).
 * @param {VFile | undefined} [file]
 *   New, changed, file (optional).
 * @returns {undefined}
 *   Nothing.
 */ /**
 * @template {Node} [Input=Node]
 *   Node type that the transformer expects (default: `Node`).
 * @template {Node} [Output=Input]
 *   Node type that the transformer yields (default: `Input`).
 * @callback Transformer
 *   Transformers handle syntax trees and files.
 *
 *   They are functions that are called each time a syntax tree and file are
 *   passed through the run phase.
 *   When an error occurs in them (either because it’s thrown, returned,
 *   rejected, or passed to `next`), the process stops.
 *
 *   The run phase is handled by [`trough`][trough], see its documentation for
 *   the exact semantics of these functions.
 *
 *   > **Note**: you should likely ignore `next`: don’t accept it.
 *   > it supports callback-style async work.
 *   > But promises are likely easier to reason about.
 *
 *   [trough]: https://github.com/wooorm/trough#function-fninput-next
 * @param {Input} tree
 *   Tree to handle.
 * @param {VFile} file
 *   File to handle.
 * @param {TransformCallback<Output>} next
 *   Callback.
 * @returns {(
 *   Promise<Output | undefined | void> |
 *   Promise<never> | // For some reason this is needed separately.
 *   Output |
 *   Error |
 *   undefined |
 *   void
 * )}
 *   If you accept `next`, nothing.
 *   Otherwise:
 *
 *   *   `Error` — fatal error to stop the process
 *   *   `Promise<undefined>` or `undefined` — the next transformer keeps using
 *       same tree
 *   *   `Promise<Node>` or `Node` — new, changed, tree
 */ /**
 * @template {Node | undefined} ParseTree
 *   Output of `parse`.
 * @template {Node | undefined} HeadTree
 *   Input for `run`.
 * @template {Node | undefined} TailTree
 *   Output for `run`.
 * @template {Node | undefined} CompileTree
 *   Input of `stringify`.
 * @template {CompileResults | undefined} CompileResult
 *   Output of `stringify`.
 * @template {Node | string | undefined} Input
 *   Input of plugin.
 * @template Output
 *   Output of plugin (optional).
 * @typedef {(
 *   Input extends string
 *     ? Output extends Node | undefined
 *       ? // Parser.
 *         Processor<
 *           Output extends undefined ? ParseTree : Output,
 *           HeadTree,
 *           TailTree,
 *           CompileTree,
 *           CompileResult
 *         >
 *       : // Unknown.
 *         Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>
 *     : Output extends CompileResults
 *     ? Input extends Node | undefined
 *       ? // Compiler.
 *         Processor<
 *           ParseTree,
 *           HeadTree,
 *           TailTree,
 *           Input extends undefined ? CompileTree : Input,
 *           Output extends undefined ? CompileResult : Output
 *         >
 *       : // Unknown.
 *         Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>
 *     : Input extends Node | undefined
 *     ? Output extends Node | undefined
 *       ? // Transform.
 *         Processor<
 *           ParseTree,
 *           HeadTree extends undefined ? Input : HeadTree,
 *           Output extends undefined ? TailTree : Output,
 *           CompileTree,
 *           CompileResult
 *         >
 *       : // Unknown.
 *         Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>
 *     : // Unknown.
 *       Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>
 * )} UsePlugin
 *   Create a processor based on the input/output of a {@link Plugin plugin}.
 */ /**
 * @template {CompileResults | undefined} Result
 *   Node type that the transformer yields.
 * @typedef {(
 *   Result extends Value | undefined ?
 *     VFile :
 *     VFile & {result: Result}
 *   )} VFileWithOutput
 *   Type to generate a {@linkcode VFile} corresponding to a compiler result.
 *
 *   If a result that is not acceptable on a `VFile` is used, that will
 *   be stored on the `result` field of {@linkcode VFile}.
 */ __turbopack_context__.s({
    "Processor": ()=>Processor,
    "unified": ()=>unified
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$bail$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/bail/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$extend$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/extend/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/devlop/lib/development.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$is$2d$plain$2d$obj$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/is-plain-obj/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$trough$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/trough/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unified$2f$lib$2f$callable$2d$instance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unified/lib/callable-instance.js [client] (ecmascript)");
;
;
;
;
;
;
;
// To do: next major: drop `Compiler`, `Parser`: prefer lowercase.
// To do: we could start yielding `never` in TS when a parser is missing and
// `parse` is called.
// Currently, we allow directly setting `processor.parser`, which is untyped.
const own = {}.hasOwnProperty;
class Processor extends __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unified$2f$lib$2f$callable$2d$instance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CallableInstance"] {
    /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */ copy() {
        // Cast as the type parameters will be the same after attaching.
        const destination = new Processor();
        let index = -1;
        while(++index < this.attachers.length){
            const attacher = this.attachers[index];
            destination.use(...attacher);
        }
        destination.data((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$extend$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(true, {}, this.namespace));
        return destination;
    }
    /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */ data(key, value) {
        if (typeof key === 'string') {
            // Set `key`.
            if (arguments.length === 2) {
                assertUnfrozen('data', this.frozen);
                this.namespace[key] = value;
                return this;
            }
            // Get `key`.
            return own.call(this.namespace, key) && this.namespace[key] || undefined;
        }
        // Set space.
        if (key) {
            assertUnfrozen('data', this.frozen);
            this.namespace = key;
            return this;
        }
        // Get space.
        return this.namespace;
    }
    /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */ freeze() {
        if (this.frozen) {
            return this;
        }
        // Cast so that we can type plugins easier.
        // Plugins are supposed to be usable on different processors, not just on
        // this exact processor.
        const self = this;
        while(++this.freezeIndex < this.attachers.length){
            const [attacher, ...options] = this.attachers[this.freezeIndex];
            if (options[0] === false) {
                continue;
            }
            if (options[0] === true) {
                options[0] = undefined;
            }
            const transformer = attacher.call(self, ...options);
            if (typeof transformer === 'function') {
                this.transformers.use(transformer);
            }
        }
        this.frozen = true;
        this.freezeIndex = Number.POSITIVE_INFINITY;
        return this;
    }
    /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */ parse(file) {
        this.freeze();
        const realFile = vfile(file);
        const parser = this.parser || this.Parser;
        assertParser('parse', parser);
        return parser(String(realFile), realFile);
    }
    /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */ process(file, done) {
        const self = this;
        this.freeze();
        assertParser('process', this.parser || this.Parser);
        assertCompiler('process', this.compiler || this.Compiler);
        return done ? executor(undefined, done) : new Promise(executor);
        //TURBOPACK unreachable
        ;
        // Note: `void`s needed for TS.
        /**
     * @param {((file: VFileWithOutput<CompileResult>) => undefined | void) | undefined} resolve
     * @param {(error: Error | undefined) => undefined | void} reject
     * @returns {undefined}
     */ function executor(resolve, reject) {
            const realFile = vfile(file);
            // Assume `ParseTree` (the result of the parser) matches `HeadTree` (the
            // input of the first transform).
            const parseTree = self.parse(realFile);
            self.run(parseTree, realFile, function(error, tree, file) {
                if (error || !tree || !file) {
                    return realDone(error);
                }
                // Assume `TailTree` (the output of the last transform) matches
                // `CompileTree` (the input of the compiler).
                const compileTree = tree;
                const compileResult = self.stringify(compileTree, file);
                if (looksLikeAValue(compileResult)) {
                    file.value = compileResult;
                } else {
                    file.result = compileResult;
                }
                realDone(error, file);
            });
            /**
       * @param {Error | undefined} error
       * @param {VFileWithOutput<CompileResult> | undefined} [file]
       * @returns {undefined}
       */ function realDone(error, file) {
                if (error || !file) {
                    reject(error);
                } else if (resolve) {
                    resolve(file);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(done, '`done` is defined if `resolve` is not');
                    done(undefined, file);
                }
            }
        }
    }
    /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */ processSync(file) {
        /** @type {boolean} */ let complete = false;
        /** @type {VFileWithOutput<CompileResult> | undefined} */ let result;
        this.freeze();
        assertParser('processSync', this.parser || this.Parser);
        assertCompiler('processSync', this.compiler || this.Compiler);
        this.process(file, realDone);
        assertDone('processSync', 'process', complete);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(result, 'we either bailed on an error or have a tree');
        return result;
        //TURBOPACK unreachable
        ;
        /**
     * @type {ProcessCallback<VFileWithOutput<CompileResult>>}
     */ function realDone(error, file) {
            complete = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$bail$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["bail"])(error);
            result = file;
        }
    }
    /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */ run(tree, file, done) {
        assertNode(tree);
        this.freeze();
        const transformers = this.transformers;
        if (!done && typeof file === 'function') {
            done = file;
            file = undefined;
        }
        return done ? executor(undefined, done) : new Promise(executor);
        //TURBOPACK unreachable
        ;
        // Note: `void`s needed for TS.
        /**
     * @param {(
     *   ((tree: TailTree extends undefined ? Node : TailTree) => undefined | void) |
     *   undefined
     * )} resolve
     * @param {(error: Error) => undefined | void} reject
     * @returns {undefined}
     */ function executor(resolve, reject) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(typeof file !== 'function', '`file` can’t be a `done` anymore, we checked');
            const realFile = vfile(file);
            transformers.run(tree, realFile, realDone);
            /**
       * @param {Error | undefined} error
       * @param {Node} outputTree
       * @param {VFile} file
       * @returns {undefined}
       */ function realDone(error, outputTree, file) {
                const resultingTree = outputTree || tree;
                if (error) {
                    reject(error);
                } else if (resolve) {
                    resolve(resultingTree);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(done, '`done` is defined if `resolve` is not');
                    done(undefined, resultingTree, file);
                }
            }
        }
    }
    /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */ runSync(tree, file) {
        /** @type {boolean} */ let complete = false;
        /** @type {(TailTree extends undefined ? Node : TailTree) | undefined} */ let result;
        this.run(tree, file, realDone);
        assertDone('runSync', 'run', complete);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(result, 'we either bailed on an error or have a tree');
        return result;
        //TURBOPACK unreachable
        ;
        /**
     * @type {RunCallback<TailTree extends undefined ? Node : TailTree>}
     */ function realDone(error, tree) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$bail$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["bail"])(error);
            result = tree;
            complete = true;
        }
    }
    /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */ stringify(tree, file) {
        this.freeze();
        const realFile = vfile(file);
        const compiler = this.compiler || this.Compiler;
        assertCompiler('stringify', compiler);
        assertNode(tree);
        return compiler(tree, realFile);
    }
    /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */ use(value) {
        for(var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            parameters[_key - 1] = arguments[_key];
        }
        const attachers = this.attachers;
        const namespace = this.namespace;
        assertUnfrozen('use', this.frozen);
        if (value === null || value === undefined) {
        // Empty.
        } else if (typeof value === 'function') {
            addPlugin(value, parameters);
        } else if (typeof value === 'object') {
            if (Array.isArray(value)) {
                addList(value);
            } else {
                addPreset(value);
            }
        } else {
            throw new TypeError('Expected usable value, not `' + value + '`');
        }
        return this;
        //TURBOPACK unreachable
        ;
        /**
     * @param {Pluggable} value
     * @returns {undefined}
     */ function add(value) {
            if (typeof value === 'function') {
                addPlugin(value, []);
            } else if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    const [plugin, ...parameters] = value;
                    addPlugin(plugin, parameters);
                } else {
                    addPreset(value);
                }
            } else {
                throw new TypeError('Expected usable value, not `' + value + '`');
            }
        }
        /**
     * @param {Preset} result
     * @returns {undefined}
     */ function addPreset(result) {
            if (!('plugins' in result) && !('settings' in result)) {
                throw new Error('Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither');
            }
            addList(result.plugins);
            if (result.settings) {
                namespace.settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$extend$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(true, namespace.settings, result.settings);
            }
        }
        /**
     * @param {PluggableList | null | undefined} plugins
     * @returns {undefined}
     */ function addList(plugins) {
            let index = -1;
            if (plugins === null || plugins === undefined) {
            // Empty.
            } else if (Array.isArray(plugins)) {
                while(++index < plugins.length){
                    const thing = plugins[index];
                    add(thing);
                }
            } else {
                throw new TypeError('Expected a list of plugins, not `' + plugins + '`');
            }
        }
        /**
     * @param {Plugin} plugin
     * @param {Array<unknown>} parameters
     * @returns {undefined}
     */ function addPlugin(plugin, parameters) {
            let index = -1;
            let entryIndex = -1;
            while(++index < attachers.length){
                if (attachers[index][0] === plugin) {
                    entryIndex = index;
                    break;
                }
            }
            if (entryIndex === -1) {
                attachers.push([
                    plugin,
                    ...parameters
                ]);
            } else if (parameters.length > 0) {
                let [primary, ...rest] = parameters;
                const currentPrimary = attachers[entryIndex][1];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$is$2d$plain$2d$obj$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(currentPrimary) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$is$2d$plain$2d$obj$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(primary)) {
                    primary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$extend$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(true, currentPrimary, primary);
                }
                attachers[entryIndex] = [
                    plugin,
                    primary,
                    ...rest
                ];
            }
        }
    }
    /**
   * Create a processor.
   */ constructor(){
        // If `Processor()` is called (w/o new), `copy` is called instead.
        super('copy');
        /**
     * Compiler to use (deprecated).
     *
     * @deprecated
     *   Use `compiler` instead.
     * @type {(
     *   Compiler<
     *     CompileTree extends undefined ? Node : CompileTree,
     *     CompileResult extends undefined ? CompileResults : CompileResult
     *   > |
     *   undefined
     * )}
     */ this.Compiler = undefined;
        /**
     * Parser to use (deprecated).
     *
     * @deprecated
     *   Use `parser` instead.
     * @type {(
     *   Parser<ParseTree extends undefined ? Node : ParseTree> |
     *   undefined
     * )}
     */ this.Parser = undefined;
        // Note: the following fields are considered private.
        // However, they are needed for tests, and TSC generates an untyped
        // `private freezeIndex` field for, which trips `type-coverage` up.
        // Instead, we use `@deprecated` to visualize that they shouldn’t be used.
        /**
     * Internal list of configured plugins.
     *
     * @deprecated
     *   This is a private internal property and should not be used.
     * @type {Array<PluginTuple<Array<unknown>>>}
     */ this.attachers = [];
        /**
     * Compiler to use.
     *
     * @type {(
     *   Compiler<
     *     CompileTree extends undefined ? Node : CompileTree,
     *     CompileResult extends undefined ? CompileResults : CompileResult
     *   > |
     *   undefined
     * )}
     */ this.compiler = undefined;
        /**
     * Internal state to track where we are while freezing.
     *
     * @deprecated
     *   This is a private internal property and should not be used.
     * @type {number}
     */ this.freezeIndex = -1;
        /**
     * Internal state to track whether we’re frozen.
     *
     * @deprecated
     *   This is a private internal property and should not be used.
     * @type {boolean | undefined}
     */ this.frozen = undefined;
        /**
     * Internal state.
     *
     * @deprecated
     *   This is a private internal property and should not be used.
     * @type {Data}
     */ this.namespace = {};
        /**
     * Parser to use.
     *
     * @type {(
     *   Parser<ParseTree extends undefined ? Node : ParseTree> |
     *   undefined
     * )}
     */ this.parser = undefined;
        /**
     * Internal list of configured transformers.
     *
     * @deprecated
     *   This is a private internal property and should not be used.
     * @type {Pipeline}
     */ this.transformers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$trough$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["trough"])();
    }
}
const unified = new Processor().freeze();
/**
 * Assert a parser is available.
 *
 * @param {string} name
 * @param {unknown} value
 * @returns {asserts value is Parser}
 */ function assertParser(name, value) {
    if (typeof value !== 'function') {
        throw new TypeError('Cannot `' + name + '` without `parser`');
    }
}
/**
 * Assert a compiler is available.
 *
 * @param {string} name
 * @param {unknown} value
 * @returns {asserts value is Compiler}
 */ function assertCompiler(name, value) {
    if (typeof value !== 'function') {
        throw new TypeError('Cannot `' + name + '` without `compiler`');
    }
}
/**
 * Assert the processor is not frozen.
 *
 * @param {string} name
 * @param {unknown} frozen
 * @returns {asserts frozen is false}
 */ function assertUnfrozen(name, frozen) {
    if (frozen) {
        throw new Error('Cannot call `' + name + '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.');
    }
}
/**
 * Assert `node` is a unist node.
 *
 * @param {unknown} node
 * @returns {asserts node is Node}
 */ function assertNode(node) {
    // `isPlainObj` unfortunately uses `any` instead of `unknown`.
    // type-coverage:ignore-next-line
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$is$2d$plain$2d$obj$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(node) || typeof node.type !== 'string') {
        throw new TypeError('Expected node, got `' + node + '`');
    // Fine.
    }
}
/**
 * Assert that `complete` is `true`.
 *
 * @param {string} name
 * @param {string} asyncName
 * @param {unknown} complete
 * @returns {asserts complete is true}
 */ function assertDone(name, asyncName, complete) {
    if (!complete) {
        throw new Error('`' + name + '` finished async. Use `' + asyncName + '` instead');
    }
}
/**
 * @param {Compatible | undefined} [value]
 * @returns {VFile}
 */ function vfile(value) {
    return looksLikeAVFile(value) ? value : new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["VFile"](value);
}
/**
 * @param {Compatible | undefined} [value]
 * @returns {value is VFile}
 */ function looksLikeAVFile(value) {
    return Boolean(value && typeof value === 'object' && 'message' in value && 'messages' in value);
}
/**
 * @param {unknown} [value]
 * @returns {value is Value}
 */ function looksLikeAValue(value) {
    return typeof value === 'string' || isUint8Array(value);
}
/**
 * Assert `value` is an `Uint8Array`.
 *
 * @param {unknown} value
 *   thing.
 * @returns {value is Uint8Array}
 *   Whether `value` is an `Uint8Array`.
 */ function isUint8Array(value) {
    return Boolean(value && typeof value === 'object' && 'byteLength' in value && 'byteOffset' in value);
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/mdast-util-to-string/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('mdast').Nodes} Nodes
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean | null | undefined} [includeImageAlt=true]
 *   Whether to use `alt` for `image`s (default: `true`).
 * @property {boolean | null | undefined} [includeHtml=true]
 *   Whether to use `value` of HTML (default: `true`).
 */ /** @type {Options} */ __turbopack_context__.s({
    "toString": ()=>toString
});
const emptyOptions = {};
function toString(value, options) {
    const settings = options || emptyOptions;
    const includeImageAlt = typeof settings.includeImageAlt === 'boolean' ? settings.includeImageAlt : true;
    const includeHtml = typeof settings.includeHtml === 'boolean' ? settings.includeHtml : true;
    return one(value, includeImageAlt, includeHtml);
}
/**
 * One node or several nodes.
 *
 * @param {unknown} value
 *   Thing to serialize.
 * @param {boolean} includeImageAlt
 *   Include image `alt`s.
 * @param {boolean} includeHtml
 *   Include HTML.
 * @returns {string}
 *   Serialized node.
 */ function one(value, includeImageAlt, includeHtml) {
    if (node(value)) {
        if ('value' in value) {
            return value.type === 'html' && !includeHtml ? '' : value.value;
        }
        if (includeImageAlt && 'alt' in value && value.alt) {
            return value.alt;
        }
        if ('children' in value) {
            return all(value.children, includeImageAlt, includeHtml);
        }
    }
    if (Array.isArray(value)) {
        return all(value, includeImageAlt, includeHtml);
    }
    return '';
}
/**
 * Serialize a list of nodes.
 *
 * @param {Array<unknown>} values
 *   Thing to serialize.
 * @param {boolean} includeImageAlt
 *   Include image `alt`s.
 * @param {boolean} includeHtml
 *   Include HTML.
 * @returns {string}
 *   Serialized nodes.
 */ function all(values, includeImageAlt, includeHtml) {
    /** @type {Array<string>} */ const result = [];
    let index = -1;
    while(++index < values.length){
        result[index] = one(values[index], includeImageAlt, includeHtml);
    }
    return result.join('');
}
/**
 * Check if `value` looks like a node.
 *
 * @param {unknown} value
 *   Thing.
 * @returns {value is Nodes}
 *   Whether `value` is a node.
 */ function node(value) {
    return Boolean(value && typeof value === 'object');
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-chunked/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "push": ()=>push,
    "splice": ()=>splice
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/constants.js [client] (ecmascript)");
;
function splice(list, start, remove, items) {
    const end = list.length;
    let chunkStart = 0;
    /** @type {Array<unknown>} */ let parameters;
    // Make start between zero and `end` (included).
    if (start < 0) {
        start = -start > end ? 0 : end + start;
    } else {
        start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;
    // No need to chunk the items if there’s only a couple (10k) items.
    if (items.length < __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize) {
        parameters = Array.from(items);
        parameters.unshift(start, remove);
        // @ts-expect-error Hush, it’s fine.
        list.splice(...parameters);
    } else {
        // Delete `remove` items starting from `start`
        if (remove) list.splice(start, remove);
        // Insert the items in chunks to not cause stack overflows.
        while(chunkStart < items.length){
            parameters = items.slice(chunkStart, chunkStart + __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize);
            parameters.unshift(start, 0);
            // @ts-expect-error Hush, it’s fine.
            list.splice(...parameters);
            chunkStart += __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize;
            start += __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize;
        }
    }
}
function push(list, items) {
    if (list.length > 0) {
        splice(list, list.length, 0, items);
        return list;
    }
    return items;
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-combine-extensions/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Extension,
 *   Handles,
 *   HtmlExtension,
 *   NormalizedExtension
 * } from 'micromark-util-types'
 */ __turbopack_context__.s({
    "combineExtensions": ()=>combineExtensions,
    "combineHtmlExtensions": ()=>combineHtmlExtensions
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-chunked/dev/index.js [client] (ecmascript)");
;
const hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
    /** @type {NormalizedExtension} */ const all = {};
    let index = -1;
    while(++index < extensions.length){
        syntaxExtension(all, extensions[index]);
    }
    return all;
}
/**
 * Merge `extension` into `all`.
 *
 * @param {NormalizedExtension} all
 *   Extension to merge into.
 * @param {Extension} extension
 *   Extension to merge.
 * @returns {undefined}
 *   Nothing.
 */ function syntaxExtension(all, extension) {
    /** @type {keyof Extension} */ let hook;
    for(hook in extension){
        const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined;
        /** @type {Record<string, unknown>} */ const left = maybe || (all[hook] = {});
        /** @type {Record<string, unknown> | undefined} */ const right = extension[hook];
        /** @type {string} */ let code;
        if (right) {
            for(code in right){
                if (!hasOwnProperty.call(left, code)) left[code] = [];
                const value = right[code];
                constructs(// @ts-expect-error Looks like a list.
                left[code], Array.isArray(value) ? value : value ? [
                    value
                ] : []);
            }
        }
    }
}
/**
 * Merge `list` into `existing` (both lists of constructs).
 * Mutates `existing`.
 *
 * @param {Array<unknown>} existing
 *   List of constructs to merge into.
 * @param {Array<unknown>} list
 *   List of constructs to merge.
 * @returns {undefined}
 *   Nothing.
 */ function constructs(existing, list) {
    let index = -1;
    /** @type {Array<unknown>} */ const before = [];
    while(++index < list.length){
        // @ts-expect-error Looks like an object.
        ;
        (list[index].add === 'after' ? existing : before).push(list[index]);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["splice"])(existing, 0, 0, before);
}
function combineHtmlExtensions(htmlExtensions) {
    /** @type {HtmlExtension} */ const handlers = {};
    let index = -1;
    while(++index < htmlExtensions.length){
        htmlExtension(handlers, htmlExtensions[index]);
    }
    return handlers;
}
/**
 * Merge `extension` into `all`.
 *
 * @param {HtmlExtension} all
 *   Extension to merge into.
 * @param {HtmlExtension} extension
 *   Extension to merge.
 * @returns {undefined}
 *   Nothing.
 */ function htmlExtension(all, extension) {
    /** @type {keyof HtmlExtension} */ let hook;
    for(hook in extension){
        const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined;
        const left = maybe || (all[hook] = {});
        const right = extension[hook];
        /** @type {keyof Handles} */ let type;
        if (right) {
            for(type in right){
                // @ts-expect-error assume document vs regular handler are managed correctly.
                left[type] = right[type];
            }
        }
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-character/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Code} from 'micromark-util-types'
 */ __turbopack_context__.s({
    "asciiAlpha": ()=>asciiAlpha,
    "asciiAlphanumeric": ()=>asciiAlphanumeric,
    "asciiAtext": ()=>asciiAtext,
    "asciiControl": ()=>asciiControl,
    "asciiDigit": ()=>asciiDigit,
    "asciiHexDigit": ()=>asciiHexDigit,
    "asciiPunctuation": ()=>asciiPunctuation,
    "markdownLineEnding": ()=>markdownLineEnding,
    "markdownLineEndingOrSpace": ()=>markdownLineEndingOrSpace,
    "markdownSpace": ()=>markdownSpace,
    "unicodePunctuation": ()=>unicodePunctuation,
    "unicodeWhitespace": ()=>unicodeWhitespace
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
;
const asciiAlpha = regexCheck(/[A-Za-z]/);
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code) {
    return(// Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code !== null && (code < __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].space || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].del));
}
const asciiDigit = regexCheck(/\d/);
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code) {
    return code !== null && code < __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].horizontalTab;
}
function markdownLineEndingOrSpace(code) {
    return code !== null && (code < __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].nul || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].space);
}
function markdownSpace(code) {
    return code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].horizontalTab || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].virtualSpace || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].space;
}
const unicodePunctuation = regexCheck(RegExp("\\p{P}|\\p{S}", "u"));
const unicodeWhitespace = regexCheck(/\s/);
/**
 * Create a code check from a regex.
 *
 * @param {RegExp} regex
 *   Expression.
 * @returns {(code: Code) => boolean}
 *   Check.
 */ function regexCheck(regex) {
    return check;
    //TURBOPACK unreachable
    ;
    /**
   * Check whether a code matches the bound regex.
   *
   * @param {Code} code
   *   Character code.
   * @returns {boolean}
   *   Whether the character code matches the bound regex.
   */ function check(code) {
        return code !== null && code > -1 && regex.test(String.fromCharCode(code));
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-factory-space/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Effects, State, TokenType} from 'micromark-util-types'
 */ __turbopack_context__.s({
    "factorySpace": ()=>factorySpace
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-character/dev/index.js [client] (ecmascript)");
;
function factorySpace(effects, ok, type, max) {
    const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
    let size = 0;
    return start;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function start(code) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            effects.enter(type);
            return prefix(code);
        }
        return ok(code);
    }
    /** @type {State} */ function prefix(code) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownSpace"])(code) && size++ < limit) {
            effects.consume(code);
            return prefix;
        }
        effects.exit(type);
        return ok(code);
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-subtokenize/dev/lib/splice-buffer.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SpliceBuffer": ()=>SpliceBuffer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/constants.js [client] (ecmascript)");
;
class SpliceBuffer {
    /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */ get(index) {
        if (index < 0 || index >= this.left.length + this.right.length) {
            throw new RangeError('Cannot access index `' + index + '` in a splice buffer of size `' + (this.left.length + this.right.length) + '`');
        }
        if (index < this.left.length) return this.left[index];
        return this.right[this.right.length - index + this.left.length - 1];
    }
    /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */ get length() {
        return this.left.length + this.right.length;
    }
    /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */ shift() {
        this.setCursor(0);
        return this.right.pop();
    }
    /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */ slice(start, end) {
        /** @type {number} */ const stop = end === null || end === undefined ? Number.POSITIVE_INFINITY : end;
        if (stop < this.left.length) {
            return this.left.slice(start, stop);
        }
        if (start > this.left.length) {
            return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
        }
        return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
    }
    /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */ splice(start, deleteCount, items) {
        /** @type {number} */ const count = deleteCount || 0;
        this.setCursor(Math.trunc(start));
        const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
        if (items) chunkedPush(this.left, items);
        return removed.reverse();
    }
    /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */ pop() {
        this.setCursor(Number.POSITIVE_INFINITY);
        return this.left.pop();
    }
    /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */ push(item) {
        this.setCursor(Number.POSITIVE_INFINITY);
        this.left.push(item);
    }
    /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */ pushMany(items) {
        this.setCursor(Number.POSITIVE_INFINITY);
        chunkedPush(this.left, items);
    }
    /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */ unshift(item) {
        this.setCursor(0);
        this.right.push(item);
    }
    /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */ unshiftMany(items) {
        this.setCursor(0);
        chunkedPush(this.right, items.reverse());
    }
    /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */ setCursor(n) {
        if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
        if (n < this.left.length) {
            // Move cursor to the this.left
            const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
            chunkedPush(this.right, removed.reverse());
        } else {
            // Move cursor to the this.right
            const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
            chunkedPush(this.left, removed.reverse());
        }
    }
    /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */ constructor(initial){
        /** @type {Array<T>} */ this.left = initial ? [
            ...initial
        ] : [];
        /** @type {Array<T>} */ this.right = [];
    }
}
/**
 * Avoid stack overflow by pushing items onto the stack in segments
 *
 * @template T
 *   Item type.
 * @param {Array<T>} list
 *   List to inject into.
 * @param {ReadonlyArray<T>} right
 *   Items to inject.
 * @return {undefined}
 *   Nothing.
 */ function chunkedPush(list, right) {
    /** @type {number} */ let chunkStart = 0;
    if (right.length < __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize) {
        list.push(...right);
    } else {
        while(chunkStart < right.length){
            list.push(...right.slice(chunkStart, chunkStart + __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize));
            chunkStart += __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize;
        }
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-subtokenize/dev/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Chunk, Event, Token} from 'micromark-util-types'
 */ __turbopack_context__.s({
    "subtokenize": ()=>subtokenize
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/devlop/lib/development.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-chunked/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$subtokenize$2f$dev$2f$lib$2f$splice$2d$buffer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-subtokenize/dev/lib/splice-buffer.js [client] (ecmascript)");
;
;
;
;
;
function subtokenize(eventsArray) {
    /** @type {Record<string, number>} */ const jumps = {};
    let index = -1;
    /** @type {Event} */ let event;
    /** @type {number | undefined} */ let lineIndex;
    /** @type {number} */ let otherIndex;
    /** @type {Event} */ let otherEvent;
    /** @type {Array<Event>} */ let parameters;
    /** @type {Array<Event>} */ let subevents;
    /** @type {boolean | undefined} */ let more;
    const events = new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$subtokenize$2f$dev$2f$lib$2f$splice$2d$buffer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SpliceBuffer"](eventsArray);
    while(++index < events.length){
        while(index in jumps){
            index = jumps[index];
        }
        event = events.get(index);
        // Add a hook for the GFM tasklist extension, which needs to know if text
        // is in the first content of a list item.
        if (index && event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkFlow && events.get(index - 1)[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemPrefix) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(event[1]._tokenizer, 'expected `_tokenizer` on subtokens');
            subevents = event[1]._tokenizer.events;
            otherIndex = 0;
            if (otherIndex < subevents.length && subevents[otherIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank) {
                otherIndex += 2;
            }
            if (otherIndex < subevents.length && subevents[otherIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].content) {
                while(++otherIndex < subevents.length){
                    if (subevents[otherIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].content) {
                        break;
                    }
                    if (subevents[otherIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkText) {
                        subevents[otherIndex][1]._isInFirstContentOfListItem = true;
                        otherIndex++;
                    }
                }
            }
        }
        // Enter.
        if (event[0] === 'enter') {
            if (event[1].contentType) {
                Object.assign(jumps, subcontent(events, index));
                index = jumps[index];
                more = true;
            }
        } else if (event[1]._container) {
            otherIndex = index;
            lineIndex = undefined;
            while(otherIndex--){
                otherEvent = events.get(otherIndex);
                if (otherEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding || otherEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank) {
                    if (otherEvent[0] === 'enter') {
                        if (lineIndex) {
                            events.get(lineIndex)[1].type = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank;
                        }
                        otherEvent[1].type = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding;
                        lineIndex = otherIndex;
                    }
                } else if (otherEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].linePrefix || otherEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemIndent) {
                // Move past.
                } else {
                    break;
                }
            }
            if (lineIndex) {
                // Fix position.
                event[1].end = {
                    ...events.get(lineIndex)[1].start
                };
                // Switch container exit w/ line endings.
                parameters = events.slice(lineIndex, index);
                parameters.unshift(event);
                events.splice(lineIndex, index - lineIndex + 1, parameters);
            }
        }
    }
    // The changes to the `events` buffer must be copied back into the eventsArray
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["splice"])(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
    return !more;
}
/**
 * Tokenize embedded tokens.
 *
 * @param {SpliceBuffer<Event>} events
 *   Events.
 * @param {number} eventIndex
 *   Index.
 * @returns {Record<string, number>}
 *   Gaps.
 */ function subcontent(events, eventIndex) {
    const token = events.get(eventIndex)[1];
    const context = events.get(eventIndex)[2];
    let startPosition = eventIndex - 1;
    /** @type {Array<number>} */ const startPositions = [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(token.contentType, 'expected `contentType` on subtokens');
    let tokenizer = token._tokenizer;
    if (!tokenizer) {
        tokenizer = context.parser[token.contentType](token.start);
        if (token._contentTypeTextTrailing) {
            tokenizer._contentTypeTextTrailing = true;
        }
    }
    const childEvents = tokenizer.events;
    /** @type {Array<[number, number]>} */ const jumps = [];
    /** @type {Record<string, number>} */ const gaps = {};
    /** @type {Array<Chunk>} */ let stream;
    /** @type {Token | undefined} */ let previous;
    let index = -1;
    /** @type {Token | undefined} */ let current = token;
    let adjust = 0;
    let start = 0;
    const breaks = [
        start
    ];
    // Loop forward through the linked tokens to pass them in order to the
    // subtokenizer.
    while(current){
        // Find the position of the event for this token.
        while(events.get(++startPosition)[1] !== current){
        // Empty.
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(!previous || current.previous === previous, 'expected previous to match');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(!previous || previous.next === current, 'expected next to match');
        startPositions.push(startPosition);
        if (!current._tokenizer) {
            stream = context.sliceStream(current);
            if (!current.next) {
                stream.push(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof);
            }
            if (previous) {
                tokenizer.defineSkip(current.start);
            }
            if (current._isInFirstContentOfListItem) {
                tokenizer._gfmTasklistFirstContentOfListItem = true;
            }
            tokenizer.write(stream);
            if (current._isInFirstContentOfListItem) {
                tokenizer._gfmTasklistFirstContentOfListItem = undefined;
            }
        }
        // Unravel the next token.
        previous = current;
        current = current.next;
    }
    // Now, loop back through all events (and linked tokens), to figure out which
    // parts belong where.
    current = token;
    while(++index < childEvents.length){
        if (// Find a void token that includes a break.
        childEvents[index][0] === 'exit' && childEvents[index - 1][0] === 'enter' && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(current, 'expected a current token');
            start = index + 1;
            breaks.push(start);
            // Help GC.
            current._tokenizer = undefined;
            current.previous = undefined;
            current = current.next;
        }
    }
    // Help GC.
    tokenizer.events = [];
    // If there’s one more token (which is the cases for lines that end in an
    // EOF), that’s perfect: the last point we found starts it.
    // If there isn’t then make sure any remaining content is added to it.
    if (current) {
        // Help GC.
        current._tokenizer = undefined;
        current.previous = undefined;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(!current.next, 'expected no next token');
    } else {
        breaks.pop();
    }
    // Now splice the events from the subtokenizer into the current events,
    // moving back to front so that splice indices aren’t affected.
    index = breaks.length;
    while(index--){
        const slice = childEvents.slice(breaks[index], breaks[index + 1]);
        const start = startPositions.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(start !== undefined, 'expected a start position when splicing');
        jumps.push([
            start,
            start + slice.length - 1
        ]);
        events.splice(start, 2, slice);
    }
    jumps.reverse();
    index = -1;
    while(++index < jumps.length){
        gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
        adjust += jumps[index][1] - jumps[index][0] - 1;
    }
    return gaps;
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-resolve-all/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Event, Resolver, TokenizeContext} from 'micromark-util-types'
 */ /**
 * Call all `resolveAll`s.
 *
 * @param {ReadonlyArray<{resolveAll?: Resolver | undefined}>} constructs
 *   List of constructs, optionally with `resolveAll`s.
 * @param {Array<Event>} events
 *   List of events.
 * @param {TokenizeContext} context
 *   Context used by `tokenize`.
 * @returns {Array<Event>}
 *   Changed events.
 */ __turbopack_context__.s({
    "resolveAll": ()=>resolveAll
});
function resolveAll(constructs, events, context) {
    /** @type {Array<Resolver>} */ const called = [];
    let index = -1;
    while(++index < constructs.length){
        const resolve = constructs[index].resolveAll;
        if (resolve && !called.includes(resolve)) {
            events = resolve(events, context);
            called.push(resolve);
        }
    }
    return events;
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-classify-character/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Code} from 'micromark-util-types'
 */ __turbopack_context__.s({
    "classifyCharacter": ()=>classifyCharacter
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-character/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/constants.js [client] (ecmascript)");
;
;
function classifyCharacter(code) {
    if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unicodeWhitespace"])(code)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].characterGroupWhitespace;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unicodePunctuation"])(code)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].characterGroupPunctuation;
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-factory-destination/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Effects, State, TokenType} from 'micromark-util-types'
 */ __turbopack_context__.s({
    "factoryDestination": ()=>factoryDestination
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-character/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/constants.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/types.js [client] (ecmascript)");
;
;
function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
    const limit = max || Number.POSITIVE_INFINITY;
    let balance = 0;
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Start of destination.
   *
   * ```markdown
   * > | <aa>
   *     ^
   * > | aa
   *     ^
   * ```
   *
   * @type {State}
   */ function start(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].lessThan) {
            effects.enter(type);
            effects.enter(literalType);
            effects.enter(literalMarkerType);
            effects.consume(code);
            effects.exit(literalMarkerType);
            return enclosedBefore;
        }
        // ASCII control, space, closing paren.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].space || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightParenthesis || (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["asciiControl"])(code)) {
            return nok(code);
        }
        effects.enter(type);
        effects.enter(rawType);
        effects.enter(stringType);
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkString, {
            contentType: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].contentTypeString
        });
        return raw(code);
    }
    /**
   * After `<`, at an enclosed destination.
   *
   * ```markdown
   * > | <aa>
   *      ^
   * ```
   *
   * @type {State}
   */ function enclosedBefore(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].greaterThan) {
            effects.enter(literalMarkerType);
            effects.consume(code);
            effects.exit(literalMarkerType);
            effects.exit(literalType);
            effects.exit(type);
            return ok;
        }
        effects.enter(stringType);
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkString, {
            contentType: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].contentTypeString
        });
        return enclosed(code);
    }
    /**
   * In enclosed destination.
   *
   * ```markdown
   * > | <aa>
   *      ^
   * ```
   *
   * @type {State}
   */ function enclosed(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].greaterThan) {
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkString);
            effects.exit(stringType);
            return enclosedBefore(code);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].lessThan || (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            return nok(code);
        }
        effects.consume(code);
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].backslash ? enclosedEscape : enclosed;
    }
    /**
   * After `\`, at a special character.
   *
   * ```markdown
   * > | <a\*a>
   *        ^
   * ```
   *
   * @type {State}
   */ function enclosedEscape(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].lessThan || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].greaterThan || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].backslash) {
            effects.consume(code);
            return enclosed;
        }
        return enclosed(code);
    }
    /**
   * In raw destination.
   *
   * ```markdown
   * > | aa
   *     ^
   * ```
   *
   * @type {State}
   */ function raw(code) {
        if (!balance && (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightParenthesis || (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownLineEndingOrSpace"])(code))) {
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkString);
            effects.exit(stringType);
            effects.exit(rawType);
            effects.exit(type);
            return ok(code);
        }
        if (balance < limit && code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftParenthesis) {
            effects.consume(code);
            balance++;
            return raw;
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightParenthesis) {
            effects.consume(code);
            balance--;
            return raw;
        }
        // ASCII control (but *not* `\0`) and space and `(`.
        // Note: in `markdown-rs`, `\0` exists in codes, in `micromark-js` it
        // doesn’t.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].space || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftParenthesis || (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["asciiControl"])(code)) {
            return nok(code);
        }
        effects.consume(code);
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].backslash ? rawEscape : raw;
    }
    /**
   * After `\`, at special character.
   *
   * ```markdown
   * > | a\*a
   *       ^
   * ```
   *
   * @type {State}
   */ function rawEscape(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftParenthesis || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightParenthesis || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].backslash) {
            effects.consume(code);
            return raw;
        }
        return raw(code);
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-factory-label/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Effects,
 *   State,
 *   TokenizeContext,
 *   TokenType
 * } from 'micromark-util-types'
 */ __turbopack_context__.s({
    "factoryLabel": ()=>factoryLabel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/devlop/lib/development.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-character/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/constants.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/types.js [client] (ecmascript)");
;
;
;
function factoryLabel(effects, ok, nok, type, markerType, stringType) {
    const self = this;
    let size = 0;
    /** @type {boolean} */ let seen;
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Start of label.
   *
   * ```markdown
   * > | [a]
   *     ^
   * ```
   *
   * @type {State}
   */ function start(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket, 'expected `[`');
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.enter(stringType);
        return atBreak;
    }
    /**
   * In label, at something, before something else.
   *
   * ```markdown
   * > | [a]
   *      ^
   * ```
   *
   * @type {State}
   */ function atBreak(code) {
        if (size > __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].linkReferenceSizeMax || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket && !seen || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].caret && !size && '_hiddenFootnoteSupport' in self.parser.constructs) {
            return nok(code);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket) {
            effects.exit(stringType);
            effects.enter(markerType);
            effects.consume(code);
            effects.exit(markerType);
            effects.exit(type);
            return ok;
        }
        // To do: indent? Link chunks and EOLs together?
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
            effects.consume(code);
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
            return atBreak;
        }
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkString, {
            contentType: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].contentTypeString
        });
        return labelInside(code);
    }
    /**
   * In label, in text.
   *
   * ```markdown
   * > | [a]
   *      ^
   * ```
   *
   * @type {State}
   */ function labelInside(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket || (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code) || size++ > __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].linkReferenceSizeMax) {
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkString);
            return atBreak(code);
        }
        effects.consume(code);
        if (!seen) seen = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownSpace"])(code);
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].backslash ? labelEscape : labelInside;
    }
    /**
   * After `\`, at a special character.
   *
   * ```markdown
   * > | [a\*a]
   *        ^
   * ```
   *
   * @type {State}
   */ function labelEscape(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].backslash || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket) {
            effects.consume(code);
            size++;
            return labelInside;
        }
        return labelInside(code);
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-factory-title/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Code,
 *   Effects,
 *   State,
 *   TokenType
 * } from 'micromark-util-types'
 */ __turbopack_context__.s({
    "factoryTitle": ()=>factoryTitle
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-factory-space/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-character/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/constants.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/types.js [client] (ecmascript)");
;
;
;
function factoryTitle(effects, ok, nok, type, markerType, stringType) {
    /** @type {NonNullable<Code>} */ let marker;
    return start;
    //TURBOPACK unreachable
    ;
    /**
   * Start of title.
   *
   * ```markdown
   * > | "a"
   *     ^
   * ```
   *
   * @type {State}
   */ function start(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].quotationMark || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].apostrophe || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftParenthesis) {
            effects.enter(type);
            effects.enter(markerType);
            effects.consume(code);
            effects.exit(markerType);
            marker = code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].leftParenthesis ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].rightParenthesis : code;
            return begin;
        }
        return nok(code);
    }
    /**
   * After opening marker.
   *
   * This is also used at the closing marker.
   *
   * ```markdown
   * > | "a"
   *      ^
   * ```
   *
   * @type {State}
   */ function begin(code) {
        if (code === marker) {
            effects.enter(markerType);
            effects.consume(code);
            effects.exit(markerType);
            effects.exit(type);
            return ok;
        }
        effects.enter(stringType);
        return atBreak(code);
    }
    /**
   * At something, before something else.
   *
   * ```markdown
   * > | "a"
   *      ^
   * ```
   *
   * @type {State}
   */ function atBreak(code) {
        if (code === marker) {
            effects.exit(stringType);
            return begin(marker);
        }
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof) {
            return nok(code);
        }
        // Note: blank lines can’t exist in content.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            // To do: use `space_or_tab_eol_with_options`, connect.
            effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
            effects.consume(code);
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["factorySpace"])(effects, atBreak, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].linePrefix);
        }
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkString, {
            contentType: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].contentTypeString
        });
        return inside(code);
    }
    /**
   *
   *
   * @type {State}
   */ function inside(code) {
        if (code === marker || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].chunkString);
            return atBreak(code);
        }
        effects.consume(code);
        return code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].backslash ? escape : inside;
    }
    /**
   * After `\`, at a special character.
   *
   * ```markdown
   * > | "a\*b"
   *      ^
   * ```
   *
   * @type {State}
   */ function escape(code) {
        if (code === marker || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].backslash) {
            effects.consume(code);
            return inside;
        }
        return inside(code);
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-factory-whitespace/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Effects, State} from 'micromark-util-types'
 */ __turbopack_context__.s({
    "factoryWhitespace": ()=>factoryWhitespace
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-factory-space/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-character/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/types.js [client] (ecmascript)");
;
;
;
function factoryWhitespace(effects, ok) {
    /** @type {boolean} */ let seen;
    return start;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function start(code) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
            effects.consume(code);
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
            seen = true;
            return start;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownSpace"])(code)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["factorySpace"])(effects, start, seen ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].linePrefix : __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineSuffix)(code);
        }
        return ok(code);
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-normalize-identifier/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "normalizeIdentifier": ()=>normalizeIdentifier
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/values.js [client] (ecmascript)");
;
function normalizeIdentifier(value) {
    return value// Collapse markdown whitespace.
    .replace(/[\t\n\r ]+/g, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$client$5d$__$28$ecmascript$29$__["values"].space)// Trim.
    .replace(/^ | $/g, '')// Some characters are considered “uppercase”, but if their lowercase
    // counterpart is uppercased will result in a different uppercase
    // character.
    // Hence, to get that form, we perform both lower- and uppercase.
    // Upper case makes sure keys will not interact with default prototypal
    // methods: no method is uppercase.
    .toLowerCase().toUpperCase();
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-html-tag-name/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * List of lowercase HTML “block” tag names.
 *
 * The list, when parsing HTML (flow), results in more relaxed rules (condition
 * 6).
 * Because they are known blocks, the HTML-like syntax doesn’t have to be
 * strictly parsed.
 * For tag names not in this list, a more strict algorithm (condition 7) is used
 * to detect whether the HTML-like syntax is seen as HTML (flow) or not.
 *
 * This is copied from:
 * <https://spec.commonmark.org/0.30/#html-blocks>.
 *
 * > 👉 **Note**: `search` was added in `CommonMark@0.31`.
 */ __turbopack_context__.s({
    "htmlBlockNames": ()=>htmlBlockNames,
    "htmlRawNames": ()=>htmlRawNames
});
const htmlBlockNames = [
    'address',
    'article',
    'aside',
    'base',
    'basefont',
    'blockquote',
    'body',
    'caption',
    'center',
    'col',
    'colgroup',
    'dd',
    'details',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hr',
    'html',
    'iframe',
    'legend',
    'li',
    'link',
    'main',
    'menu',
    'menuitem',
    'nav',
    'noframes',
    'ol',
    'optgroup',
    'option',
    'p',
    'param',
    'search',
    'section',
    'summary',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'title',
    'tr',
    'track',
    'ul'
];
const htmlRawNames = [
    'pre',
    'script',
    'style',
    'textarea'
];
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-decode-numeric-character-reference/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "decodeNumericCharacterReference": ()=>decodeNumericCharacterReference
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/values.js [client] (ecmascript)");
;
function decodeNumericCharacterReference(value, base) {
    const code = Number.parseInt(value, base);
    if (// C0 except for HT, LF, FF, CR, space.
    code < __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].ht || code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].vt || code > __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].cr && code < __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].space || code > __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].tilde && code < 160 || code > 55_295 && code < 57_344 || code > 64_975 && code < 65_008 || /* eslint-disable no-bitwise */ (code & 65_535) === 65_535 || (code & 65_535) === 65_534 || /* eslint-enable no-bitwise */ // Out of range
    code > 1_114_111) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$client$5d$__$28$ecmascript$29$__["values"].replacementCharacter;
    }
    return String.fromCodePoint(code);
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-decode-string/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "decodeString": ()=>decodeString
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$decode$2d$named$2d$character$2d$reference$2f$index$2e$dom$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/decode-named-character-reference/index.dom.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$numeric$2d$character$2d$reference$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-decode-numeric-character-reference/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/constants.js [client] (ecmascript)");
;
;
;
const characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
    return value.replace(characterEscapeOrReference, decode);
}
/**
 * @param {string} $0
 *   Match.
 * @param {string} $1
 *   Character escape.
 * @param {string} $2
 *   Character reference.
 * @returns {string}
 *   Decoded value
 */ function decode($0, $1, $2) {
    if ($1) {
        // Escape.
        return $1;
    }
    // Reference.
    const head = $2.charCodeAt(0);
    if (head === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].numberSign) {
        const head = $2.charCodeAt(1);
        const hex = head === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].lowercaseX || head === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].uppercaseX;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$numeric$2d$character$2d$reference$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decodeNumericCharacterReference"])($2.slice(hex ? 2 : 1), hex ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].numericBaseHexadecimal : __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].numericBaseDecimal);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$decode$2d$named$2d$character$2d$reference$2f$index$2e$dom$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decodeNamedCharacterReference"])($2) || $0;
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/mdast-util-from-markdown/dev/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Break,
 *   Blockquote,
 *   Code,
 *   Definition,
 *   Emphasis,
 *   Heading,
 *   Html,
 *   Image,
 *   InlineCode,
 *   Link,
 *   ListItem,
 *   List,
 *   Nodes,
 *   Paragraph,
 *   PhrasingContent,
 *   ReferenceType,
 *   Root,
 *   Strong,
 *   Text,
 *   ThematicBreak
 * } from 'mdast'
 * @import {
 *   Encoding,
 *   Event,
 *   Token,
 *   Value
 * } from 'micromark-util-types'
 * @import {Point} from 'unist'
 * @import {
 *   CompileContext,
 *   CompileData,
 *   Config,
 *   Extension,
 *   Handle,
 *   OnEnterError,
 *   Options
 * } from './types.js'
 */ __turbopack_context__.s({
    "fromMarkdown": ()=>fromMarkdown
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/devlop/lib/development.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$mdast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/mdast-util-to-string/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$parse$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark/dev/lib/parse.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$postprocess$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark/dev/lib/postprocess.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$preprocess$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark/dev/lib/preprocess.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$numeric$2d$character$2d$reference$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-decode-numeric-character-reference/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$string$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-decode-string/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-normalize-identifier/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/constants.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$decode$2d$named$2d$character$2d$reference$2f$index$2e$dom$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/decode-named-character-reference/index.dom.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-stringify-position/lib/index.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const own = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
    if (typeof encoding !== 'string') {
        options = encoding;
        encoding = undefined;
    }
    return compiler(options)((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$postprocess$2e$js__$5b$client$5d$__$28$ecmascript$29$__["postprocess"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$parse$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parse"])(options).document().write((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$preprocess$2e$js__$5b$client$5d$__$28$ecmascript$29$__["preprocess"])()(value, encoding, true))));
}
/**
 * Note this compiler only understand complete buffering, not streaming.
 *
 * @param {Options | null | undefined} [options]
 */ function compiler(options) {
    /** @type {Config} */ const config = {
        transforms: [],
        canContainEols: [
            'emphasis',
            'fragment',
            'heading',
            'paragraph',
            'strong'
        ],
        enter: {
            autolink: opener(link),
            autolinkProtocol: onenterdata,
            autolinkEmail: onenterdata,
            atxHeading: opener(heading),
            blockQuote: opener(blockQuote),
            characterEscape: onenterdata,
            characterReference: onenterdata,
            codeFenced: opener(codeFlow),
            codeFencedFenceInfo: buffer,
            codeFencedFenceMeta: buffer,
            codeIndented: opener(codeFlow, buffer),
            codeText: opener(codeText, buffer),
            codeTextData: onenterdata,
            data: onenterdata,
            codeFlowValue: onenterdata,
            definition: opener(definition),
            definitionDestinationString: buffer,
            definitionLabelString: buffer,
            definitionTitleString: buffer,
            emphasis: opener(emphasis),
            hardBreakEscape: opener(hardBreak),
            hardBreakTrailing: opener(hardBreak),
            htmlFlow: opener(html, buffer),
            htmlFlowData: onenterdata,
            htmlText: opener(html, buffer),
            htmlTextData: onenterdata,
            image: opener(image),
            label: buffer,
            link: opener(link),
            listItem: opener(listItem),
            listItemValue: onenterlistitemvalue,
            listOrdered: opener(list, onenterlistordered),
            listUnordered: opener(list),
            paragraph: opener(paragraph),
            reference: onenterreference,
            referenceString: buffer,
            resourceDestinationString: buffer,
            resourceTitleString: buffer,
            setextHeading: opener(heading),
            strong: opener(strong),
            thematicBreak: opener(thematicBreak)
        },
        exit: {
            atxHeading: closer(),
            atxHeadingSequence: onexitatxheadingsequence,
            autolink: closer(),
            autolinkEmail: onexitautolinkemail,
            autolinkProtocol: onexitautolinkprotocol,
            blockQuote: closer(),
            characterEscapeValue: onexitdata,
            characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
            characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
            characterReferenceValue: onexitcharacterreferencevalue,
            characterReference: onexitcharacterreference,
            codeFenced: closer(onexitcodefenced),
            codeFencedFence: onexitcodefencedfence,
            codeFencedFenceInfo: onexitcodefencedfenceinfo,
            codeFencedFenceMeta: onexitcodefencedfencemeta,
            codeFlowValue: onexitdata,
            codeIndented: closer(onexitcodeindented),
            codeText: closer(onexitcodetext),
            codeTextData: onexitdata,
            data: onexitdata,
            definition: closer(),
            definitionDestinationString: onexitdefinitiondestinationstring,
            definitionLabelString: onexitdefinitionlabelstring,
            definitionTitleString: onexitdefinitiontitlestring,
            emphasis: closer(),
            hardBreakEscape: closer(onexithardbreak),
            hardBreakTrailing: closer(onexithardbreak),
            htmlFlow: closer(onexithtmlflow),
            htmlFlowData: onexitdata,
            htmlText: closer(onexithtmltext),
            htmlTextData: onexitdata,
            image: closer(onexitimage),
            label: onexitlabel,
            labelText: onexitlabeltext,
            lineEnding: onexitlineending,
            link: closer(onexitlink),
            listItem: closer(),
            listOrdered: closer(),
            listUnordered: closer(),
            paragraph: closer(),
            referenceString: onexitreferencestring,
            resourceDestinationString: onexitresourcedestinationstring,
            resourceTitleString: onexitresourcetitlestring,
            resource: onexitresource,
            setextHeading: closer(onexitsetextheading),
            setextHeadingLineSequence: onexitsetextheadinglinesequence,
            setextHeadingText: onexitsetextheadingtext,
            strong: closer(),
            thematicBreak: closer()
        }
    };
    configure(config, (options || {}).mdastExtensions || []);
    /** @type {CompileData} */ const data = {};
    return compile;
    //TURBOPACK unreachable
    ;
    /**
   * Turn micromark events into an mdast tree.
   *
   * @param {Array<Event>} events
   *   Events.
   * @returns {Root}
   *   mdast tree.
   */ function compile(events) {
        /** @type {Root} */ let tree = {
            type: 'root',
            children: []
        };
        /** @type {Omit<CompileContext, 'sliceSerialize'>} */ const context = {
            stack: [
                tree
            ],
            tokenStack: [],
            config,
            enter,
            exit,
            buffer,
            resume,
            data
        };
        /** @type {Array<number>} */ const listStack = [];
        let index = -1;
        while(++index < events.length){
            // We preprocess lists to add `listItem` tokens, and to infer whether
            // items the list itself are spread out.
            if (events[index][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listOrdered || events[index][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listUnordered) {
                if (events[index][0] === 'enter') {
                    listStack.push(index);
                } else {
                    const tail = listStack.pop();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(typeof tail === 'number', 'expected list ot be open');
                    index = prepareList(events, tail, index);
                }
            }
        }
        index = -1;
        while(++index < events.length){
            const handler = config[events[index][0]];
            if (own.call(handler, events[index][1].type)) {
                handler[events[index][1].type].call(Object.assign({
                    sliceSerialize: events[index][2].sliceSerialize
                }, context), events[index][1]);
            }
        }
        // Handle tokens still being open.
        if (context.tokenStack.length > 0) {
            const tail = context.tokenStack[context.tokenStack.length - 1];
            const handler = tail[1] || defaultOnError;
            handler.call(context, undefined, tail[0]);
        }
        // Figure out `root` position.
        tree.position = {
            start: point(events.length > 0 ? events[0][1].start : {
                line: 1,
                column: 1,
                offset: 0
            }),
            end: point(events.length > 0 ? events[events.length - 2][1].end : {
                line: 1,
                column: 1,
                offset: 0
            })
        };
        // Call transforms.
        index = -1;
        while(++index < config.transforms.length){
            tree = config.transforms[index](tree) || tree;
        }
        return tree;
    }
    /**
   * @param {Array<Event>} events
   * @param {number} start
   * @param {number} length
   * @returns {number}
   */ function prepareList(events, start, length) {
        let index = start - 1;
        let containerBalance = -1;
        let listSpread = false;
        /** @type {Token | undefined} */ let listItem;
        /** @type {number | undefined} */ let lineIndex;
        /** @type {number | undefined} */ let firstBlankLineIndex;
        /** @type {boolean | undefined} */ let atMarker;
        while(++index <= length){
            const event = events[index];
            switch(event[1].type){
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listUnordered:
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listOrdered:
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].blockQuote:
                    {
                        if (event[0] === 'enter') {
                            containerBalance++;
                        } else {
                            containerBalance--;
                        }
                        atMarker = undefined;
                        break;
                    }
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank:
                    {
                        if (event[0] === 'enter') {
                            if (listItem && !atMarker && !containerBalance && !firstBlankLineIndex) {
                                firstBlankLineIndex = index;
                            }
                            atMarker = undefined;
                        }
                        break;
                    }
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].linePrefix:
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemValue:
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemMarker:
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemPrefix:
                case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemPrefixWhitespace:
                    {
                        break;
                    }
                default:
                    {
                        atMarker = undefined;
                    }
            }
            if (!containerBalance && event[0] === 'enter' && event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemPrefix || containerBalance === -1 && event[0] === 'exit' && (event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listUnordered || event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listOrdered)) {
                if (listItem) {
                    let tailIndex = index;
                    lineIndex = undefined;
                    while(tailIndex--){
                        const tailEvent = events[tailIndex];
                        if (tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank) {
                            if (tailEvent[0] === 'exit') continue;
                            if (lineIndex) {
                                events[lineIndex][1].type = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank;
                                listSpread = true;
                            }
                            tailEvent[1].type = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].lineEnding;
                            lineIndex = tailIndex;
                        } else if (tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].linePrefix || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].blockQuotePrefix || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].blockQuotePrefixWhitespace || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].blockQuoteMarker || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemIndent) {
                        // Empty
                        } else {
                            break;
                        }
                    }
                    if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
                        listItem._spread = true;
                    }
                    // Fix position.
                    listItem.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
                    events.splice(lineIndex || index, 0, [
                        'exit',
                        listItem,
                        event[2]
                    ]);
                    index++;
                    length++;
                }
                // Create a new list item.
                if (event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].listItemPrefix) {
                    /** @type {Token} */ const item = {
                        type: 'listItem',
                        _spread: false,
                        start: Object.assign({}, event[1].start),
                        // @ts-expect-error: we’ll add `end` in a second.
                        end: undefined
                    };
                    listItem = item;
                    events.splice(index, 0, [
                        'enter',
                        item,
                        event[2]
                    ]);
                    index++;
                    length++;
                    firstBlankLineIndex = undefined;
                    atMarker = true;
                }
            }
        }
        events[start][1]._spread = listSpread;
        return length;
    }
    /**
   * Create an opener handle.
   *
   * @param {(token: Token) => Nodes} create
   *   Create a node.
   * @param {Handle | undefined} [and]
   *   Optional function to also run.
   * @returns {Handle}
   *   Handle.
   */ function opener(create, and) {
        return open;
        //TURBOPACK unreachable
        ;
        /**
     * @this {CompileContext}
     * @param {Token} token
     * @returns {undefined}
     */ function open(token) {
            enter.call(this, create(token), token);
            if (and) and.call(this, token);
        }
    }
    /**
   * @type {CompileContext['buffer']}
   */ function buffer() {
        this.stack.push({
            type: 'fragment',
            children: []
        });
    }
    /**
   * @type {CompileContext['enter']}
   */ function enter(node, token, errorHandler) {
        const parent = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(parent, 'expected `parent`');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])('children' in parent, 'expected `parent`');
        /** @type {Array<Nodes>} */ const siblings = parent.children;
        siblings.push(node);
        this.stack.push(node);
        this.tokenStack.push([
            token,
            errorHandler || undefined
        ]);
        node.position = {
            start: point(token.start),
            // @ts-expect-error: `end` will be patched later.
            end: undefined
        };
    }
    /**
   * Create a closer handle.
   *
   * @param {Handle | undefined} [and]
   *   Optional function to also run.
   * @returns {Handle}
   *   Handle.
   */ function closer(and) {
        return close;
        //TURBOPACK unreachable
        ;
        /**
     * @this {CompileContext}
     * @param {Token} token
     * @returns {undefined}
     */ function close(token) {
            if (and) and.call(this, token);
            exit.call(this, token);
        }
    }
    /**
   * @type {CompileContext['exit']}
   */ function exit(token, onExitError) {
        const node = this.stack.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected `node`');
        const open = this.tokenStack.pop();
        if (!open) {
            throw new Error('Cannot close `' + token.type + '` (' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringifyPosition"])({
                start: token.start,
                end: token.end
            }) + '): it’s not open');
        } else if (open[0].type !== token.type) {
            if (onExitError) {
                onExitError.call(this, token, open[0]);
            } else {
                const handler = open[1] || defaultOnError;
                handler.call(this, token, open[0]);
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type !== 'fragment', 'unexpected fragment `exit`ed');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.position, 'expected `position` to be defined');
        node.position.end = point(token.end);
    }
    /**
   * @type {CompileContext['resume']}
   */ function resume() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$mdast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["toString"])(this.stack.pop());
    }
    //
    // Handlers.
    //
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onenterlistordered() {
        this.data.expectingFirstListItemValue = true;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onenterlistitemvalue(token) {
        if (this.data.expectingFirstListItemValue) {
            const ancestor = this.stack[this.stack.length - 2];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(ancestor, 'expected nodes on stack');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(ancestor.type === 'list', 'expected list on stack');
            ancestor.start = Number.parseInt(this.sliceSerialize(token), __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].numericBaseDecimal);
            this.data.expectingFirstListItemValue = undefined;
        }
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodefencedfenceinfo() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'code', 'expected code on stack');
        node.lang = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodefencedfencemeta() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'code', 'expected code on stack');
        node.meta = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodefencedfence() {
        // Exit if this is the closing fence.
        if (this.data.flowCodeInside) return;
        this.buffer();
        this.data.flowCodeInside = true;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodefenced() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'code', 'expected code on stack');
        node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
        this.data.flowCodeInside = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodeindented() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'code', 'expected code on stack');
        node.value = data.replace(/(\r?\n|\r)$/g, '');
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitdefinitionlabelstring(token) {
        const label = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'definition', 'expected definition on stack');
        node.label = label;
        node.identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(this.sliceSerialize(token)).toLowerCase();
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitdefinitiontitlestring() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'definition', 'expected definition on stack');
        node.title = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitdefinitiondestinationstring() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'definition', 'expected definition on stack');
        node.url = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitatxheadingsequence(token) {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'heading', 'expected heading on stack');
        if (!node.depth) {
            const depth = this.sliceSerialize(token).length;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(depth === 1 || depth === 2 || depth === 3 || depth === 4 || depth === 5 || depth === 6, 'expected `depth` between `1` and `6`');
            node.depth = depth;
        }
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitsetextheadingtext() {
        this.data.setextHeadingSlurpLineEnding = true;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitsetextheadinglinesequence(token) {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'heading', 'expected heading on stack');
        node.depth = this.sliceSerialize(token).codePointAt(0) === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].equalsTo ? 1 : 2;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitsetextheading() {
        this.data.setextHeadingSlurpLineEnding = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onenterdata(token) {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])('children' in node, 'expected parent on stack');
        /** @type {Array<Nodes>} */ const siblings = node.children;
        let tail = siblings[siblings.length - 1];
        if (!tail || tail.type !== 'text') {
            // Add a new text node.
            tail = text();
            tail.position = {
                start: point(token.start),
                // @ts-expect-error: we’ll add `end` later.
                end: undefined
            };
            siblings.push(tail);
        }
        this.stack.push(tail);
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitdata(token) {
        const tail = this.stack.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(tail, 'expected a `node` to be on the stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])('value' in tail, 'expected a `literal` to be on the stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(tail.position, 'expected `node` to have an open position');
        tail.value += this.sliceSerialize(token);
        tail.position.end = point(token.end);
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitlineending(token) {
        const context = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(context, 'expected `node`');
        // If we’re at a hard break, include the line ending in there.
        if (this.data.atHardBreak) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])('children' in context, 'expected `parent`');
            const tail = context.children[context.children.length - 1];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(tail.position, 'expected tail to have a starting position');
            tail.position.end = point(token.end);
            this.data.atHardBreak = undefined;
            return;
        }
        if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
            onenterdata.call(this, token);
            onexitdata.call(this, token);
        }
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexithardbreak() {
        this.data.atHardBreak = true;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexithtmlflow() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'html', 'expected html on stack');
        node.value = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexithtmltext() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'html', 'expected html on stack');
        node.value = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodetext() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'inlineCode', 'expected inline code on stack');
        node.value = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitlink() {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'link', 'expected link on stack');
        // Note: there are also `identifier` and `label` fields on this link node!
        // These are used / cleaned here.
        // To do: clean.
        if (this.data.inReference) {
            /** @type {ReferenceType} */ const referenceType = this.data.referenceType || 'shortcut';
            node.type += 'Reference';
            // @ts-expect-error: mutate.
            node.referenceType = referenceType;
            // @ts-expect-error: mutate.
            delete node.url;
            delete node.title;
        } else {
            // @ts-expect-error: mutate.
            delete node.identifier;
            // @ts-expect-error: mutate.
            delete node.label;
        }
        this.data.referenceType = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitimage() {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image', 'expected image on stack');
        // Note: there are also `identifier` and `label` fields on this link node!
        // These are used / cleaned here.
        // To do: clean.
        if (this.data.inReference) {
            /** @type {ReferenceType} */ const referenceType = this.data.referenceType || 'shortcut';
            node.type += 'Reference';
            // @ts-expect-error: mutate.
            node.referenceType = referenceType;
            // @ts-expect-error: mutate.
            delete node.url;
            delete node.title;
        } else {
            // @ts-expect-error: mutate.
            delete node.identifier;
            // @ts-expect-error: mutate.
            delete node.label;
        }
        this.data.referenceType = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitlabeltext(token) {
        const string = this.sliceSerialize(token);
        const ancestor = this.stack[this.stack.length - 2];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(ancestor, 'expected ancestor on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(ancestor.type === 'image' || ancestor.type === 'link', 'expected image or link on stack');
        // @ts-expect-error: stash this on the node, as it might become a reference
        // later.
        ancestor.label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$string$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decodeString"])(string);
        // @ts-expect-error: same as above.
        ancestor.identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(string).toLowerCase();
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitlabel() {
        const fragment = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(fragment, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(fragment.type === 'fragment', 'expected fragment on stack');
        const value = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image' || node.type === 'link', 'expected image or link on stack');
        // Assume a reference.
        this.data.inReference = true;
        if (node.type === 'link') {
            /** @type {Array<PhrasingContent>} */ const children = fragment.children;
            node.children = children;
        } else {
            node.alt = value;
        }
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitresourcedestinationstring() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image' || node.type === 'link', 'expected image or link on stack');
        node.url = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitresourcetitlestring() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image' || node.type === 'link', 'expected image or link on stack');
        node.title = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitresource() {
        this.data.inReference = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onenterreference() {
        this.data.referenceType = 'collapsed';
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitreferencestring(token) {
        const label = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image' || node.type === 'link', 'expected image reference or link reference on stack');
        // @ts-expect-error: stash this on the node, as it might become a reference
        // later.
        node.label = label;
        // @ts-expect-error: same as above.
        node.identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(this.sliceSerialize(token)).toLowerCase();
        this.data.referenceType = 'full';
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcharacterreferencemarker(token) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(token.type === 'characterReferenceMarkerNumeric' || token.type === 'characterReferenceMarkerHexadecimal');
        this.data.characterReferenceType = token.type;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcharacterreferencevalue(token) {
        const data = this.sliceSerialize(token);
        const type = this.data.characterReferenceType;
        /** @type {string} */ let value;
        if (type) {
            value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$numeric$2d$character$2d$reference$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decodeNumericCharacterReference"])(data, type === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["types"].characterReferenceMarkerNumeric ? __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].numericBaseDecimal : __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["constants"].numericBaseHexadecimal);
            this.data.characterReferenceType = undefined;
        } else {
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$decode$2d$named$2d$character$2d$reference$2f$index$2e$dom$2e$js__$5b$client$5d$__$28$ecmascript$29$__["decodeNamedCharacterReference"])(data);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(result !== false, 'expected reference to decode');
            value = result;
        }
        const tail = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(tail, 'expected `node`');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])('value' in tail, 'expected `node.value`');
        tail.value += value;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcharacterreference(token) {
        const tail = this.stack.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(tail, 'expected `node`');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(tail.position, 'expected `node.position`');
        tail.position.end = point(token.end);
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitautolinkprotocol(token) {
        onexitdata.call(this, token);
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'link', 'expected link on stack');
        node.url = this.sliceSerialize(token);
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitautolinkemail(token) {
        onexitdata.call(this, token);
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'link', 'expected link on stack');
        node.url = 'mailto:' + this.sliceSerialize(token);
    }
    //
    // Creaters.
    //
    /** @returns {Blockquote} */ function blockQuote() {
        return {
            type: 'blockquote',
            children: []
        };
    }
    /** @returns {Code} */ function codeFlow() {
        return {
            type: 'code',
            lang: null,
            meta: null,
            value: ''
        };
    }
    /** @returns {InlineCode} */ function codeText() {
        return {
            type: 'inlineCode',
            value: ''
        };
    }
    /** @returns {Definition} */ function definition() {
        return {
            type: 'definition',
            identifier: '',
            label: null,
            title: null,
            url: ''
        };
    }
    /** @returns {Emphasis} */ function emphasis() {
        return {
            type: 'emphasis',
            children: []
        };
    }
    /** @returns {Heading} */ function heading() {
        return {
            type: 'heading',
            // @ts-expect-error `depth` will be set later.
            depth: 0,
            children: []
        };
    }
    /** @returns {Break} */ function hardBreak() {
        return {
            type: 'break'
        };
    }
    /** @returns {Html} */ function html() {
        return {
            type: 'html',
            value: ''
        };
    }
    /** @returns {Image} */ function image() {
        return {
            type: 'image',
            title: null,
            url: '',
            alt: null
        };
    }
    /** @returns {Link} */ function link() {
        return {
            type: 'link',
            title: null,
            url: '',
            children: []
        };
    }
    /**
   * @param {Token} token
   * @returns {List}
   */ function list(token) {
        return {
            type: 'list',
            ordered: token.type === 'listOrdered',
            start: null,
            spread: token._spread,
            children: []
        };
    }
    /**
   * @param {Token} token
   * @returns {ListItem}
   */ function listItem(token) {
        return {
            type: 'listItem',
            spread: token._spread,
            checked: null,
            children: []
        };
    }
    /** @returns {Paragraph} */ function paragraph() {
        return {
            type: 'paragraph',
            children: []
        };
    }
    /** @returns {Strong} */ function strong() {
        return {
            type: 'strong',
            children: []
        };
    }
    /** @returns {Text} */ function text() {
        return {
            type: 'text',
            value: ''
        };
    }
    /** @returns {ThematicBreak} */ function thematicBreak() {
        return {
            type: 'thematicBreak'
        };
    }
}
/**
 * Copy a point-like value.
 *
 * @param {Point} d
 *   Point-like value.
 * @returns {Point}
 *   unist point.
 */ function point(d) {
    return {
        line: d.line,
        column: d.column,
        offset: d.offset
    };
}
/**
 * @param {Config} combined
 * @param {Array<Array<Extension> | Extension>} extensions
 * @returns {undefined}
 */ function configure(combined, extensions) {
    let index = -1;
    while(++index < extensions.length){
        const value = extensions[index];
        if (Array.isArray(value)) {
            configure(combined, value);
        } else {
            extension(combined, value);
        }
    }
}
/**
 * @param {Config} combined
 * @param {Extension} extension
 * @returns {undefined}
 */ function extension(combined, extension) {
    /** @type {keyof Extension} */ let key;
    for(key in extension){
        if (own.call(extension, key)) {
            switch(key){
                case 'canContainEols':
                    {
                        const right = extension[key];
                        if (right) {
                            combined[key].push(...right);
                        }
                        break;
                    }
                case 'transforms':
                    {
                        const right = extension[key];
                        if (right) {
                            combined[key].push(...right);
                        }
                        break;
                    }
                case 'enter':
                case 'exit':
                    {
                        const right = extension[key];
                        if (right) {
                            Object.assign(combined[key], right);
                        }
                        break;
                    }
            }
        }
    }
}
/** @type {OnEnterError} */ function defaultOnError(left, right) {
    if (left) {
        throw new Error('Cannot close `' + left.type + '` (' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringifyPosition"])({
            start: left.start,
            end: left.end
        }) + '): a different token (`' + right.type + '`, ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringifyPosition"])({
            start: right.start,
            end: right.end
        }) + ') is open');
    } else {
        throw new Error('Cannot close document, a token (`' + right.type + '`, ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringifyPosition"])({
            start: right.start,
            end: right.end
        }) + ') is still open');
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/remark-parse/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-from-markdown').Options} FromMarkdownOptions
 * @typedef {import('unified').Parser<Root>} Parser
 * @typedef {import('unified').Processor<Root>} Processor
 */ /**
 * @typedef {Omit<FromMarkdownOptions, 'extensions' | 'mdastExtensions'>} Options
 */ __turbopack_context__.s({
    "default": ()=>remarkParse
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$dev$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/mdast-util-from-markdown/dev/lib/index.js [client] (ecmascript)");
;
function remarkParse(options) {
    /** @type {Processor} */ // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.
    const self = this;
    self.parser = parser;
    /**
   * @type {Parser}
   */ function parser(doc) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$dev$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fromMarkdown"])(doc, {
            ...self.data('settings'),
            ...options,
            // Note: these options are not in the readme.
            // The goal is for them to be set by plugins on `data` instead of being
            // passed by users.
            extensions: self.data('micromarkExtensions') || [],
            mdastExtensions: self.data('fromMarkdownExtensions') || []
        });
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-encode/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "encode": ()=>encode
});
const characterReferences = {
    '"': 'quot',
    '&': 'amp',
    '<': 'lt',
    '>': 'gt'
};
function encode(value) {
    return value.replace(/["&<>]/g, replace);
    //TURBOPACK unreachable
    ;
    /**
   * @param {string} value
   *   Value to replace.
   * @returns {string}
   *   Encoded value.
   */ function replace(value) {
        return '&' + characterReferences[value] + ';';
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-sanitize-uri/dev/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "normalizeUri": ()=>normalizeUri,
    "sanitizeUri": ()=>sanitizeUri
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-character/dev/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$encode$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-encode/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/codes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/micromark-util-symbol/lib/values.js [client] (ecmascript)");
;
;
;
function sanitizeUri(url, protocol) {
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$encode$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["encode"])(normalizeUri(url || ''));
    if (!protocol) {
        return value;
    }
    const colon = value.indexOf(':');
    const questionMark = value.indexOf('?');
    const numberSign = value.indexOf('#');
    const slash = value.indexOf('/');
    if (// If there is no protocol, it’s relative.
    colon < 0 || slash > -1 && colon > slash || questionMark > -1 && colon > questionMark || numberSign > -1 && colon > numberSign || // It is a protocol, it should be allowed.
    protocol.test(value.slice(0, colon))) {
        return value;
    }
    return '';
}
function normalizeUri(value) {
    /** @type {Array<string>} */ const result = [];
    let index = -1;
    let start = 0;
    let skip = 0;
    while(++index < value.length){
        const code = value.charCodeAt(index);
        /** @type {string} */ let replace = '';
        // A correct percent encoded value.
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["codes"].percentSign && (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["asciiAlphanumeric"])(value.charCodeAt(index + 1)) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["asciiAlphanumeric"])(value.charCodeAt(index + 2))) {
            skip = 2;
        } else if (code < 128) {
            if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) {
                replace = String.fromCharCode(code);
            }
        } else if (code > 55_295 && code < 57_344) {
            const next = value.charCodeAt(index + 1);
            // A correct surrogate pair.
            if (code < 56_320 && next > 56_319 && next < 57_344) {
                replace = String.fromCharCode(code, next);
                skip = 1;
            } else {
                replace = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$client$5d$__$28$ecmascript$29$__["values"].replacementCharacter;
            }
        } else {
            replace = String.fromCharCode(code);
        }
        if (replace) {
            result.push(value.slice(start, index), encodeURIComponent(replace));
            start = index + skip + 1;
            replace = '';
        }
        if (skip) {
            index += skip;
            skip = 0;
        }
    }
    return result.join('') + value.slice(start);
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-is/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 */ /**
 * @template Fn
 * @template Fallback
 * @typedef {Fn extends (value: any) => value is infer Thing ? Thing : Fallback} Predicate
 */ /**
 * @callback Check
 *   Check that an arbitrary value is a node.
 * @param {unknown} this
 *   The given context.
 * @param {unknown} [node]
 *   Anything (typically a node).
 * @param {number | null | undefined} [index]
 *   The node’s position in its parent.
 * @param {Parent | null | undefined} [parent]
 *   The node’s parent.
 * @returns {boolean}
 *   Whether this is a node and passes a test.
 *
 * @typedef {Record<string, unknown> | Node} Props
 *   Object to check for equivalence.
 *
 *   Note: `Node` is included as it is common but is not indexable.
 *
 * @typedef {Array<Props | TestFunction | string> | Props | TestFunction | string | null | undefined} Test
 *   Check for an arbitrary node.
 *
 * @callback TestFunction
 *   Check if a node passes a test.
 * @param {unknown} this
 *   The given context.
 * @param {Node} node
 *   A node.
 * @param {number | undefined} [index]
 *   The node’s position in its parent.
 * @param {Parent | undefined} [parent]
 *   The node’s parent.
 * @returns {boolean | undefined | void}
 *   Whether this node passes the test.
 *
 *   Note: `void` is included until TS sees no return as `undefined`.
 */ /**
 * Check if `node` is a `Node` and whether it passes the given test.
 *
 * @param {unknown} node
 *   Thing to check, typically `Node`.
 * @param {Test} test
 *   A check for a specific node.
 * @param {number | null | undefined} index
 *   The node’s position in its parent.
 * @param {Parent | null | undefined} parent
 *   The node’s parent.
 * @param {unknown} context
 *   Context object (`this`) to pass to `test` functions.
 * @returns {boolean}
 *   Whether `node` is a node and passes a test.
 */ __turbopack_context__.s({
    "convert": ()=>convert,
    "is": ()=>is
});
const is = /**
     * @param {unknown} [node]
     * @param {Test} [test]
     * @param {number | null | undefined} [index]
     * @param {Parent | null | undefined} [parent]
     * @param {unknown} [context]
     * @returns {boolean}
     */ // eslint-disable-next-line max-params
function(node, test, index, parent, context) {
    const check = convert(test);
    if (index !== undefined && index !== null && (typeof index !== 'number' || index < 0 || index === Number.POSITIVE_INFINITY)) {
        throw new Error('Expected positive finite index');
    }
    if (parent !== undefined && parent !== null && (!is(parent) || !parent.children)) {
        throw new Error('Expected parent node');
    }
    if ((parent === undefined || parent === null) !== (index === undefined || index === null)) {
        throw new Error('Expected both parent and index');
    }
    return looksLikeANode(node) ? check.call(context, node, index, parent) : false;
};
const convert = /**
     * @param {Test} [test]
     * @returns {Check}
     */ function(test) {
    if (test === null || test === undefined) {
        return ok;
    }
    if (typeof test === 'function') {
        return castFactory(test);
    }
    if (typeof test === 'object') {
        return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
    }
    if (typeof test === 'string') {
        return typeFactory(test);
    }
    throw new Error('Expected function, string, or object as test');
};
/**
 * @param {Array<Props | TestFunction | string>} tests
 * @returns {Check}
 */ function anyFactory(tests) {
    /** @type {Array<Check>} */ const checks = [];
    let index = -1;
    while(++index < tests.length){
        checks[index] = convert(tests[index]);
    }
    return castFactory(any);
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {TestFunction}
   */ function any() {
        for(var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++){
            parameters[_key] = arguments[_key];
        }
        let index = -1;
        while(++index < checks.length){
            if (checks[index].apply(this, parameters)) return true;
        }
        return false;
    }
}
/**
 * Turn an object into a test for a node with a certain fields.
 *
 * @param {Props} check
 * @returns {Check}
 */ function propsFactory(check) {
    const checkAsRecord = check;
    return castFactory(all);
    //TURBOPACK unreachable
    ;
    /**
   * @param {Node} node
   * @returns {boolean}
   */ function all(node) {
        const nodeAsRecord = node;
        /** @type {string} */ let key;
        for(key in check){
            if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
        }
        return true;
    }
}
/**
 * Turn a string into a test for a node with a certain type.
 *
 * @param {string} check
 * @returns {Check}
 */ function typeFactory(check) {
    return castFactory(type);
    //TURBOPACK unreachable
    ;
    /**
   * @param {Node} node
   */ function type(node) {
        return node && node.type === check;
    }
}
/**
 * Turn a custom test into a test for a node that passes that test.
 *
 * @param {TestFunction} testFunction
 * @returns {Check}
 */ function castFactory(testFunction) {
    return check;
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {Check}
   */ function check(value, index, parent) {
        return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index === 'number' ? index : undefined, parent || undefined));
    }
}
function ok() {
    return true;
}
/**
 * @param {unknown} value
 * @returns {value is Node}
 */ function looksLikeANode(value) {
    return value !== null && typeof value === 'object' && 'type' in value;
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-visit-parents/lib/color.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @param {string} d
 * @returns {string}
 */ __turbopack_context__.s({
    "color": ()=>color
});
function color(d) {
    return d;
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-visit-parents/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ /**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends Array<any>
 *   ? MatchesOne<Value, Check[keyof Check]>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
 *   Number; capped reasonably.
 */ /**
 * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
 *   Increment a number in the type system.
 * @template {Uint} [I=0]
 *   Index.
 */ /**
 * @typedef {(
 *   Node extends UnistParent
 *   ? Node extends {children: Array<infer Children>}
 *     ? Child extends Children ? Node : never
 *     : never
 *   : never
 * )} InternalParent
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Depth extends Max
 *   ? never
 *   :
 *     | InternalParent<Node, Child>
 *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
 * )} InternalAncestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {InternalAncestor<InclusiveDescendant<Tree>, Child>} Ancestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Tree extends UnistParent
 *     ? Depth extends Max
 *       ? Tree
 *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
 *     : Tree
 * )} InclusiveDescendant
 *   Collect all (inclusive) descendants of `Tree`.
 *
 *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
 *   > recurse without actually running into an infinite loop, which the
 *   > previous version did.
 *   >
 *   > Practically, a max of `2` is typically enough assuming a `Root` is
 *   > passed, but it doesn’t improve performance.
 *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
 *   > Using up to `10` doesn’t hurt or help either.
 * @template {UnistNode} Tree
 *   Tree type.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {'skip' | boolean} Action
 *   Union of the action types.
 *
 * @typedef {number} Index
 *   Move to the sibling at `index` next (after node itself is completely
 *   traversed).
 *
 *   Useful if mutating the tree, such as removing the node the visitor is
 *   currently on, or any of its previous siblings.
 *   Results less than 0 or greater than or equal to `children.length` stop
 *   traversing the parent.
 *
 * @typedef {[(Action | null | undefined | void)?, (Index | null | undefined)?]} ActionTuple
 *   List with one or two values, the first an action, the second an index.
 *
 * @typedef {Action | ActionTuple | Index | null | undefined | void} VisitorResult
 *   Any value that can be returned from a visitor.
 */ /**
 * @callback Visitor
 *   Handle a node (matching `test`, if given).
 *
 *   Visitors are free to transform `node`.
 *   They can also transform the parent of node (the last of `ancestors`).
 *
 *   Replacing `node` itself, if `SKIP` is not returned, still causes its
 *   descendants to be walked (which is a bug).
 *
 *   When adding or removing previous siblings of `node` (or next siblings, in
 *   case of reverse), the `Visitor` should return a new `Index` to specify the
 *   sibling to traverse after `node` is traversed.
 *   Adding or removing next siblings of `node` (or previous siblings, in case
 *   of reverse) is handled as expected without needing to return a new `Index`.
 *
 *   Removing the children property of an ancestor still results in them being
 *   traversed.
 * @param {Visited} node
 *   Found node.
 * @param {Array<VisitedParents>} ancestors
 *   Ancestors of `node`.
 * @returns {VisitorResult}
 *   What to do next.
 *
 *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
 *   An `Action` is treated as a tuple of `[Action]`.
 *
 *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
 *   When the `Action` is `EXIT`, that action can be returned.
 *   When the `Action` is `CONTINUE`, `Index` can be returned.
 * @template {UnistNode} [Visited=UnistNode]
 *   Visited node type.
 * @template {UnistParent} [VisitedParents=UnistParent]
 *   Ancestor type.
 */ /**
 * @typedef {Visitor<Matches<InclusiveDescendant<Tree>, Check>, Ancestor<Tree, Matches<InclusiveDescendant<Tree>, Check>>>} BuildVisitor
 *   Build a typed `Visitor` function from a tree and a test.
 *
 *   It will infer which values are passed as `node` and which as `parents`.
 * @template {UnistNode} [Tree=UnistNode]
 *   Tree type.
 * @template {Test} [Check=Test]
 *   Test type.
 */ __turbopack_context__.s({
    "CONTINUE": ()=>CONTINUE,
    "EXIT": ()=>EXIT,
    "SKIP": ()=>SKIP,
    "visitParents": ()=>visitParents
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-is/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$color$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-visit-parents/lib/color.js [client] (ecmascript)");
;
;
/** @type {Readonly<ActionTuple>} */ const empty = [];
const CONTINUE = true;
const EXIT = false;
const SKIP = 'skip';
function visitParents(tree, test, visitor, reverse) {
    /** @type {Test} */ let check;
    if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        // @ts-expect-error no visitor given, so `visitor` is test.
        visitor = test;
    } else {
        // @ts-expect-error visitor given, so `test` isn’t a visitor.
        check = test;
    }
    const is = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["convert"])(check);
    const step = reverse ? -1 : 1;
    factory(tree, undefined, [])();
    /**
   * @param {UnistNode} node
   * @param {number | undefined} index
   * @param {Array<UnistParent>} parents
   */ function factory(node, index, parents) {
        const value = node && typeof node === 'object' ? node : {};
        if (typeof value.type === 'string') {
            const name = // `hast`
            typeof value.tagName === 'string' ? value.tagName : typeof value.name === 'string' ? value.name : undefined;
            Object.defineProperty(visit, 'name', {
                value: 'node (' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$color$2e$js__$5b$client$5d$__$28$ecmascript$29$__["color"])(node.type + (name ? '<' + name + '>' : '')) + ')'
            });
        }
        return visit;
        //TURBOPACK unreachable
        ;
        function visit() {
            /** @type {Readonly<ActionTuple>} */ let result = empty;
            /** @type {Readonly<ActionTuple>} */ let subresult;
            /** @type {number} */ let offset;
            /** @type {Array<UnistParent>} */ let grandparents;
            if (!test || is(node, index, parents[parents.length - 1] || undefined)) {
                // @ts-expect-error: `visitor` is now a visitor.
                result = toResult(visitor(node, parents));
                if (result[0] === EXIT) {
                    return result;
                }
            }
            if ('children' in node && node.children) {
                const nodeAsParent = node;
                if (nodeAsParent.children && result[0] !== SKIP) {
                    offset = (reverse ? nodeAsParent.children.length : -1) + step;
                    grandparents = parents.concat(nodeAsParent);
                    while(offset > -1 && offset < nodeAsParent.children.length){
                        const child = nodeAsParent.children[offset];
                        subresult = factory(child, offset, grandparents)();
                        if (subresult[0] === EXIT) {
                            return subresult;
                        }
                        offset = typeof subresult[1] === 'number' ? subresult[1] : offset + step;
                    }
                }
            }
            return result;
        }
    }
}
/**
 * Turn a return value into a clean result.
 *
 * @param {VisitorResult} value
 *   Valid return values from visitors.
 * @returns {Readonly<ActionTuple>}
 *   Clean result.
 */ function toResult(value) {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'number') {
        return [
            CONTINUE,
            value
        ];
    }
    return value === null || value === undefined ? empty : [
        value
    ];
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-visit/lib/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ // To do: use types from `unist-util-visit-parents` when it’s released.
/**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends Array<any>
 *   ? MatchesOne<Value, Check[keyof Check]>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
 *   Number; capped reasonably.
 */ /**
 * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
 *   Increment a number in the type system.
 * @template {Uint} [I=0]
 *   Index.
 */ /**
 * @typedef {(
 *   Node extends UnistParent
 *   ? Node extends {children: Array<infer Children>}
 *     ? Child extends Children ? Node : never
 *     : never
 *   : never
 * )} InternalParent
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Depth extends Max
 *   ? never
 *   :
 *     | InternalParent<Node, Child>
 *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
 * )} InternalAncestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {(
 *   Tree extends UnistParent
 *     ? Depth extends Max
 *       ? Tree
 *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
 *     : Tree
 * )} InclusiveDescendant
 *   Collect all (inclusive) descendants of `Tree`.
 *
 *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
 *   > recurse without actually running into an infinite loop, which the
 *   > previous version did.
 *   >
 *   > Practically, a max of `2` is typically enough assuming a `Root` is
 *   > passed, but it doesn’t improve performance.
 *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
 *   > Using up to `10` doesn’t hurt or help either.
 * @template {UnistNode} Tree
 *   Tree type.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @callback Visitor
 *   Handle a node (matching `test`, if given).
 *
 *   Visitors are free to transform `node`.
 *   They can also transform `parent`.
 *
 *   Replacing `node` itself, if `SKIP` is not returned, still causes its
 *   descendants to be walked (which is a bug).
 *
 *   When adding or removing previous siblings of `node` (or next siblings, in
 *   case of reverse), the `Visitor` should return a new `Index` to specify the
 *   sibling to traverse after `node` is traversed.
 *   Adding or removing next siblings of `node` (or previous siblings, in case
 *   of reverse) is handled as expected without needing to return a new `Index`.
 *
 *   Removing the children property of `parent` still results in them being
 *   traversed.
 * @param {Visited} node
 *   Found node.
 * @param {Visited extends UnistNode ? number | undefined : never} index
 *   Index of `node` in `parent`.
 * @param {Ancestor extends UnistParent ? Ancestor | undefined : never} parent
 *   Parent of `node`.
 * @returns {VisitorResult}
 *   What to do next.
 *
 *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
 *   An `Action` is treated as a tuple of `[Action]`.
 *
 *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
 *   When the `Action` is `EXIT`, that action can be returned.
 *   When the `Action` is `CONTINUE`, `Index` can be returned.
 * @template {UnistNode} [Visited=UnistNode]
 *   Visited node type.
 * @template {UnistParent} [Ancestor=UnistParent]
 *   Ancestor type.
 */ /**
 * @typedef {Visitor<Visited, Parent<Ancestor, Visited>>} BuildVisitorFromMatch
 *   Build a typed `Visitor` function from a node and all possible parents.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} Visited
 *   Node type.
 * @template {UnistParent} Ancestor
 *   Parent type.
 */ /**
 * @typedef {(
 *   BuildVisitorFromMatch<
 *     Matches<Descendant, Check>,
 *     Extract<Descendant, UnistParent>
 *   >
 * )} BuildVisitorFromDescendants
 *   Build a typed `Visitor` function from a list of descendants and a test.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} Descendant
 *   Node type.
 * @template {Test} Check
 *   Test type.
 */ /**
 * @typedef {(
 *   BuildVisitorFromDescendants<
 *     InclusiveDescendant<Tree>,
 *     Check
 *   >
 * )} BuildVisitor
 *   Build a typed `Visitor` function from a tree and a test.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} [Tree=UnistNode]
 *   Node type.
 * @template {Test} [Check=Test]
 *   Test type.
 */ __turbopack_context__.s({
    "visit": ()=>visit
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-visit-parents/lib/index.js [client] (ecmascript)");
;
;
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
    /** @type {boolean | null | undefined} */ let reverse;
    /** @type {Test} */ let test;
    /** @type {Visitor} */ let visitor;
    if (typeof testOrVisitor === 'function' && typeof visitorOrReverse !== 'function') {
        test = undefined;
        visitor = testOrVisitor;
        reverse = visitorOrReverse;
    } else {
        // @ts-expect-error: assume the overload with test was given.
        test = testOrVisitor;
        // @ts-expect-error: assume the overload with test was given.
        visitor = visitorOrReverse;
        reverse = maybeReverse;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["visitParents"])(tree, test, overload, reverse);
    /**
   * @param {UnistNode} node
   * @param {Array<UnistParent>} parents
   */ function overload(node, parents) {
        const parent = parents[parents.length - 1];
        const index = parent ? parent.children.indexOf(node) : undefined;
        return visitor(node, index, parent);
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-position/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Point} Point
 * @typedef {import('unist').Position} Position
 */ /**
 * @typedef NodeLike
 * @property {string} type
 * @property {PositionLike | null | undefined} [position]
 *
 * @typedef PositionLike
 * @property {PointLike | null | undefined} [start]
 * @property {PointLike | null | undefined} [end]
 *
 * @typedef PointLike
 * @property {number | null | undefined} [line]
 * @property {number | null | undefined} [column]
 * @property {number | null | undefined} [offset]
 */ /**
 * Get the ending point of `node`.
 *
 * @param node
 *   Node.
 * @returns
 *   Point.
 */ __turbopack_context__.s({
    "pointEnd": ()=>pointEnd,
    "pointStart": ()=>pointStart,
    "position": ()=>position
});
const pointEnd = point('end');
const pointStart = point('start');
/**
 * Get the positional info of `node`.
 *
 * @param {'end' | 'start'} type
 *   Side.
 * @returns
 *   Getter.
 */ function point(type) {
    return point;
    //TURBOPACK unreachable
    ;
    /**
   * Get the point info of `node` at a bound side.
   *
   * @param {Node | NodeLike | null | undefined} [node]
   * @returns {Point | undefined}
   */ function point(node) {
        const point = node && node.position && node.position[type] || {};
        if (typeof point.line === 'number' && point.line > 0 && typeof point.column === 'number' && point.column > 0) {
            return {
                line: point.line,
                column: point.column,
                offset: typeof point.offset === 'number' && point.offset > -1 ? point.offset : undefined
            };
        }
    }
}
function position(node) {
    const start = pointStart(node);
    const end = pointEnd(node);
    if (start && end) {
        return {
            start,
            end
        };
    }
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/remark-rehype/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Root as HastRoot} from 'hast'
 * @import {Root as MdastRoot} from 'mdast'
 * @import {Options as ToHastOptions} from 'mdast-util-to-hast'
 * @import {Processor} from 'unified'
 * @import {VFile} from 'vfile'
 */ /**
 * @typedef {Omit<ToHastOptions, 'file'>} Options
 *
 * @callback TransformBridge
 *   Bridge-mode.
 *
 *   Runs the destination with the new hast tree.
 *   Discards result.
 * @param {MdastRoot} tree
 *   Tree.
 * @param {VFile} file
 *   File.
 * @returns {Promise<undefined>}
 *   Nothing.
 *
 * @callback TransformMutate
 *  Mutate-mode.
 *
 *  Further transformers run on the hast tree.
 * @param {MdastRoot} tree
 *   Tree.
 * @param {VFile} file
 *   File.
 * @returns {HastRoot}
 *   Tree (hast).
 */ __turbopack_context__.s({
    "default": ()=>remarkRehype
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$mdast$2d$util$2d$to$2d$hast$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/mdast-util-to-hast/lib/index.js [client] (ecmascript)");
;
function remarkRehype(destination, options) {
    if (destination && 'run' in destination) {
        /**
     * @type {TransformBridge}
     */ return async function(tree, file) {
            // Cast because root in -> root out.
            const hastTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$mdast$2d$util$2d$to$2d$hast$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["toHast"])(tree, {
                file,
                ...options
            });
            await destination.run(hastTree, file);
        };
    }
    /**
   * @type {TransformMutate}
   */ return function(tree, file) {
        // Cast because root in -> root out.
        // To do: in the future, disallow ` || options` fallback.
        // With `unified-engine`, `destination` can be `undefined` but
        // `options` will be the file set.
        // We should not pass that as `options`.
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$mdast$2d$util$2d$to$2d$hast$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["toHast"])(tree, {
            file,
            ...destination || options
        });
    };
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/react-markdown/lib/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @import {Element, Nodes, Parents, Root} from 'hast'
 * @import {Root as MdastRoot} from 'mdast'
 * @import {ComponentType, JSX, ReactElement, ReactNode} from 'react'
 * @import {Options as RemarkRehypeOptions} from 'remark-rehype'
 * @import {BuildVisitor} from 'unist-util-visit'
 * @import {PluggableList, Processor} from 'unified'
 */ /**
 * @callback AllowElement
 *   Filter elements.
 * @param {Readonly<Element>} element
 *   Element to check.
 * @param {number} index
 *   Index of `element` in `parent`.
 * @param {Readonly<Parents> | undefined} parent
 *   Parent of `element`.
 * @returns {boolean | null | undefined}
 *   Whether to allow `element` (default: `false`).
 */ /**
 * @typedef ExtraProps
 *   Extra fields we pass.
 * @property {Element | undefined} [node]
 *   passed when `passNode` is on.
 */ /**
 * @typedef {{
 *   [Key in keyof JSX.IntrinsicElements]?: ComponentType<JSX.IntrinsicElements[Key] & ExtraProps> | keyof JSX.IntrinsicElements
 * }} Components
 *   Map tag names to components.
 */ /**
 * @typedef Deprecation
 *   Deprecation.
 * @property {string} from
 *   Old field.
 * @property {string} id
 *   ID in readme.
 * @property {keyof Options} [to]
 *   New field.
 */ /**
 * @typedef Options
 *   Configuration.
 * @property {AllowElement | null | undefined} [allowElement]
 *   Filter elements (optional);
 *   `allowedElements` / `disallowedElements` is used first.
 * @property {ReadonlyArray<string> | null | undefined} [allowedElements]
 *   Tag names to allow (default: all tag names);
 *   cannot combine w/ `disallowedElements`.
 * @property {string | null | undefined} [children]
 *   Markdown.
 * @property {Components | null | undefined} [components]
 *   Map tag names to components.
 * @property {ReadonlyArray<string> | null | undefined} [disallowedElements]
 *   Tag names to disallow (default: `[]`);
 *   cannot combine w/ `allowedElements`.
 * @property {PluggableList | null | undefined} [rehypePlugins]
 *   List of rehype plugins to use.
 * @property {PluggableList | null | undefined} [remarkPlugins]
 *   List of remark plugins to use.
 * @property {Readonly<RemarkRehypeOptions> | null | undefined} [remarkRehypeOptions]
 *   Options to pass through to `remark-rehype`.
 * @property {boolean | null | undefined} [skipHtml=false]
 *   Ignore HTML in markdown completely (default: `false`).
 * @property {boolean | null | undefined} [unwrapDisallowed=false]
 *   Extract (unwrap) what’s in disallowed elements (default: `false`);
 *   normally when say `strong` is not allowed, it and it’s children are dropped,
 *   with `unwrapDisallowed` the element itself is replaced by its children.
 * @property {UrlTransform | null | undefined} [urlTransform]
 *   Change URLs (default: `defaultUrlTransform`)
 */ /**
 * @typedef HooksOptionsOnly
 *   Configuration specifically for {@linkcode MarkdownHooks}.
 * @property {ReactNode | null | undefined} [fallback]
 *   Content to render while the processor processing the markdown (optional).
 */ /**
 * @typedef {Options & HooksOptionsOnly} HooksOptions
 *   Configuration for {@linkcode MarkdownHooks};
 *   extends the regular {@linkcode Options} with a `fallback` prop.
 */ /**
 * @callback UrlTransform
 *   Transform all URLs.
 * @param {string} url
 *   URL.
 * @param {string} key
 *   Property name (example: `'href'`).
 * @param {Readonly<Element>} node
 *   Node.
 * @returns {string | null | undefined}
 *   Transformed URL (optional).
 */ __turbopack_context__.s({
    "Markdown": ()=>Markdown,
    "MarkdownAsync": ()=>MarkdownAsync,
    "MarkdownHooks": ()=>MarkdownHooks,
    "defaultUrlTransform": ()=>defaultUrlTransform
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/devlop/lib/development.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$hast$2d$util$2d$to$2d$jsx$2d$runtime$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/hast-util-to-jsx-runtime/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$html$2d$url$2d$attributes$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/html-url-attributes/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$react$2f$jsx$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/react/jsx-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$remark$2d$parse$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/remark-parse/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$remark$2d$rehype$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/remark-rehype/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unified$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unified/lib/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/unist-util-visit/lib/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/vfile/lib/index.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const changelog = 'https://github.com/remarkjs/react-markdown/blob/main/changelog.md';
/** @type {PluggableList} */ const emptyPlugins = [];
/** @type {Readonly<RemarkRehypeOptions>} */ const emptyRemarkRehypeOptions = {
    allowDangerousHtml: true
};
const safeProtocol = /^(https?|ircs?|mailto|xmpp)$/i;
// Mutable because we `delete` any time it’s used and a message is sent.
/** @type {ReadonlyArray<Readonly<Deprecation>>} */ const deprecations = [
    {
        from: 'astPlugins',
        id: 'remove-buggy-html-in-markdown-parser'
    },
    {
        from: 'allowDangerousHtml',
        id: 'remove-buggy-html-in-markdown-parser'
    },
    {
        from: 'allowNode',
        id: 'replace-allownode-allowedtypes-and-disallowedtypes',
        to: 'allowElement'
    },
    {
        from: 'allowedTypes',
        id: 'replace-allownode-allowedtypes-and-disallowedtypes',
        to: 'allowedElements'
    },
    {
        from: 'className',
        id: 'remove-classname'
    },
    {
        from: 'disallowedTypes',
        id: 'replace-allownode-allowedtypes-and-disallowedtypes',
        to: 'disallowedElements'
    },
    {
        from: 'escapeHtml',
        id: 'remove-buggy-html-in-markdown-parser'
    },
    {
        from: 'includeElementIndex',
        id: '#remove-includeelementindex'
    },
    {
        from: 'includeNodeIndex',
        id: 'change-includenodeindex-to-includeelementindex'
    },
    {
        from: 'linkTarget',
        id: 'remove-linktarget'
    },
    {
        from: 'plugins',
        id: 'change-plugins-to-remarkplugins',
        to: 'remarkPlugins'
    },
    {
        from: 'rawSourcePos',
        id: '#remove-rawsourcepos'
    },
    {
        from: 'renderers',
        id: 'change-renderers-to-components',
        to: 'components'
    },
    {
        from: 'source',
        id: 'change-source-to-children',
        to: 'children'
    },
    {
        from: 'sourcePos',
        id: '#remove-sourcepos'
    },
    {
        from: 'transformImageUri',
        id: '#add-urltransform',
        to: 'urlTransform'
    },
    {
        from: 'transformLinkUri',
        id: '#add-urltransform',
        to: 'urlTransform'
    }
];
function Markdown(options) {
    const processor = createProcessor(options);
    const file = createFile(options);
    return post(processor.runSync(processor.parse(file), file), options);
}
async function MarkdownAsync(options) {
    const processor = createProcessor(options);
    const file = createFile(options);
    const tree = await processor.run(processor.parse(file), file);
    return post(tree, options);
}
function MarkdownHooks(options) {
    const processor = createProcessor(options);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [tree, setTree] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarkdownHooks.useEffect": function() {
            let cancelled = false;
            const file = createFile(options);
            processor.run(processor.parse(file), file, {
                "MarkdownHooks.useEffect": function(error, tree) {
                    if (!cancelled) {
                        setError(error);
                        setTree(tree);
                    }
                }
            }["MarkdownHooks.useEffect"]);
            /**
       * @returns {undefined}
       *   Nothing.
       */ return ({
                "MarkdownHooks.useEffect": function() {
                    cancelled = true;
                }
            })["MarkdownHooks.useEffect"];
        }
    }["MarkdownHooks.useEffect"], [
        options.children,
        options.rehypePlugins,
        options.remarkPlugins,
        options.remarkRehypeOptions
    ]);
    if (error) throw error;
    return tree ? post(tree, options) : options.fallback;
}
/**
 * Set up the `unified` processor.
 *
 * @param {Readonly<Options>} options
 *   Props.
 * @returns {Processor<MdastRoot, MdastRoot, Root, undefined, undefined>}
 *   Result.
 */ function createProcessor(options) {
    const rehypePlugins = options.rehypePlugins || emptyPlugins;
    const remarkPlugins = options.remarkPlugins || emptyPlugins;
    const remarkRehypeOptions = options.remarkRehypeOptions ? {
        ...options.remarkRehypeOptions,
        ...emptyRemarkRehypeOptions
    } : emptyRemarkRehypeOptions;
    const processor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unified$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unified"])().use(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$remark$2d$parse$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]).use(remarkPlugins).use(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$remark$2d$rehype$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], remarkRehypeOptions).use(rehypePlugins);
    return processor;
}
/**
 * Set up the virtual file.
 *
 * @param {Readonly<Options>} options
 *   Props.
 * @returns {VFile}
 *   Result.
 */ function createFile(options) {
    const children = options.children || '';
    const file = new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$vfile$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["VFile"]();
    if (typeof children === 'string') {
        file.value = children;
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unreachable"])('Unexpected value `' + children + '` for `children` prop, expected `string`');
    }
    return file;
}
/**
 * Process the result from unified some more.
 *
 * @param {Nodes} tree
 *   Tree.
 * @param {Readonly<Options>} options
 *   Props.
 * @returns {ReactElement}
 *   React element.
 */ function post(tree, options) {
    const allowedElements = options.allowedElements;
    const allowElement = options.allowElement;
    const components = options.components;
    const disallowedElements = options.disallowedElements;
    const skipHtml = options.skipHtml;
    const unwrapDisallowed = options.unwrapDisallowed;
    const urlTransform = options.urlTransform || defaultUrlTransform;
    for (const deprecation of deprecations){
        if (Object.hasOwn(options, deprecation.from)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unreachable"])('Unexpected `' + deprecation.from + '` prop, ' + (deprecation.to ? 'use `' + deprecation.to + '` instead' : 'remove it') + ' (see <' + changelog + '#' + deprecation.id + '> for more info)');
        }
    }
    if (allowedElements && disallowedElements) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unreachable"])('Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other');
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(tree, transform);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$hast$2d$util$2d$to$2d$jsx$2d$runtime$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["toJsxRuntime"])(tree, {
        Fragment: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$react$2f$jsx$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"],
        components,
        ignoreInvalidStyle: true,
        jsx: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$react$2f$jsx$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsx"],
        jsxs: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$react$2f$jsx$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxs"],
        passKeys: true,
        passNode: true
    });
    //TURBOPACK unreachable
    ;
    /** @type {BuildVisitor<Root>} */ function transform(node, index, parent) {
        if (node.type === 'raw' && parent && typeof index === 'number') {
            if (skipHtml) {
                parent.children.splice(index, 1);
            } else {
                parent.children[index] = {
                    type: 'text',
                    value: node.value
                };
            }
            return index;
        }
        if (node.type === 'element') {
            /** @type {string} */ let key;
            for(key in __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$html$2d$url$2d$attributes$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["urlAttributes"]){
                if (Object.hasOwn(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$html$2d$url$2d$attributes$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["urlAttributes"], key) && Object.hasOwn(node.properties, key)) {
                    const value = node.properties[key];
                    const test = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$html$2d$url$2d$attributes$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["urlAttributes"][key];
                    if (test === null || test.includes(node.tagName)) {
                        node.properties[key] = urlTransform(String(value || ''), key, node);
                    }
                }
            }
        }
        if (node.type === 'element') {
            let remove = allowedElements ? !allowedElements.includes(node.tagName) : disallowedElements ? disallowedElements.includes(node.tagName) : false;
            if (!remove && allowElement && typeof index === 'number') {
                remove = !allowElement(node, index, parent);
            }
            if (remove && parent && typeof index === 'number') {
                if (unwrapDisallowed && node.children) {
                    parent.children.splice(index, 1, ...node.children);
                } else {
                    parent.children.splice(index, 1);
                }
                return index;
            }
        }
    }
}
function defaultUrlTransform(value) {
    // Same as:
    // <https://github.com/micromark/micromark/blob/929275e/packages/micromark-util-sanitize-uri/dev/index.js#L34>
    // But without the `encode` part.
    const colon = value.indexOf(':');
    const questionMark = value.indexOf('?');
    const numberSign = value.indexOf('#');
    const slash = value.indexOf('/');
    if (// If there is no protocol, it’s relative.
    colon === -1 || slash !== -1 && colon > slash || questionMark !== -1 && colon > questionMark || numberSign !== -1 && colon > numberSign || // It is a protocol, it should be allowed.
    safeProtocol.test(value.slice(0, colon))) {
        return value;
    }
    return '';
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/react-markdown/lib/index.js [client] (ecmascript) <export Markdown as default>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Markdown"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$react$2d$ui$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/react-ui/node_modules/react-markdown/lib/index.js [client] (ecmascript)");
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/native.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const __TURBOPACK__default__export__ = {
    randomUUID
};
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/rng.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
__turbopack_context__.s({
    "default": ()=>rng
});
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
    }
    return getRandomValues(rnds8);
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/regex.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/validate.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/regex.js [client] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/stringify.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__,
    "unsafeStringify": ()=>unsafeStringify
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/validate.js [client] (ecmascript)");
;
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var byteToHex = [];
for(var i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr) {
    let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    //
    // Note to future-self: No, you can't remove the `toLowerCase()` call.
    // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr) {
    let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = unsafeStringify(arr, offset);
    // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v4.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/native.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/rng.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/stringify.js [client] (ecmascript)");
;
;
;
function v4(options, buf, offset) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].randomUUID && !buf && !options) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].randomUUID();
    }
    options = options || {};
    var rnds = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])();
    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(var i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unsafeStringify"])(rnds);
}
const __TURBOPACK__default__export__ = v4;
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v4.js [client] (ecmascript) <export default as v4>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "v4": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v4.js [client] (ecmascript)");
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/validate.js [client] (ecmascript) <export default as validate>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "validate": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/validate.js [client] (ecmascript)");
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/parse.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/validate.js [client] (ecmascript)");
;
function parse(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    var v;
    var arr = new Uint8Array(16);
    // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff;
    // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff;
    // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff;
    // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff;
    // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
const __TURBOPACK__default__export__ = parse;
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v35.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "DNS": ()=>DNS,
    "URL": ()=>URL,
    "default": ()=>v35
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/stringify.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/parse.js [client] (ecmascript)");
;
;
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    var bytes = [];
    for(var i = 0; i < str.length; ++i){
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === 'string') {
            value = stringToBytes(value);
        }
        if (typeof namespace === 'string') {
            namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(namespace);
        }
        if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
            throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
        }
        // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        var bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(var i = 0; i < 16; ++i){
                buf[offset + i] = bytes[i];
            }
            return buf;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unsafeStringify"])(bytes);
    }
    // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name;
    } catch (err) {}
    // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/sha1.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
function f(s, x, y, z) {
    switch(s){
        case 0:
            return x & y ^ ~x & z;
        case 1:
            return x ^ y ^ z;
        case 2:
            return x & y ^ x & z ^ y & z;
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return x << n | x >>> 32 - n;
}
function sha1(bytes) {
    var K = [
        0x5a827999,
        0x6ed9eba1,
        0x8f1bbcdc,
        0xca62c1d6
    ];
    var H = [
        0x67452301,
        0xefcdab89,
        0x98badcfe,
        0x10325476,
        0xc3d2e1f0
    ];
    if (typeof bytes === 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = [];
        for(var i = 0; i < msg.length; ++i){
            bytes.push(msg.charCodeAt(i));
        }
    } else if (!Array.isArray(bytes)) {
        // Convert Array-like to Array
        bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(0x80);
    var l = bytes.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    for(var _i = 0; _i < N; ++_i){
        var arr = new Uint32Array(16);
        for(var j = 0; j < 16; ++j){
            arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
        }
        M[_i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
    for(var _i2 = 0; _i2 < N; ++_i2){
        var W = new Uint32Array(80);
        for(var t = 0; t < 16; ++t){
            W[t] = M[_i2][t];
        }
        for(var _t = 16; _t < 80; ++_t){
            W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
        }
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        for(var _t2 = 0; _t2 < 80; ++_t2){
            var s = Math.floor(_t2 / 20);
            var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
    }
    return [
        H[0] >> 24 & 0xff,
        H[0] >> 16 & 0xff,
        H[0] >> 8 & 0xff,
        H[0] & 0xff,
        H[1] >> 24 & 0xff,
        H[1] >> 16 & 0xff,
        H[1] >> 8 & 0xff,
        H[1] & 0xff,
        H[2] >> 24 & 0xff,
        H[2] >> 16 & 0xff,
        H[2] >> 8 & 0xff,
        H[2] & 0xff,
        H[3] >> 24 & 0xff,
        H[3] >> 16 & 0xff,
        H[3] >> 8 & 0xff,
        H[3] & 0xff,
        H[4] >> 24 & 0xff,
        H[4] >> 16 & 0xff,
        H[4] >> 8 & 0xff,
        H[4] & 0xff
    ];
}
const __TURBOPACK__default__export__ = sha1;
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v5.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v35.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$sha1$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/sha1.js [client] (ecmascript)");
;
;
var v5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])('v5', 0x50, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$sha1$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v5;
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v5.js [client] (ecmascript) <export default as v5>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "v5": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/node_modules/uuid/dist/esm-browser/v5.js [client] (ecmascript)");
}),
}]);

//# sourceMappingURL=585df_%40copilotkit_a2063266._.js.map