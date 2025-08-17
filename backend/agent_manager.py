
# agent_manager.py
import pyautogen as autogen
import asyncio
import os
from dotenv import load_dotenv
from typing import AsyncGenerator

load_dotenv()

MODEL_NAME = os.getenv("MODEL_NAME", "llama3:8b")
BASE_URL = os.getenv("BASE_URL", "http://127.0.0.1:11434/v1")
API_KEY = os.getenv("API_KEY", "ollama")

message_queue = asyncio.Queue()

def create_reply_func(agent_name: str, recipient_name: str):
    """Factory to create a reply function that formats and queues agent messages."""
    def reply_func(recipient, messages, sender, config):
        last_message = messages[-1]
        content = last_message.get("content", "")
        formatted_message = f"**{agent_name} to {recipient_name}**:\n{content}\n\n---\n"
        asyncio.run(message_queue.put(formatted_message))
        return False, None
    return reply_func

async def run_autogen_crew_streaming(task: str) -> AsyncGenerator[str, None]:
    """
    Runs a multi-agent AutoGen crew and streams their conversation as formatted strings.
    """
import pyautogen as autogen
import asyncio
import os
from dotenv import load_dotenv
from typing import AsyncGenerator

# --- Configuration Loading ---
load_dotenv()

# Load LLM settings
MODEL_NAME = os.getenv("MODEL_NAME")
BASE_URL = os.getenv("BASE_URL")
API_KEY = os.getenv("API_KEY")

# Load Agent settings
AGENT_WORK_DIR = os.getenv("AGENT_WORK_DIR", "coding")
# Handle boolean conversion for USE_DOCKER
USE_DOCKER = os.getenv("USE_DOCKER", "False").lower() in ('true', '1', 't')
# Handle integer conversion for MAX_CONVERSATION_ROUNDS
try:
    MAX_CONVERSATION_ROUNDS = int(os.getenv("MAX_CONVERSATION_ROUNDS", "15"))
except ValueError:
    MAX_CONVERSATION_ROUNDS = 15

# --- Real-time Streaming Mechanism ---
message_queue = asyncio.Queue()

def create_stream_writer(agent_name: str):
    def stream_writer(recipient, messages, sender, config):
        last_message = messages[-1]
        content = last_message.get("content", "")
        formatted_message = f"**Agent: {agent_name}**:\n{content}\n\n---\n"
        asyncio.run(message_queue.put(formatted_message))
        return False, None
    return stream_writer

# --- Core Agent Logic ---
async def run_autogen_crew_streaming(task: str) -> AsyncGenerator[str, None]:
    print(f"🤖 Crew received task: '{task}'")
    yield "**[SYSTEM]** Crew is assembling and receiving the task...\n\n---\n"
    
    config_list = [{"model": MODEL_NAME, "base_url": BASE_URL, "api_key": API_KEY}]
    llm_config = {"config_list": config_list, "cache_seed": None}

    planner = autogen.AssistantAgent(
        name="Planner",
        llm_config=llm_config,
        system_message="You are a master planner..."
    )
    engineer = autogen.AssistantAgent(
        name="Engineer",
        llm_config=llm_config,
        system_message="You are an expert software engineer..."
    )
    critic = autogen.AssistantAgent(
        name="Critic",
        llm_config=llm_config,
        system_message="You are a code critic and quality assurance expert..."
    )
    user_proxy = autogen.UserProxyAgent(
        name="Executor",
        human_input_mode="NEVER",
        code_execution_config={"work_dir": AGENT_WORK_DIR, "use_docker": USE_DOCKER},
    )

    for agent in [planner, engineer, critic, user_proxy]:
        agent.register_reply(
            [autogen.Agent, None],
            reply_func=create_stream_writer(agent.name),
            trigger=lambda sender: True
        )

    groupchat = autogen.GroupChat(
        agents=[user_proxy, planner, engineer, critic],
        messages=[],
        max_round=MAX_CONVERSATION_ROUNDS
    )
    manager = autogen.GroupChatManager(groupchat=groupchat, llm_config=llm_config)

    initial_message = f"The user has assigned the following task: {task}..."

    loop = asyncio.get_event_loop()
    await loop.run_in_executor(
        None,
        lambda: user_proxy.initiate_chat(manager, message=initial_message)
    )
    
    await message_queue.put("\n**[SYSTEM]** Crew has finished the task.\n\n---\n")

    while True:
        message = await message_queue.get()
        yield message
        if "**[SYSTEM]** Crew has finished the task." in message:
            break
