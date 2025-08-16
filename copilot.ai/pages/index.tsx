import React from "react";
import Link from "next/link";
import { CopilotKit } from "@copilotkit/react-core";
import "../components/agentic-ui.css";

export default function HomeDashboard() {
  return (
    <CopilotKit>
      <div className="dashboard-bg min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="dashboard-card bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-3xl flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">CopilotKit Agentic Dashboard</h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
            Welcome to your modern agentic workspace. Seamlessly orchestrate multi-agent flows, chat, and manage your AI-powered tasks with a beautiful, professional interface.
          </p>
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
            <Link href="/agentic-ui" className="dashboard-btn">
              <span className="text-xl font-semibold">🧑‍💻 Agentic Chat & Editor</span>
            </Link>
            <Link href="/history" className="dashboard-btn">
              <span className="text-xl font-semibold">📜 History</span>
            </Link>
            <Link href="/settings" className="dashboard-btn">
              <span className="text-xl font-semibold">⚙️ Settings</span>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .dashboard-bg {
            background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
          }
          .dashboard-card {
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
    </CopilotKit>
  );
}
