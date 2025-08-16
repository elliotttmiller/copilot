import React, { useState } from "react";
import { CopilotChat } from "@copilotkit/react-ui";
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
      let apiUrl = process.env.NEXT_PUBLIC_COPILOTKIT_API_URL || "/api/copilotkit";
      // If user accidentally sets apiUrl to root, fix it here
      if (apiUrl.endsWith("/")) apiUrl = apiUrl.replace(/\/$/, "");
      // For each agent, POST to /copilotkit/agent/{name}
      const agentResults: Record<string, any> = {};
      for (const agent of agents) {
        try {
          const response = await fetch(`${apiUrl}/agent/${agent.role}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              threadId: "thread-001",
              state: {},
              messages: [],
              actions: [],
            }),
          });
          if (!response.ok) {
            const errorText = await response.text();
            agentResults[agent.role] = { error: `HTTP ${response.status}: ${errorText}` };
          } else {
            const data = await response.json();
            agentResults[agent.role] = data;
          }
        } catch (err) {
          agentResults[agent.role] = { error: String(err) };
        }
      }
      setResults(agentResults);
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
    <div className="chat-modal-bg min-h-screen flex items-center justify-center px-4 py-8">
      <div className="chat-modal-card bg-white/90 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Agentic Chat</h1>
        <div className="w-full flex flex-col items-center">
          <CopilotChat labels={{ title: "Agentic Chat", initial: "How can I help?" }} className="w-full max-w-3xl" />
        </div>
        <div className="editor-section w-full mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Document Editor</h3>
          <EditorContent editor={editor} />
        </div>
        <div className="agent-orchestration-ui w-full mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Multi-Agent Orchestration</h3>
          <button onClick={handleRunAgents} disabled={loading} className="dashboard-btn w-full mb-4">
            {loading ? "Running Agents..." : "Run Agents (Default Coding Workflow)"}
          </button>
          <div className="agent-orchestration-results bg-gray-50 rounded-xl p-4 shadow-inner">
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
        <div className="multi-agent-states w-full mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Multi-Agent States</h3>
          <div>
            {/* Writer, Researcher, Critic states will be rendered by useCoAgentStateRender */}
          </div>
        </div>
      </div>
      <style jsx>{`
        .chat-modal-bg {
          background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
        }
        .chat-modal-card {
          border: 1px solid #e5e7eb;
        }
        .dashboard-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
          color: #fff;
          border-radius: 1rem;
          padding: 1.25rem 2.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          box-shadow: 0 4px 24px rgba(99,102,241,0.12);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .dashboard-btn:hover {
          background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
          box-shadow: 0 8px 32px rgba(99,102,241,0.18);
          transform: translateY(-2px) scale(1.03);
        }
      `}</style>
    </div>
  );
}
