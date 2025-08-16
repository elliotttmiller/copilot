(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-WM3ARNBD.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/graphql/@generated/graphql.ts
__turbopack_context__.s({
    "ActionInputAvailability": ()=>ActionInputAvailability,
    "AvailableAgentsDocument": ()=>AvailableAgentsDocument,
    "CopilotRequestType": ()=>CopilotRequestType,
    "FailedResponseStatusReason": ()=>FailedResponseStatusReason,
    "GenerateCopilotResponseDocument": ()=>GenerateCopilotResponseDocument,
    "LoadAgentStateDocument": ()=>LoadAgentStateDocument,
    "MessageRole": ()=>MessageRole,
    "MessageStatusCode": ()=>MessageStatusCode,
    "MetaEventName": ()=>MetaEventName,
    "ResponseStatusCode": ()=>ResponseStatusCode
});
var ActionInputAvailability = /* @__PURE__ */ ((ActionInputAvailability2)=>{
    ActionInputAvailability2["Disabled"] = "disabled";
    ActionInputAvailability2["Enabled"] = "enabled";
    ActionInputAvailability2["Remote"] = "remote";
    return ActionInputAvailability2;
})(ActionInputAvailability || {});
var CopilotRequestType = /* @__PURE__ */ ((CopilotRequestType2)=>{
    CopilotRequestType2["Chat"] = "Chat";
    CopilotRequestType2["Suggestion"] = "Suggestion";
    CopilotRequestType2["Task"] = "Task";
    CopilotRequestType2["TextareaCompletion"] = "TextareaCompletion";
    CopilotRequestType2["TextareaPopover"] = "TextareaPopover";
    return CopilotRequestType2;
})(CopilotRequestType || {});
var FailedResponseStatusReason = /* @__PURE__ */ ((FailedResponseStatusReason2)=>{
    FailedResponseStatusReason2["GuardrailsValidationFailed"] = "GUARDRAILS_VALIDATION_FAILED";
    FailedResponseStatusReason2["MessageStreamInterrupted"] = "MESSAGE_STREAM_INTERRUPTED";
    FailedResponseStatusReason2["UnknownError"] = "UNKNOWN_ERROR";
    return FailedResponseStatusReason2;
})(FailedResponseStatusReason || {});
var MessageRole = /* @__PURE__ */ ((MessageRole2)=>{
    MessageRole2["Assistant"] = "assistant";
    MessageRole2["Developer"] = "developer";
    MessageRole2["System"] = "system";
    MessageRole2["Tool"] = "tool";
    MessageRole2["User"] = "user";
    return MessageRole2;
})(MessageRole || {});
var MessageStatusCode = /* @__PURE__ */ ((MessageStatusCode2)=>{
    MessageStatusCode2["Failed"] = "Failed";
    MessageStatusCode2["Pending"] = "Pending";
    MessageStatusCode2["Success"] = "Success";
    return MessageStatusCode2;
})(MessageStatusCode || {});
var MetaEventName = /* @__PURE__ */ ((MetaEventName2)=>{
    MetaEventName2["CopilotKitLangGraphInterruptEvent"] = "CopilotKitLangGraphInterruptEvent";
    MetaEventName2["LangGraphInterruptEvent"] = "LangGraphInterruptEvent";
    return MetaEventName2;
})(MetaEventName || {});
var ResponseStatusCode = /* @__PURE__ */ ((ResponseStatusCode2)=>{
    ResponseStatusCode2["Failed"] = "Failed";
    ResponseStatusCode2["Pending"] = "Pending";
    ResponseStatusCode2["Success"] = "Success";
    return ResponseStatusCode2;
})(ResponseStatusCode || {});
var GenerateCopilotResponseDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "generateCopilotResponse"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "data"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "GenerateCopilotResponseInput"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "properties"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "JSONObject"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "generateCopilotResponse"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "data"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "data"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "properties"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "properties"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "threadId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "runId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "extensions"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "openaiAssistantAPI"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "runId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "threadId"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "kind": "InlineFragment",
                                    "typeCondition": {
                                        "kind": "NamedType",
                                        "name": {
                                            "kind": "Name",
                                            "value": "CopilotResponse"
                                        }
                                    },
                                    "directives": [
                                        {
                                            "kind": "Directive",
                                            "name": {
                                                "kind": "Name",
                                                "value": "defer"
                                            }
                                        }
                                    ],
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "status"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "InlineFragment",
                                                            "typeCondition": {
                                                                "kind": "NamedType",
                                                                "name": {
                                                                    "kind": "Name",
                                                                    "value": "BaseResponseStatus"
                                                                }
                                                            },
                                                            "selectionSet": {
                                                                "kind": "SelectionSet",
                                                                "selections": [
                                                                    {
                                                                        "kind": "Field",
                                                                        "name": {
                                                                            "kind": "Name",
                                                                            "value": "code"
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            "kind": "InlineFragment",
                                                            "typeCondition": {
                                                                "kind": "NamedType",
                                                                "name": {
                                                                    "kind": "Name",
                                                                    "value": "FailedResponseStatus"
                                                                }
                                                            },
                                                            "selectionSet": {
                                                                "kind": "SelectionSet",
                                                                "selections": [
                                                                    {
                                                                        "kind": "Field",
                                                                        "name": {
                                                                            "kind": "Name",
                                                                            "value": "reason"
                                                                        }
                                                                    },
                                                                    {
                                                                        "kind": "Field",
                                                                        "name": {
                                                                            "kind": "Name",
                                                                            "value": "details"
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "messages"
                                    },
                                    "directives": [
                                        {
                                            "kind": "Directive",
                                            "name": {
                                                "kind": "Name",
                                                "value": "stream"
                                            }
                                        }
                                    ],
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "__typename"
                                                }
                                            },
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "BaseMessageOutput"
                                                    }
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "createdAt"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "BaseMessageOutput"
                                                    }
                                                },
                                                "directives": [
                                                    {
                                                        "kind": "Directive",
                                                        "name": {
                                                            "kind": "Name",
                                                            "value": "defer"
                                                        }
                                                    }
                                                ],
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "status"
                                                            },
                                                            "selectionSet": {
                                                                "kind": "SelectionSet",
                                                                "selections": [
                                                                    {
                                                                        "kind": "InlineFragment",
                                                                        "typeCondition": {
                                                                            "kind": "NamedType",
                                                                            "name": {
                                                                                "kind": "Name",
                                                                                "value": "SuccessMessageStatus"
                                                                            }
                                                                        },
                                                                        "selectionSet": {
                                                                            "kind": "SelectionSet",
                                                                            "selections": [
                                                                                {
                                                                                    "kind": "Field",
                                                                                    "name": {
                                                                                        "kind": "Name",
                                                                                        "value": "code"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        "kind": "InlineFragment",
                                                                        "typeCondition": {
                                                                            "kind": "NamedType",
                                                                            "name": {
                                                                                "kind": "Name",
                                                                                "value": "FailedMessageStatus"
                                                                            }
                                                                        },
                                                                        "selectionSet": {
                                                                            "kind": "SelectionSet",
                                                                            "selections": [
                                                                                {
                                                                                    "kind": "Field",
                                                                                    "name": {
                                                                                        "kind": "Name",
                                                                                        "value": "code"
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "kind": "Field",
                                                                                    "name": {
                                                                                        "kind": "Name",
                                                                                        "value": "reason"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        "kind": "InlineFragment",
                                                                        "typeCondition": {
                                                                            "kind": "NamedType",
                                                                            "name": {
                                                                                "kind": "Name",
                                                                                "value": "PendingMessageStatus"
                                                                            }
                                                                        },
                                                                        "selectionSet": {
                                                                            "kind": "SelectionSet",
                                                                            "selections": [
                                                                                {
                                                                                    "kind": "Field",
                                                                                    "name": {
                                                                                        "kind": "Name",
                                                                                        "value": "code"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "TextMessageOutput"
                                                    }
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "content"
                                                            },
                                                            "directives": [
                                                                {
                                                                    "kind": "Directive",
                                                                    "name": {
                                                                        "kind": "Name",
                                                                        "value": "stream"
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "role"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "parentMessageId"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "ImageMessageOutput"
                                                    }
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "format"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "bytes"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "role"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "parentMessageId"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "ActionExecutionMessageOutput"
                                                    }
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "name"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "arguments"
                                                            },
                                                            "directives": [
                                                                {
                                                                    "kind": "Directive",
                                                                    "name": {
                                                                        "kind": "Name",
                                                                        "value": "stream"
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "parentMessageId"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "ResultMessageOutput"
                                                    }
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "result"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "actionExecutionId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "actionName"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "AgentStateMessageOutput"
                                                    }
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "threadId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "state"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "running"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "agentName"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "nodeName"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "runId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "active"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "role"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "metaEvents"
                                    },
                                    "directives": [
                                        {
                                            "kind": "Directive",
                                            "name": {
                                                "kind": "Name",
                                                "value": "stream"
                                            }
                                        }
                                    ],
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "LangGraphInterruptEvent"
                                                    }
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "type"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "name"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "value"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "InlineFragment",
                                                "typeCondition": {
                                                    "kind": "NamedType",
                                                    "name": {
                                                        "kind": "Name",
                                                        "value": "CopilotKitLangGraphInterruptEvent"
                                                    }
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "type"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "name"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "data"
                                                            },
                                                            "selectionSet": {
                                                                "kind": "SelectionSet",
                                                                "selections": [
                                                                    {
                                                                        "kind": "Field",
                                                                        "name": {
                                                                            "kind": "Name",
                                                                            "value": "messages"
                                                                        },
                                                                        "selectionSet": {
                                                                            "kind": "SelectionSet",
                                                                            "selections": [
                                                                                {
                                                                                    "kind": "Field",
                                                                                    "name": {
                                                                                        "kind": "Name",
                                                                                        "value": "__typename"
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "kind": "InlineFragment",
                                                                                    "typeCondition": {
                                                                                        "kind": "NamedType",
                                                                                        "name": {
                                                                                            "kind": "Name",
                                                                                            "value": "BaseMessageOutput"
                                                                                        }
                                                                                    },
                                                                                    "selectionSet": {
                                                                                        "kind": "SelectionSet",
                                                                                        "selections": [
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "id"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "createdAt"
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "kind": "InlineFragment",
                                                                                    "typeCondition": {
                                                                                        "kind": "NamedType",
                                                                                        "name": {
                                                                                            "kind": "Name",
                                                                                            "value": "BaseMessageOutput"
                                                                                        }
                                                                                    },
                                                                                    "directives": [
                                                                                        {
                                                                                            "kind": "Directive",
                                                                                            "name": {
                                                                                                "kind": "Name",
                                                                                                "value": "defer"
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "selectionSet": {
                                                                                        "kind": "SelectionSet",
                                                                                        "selections": [
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "status"
                                                                                                },
                                                                                                "selectionSet": {
                                                                                                    "kind": "SelectionSet",
                                                                                                    "selections": [
                                                                                                        {
                                                                                                            "kind": "InlineFragment",
                                                                                                            "typeCondition": {
                                                                                                                "kind": "NamedType",
                                                                                                                "name": {
                                                                                                                    "kind": "Name",
                                                                                                                    "value": "SuccessMessageStatus"
                                                                                                                }
                                                                                                            },
                                                                                                            "selectionSet": {
                                                                                                                "kind": "SelectionSet",
                                                                                                                "selections": [
                                                                                                                    {
                                                                                                                        "kind": "Field",
                                                                                                                        "name": {
                                                                                                                            "kind": "Name",
                                                                                                                            "value": "code"
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            "kind": "InlineFragment",
                                                                                                            "typeCondition": {
                                                                                                                "kind": "NamedType",
                                                                                                                "name": {
                                                                                                                    "kind": "Name",
                                                                                                                    "value": "FailedMessageStatus"
                                                                                                                }
                                                                                                            },
                                                                                                            "selectionSet": {
                                                                                                                "kind": "SelectionSet",
                                                                                                                "selections": [
                                                                                                                    {
                                                                                                                        "kind": "Field",
                                                                                                                        "name": {
                                                                                                                            "kind": "Name",
                                                                                                                            "value": "code"
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "kind": "Field",
                                                                                                                        "name": {
                                                                                                                            "kind": "Name",
                                                                                                                            "value": "reason"
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            "kind": "InlineFragment",
                                                                                                            "typeCondition": {
                                                                                                                "kind": "NamedType",
                                                                                                                "name": {
                                                                                                                    "kind": "Name",
                                                                                                                    "value": "PendingMessageStatus"
                                                                                                                }
                                                                                                            },
                                                                                                            "selectionSet": {
                                                                                                                "kind": "SelectionSet",
                                                                                                                "selections": [
                                                                                                                    {
                                                                                                                        "kind": "Field",
                                                                                                                        "name": {
                                                                                                                            "kind": "Name",
                                                                                                                            "value": "code"
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "kind": "InlineFragment",
                                                                                    "typeCondition": {
                                                                                        "kind": "NamedType",
                                                                                        "name": {
                                                                                            "kind": "Name",
                                                                                            "value": "TextMessageOutput"
                                                                                        }
                                                                                    },
                                                                                    "selectionSet": {
                                                                                        "kind": "SelectionSet",
                                                                                        "selections": [
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "content"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "role"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "parentMessageId"
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "kind": "InlineFragment",
                                                                                    "typeCondition": {
                                                                                        "kind": "NamedType",
                                                                                        "name": {
                                                                                            "kind": "Name",
                                                                                            "value": "ActionExecutionMessageOutput"
                                                                                        }
                                                                                    },
                                                                                    "selectionSet": {
                                                                                        "kind": "SelectionSet",
                                                                                        "selections": [
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "name"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "arguments"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "parentMessageId"
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "kind": "InlineFragment",
                                                                                    "typeCondition": {
                                                                                        "kind": "NamedType",
                                                                                        "name": {
                                                                                            "kind": "Name",
                                                                                            "value": "ResultMessageOutput"
                                                                                        }
                                                                                    },
                                                                                    "selectionSet": {
                                                                                        "kind": "SelectionSet",
                                                                                        "selections": [
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "result"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "actionExecutionId"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "kind": "Field",
                                                                                                "name": {
                                                                                                    "kind": "Name",
                                                                                                    "value": "actionName"
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        "kind": "Field",
                                                                        "name": {
                                                                            "kind": "Name",
                                                                            "value": "value"
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
var AvailableAgentsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "availableAgents"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "availableAgents"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "agents"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "name"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "id"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "description"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
var LoadAgentStateDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "loadAgentState"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "data"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "LoadAgentStateInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "loadAgentState"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "data"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "data"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "threadId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "threadExists"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "state"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "messages"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
;
 //# sourceMappingURL=chunk-WM3ARNBD.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-4KTMZMM2.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "graphql": ()=>graphql
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$WM3ARNBD$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-WM3ARNBD.mjs [client] (ecmascript)");
;
// src/graphql/@generated/gql.ts
var documents = {
    "\n  mutation generateCopilotResponse($data: GenerateCopilotResponseInput!, $properties: JSONObject) {\n    generateCopilotResponse(data: $data, properties: $properties) {\n      threadId\n      runId\n      extensions {\n        openaiAssistantAPI {\n          runId\n          threadId\n        }\n      }\n      ... on CopilotResponse @defer {\n        status {\n          ... on BaseResponseStatus {\n            code\n          }\n          ... on FailedResponseStatus {\n            reason\n            details\n          }\n        }\n      }\n      messages @stream {\n        __typename\n        ... on BaseMessageOutput {\n          id\n          createdAt\n        }\n        ... on BaseMessageOutput @defer {\n          status {\n            ... on SuccessMessageStatus {\n              code\n            }\n            ... on FailedMessageStatus {\n              code\n              reason\n            }\n            ... on PendingMessageStatus {\n              code\n            }\n          }\n        }\n        ... on TextMessageOutput {\n          content @stream\n          role\n          parentMessageId\n        }\n        ... on ImageMessageOutput {\n          format\n          bytes\n          role\n          parentMessageId\n        }\n        ... on ActionExecutionMessageOutput {\n          name\n          arguments @stream\n          parentMessageId\n        }\n        ... on ResultMessageOutput {\n          result\n          actionExecutionId\n          actionName\n        }\n        ... on AgentStateMessageOutput {\n          threadId\n          state\n          running\n          agentName\n          nodeName\n          runId\n          active\n          role\n        }\n      }\n      metaEvents @stream {\n        ... on LangGraphInterruptEvent {\n          type\n          name\n          value\n        }\n\n        ... on CopilotKitLangGraphInterruptEvent {\n          type\n          name\n          data {\n            messages {\n              __typename\n              ... on BaseMessageOutput {\n                id\n                createdAt\n              }\n              ... on BaseMessageOutput @defer {\n                status {\n                  ... on SuccessMessageStatus {\n                    code\n                  }\n                  ... on FailedMessageStatus {\n                    code\n                    reason\n                  }\n                  ... on PendingMessageStatus {\n                    code\n                  }\n                }\n              }\n              ... on TextMessageOutput {\n                content\n                role\n                parentMessageId\n              }\n              ... on ActionExecutionMessageOutput {\n                name\n                arguments\n                parentMessageId\n              }\n              ... on ResultMessageOutput {\n                result\n                actionExecutionId\n                actionName\n              }\n            }\n            value\n          }\n        }\n      }\n    }\n  }\n": __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$WM3ARNBD$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GenerateCopilotResponseDocument"],
    "\n  query availableAgents {\n    availableAgents {\n      agents {\n        name\n        id\n        description\n      }\n    }\n  }\n": __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$WM3ARNBD$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AvailableAgentsDocument"],
    "\n  query loadAgentState($data: LoadAgentStateInput!) {\n    loadAgentState(data: $data) {\n      threadId\n      threadExists\n      state\n      messages\n    }\n  }\n": __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$WM3ARNBD$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["LoadAgentStateDocument"]
};
function graphql(source) {
    var _documents_source;
    return (_documents_source = documents[source]) !== null && _documents_source !== void 0 ? _documents_source : {};
}
;
 //# sourceMappingURL=chunk-4KTMZMM2.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-X2UAP3QY.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getAvailableAgentsQuery": ()=>getAvailableAgentsQuery,
    "loadAgentStateQuery": ()=>loadAgentStateQuery
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$4KTMZMM2$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-4KTMZMM2.mjs [client] (ecmascript)");
;
// src/graphql/definitions/queries.ts
var getAvailableAgentsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$4KTMZMM2$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["graphql"])("\n  query availableAgents {\n    availableAgents {\n      agents {\n        name\n        id\n        description\n      }\n    }\n  }\n");
var loadAgentStateQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$4KTMZMM2$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["graphql"])("\n  query loadAgentState($data: LoadAgentStateInput!) {\n    loadAgentState(data: $data) {\n      threadId\n      threadExists\n      state\n      messages\n    }\n  }\n");
;
 //# sourceMappingURL=chunk-X2UAP3QY.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-HEODM5TW.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "generateCopilotResponseMutation": ()=>generateCopilotResponseMutation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$4KTMZMM2$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-4KTMZMM2.mjs [client] (ecmascript)");
;
// src/graphql/definitions/mutations.ts
var generateCopilotResponseMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$4KTMZMM2$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["graphql"])("\n  mutation generateCopilotResponse($data: GenerateCopilotResponseInput!, $properties: JSONObject) {\n    generateCopilotResponse(data: $data, properties: $properties) {\n      threadId\n      runId\n      extensions {\n        openaiAssistantAPI {\n          runId\n          threadId\n        }\n      }\n      ... on CopilotResponse @defer {\n        status {\n          ... on BaseResponseStatus {\n            code\n          }\n          ... on FailedResponseStatus {\n            reason\n            details\n          }\n        }\n      }\n      messages @stream {\n        __typename\n        ... on BaseMessageOutput {\n          id\n          createdAt\n        }\n        ... on BaseMessageOutput @defer {\n          status {\n            ... on SuccessMessageStatus {\n              code\n            }\n            ... on FailedMessageStatus {\n              code\n              reason\n            }\n            ... on PendingMessageStatus {\n              code\n            }\n          }\n        }\n        ... on TextMessageOutput {\n          content @stream\n          role\n          parentMessageId\n        }\n        ... on ImageMessageOutput {\n          format\n          bytes\n          role\n          parentMessageId\n        }\n        ... on ActionExecutionMessageOutput {\n          name\n          arguments @stream\n          parentMessageId\n        }\n        ... on ResultMessageOutput {\n          result\n          actionExecutionId\n          actionName\n        }\n        ... on AgentStateMessageOutput {\n          threadId\n          state\n          running\n          agentName\n          nodeName\n          runId\n          active\n          role\n        }\n      }\n      metaEvents @stream {\n        ... on LangGraphInterruptEvent {\n          type\n          name\n          value\n        }\n\n        ... on CopilotKitLangGraphInterruptEvent {\n          type\n          name\n          data {\n            messages {\n              __typename\n              ... on BaseMessageOutput {\n                id\n                createdAt\n              }\n              ... on BaseMessageOutput @defer {\n                status {\n                  ... on SuccessMessageStatus {\n                    code\n                  }\n                  ... on FailedMessageStatus {\n                    code\n                    reason\n                  }\n                  ... on PendingMessageStatus {\n                    code\n                  }\n                }\n              }\n              ... on TextMessageOutput {\n                content\n                role\n                parentMessageId\n              }\n              ... on ActionExecutionMessageOutput {\n                name\n                arguments\n                parentMessageId\n              }\n              ... on ResultMessageOutput {\n                result\n                actionExecutionId\n                actionName\n              }\n            }\n            value\n          }\n        }\n      }\n    }\n  }\n");
;
 //# sourceMappingURL=chunk-HEODM5TW.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-Y5FRUG6J.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CopilotRuntimeClient": ()=>CopilotRuntimeClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$X2UAP3QY$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-X2UAP3QY.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$HEODM5TW$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-HEODM5TW.mjs [client] (ecmascript)");
// src/client/CopilotRuntimeClient.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$urql$2f$core$2f$dist$2f$urql$2d$core$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@urql/core/dist/urql-core.mjs [client] (ecmascript) <locals>");
// src/client/CopilotRuntimeClient.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-QBDBRDYF.mjs [client] (ecmascript)");
;
;
;
// package.json
var version = "1.10.2";
;
var createFetchFn = (signal, handleGQLWarning)=>async function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        var _a, _b;
        const publicApiKey = (_b = (_a = args[1]) == null ? void 0 : _a.headers) == null ? void 0 : _b["x-copilotcloud-public-api-key"];
        try {
            var _args_;
            const result = await fetch(args[0], {
                ...(_args_ = args[1]) !== null && _args_ !== void 0 ? _args_ : {},
                signal
            });
            const mismatch = publicApiKey ? null : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["getPossibleVersionMismatch"])({
                runtimeVersion: result.headers.get("X-CopilotKit-Runtime-Version"),
                runtimeClientGqlVersion: version
            });
            if (result.status !== 200) {
                if (result.status >= 400 && result.status <= 500) {
                    if (mismatch) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["CopilotKitVersionMismatchError"](mismatch);
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ResolvedCopilotKitError"]({
                        status: result.status
                    });
                }
            }
            if (mismatch && handleGQLWarning) {
                handleGQLWarning(mismatch.message);
            }
            return result;
        } catch (error) {
            if (error.message.includes("BodyStreamBuffer was aborted") || error.message.includes("signal is aborted without reason")) {
                throw error;
            }
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["CopilotKitError"]) {
                throw error;
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["CopilotKitLowLevelError"]({
                error,
                url: args[0]
            });
        }
    };
var CopilotRuntimeClient = class {
    generateCopilotResponse(param) {
        let { data, properties, signal } = param;
        const fetchFn = createFetchFn(signal, this.handleGQLWarning);
        const result = this.client.mutation(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$HEODM5TW$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["generateCopilotResponseMutation"], {
            data,
            properties
        }, {
            fetch: fetchFn
        });
        result.subscribe((param)=>{
            let { error } = param;
            if (error && this.handleGQLErrors) {
                this.handleGQLErrors(error);
            }
        });
        return result;
    }
    asStream(source) {
        const handleGQLErrors = this.handleGQLErrors;
        return new ReadableStream({
            start (controller) {
                source.subscribe((param)=>{
                    let { data, hasNext, error } = param;
                    var _a;
                    if (error) {
                        if (error.message.includes("BodyStreamBuffer was aborted") || error.message.includes("signal is aborted without reason")) {
                            if (!hasNext) controller.close();
                            console.warn("Abort error suppressed");
                            return;
                        }
                        if ((_a = error.extensions) == null ? void 0 : _a.visibility) {
                            const syntheticError = {
                                ...error,
                                graphQLErrors: [
                                    {
                                        message: error.message,
                                        extensions: error.extensions
                                    }
                                ]
                            };
                            if (handleGQLErrors) {
                                handleGQLErrors(syntheticError);
                            }
                            return;
                        }
                        controller.error(error);
                        if (handleGQLErrors) {
                            handleGQLErrors(error);
                        }
                    } else {
                        controller.enqueue(data);
                        if (!hasNext) {
                            controller.close();
                        }
                    }
                });
            }
        });
    }
    availableAgents() {
        const fetchFn = createFetchFn();
        return this.client.query(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$X2UAP3QY$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["getAvailableAgentsQuery"], {}, {
            fetch: fetchFn
        });
    }
    loadAgentState(data) {
        const fetchFn = createFetchFn();
        const result = this.client.query(__TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$X2UAP3QY$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["loadAgentStateQuery"], {
            data
        }, {
            fetch: fetchFn
        });
        result.toPromise().then((param)=>{
            let { error } = param;
            if (error && this.handleGQLErrors) {
                this.handleGQLErrors(error);
            }
        }).catch(()=>{});
        return result;
    }
    static removeGraphQLTypename(data) {
        if (Array.isArray(data)) {
            data.forEach((item)=>CopilotRuntimeClient.removeGraphQLTypename(item));
        } else if (typeof data === "object" && data !== null) {
            delete data.__typename;
            Object.keys(data).forEach((key)=>{
                if (typeof data[key] === "object" && data[key] !== null) {
                    CopilotRuntimeClient.removeGraphQLTypename(data[key]);
                }
            });
        }
        return data;
    }
    constructor(options){
        const headers = {};
        this.handleGQLErrors = options.handleGQLErrors;
        this.handleGQLWarning = options.handleGQLWarning;
        if (options.headers) {
            Object.assign(headers, options.headers);
        }
        if (options.publicApiKey) {
            headers["x-copilotcloud-public-api-key"] = options.publicApiKey;
        }
        this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$urql$2f$core$2f$dist$2f$urql$2d$core$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Client"]({
            url: options.url,
            exchanges: [
                __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$urql$2f$core$2f$dist$2f$urql$2d$core$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cacheExchange"],
                __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$urql$2f$core$2f$dist$2f$urql$2d$core$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fetchExchange"]
            ],
            fetchOptions: {
                headers: {
                    ...headers,
                    "X-CopilotKit-Runtime-Client-GQL-Version": version
                },
                ...options.credentials ? {
                    credentials: options.credentials
                } : {}
            }
        });
    }
};
;
 //# sourceMappingURL=chunk-Y5FRUG6J.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-ROUIRR4B.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ActionExecutionMessage": ()=>ActionExecutionMessage,
    "AgentStateMessage": ()=>AgentStateMessage,
    "ImageMessage": ()=>ImageMessage,
    "Message": ()=>Message,
    "ResultMessage": ()=>ResultMessage,
    "Role": ()=>Role,
    "TextMessage": ()=>TextMessage,
    "langGraphInterruptEvent": ()=>langGraphInterruptEvent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$WM3ARNBD$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-WM3ARNBD.mjs [client] (ecmascript)");
// src/client/types.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$VNNKZIFB$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-VNNKZIFB.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-QBDBRDYF.mjs [client] (ecmascript)");
;
;
;
var Message = class {
    isTextMessage() {
        return this.type === "TextMessage";
    }
    isActionExecutionMessage() {
        return this.type === "ActionExecutionMessage";
    }
    isResultMessage() {
        return this.type === "ResultMessage";
    }
    isAgentStateMessage() {
        return this.type === "AgentStateMessage";
    }
    isImageMessage() {
        return this.type === "ImageMessage";
    }
    constructor(props){
        var _props_id;
        (_props_id = props.id) !== null && _props_id !== void 0 ? _props_id : props.id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$VNNKZIFB$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["randomId"])();
        var _props_status;
        (_props_status = props.status) !== null && _props_status !== void 0 ? _props_status : props.status = {
            code: "Success" /* Success */ 
        };
        var _props_createdAt;
        (_props_createdAt = props.createdAt) !== null && _props_createdAt !== void 0 ? _props_createdAt : props.createdAt = /* @__PURE__ */ new Date();
        Object.assign(this, props);
    }
};
var Role = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$WM3ARNBD$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["MessageRole"];
var TextMessage = class extends Message {
    constructor(props){
        super(props);
        this.type = "TextMessage";
    }
};
var ActionExecutionMessage = class extends Message {
    constructor(props){
        super(props);
        this.type = "ActionExecutionMessage";
    }
};
var ResultMessage = class extends Message {
    static decodeResult(result) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["parseJson"])(result, result);
    }
    static encodeResult(result) {
        if (result === void 0) {
            return "";
        } else if (typeof result === "string") {
            return result;
        } else {
            return JSON.stringify(result);
        }
    }
    constructor(props){
        super(props);
        this.type = "ResultMessage";
    }
};
var AgentStateMessage = class extends Message {
    constructor(props){
        super(props);
        this.type = "AgentStateMessage";
    }
};
var ImageMessage = class extends Message {
    constructor(props){
        super(props);
        this.type = "ImageMessage";
    }
};
function langGraphInterruptEvent(eventProps) {
    return {
        ...eventProps,
        name: "LangGraphInterruptEvent" /* LangGraphInterruptEvent */ ,
        type: "MetaEvent"
    };
}
;
 //# sourceMappingURL=chunk-ROUIRR4B.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-P2AUSQOK.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "convertGqlOutputToMessages": ()=>convertGqlOutputToMessages,
    "convertMessagesToGqlInput": ()=>convertMessagesToGqlInput,
    "filterAdjacentAgentStateMessages": ()=>filterAdjacentAgentStateMessages,
    "filterAgentStateMessages": ()=>filterAgentStateMessages,
    "loadMessagesFromJsonRepresentation": ()=>loadMessagesFromJsonRepresentation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-ROUIRR4B.mjs [client] (ecmascript)");
// src/client/conversion.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$untruncate$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/untruncate-json/dist/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/shared/dist/chunk-QBDBRDYF.mjs [client] (ecmascript)");
;
;
;
function filterAgentStateMessages(messages) {
    return messages.filter((message)=>!message.isAgentStateMessage());
}
function convertMessagesToGqlInput(messages) {
    return messages.map((message)=>{
        if (message.isTextMessage()) {
            return {
                id: message.id,
                createdAt: message.createdAt,
                textMessage: {
                    content: message.content,
                    role: message.role,
                    parentMessageId: message.parentMessageId
                }
            };
        } else if (message.isActionExecutionMessage()) {
            return {
                id: message.id,
                createdAt: message.createdAt,
                actionExecutionMessage: {
                    name: message.name,
                    arguments: JSON.stringify(message.arguments),
                    parentMessageId: message.parentMessageId
                }
            };
        } else if (message.isResultMessage()) {
            return {
                id: message.id,
                createdAt: message.createdAt,
                resultMessage: {
                    result: message.result,
                    actionExecutionId: message.actionExecutionId,
                    actionName: message.actionName
                }
            };
        } else if (message.isAgentStateMessage()) {
            return {
                id: message.id,
                createdAt: message.createdAt,
                agentStateMessage: {
                    threadId: message.threadId,
                    role: message.role,
                    agentName: message.agentName,
                    nodeName: message.nodeName,
                    runId: message.runId,
                    active: message.active,
                    running: message.running,
                    state: JSON.stringify(message.state)
                }
            };
        } else if (message.isImageMessage()) {
            return {
                id: message.id,
                createdAt: message.createdAt,
                imageMessage: {
                    format: message.format,
                    bytes: message.bytes,
                    role: message.role,
                    parentMessageId: message.parentMessageId
                }
            };
        } else {
            throw new Error("Unknown message type");
        }
    });
}
function filterAdjacentAgentStateMessages(messages) {
    const filteredMessages = [];
    messages.forEach((message, i)=>{
        if (message.__typename !== "AgentStateMessageOutput") {
            filteredMessages.push(message);
        } else {
            const prevAgentStateMessageIndex = filteredMessages.findIndex(// TODO: also check runId
            (m)=>m.__typename === "AgentStateMessageOutput" && m.agentName === message.agentName);
            if (prevAgentStateMessageIndex === -1) {
                filteredMessages.push(message);
            } else {
                filteredMessages[prevAgentStateMessageIndex] = message;
            }
        }
    });
    return filteredMessages;
}
function convertGqlOutputToMessages(messages) {
    return messages.map((message)=>{
        if (message.__typename === "TextMessageOutput") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["TextMessage"]({
                id: message.id,
                role: message.role,
                content: message.content.join(""),
                parentMessageId: message.parentMessageId,
                createdAt: /* @__PURE__ */ new Date(),
                status: message.status || {
                    code: "Pending" /* Pending */ 
                }
            });
        } else if (message.__typename === "ActionExecutionMessageOutput") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ActionExecutionMessage"]({
                id: message.id,
                name: message.name,
                arguments: getPartialArguments(message.arguments),
                parentMessageId: message.parentMessageId,
                createdAt: /* @__PURE__ */ new Date(),
                status: message.status || {
                    code: "Pending" /* Pending */ 
                }
            });
        } else if (message.__typename === "ResultMessageOutput") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ResultMessage"]({
                id: message.id,
                result: message.result,
                actionExecutionId: message.actionExecutionId,
                actionName: message.actionName,
                createdAt: /* @__PURE__ */ new Date(),
                status: message.status || {
                    code: "Pending" /* Pending */ 
                }
            });
        } else if (message.__typename === "AgentStateMessageOutput") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AgentStateMessage"]({
                id: message.id,
                threadId: message.threadId,
                role: message.role,
                agentName: message.agentName,
                nodeName: message.nodeName,
                runId: message.runId,
                active: message.active,
                running: message.running,
                state: (0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$QBDBRDYF$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["parseJson"])(message.state, {}),
                createdAt: /* @__PURE__ */ new Date()
            });
        } else if (message.__typename === "ImageMessageOutput") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ImageMessage"]({
                id: message.id,
                format: message.format,
                bytes: message.bytes,
                role: message.role,
                parentMessageId: message.parentMessageId,
                createdAt: /* @__PURE__ */ new Date(),
                status: message.status || {
                    code: "Pending" /* Pending */ 
                }
            });
        }
        throw new Error("Unknown message type");
    });
}
function loadMessagesFromJsonRepresentation(json) {
    const result = [];
    for (const item of json){
        if ("content" in item) {
            result.push(new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["TextMessage"]({
                id: item.id,
                role: item.role,
                content: item.content,
                parentMessageId: item.parentMessageId,
                createdAt: item.createdAt || /* @__PURE__ */ new Date(),
                status: item.status || {
                    code: "Success" /* Success */ 
                }
            }));
        } else if ("arguments" in item) {
            result.push(new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ActionExecutionMessage"]({
                id: item.id,
                name: item.name,
                arguments: item.arguments,
                parentMessageId: item.parentMessageId,
                createdAt: item.createdAt || /* @__PURE__ */ new Date(),
                status: item.status || {
                    code: "Success" /* Success */ 
                }
            }));
        } else if ("result" in item) {
            result.push(new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ResultMessage"]({
                id: item.id,
                result: item.result,
                actionExecutionId: item.actionExecutionId,
                actionName: item.actionName,
                createdAt: item.createdAt || /* @__PURE__ */ new Date(),
                status: item.status || {
                    code: "Success" /* Success */ 
                }
            }));
        } else if ("state" in item) {
            result.push(new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AgentStateMessage"]({
                id: item.id,
                threadId: item.threadId,
                role: item.role,
                agentName: item.agentName,
                nodeName: item.nodeName,
                runId: item.runId,
                active: item.active,
                running: item.running,
                state: item.state,
                createdAt: item.createdAt || /* @__PURE__ */ new Date()
            }));
        } else if ("format" in item && "bytes" in item) {
            result.push(new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ImageMessage"]({
                id: item.id,
                format: item.format,
                bytes: item.bytes,
                role: item.role,
                parentMessageId: item.parentMessageId,
                createdAt: item.createdAt || /* @__PURE__ */ new Date(),
                status: item.status || {
                    code: "Success" /* Success */ 
                }
            }));
        }
    }
    return result;
}
function getPartialArguments(args) {
    try {
        if (!args.length) return {};
        return JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f$untruncate$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(args.join("")));
    } catch (e) {
        return {};
    }
}
;
 //# sourceMappingURL=chunk-P2AUSQOK.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-SCACOKQX.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "aguiMessageWithImageToGQLMessage": ()=>aguiMessageWithImageToGQLMessage,
    "aguiMessageWithRenderToGQL": ()=>aguiMessageWithRenderToGQL,
    "aguiTextMessageToGQLMessage": ()=>aguiTextMessageToGQLMessage,
    "aguiToGQL": ()=>aguiToGQL,
    "aguiToolCallToGQLActionExecution": ()=>aguiToolCallToGQLActionExecution,
    "aguiToolMessageToGQLResultMessage": ()=>aguiToolMessageToGQLResultMessage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-ROUIRR4B.mjs [client] (ecmascript)");
;
// src/message-conversion/agui-to-gql.ts
function extractAgentName(message) {
    if (message.role !== "assistant") {
        throw new Error("Cannot extract agent name from message with role ".concat(message.role));
    }
    return message.agentName || "unknown";
}
function isAgentStateMessage(message) {
    return message.role === "assistant" && "agentName" in message && "state" in message;
}
function hasImageProperty(message) {
    const canContainImage = message.role === "assistant" || message.role === "user";
    if (!canContainImage || message.image === void 0) {
        return false;
    }
    const isMalformed = message.image.format === void 0 || message.image.bytes === void 0;
    if (isMalformed) {
        return false;
    }
    return true;
}
function aguiToGQL(messages, actions, coAgentStateRenders) {
    const gqlMessages = [];
    messages = Array.isArray(messages) ? messages : [
        messages
    ];
    const toolCallNames = {};
    for (const message of messages){
        if (isAgentStateMessage(message)) {
            const agentName = extractAgentName(message);
            const state = "state" in message && message.state ? message.state : {};
            gqlMessages.push(new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AgentStateMessage"]({
                id: message.id,
                agentName,
                state,
                role: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].Assistant
            }));
            if ("generativeUI" in message && message.generativeUI && coAgentStateRenders) {
                coAgentStateRenders[agentName] = {
                    name: agentName,
                    render: message.generativeUI
                };
            }
            continue;
        }
        if (hasImageProperty(message)) {
            gqlMessages.push(aguiMessageWithImageToGQLMessage(message));
            continue;
        }
        if (message.role === "assistant" && message.toolCalls) {
            gqlMessages.push(aguiTextMessageToGQLMessage(message));
            for (const toolCall of message.toolCalls){
                toolCallNames[toolCall.id] = toolCall.function.name;
                const actionExecMsg = aguiToolCallToGQLActionExecution(toolCall, message.id);
                if ("generativeUI" in message && message.generativeUI && actions) {
                    const actionName = toolCall.function.name;
                    const specificAction = Object.values(actions).find((action)=>action.name === actionName);
                    const wildcardAction = Object.values(actions).find((action)=>action.name === "*");
                    if (specificAction) {
                        specificAction.render = message.generativeUI;
                    } else if (wildcardAction) {
                        wildcardAction.render = message.generativeUI;
                    }
                }
                gqlMessages.push(actionExecMsg);
            }
            continue;
        }
        if (message.role === "developer" || message.role === "system" || message.role === "assistant" || message.role === "user") {
            gqlMessages.push(aguiTextMessageToGQLMessage(message));
            continue;
        }
        if (message.role === "tool") {
            gqlMessages.push(aguiToolMessageToGQLResultMessage(message, toolCallNames));
            continue;
        }
        throw new Error('Unknown message role: "'.concat(message.role, '" in message with id: ').concat(message.id));
    }
    return gqlMessages;
}
function aguiTextMessageToGQLMessage(message) {
    if (message.role !== "developer" && message.role !== "system" && message.role !== "assistant" && message.role !== "user") {
        throw new Error("Cannot convert message with role ".concat(message.role, " to TextMessage"));
    }
    let roleValue;
    if (message.role === "developer") {
        roleValue = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].Developer;
    } else if (message.role === "system") {
        roleValue = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].System;
    } else if (message.role === "assistant") {
        roleValue = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].Assistant;
    } else {
        roleValue = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].User;
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["TextMessage"]({
        id: message.id,
        content: message.content || "",
        role: roleValue
    });
}
function aguiToolCallToGQLActionExecution(toolCall, parentMessageId) {
    if (toolCall.type !== "function") {
        throw new Error("Unsupported tool call type: ".concat(toolCall.type));
    }
    let argumentsObj;
    if (typeof toolCall.function.arguments === "string") {
        try {
            argumentsObj = JSON.parse(toolCall.function.arguments);
        } catch (error) {
            console.warn("Failed to parse tool call arguments for ".concat(toolCall.function.name, ":"), error);
            argumentsObj = {};
        }
    } else if (typeof toolCall.function.arguments === "object" && toolCall.function.arguments !== null) {
        argumentsObj = toolCall.function.arguments;
    } else {
        console.warn("Invalid tool call arguments type for ".concat(toolCall.function.name, ":"), typeof toolCall.function.arguments);
        argumentsObj = {};
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ActionExecutionMessage"]({
        id: toolCall.id,
        name: toolCall.function.name,
        arguments: argumentsObj,
        parentMessageId
    });
}
function aguiToolMessageToGQLResultMessage(message, toolCallNames) {
    if (message.role !== "tool") {
        throw new Error("Cannot convert message with role ".concat(message.role, " to ResultMessage"));
    }
    if (!message.toolCallId) {
        throw new Error("Tool message must have a toolCallId");
    }
    const actionName = toolCallNames[message.toolCallId] || "unknown";
    let resultContent;
    const messageContent = message.content || "";
    if (typeof messageContent === "string") {
        resultContent = messageContent;
    } else if (typeof messageContent === "object" && messageContent !== null) {
        try {
            resultContent = JSON.stringify(messageContent);
        } catch (error) {
            console.warn("Failed to stringify tool result for ".concat(actionName, ":"), error);
            resultContent = String(messageContent);
        }
    } else {
        resultContent = String(messageContent);
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ResultMessage"]({
        id: message.id,
        result: resultContent,
        actionExecutionId: message.toolCallId,
        actionName: message.toolName || actionName
    });
}
function aguiMessageWithRenderToGQL(message, actions, coAgentStateRenders) {
    if (message.role === "assistant" && "generativeUI" in message && message.generativeUI && !message.toolCalls) {
        const gqlMessages = [];
        gqlMessages.push(new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AgentStateMessage"]({
            id: message.id,
            agentName: "unknown",
            state: {},
            role: __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].Assistant
        }));
        if (coAgentStateRenders) {
            coAgentStateRenders.unknown = {
                name: "unknown",
                render: message.generativeUI
            };
        }
        return gqlMessages;
    }
    return aguiToGQL([
        message
    ], actions, coAgentStateRenders);
}
function aguiMessageWithImageToGQLMessage(message) {
    if (!hasImageProperty(message)) {
        throw new Error("Cannot convert message to ImageMessage: missing format or bytes");
    }
    let roleValue;
    if (message.role === "assistant") {
        roleValue = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].Assistant;
    } else {
        roleValue = __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].User;
    }
    if (message.role !== "assistant" && message.role !== "user") {
        throw new Error("Cannot convert message with role ".concat(message.role, " to ImageMessage"));
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ImageMessage"]({
        id: message.id,
        format: message.image.format,
        bytes: message.image.bytes,
        role: roleValue
    });
}
;
 //# sourceMappingURL=chunk-SCACOKQX.mjs.map
}),
"[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-WXA3UP7I.mjs [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "gqlActionExecutionMessageToAGUIMessage": ()=>gqlActionExecutionMessageToAGUIMessage,
    "gqlImageMessageToAGUIMessage": ()=>gqlImageMessageToAGUIMessage,
    "gqlResultMessageToAGUIMessage": ()=>gqlResultMessageToAGUIMessage,
    "gqlTextMessageToAGUIMessage": ()=>gqlTextMessageToAGUIMessage,
    "gqlToAGUI": ()=>gqlToAGUI
});
var __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/copilot/copilot.ai/node_modules/@copilotkit/runtime-client-gql/dist/chunk-ROUIRR4B.mjs [client] (ecmascript)");
;
// src/message-conversion/gql-to-agui.ts
var VALID_IMAGE_FORMATS = [
    "jpeg",
    "png",
    "webp",
    "gif"
];
function validateImageFormat(format) {
    return VALID_IMAGE_FORMATS.includes(format);
}
function gqlToAGUI(messages, actions, coAgentStateRenders) {
    let aguiMessages = [];
    messages = Array.isArray(messages) ? messages : [
        messages
    ];
    const actionResults = /* @__PURE__ */ new Map();
    for (const message of messages){
        if (message.isResultMessage()) {
            actionResults.set(message.actionExecutionId, message.result);
        }
    }
    for (const message of messages){
        if (message.isTextMessage()) {
            aguiMessages.push(gqlTextMessageToAGUIMessage(message));
        } else if (message.isResultMessage()) {
            aguiMessages.push(gqlResultMessageToAGUIMessage(message));
        } else if (message.isActionExecutionMessage()) {
            aguiMessages.push(gqlActionExecutionMessageToAGUIMessage(message, actions, actionResults));
        } else if (message.isAgentStateMessage()) {
            aguiMessages.push(gqlAgentStateMessageToAGUIMessage(message, coAgentStateRenders));
        } else if (message.isImageMessage()) {
            aguiMessages.push(gqlImageMessageToAGUIMessage(message));
        } else {
            throw new Error("Unknown message type");
        }
    }
    return aguiMessages;
}
function gqlActionExecutionMessageToAGUIMessage(message, actions, actionResults) {
    const hasSpecificAction = actions && Object.values(actions).some((action2)=>action2.name === message.name);
    const hasWildcardAction = actions && Object.values(actions).some((action2)=>action2.name === "*");
    if (!actions || !hasSpecificAction && !hasWildcardAction) {
        return {
            id: message.id,
            role: "assistant",
            toolCalls: [
                actionExecutionMessageToAGUIMessage(message)
            ],
            name: message.name
        };
    }
    const action = Object.values(actions).find((action2)=>action2.name === message.name) || Object.values(actions).find((action2)=>action2.name === "*");
    const createRenderWrapper = (originalRender)=>{
        if (!originalRender) return void 0;
        return (props)=>{
            var _a;
            let actionResult = actionResults == null ? void 0 : actionResults.get(message.id);
            let status = "inProgress";
            if (actionResult !== void 0) {
                status = "complete";
            } else if (((_a = message.status) == null ? void 0 : _a.code) !== "Pending" /* Pending */ ) {
                status = "executing";
            }
            if (typeof (props == null ? void 0 : props.result) === "string") {
                try {
                    props.result = JSON.parse(props.result);
                } catch (e) {}
            }
            if (typeof actionResult === "string") {
                try {
                    actionResult = JSON.parse(actionResult);
                } catch (e) {}
            }
            const baseProps = {
                status: (props == null ? void 0 : props.status) || status,
                args: message.arguments || {},
                result: (props == null ? void 0 : props.result) || actionResult || void 0,
                messageId: message.id
            };
            if (action.name === "*") {
                return originalRender({
                    ...baseProps,
                    ...props,
                    name: message.name
                });
            } else {
                var _ref;
                const respond = (_ref = props == null ? void 0 : props.respond) !== null && _ref !== void 0 ? _ref : ()=>{};
                return originalRender({
                    ...baseProps,
                    ...props,
                    respond
                });
            }
        };
    };
    return {
        id: message.id,
        role: "assistant",
        content: "",
        toolCalls: [
            actionExecutionMessageToAGUIMessage(message)
        ],
        generativeUI: createRenderWrapper(action.render),
        name: message.name
    };
}
function gqlAgentStateMessageToAGUIMessage(message, coAgentStateRenders) {
    if (coAgentStateRenders && Object.values(coAgentStateRenders).some((render)=>render.name === message.agentName)) {
        const render = Object.values(coAgentStateRenders).find((render2)=>render2.name === message.agentName);
        const createRenderWrapper = (originalRender)=>{
            if (!originalRender) return void 0;
            return (props)=>{
                const state = message.state;
                const renderProps = {
                    state
                };
                return originalRender(renderProps);
            };
        };
        return {
            id: message.id,
            role: "assistant",
            generativeUI: createRenderWrapper(render.render),
            agentName: message.agentName,
            state: message.state
        };
    }
    return {
        id: message.id,
        role: "assistant",
        agentName: message.agentName,
        state: message.state
    };
}
function actionExecutionMessageToAGUIMessage(actionExecutionMessage) {
    return {
        id: actionExecutionMessage.id,
        function: {
            name: actionExecutionMessage.name,
            arguments: JSON.stringify(actionExecutionMessage.arguments)
        },
        type: "function"
    };
}
function gqlTextMessageToAGUIMessage(message) {
    switch(message.role){
        case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].Developer:
            return {
                id: message.id,
                role: "developer",
                content: message.content
            };
        case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].System:
            return {
                id: message.id,
                role: "system",
                content: message.content
            };
        case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].Assistant:
            return {
                id: message.id,
                role: "assistant",
                content: message.content
            };
        case __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].User:
            return {
                id: message.id,
                role: "user",
                content: message.content
            };
        default:
            throw new Error("Unknown message role");
    }
}
function gqlResultMessageToAGUIMessage(message) {
    return {
        id: message.id,
        role: "tool",
        content: message.result,
        toolCallId: message.actionExecutionId,
        toolName: message.actionName
    };
}
function gqlImageMessageToAGUIMessage(message) {
    if (!validateImageFormat(message.format)) {
        throw new Error("Invalid image format: ".concat(message.format, ". Supported formats are: ").concat(VALID_IMAGE_FORMATS.join(", ")));
    }
    if (!message.bytes || typeof message.bytes !== "string" || message.bytes.trim() === "") {
        throw new Error("Image bytes must be a non-empty string");
    }
    const role = message.role === __TURBOPACK__imported__module__$5b$project$5d2f$copilot$2f$copilot$2e$ai$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$ROUIRR4B$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Role"].Assistant ? "assistant" : "user";
    const imageMessage = {
        id: message.id,
        role,
        content: "",
        image: {
            format: message.format,
            bytes: message.bytes
        }
    };
    return imageMessage;
}
;
 //# sourceMappingURL=chunk-WXA3UP7I.mjs.map
}),
}]);

//# sourceMappingURL=585df_%40copilotkit_runtime-client-gql_dist_04b1d8af._.js.map