
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from copilotkit.sdk import CopilotKitRemoteEndpoint
from copilotkit.crewai import CrewAIAgent, copilotkit_emit_state, copilotkit_emit_message, register_tool_call_listener
from pydantic_ai import Agent
from ag_ui.core import StateSnapshotEvent, EventType
import asyncio
import os
import logging
from dotenv import load_dotenv
from typing import AsyncGenerator


load_dotenv()
register_tool_call_listener()

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Official CopilotKit FastAPI integration
copilotkit_sdk = CopilotKitRemoteEndpoint()
from copilotkit.integrations.fastapi import add_fastapi_endpoint
add_fastapi_endpoint(app, copilotkit_sdk, prefix="copilotkit")

# Direct agent execution endpoint for /copilotkit/agent/{name}
@app.post("/copilotkit/agent/{name}")
async def execute_agent(name: str, request: Request):
    logger.debug(f"Received /copilotkit/agent/{name} request")
    body = await request.json()
    logger.debug(f"Request body: {body}")
    thread_id = body.get("threadId", "thread-001")
    state = body.get("state", {})
    messages = body.get("messages", [])
    actions = body.get("actions", [])
    agent = CrewAIAgent(
        name=name,
        description=f"Agent {name}",
        crew=None  # For single agent, or build crew if needed
    )
    results = []
    try:
        async for event in agent.execute(state=state, thread_id=thread_id, messages=messages, actions=actions):
            logger.debug(f"Agent event: {event}")
            await copilotkit_emit_state(event)
            results.append(event)
    except Exception as e:
        logger.error(f"Agent execution error: {e}", exc_info=True)
        return JSONResponse(content={"error": str(e)}, status_code=500)
    logger.debug(f"Returning results: {results}")
    return JSONResponse(content={"result": results})

# AG-UI streaming agent for simple tasks
@Agent.tool_plain
async def update_steps(steps: list[str]) -> AsyncGenerator[StateSnapshotEvent, None]:
    for i, step in enumerate(steps):
        await asyncio.sleep(1)
        new_snapshot = {"observed_steps": steps[:i+1]}
        yield StateSnapshotEvent(
            type=EventType.STATE_SNAPSHOT,
            snapshot=new_snapshot
        )

# Helper to build CrewAI crew from blueprint
def build_crew_from_blueprint(blueprint):
    from crewai import Crew, Agent as CrewAgent, Task
    from crewai_tools import BaseTool, TaskOutput

    def create_agent(role, goal):
        return CrewAgent(
            role=role,
            goal=goal,
            backstory=f"You are a {role} whose goal is: {goal}",
            tools=[BaseTool(name="generic_tool", description="Generic tool for agent actions")]
        )

    agents = {spec['role']: create_agent(spec['role'], spec['goal']) for spec in blueprint['agents']}
    tasks = []
    for spec in blueprint['tasks']:
        depends_on = [t for t in tasks if t.agent.role in spec.get('depends_on', [])]
        task = Task(
            agent=agents[spec['role']],
            description=spec['description'],
            expected_output=spec['expected_output'],
            output=TaskOutput(name=spec.get('output', f"{spec['role']}_output")),
            depends_on=depends_on
        )
        tasks.append(task)
    return Crew(tasks=tasks)


# CrewAI orchestration endpoint with debug logging
@app.post("/run-metacrew")
async def run_metacrew(request: Request):
    logger.debug("Received /run-metacrew request")
    body = await request.json()
    logger.debug(f"Request body: {body}")
    blueprint = body.get("client_context")
    logger.debug(f"Blueprint: {blueprint}")
    agent = CrewAIAgent(
        name="metacrew",
        description="General-purpose cognitive crew",
        crew=build_crew_from_blueprint(blueprint)
    )
    state, thread_id, messages, actions = {}, "thread-001", [], []
    results = []
    try:
        async for event in agent.execute(state=state, thread_id=thread_id, messages=messages, actions=actions):
            logger.debug(f"Agent event: {event}")
            await copilotkit_emit_state(event)
            results.append(event)
        await copilotkit_emit_message("Metacrew run complete.")
    except Exception as e:
        logger.error(f"Agent execution error: {e}", exc_info=True)
        return JSONResponse(content={"error": str(e)}, status_code=500)
    logger.debug(f"Returning results: {results}")
    return JSONResponse(content={"result": results})


# Update steps endpoint with debug logging
@app.post("/update-steps")
async def update_steps_endpoint(request: Request):
    logger.debug("Received /update-steps request")
    body = await request.json()
    logger.debug(f"Request body: {body}")
    steps = body.get("steps", [])
    logger.debug(f"Steps: {steps}")
    results = []
    try:
        async for event in update_steps(steps):
            logger.debug(f"Step event: {event}")
            await copilotkit_emit_state(event)
            results.append(event)
    except Exception as e:
        logger.error(f"Update steps error: {e}", exc_info=True)
        return JSONResponse(content={"error": str(e)}, status_code=500)
    logger.debug(f"Returning results: {results}")
    return JSONResponse(content={"result": results})

@app.get("/")
async def root():
    return {"status": "ok", "message": "Backend is running"}
