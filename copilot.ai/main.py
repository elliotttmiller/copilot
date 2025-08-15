
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from copilotkit.crewai import CrewAIAgent, copilotkit_emit_state, copilotkit_emit_message, register_tool_call_listener
from pydantic_ai import Agent, StateSnapshotEvent, EventType
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()
register_tool_call_listener()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AG-UI streaming agent for simple tasks
@Agent.tool_plain
async def update_steps(steps: list[str]) -> StateSnapshotEvent:
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

# CrewAI orchestration endpoint
@app.post("/run-metacrew")
async def run_metacrew(request: Request):
    body = await request.json()
    blueprint = body.get("client_context")
    agent = CrewAIAgent(
        name="metacrew",
        description="General-purpose cognitive crew",
        crew=build_crew_from_blueprint(blueprint)
    )
    state, thread_id, messages, actions = {}, "thread-001", [], []
    results = []
    async for event in agent.execute(state=state, thread_id=thread_id, messages=messages, actions=actions):
        await copilotkit_emit_state(event)
        results.append(event)
    await copilotkit_emit_message("Metacrew run complete.")
    return JSONResponse(content={"result": results})

@app.post("/update-steps")
async def update_steps_endpoint(request: Request):
    body = await request.json()
    steps = body.get("steps", [])
    results = []
    async for event in update_steps(steps):
        await copilotkit_emit_state(event)
        results.append(event)
    return JSONResponse(content={"result": results})

@app.get("/")
async def root():
    return {"status": "ok", "message": "Backend is running"}
