

import { useState, useEffect, useRef } from "react";
import { useCopilotAction, useCopilotChat } from "@copilotkit/react-core";
import styles from "./page.module.css";
import { AgentMessage } from "../types";

function StatusIndicator({ status }: { status: string }) {
  let statusClass = styles.statusIdle;
  if (status === "Running") statusClass = styles.statusRunning;
  if (status === "Finished") statusClass = styles.statusFinished;
  return <span className={statusClass}>{status}</span>;
}

function ParsedMessage({ message }: { message: AgentMessage }) {
  return (
    <div className={styles.message}>
      <strong>{message.role === "user" ? "You" : "Agent"}:</strong>
      <pre>{message.content}</pre>
    </div>
  );
}

export default function Page() {
  const [task, setTask] = useState<string>("");
  const [agentStatus, setAgentStatus] = useState<string>("Idle");
  const [error, setError] = useState<string>("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  const { visibleMessages } = useCopilotChat();
  const [isRunning, setIsRunning] = useState(false);
  const runCrew = async (task: string) => {
    setIsRunning(true);
    setAgentStatus("Running");
    setError("");
    try {
      // Use CopilotKit's action API (assume runCopilotAction or similar)
      // If useCopilotAction returns a function, call it here
      // Example: await runCopilotAction("run_crew", { task });
      // For now, simulate async completion
      await new Promise(res => setTimeout(res, 2000));
      setAgentStatus("Finished");
    } catch (err: any) {
      setError(err?.message || "Unknown error");
      setAgentStatus("Idle");
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (!isRunning && !error && agentStatus !== "Finished") setAgentStatus("Idle");
  }, [isRunning, error, agentStatus]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (task.trim() && !isRunning) {
      runCrew(task);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>AI Agent Crew Mission Control</h1>
        <StatusIndicator status={agentStatus} />
      </header>
      <div className={styles.logContainer} ref={logContainerRef}>
        {error && (
          <div className={styles.errorLog}>
            Error: {error}
          </div>
        )}
        {visibleMessages.length === 0 && !error && (
          <div className={styles.emptyLog}>
            The agent crew is standing by. Assign a task to begin.
          </div>
        )}
        {visibleMessages.map((msg, idx) => (
          <div key={idx} className={styles.message}>
            <pre>{JSON.stringify(msg, null, 2)}</pre>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (task.trim() && !isRunning) runCrew(task);
          }}
          className={styles.inputForm}
        >
          <textarea
            value={task}
            onChange={e => setTask(e.target.value)}
            className={styles.inputField}
            placeholder="Enter a complex task for the agent crew..."
            disabled={isRunning}
          />
          <button type="submit" className={styles.submitButton} disabled={isRunning}>
            {isRunning ? "Crew is Running..." : "Assign Task"}
          </button>
        </form>
      </footer>
    </div>
  );
}
