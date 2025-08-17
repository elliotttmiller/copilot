
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
## Remove invalid CopilotKit import (no Python package exists)
import uvicorn
from typing import AsyncGenerator

from agent_manager import run_autogen_crew_streaming

app = FastAPI(title="Local AI Agent Crew API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request

# Use FastAPI endpoint for streaming agent results
@app.post("/run_crew")
async def run_crew_endpoint(request: Request):
    data = await request.json()
    task = data.get("task", "")
    async def event_stream():
        async for message in run_autogen_crew_streaming(task):
            yield message
    return event_stream()

@app.get("/")
def read_root():
    return {"status": "online"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
