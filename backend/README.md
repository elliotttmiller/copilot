# Backend: AI Agent Crew API

This backend powers your local, private AI agent crew using FastAPI, AutoGen, and Ollama. It is designed for real-time, multi-agent orchestration and seamless integration with a modern frontend (CopilotKit/Next.js).

## Features
- **FastAPI**: High-performance Python API server
- **AutoGen**: Multi-agent orchestration and code execution
- **Ollama**: Local LLM support (e.g., llama3)
- **Real-time Streaming**: Agent messages streamed to the frontend
- **Human-in-the-loop**: Interactive feedback via UI
- **Environment Management**: Uses Poetry for dependency management

## Project Structure
```
backend/
├── agent_manager.py      # Agent orchestration and streaming logic
├── main.py               # FastAPI server and CopilotKit integration
├── requirements.txt      # Legacy requirements (use Poetry)
├── pyproject.toml        # Poetry dependency config
├── README.md             # Project documentation
└── code/                 # Directory for agent code execution
```

## Setup & Installation

### 1. Install Python & Poetry
- Python 3.11 recommended
- Install Poetry: `pip install poetry`

### 2. Install Dependencies
```
poetry install
```

### 3. Start Ollama (Local LLM)
```
ollama pull llama3:8b
ollama run llama3:8b
```

### 4. Run the Backend Server
```
poetry run uvicorn main:app --reload --port 8000
```

## API Endpoints
- `/` : Health check
- `/copilotkit` : CopilotKit tool endpoint (for frontend integration)

## Agent Orchestration
- Agents are defined in `agent_manager.py` using AutoGen.
- Supports streaming responses for real-time UI updates.
- Human-in-the-loop pattern for interactive feedback.

## Development Tips
- Use Poetry for all dependency management (`poetry add <package>`)
- Keep `requirements.txt` for reference only; use `pyproject.toml` for actual dependencies.
- For advanced agent workflows, use [AutoGen Studio](https://github.com/microsoft/autogen-studio) in a separate environment.

## Troubleshooting
- If you see dependency conflicts, ensure only backend dependencies are in Poetry.
- For visual agent design, run AutoGen Studio separately:
  ```
  pip install autogenstudio
  autogenstudio run --port 8081
  ```
- For LLM issues, verify Ollama is running and the model is pulled.

## Resources
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [AutoGen Docs](https://microsoft.github.io/autogen/)
- [Ollama Docs](https://ollama.com/)
- [Poetry Docs](https://python-poetry.org/docs/)

---

**This backend is optimized for reliability, maintainability, and intelligent agent orchestration.**
