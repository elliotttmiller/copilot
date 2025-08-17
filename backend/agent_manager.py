# agent_manager.py
# NOTE: The 'openai' Python package must be installed for autogen-ext to work, even when using OpenAI-compatible APIs like Ollama (llama3).
# Install with: poetry add openai
import asyncio
from typing import AsyncGenerator
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_agentchat.messages import TextMessage
from autogen_core import CancellationToken

async def run_autogen_crew_streaming(task: str) -> AsyncGenerator[str, None]:
    """
    Sets up and runs the AutoGen agent crew, streaming messages back as they are generated.
    """
    print(f"🤖 AutoGen crew received task: '{task}'")
    yield "Crew is starting...\n"

    # Example: Using OpenAI-compatible local model (Ollama)
    model_client = OpenAIChatCompletionClient(
        model="llama3.3:70b",
        base_url="http://127.0.0.1:11434/v1",
        api_key="ollama"
    )

    assistant = AssistantAgent(
        name="Assistant",
        system_message="You are a helpful assistant.",
        model_client=model_client,
    )

    cancellation_token = CancellationToken()
    # Stream agent response
    async for response in assistant.on_messages_stream(
        [TextMessage(content=task, source="user")],
        cancellation_token
    ):
        yield response.chat_message.to_text() if hasattr(response, 'chat_message') else str(response)

    await model_client.close()
