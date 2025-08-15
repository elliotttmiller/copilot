
import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import Link from 'next/link';
import './agentic-ui.css';

export default function AgenticUI() {
  // ...existing code removed: now handled by ChatWindow and CopilotKit

  return (
    <div className="agentic-ui-container">
      <nav className="agentic-ui-nav">
        <Link href="/agentic-ui">Chat & Editor</Link> |{' '}
        <Link href="/history">History</Link> |{' '}
        <Link href="/settings">Settings</Link>
      </nav>
      <h1>Agentic Generative UI</h1>
      <ChatWindow />
    </div>
  );
}
