"use client";
import { useCopilotAction, useCoAgentStateRender } from "@copilotkit/react-core";
import { metacrewBlueprint } from "./metacrewBlueprint";

export function GeneralPurposeRunner() {
  // Register the action (no assignment)
  useCopilotAction({
    name: "runMetacrew",
    description: "Run the general-purpose cognitive crew.",
    parameters: [
      {
        name: "request",
        type: "string",
        description: "User request for the crew.",
        required: true,
      },
    ],
    handler: async ({ request }) => {
      // This is called by CopilotKit when the action is triggered
      console.log("Sent Metacrew to backend for execution.", request);
    },
  });

  // Real-time state streaming for simple tasks
  useCoAgentStateRender({
    name: "stepsAgent",
    render: ({ state }) => (
      <div>
        <h3>Progress:</h3>
        <ul>
          {state.observed_steps?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    ),
  });

  // Use CopilotTask to trigger backend logic
  // Import CopilotTask and useCopilotContext
  // ...existing code...
  const { CopilotTask, useCopilotContext } = require("@copilotkit/react-core");
  const context = useCopilotContext();
  const handleRun = async () => {
    const userRequest = "Analyze the key differences between the Transformer and Diffusion models in AI and explain their primary use-cases in a concise blog post.";
    const task = new CopilotTask({
      instructions: "Run the general-purpose cognitive crew.",
      actions: [
        {
          name: "runMetacrew",
        },
      ],
    });
    await task.run(context, { request: userRequest });
  };

  return (
    <div>
      <button onClick={handleRun}>
        Run General Purpose Crew
      </button>
      {/* CopilotKit UI components will display streaming output */}
    </div>
  );
}
