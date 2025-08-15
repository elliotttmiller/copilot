import React, { useState } from "react";
import { CopilotSidebar, CopilotChat } from "@copilotkit/react-ui";
import { useCopilotChat, useCopilotAction, useCoAgent, useCoAgentStateRender } from "@copilotkit/react-core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "@copilotkit/react-ui/styles.css";
import "./agentic-ui.css";
// (Remove this duplicate function declaration and its contents)


export default function ChatWindow() {
  // Chat state
  const chat = useCopilotChat();

  // Agent orchestration UI state
  const [agents, setAgents] = useState([
    { role: "coder", goal: "Write code for the given task." },
    { role: "reviewer", goal: "Review code and suggest improvements." },
    { role: "tester", goal: "Test code and report issues." }
  ]);
  const [tasks, setTasks] = useState([
    { role: "coder", input: { task: "Implement a sorting algorithm." }, output: "code_output" },
    { role: "reviewer", input: {}, output: "review_output", depends_on: ["coder"] },
    { role: "tester", input: {}, output: "test_output", depends_on: ["reviewer"] }
  ]);
  type ResultsType = { error?: string } | Record<string, any> | null;
  const [results, setResults] = useState<ResultsType>(null);
  const [loading, setLoading] = useState(false);

  // Handler to run agents
  async function handleRunAgents() {
    setLoading(true);
    try {
      // Ensure apiUrl points to /copilotkit, not root
      let apiUrl = process.env.NEXT_PUBLIC_COPILOTKIT_API_URL || "http://localhost:8000/copilotkit";
      // If user accidentally sets apiUrl to root, fix it here
      if (apiUrl.endsWith("/")) apiUrl = apiUrl.replace(/\/$/, "");
      const res = await fetch(`${apiUrl}/run-agents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agents, tasks })
      });
      if (!res.ok) {
        const errorText = await res.text();
        setResults({ error: `HTTP ${res.status}: ${errorText}` });
      } else {
        const data = await res.json();
        setResults(data);
      }
    } catch (err) {
      setResults({ error: err.message });
    }
    setLoading(false);
  }

  // Multi-agent state orchestration
  const writer = useCoAgent({ name: "writer", initialState: { document: "" } });
  const researcher = useCoAgent({ name: "researcher", initialState: { document: "" } });
  const critic = useCoAgent({ name: "critic", initialState: { document: "" } });

  // Document editor (Tiptap)
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Start editing your document...",
    immediatelyRender: false,
  });

  // Example frontend action (Human-in-the-Loop)
  useCopilotAction({
    name: "approveDocument",
    description: "Approve the document before finalizing.",
    parameters: [
      { name: "document", type: "string", description: "Document content", required: true },
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => (
      <div className="hitl-approval">
        <h3>Approve Document</h3>
        <pre>{args.document}</pre>
        <button onClick={() => respond?.({ approved: true })} disabled={status === "executing"}>Approve</button>
        <button onClick={() => respond?.({ approved: false })} disabled={status === "executing"}>Reject</button>
      </div>
    ),
  });

  // Render agent state (generative UI)
  useCoAgentStateRender({
    name: "writer",
    render: ({ state }) => (<div className="agent-state">Writer State: {state.document}</div>),
  });
  useCoAgentStateRender({
    name: "researcher",
    render: ({ state }) => (<div className="agent-state">Researcher State: {state.document}</div>),
  });
  useCoAgentStateRender({
    name: "critic",
    render: ({ state }) => (<div className="agent-state">Critic State: {state.document}</div>),
  });

  return (
    <CopilotSidebar defaultOpen={true} labels={{ title: "Agentic Chat", initial: "How can I help?" }} clickOutsideToClose={false}>
      <div className="chat-ui">
        <CopilotChat />
        <div className="editor-section">
          <h3>Document Editor</h3>
          <EditorContent editor={editor} />
        </div>
        <div className="agent-orchestration-ui">
          <h3>Multi-Agent Orchestration</h3>
          <button onClick={handleRunAgents} disabled={loading}>
            {loading ? "Running Agents..." : "Run Agents (Default Coding Workflow)"}
          </button>
          <div className="agent-orchestration-results">
            <strong>Agents:</strong>
            <pre>{JSON.stringify(agents, null, 2)}</pre>
            <strong>Tasks:</strong>
            <pre>{JSON.stringify(tasks, null, 2)}</pre>
            {results && (
              <>
                <strong>Results:</strong>
                <pre>{JSON.stringify(results, null, 2)}</pre>
              </>
            )}
          </div>
        </div>
        {/* Agent states rendered below */}
        <div className="multi-agent-states">
          <h3>Multi-Agent States</h3>
          <div>
            {/* Writer, Researcher, Critic states will be rendered by useCoAgentStateRender */}
          </div>
        </div>
      </div>
    </CopilotSidebar>
  );
}
