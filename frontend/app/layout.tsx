
import "./globals.css";
import { Inter } from "next/font/google";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Personal AI Crew</title>
        <meta name="description" content="Interface for your local AI Agent Crew" />
        <meta name="theme-color" content="#111827" />
        <link rel="icon" href="/favicon.ico" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <CopilotKit runtimeUrl="http://localhost:8000/copilotkit">
          {children}
          <CopilotChat
            instructions="You are the friendly interface to a powerful, local AI agent crew. When the user gives you a complex task, delegate it to the `run_crew` tool. Be concise and helpful."
            labels={{
              title: "Personal AI Agent Crew",
              initial: "Hello! I am the interface to your local AI crew. How can we help you today?",
            }}
          />
        </CopilotKit>
        <noscript>
          <div style={{ color: '#fff', background: '#111827', textAlign: 'center', padding: '1rem' }}>
            This app requires JavaScript to run.
          </div>
        </noscript>
      </body>
    </html>
  );
}
