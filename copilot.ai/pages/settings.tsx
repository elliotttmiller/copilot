import React from 'react';
import Link from 'next/link';
import SettingsForm from '../components/SettingsForm';
import './agentic-ui.css';

export default function SettingsPage() {
  return (
    <div className="agentic-ui-container">
      <nav className="agentic-ui-nav">
        <Link href="/agentic-ui">Chat & Editor</Link> |{' '}
        <Link href="/history">History</Link> |{' '}
        <Link href="/settings">Settings</Link>
      </nav>
      <h1>Settings</h1>
      <SettingsForm />
    </div>
  );
}
