

# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from copilotkit import CopilotKit
import uvicorn
import os
from dotenv import load_dotenv
from typing import AsyncGenerator

from agent_manager import run_autogen_crew_streaming

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Local AI Agent Crew API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate CopilotKit adapter (official integration)
copilot = CopilotKit(app=app)

# Official CopilotKit tool-based agent runner
@copilot.tool
async def run_crew(task: str) -> AsyncGenerator[str, None]:
    """
    This docstring is the instruction for the AI. The CopilotKit frontend reads this to understand what this tool does.
    Use this tool for any complex, multi-step task that requires a crew of AI agents to plan, write code, execute it, and review the results.
    Args:
        task (str): The detailed description of the task for the AI agent crew.
    """
    async for message in run_autogen_crew_streaming(task):
        yield message

@app.get("/")
def read_root():
    return {"status": "online", "message": "AI Agent Crew API is running."}

if __name__ == "__main__":
    # Load server configuration from environment variables
    host = os.getenv("UVICORN_HOST", "0.0.0.0")
    try:
        port = int(os.getenv("UVICORN_PORT", "8000"))
    except ValueError:
        port = 8000
    uvicorn.run(app, host=host, port=port)
