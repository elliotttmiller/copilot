import React from 'react';
import Link from 'next/link';
import HistoryList from '../components/HistoryList';
import './agentic-ui.css';

export default function HistoryPage() {
  return (
    <div className="agentic-ui-container">
      <nav className="agentic-ui-nav">
        <Link href="/agentic-ui">Chat & Editor</Link> |{' '}
        <Link href="/history">History</Link> |{' '}
        <Link href="/settings">Settings</Link>
      </nav>
      <h1>History</h1>
      <HistoryList />
    </div>
  );
}
