export interface AgentMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
}
