import { useState } from "react";

export function useCrewAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");

  async function runCrew(task: string) {
    setLoading(true);
    setError(null);
    setResponse("");
    try {
      const res = await fetch("http://localhost:8000/run_crew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      if (!res.ok) throw new Error("Server error");
      const reader = res.body?.getReader();
      let result = "";
      if (reader) {
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value);
          setResponse(result);
        }
      } else {
        result = await res.text();
        setResponse(result);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { runCrew, loading, error, response };
}
