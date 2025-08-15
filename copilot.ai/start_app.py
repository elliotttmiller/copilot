import subprocess
import webbrowser
import time
import sys
import os
from dotenv import load_dotenv

load_dotenv()

# --- Kill any existing processes on backend (8000) and frontend (3000) ports ---
def kill_port(port):
    try:
        # Find processes using the port
        result = subprocess.check_output(f'netstat -ano | findstr :{port}', shell=True).decode()
        lines = result.strip().split('\n')
        pids = set()
        for line in lines:
            parts = line.split()
            if len(parts) >= 5:
                pids.add(parts[-1])
        for pid in pids:
            try:
                subprocess.run(f'taskkill /PID {pid} /F', shell=True)
            except Exception:
                pass
    except Exception:
        pass

# Kill backend (8000) and frontend (3000) processes
kill_port(8000)
kill_port(3000)

# Ensure we are running in the copilot.ai directory
project_dir = os.path.dirname(os.path.abspath(__file__))

# Start FastAPI backend (port 8000)
backend_cmd = [sys.executable, "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
backend_proc = subprocess.Popen(backend_cmd, cwd=project_dir)
print("FastAPI backend (uvicorn --reload) started on port 8000.")

# Start Next.js frontend (port 3000)
npm_path = r"C:\Program Files\nodejs\npm.cmd"
if not os.path.exists(npm_path):
    npm_path = "npm"  # fallback if npm is in PATH
frontend_cmd = [npm_path, "run", "dev", "--", "--port=3000"]
frontend_proc = subprocess.Popen(frontend_cmd, cwd=project_dir)
print("Next.js frontend started on port 3000.")

# Wait for frontend to start (adjust time as needed)
time.sleep(10)

# Open frontend in browser
webbrowser.open("http://localhost:3000/agentic-ui")
print("Frontend UI opened in browser.")

# Wait for both processes to finish
try:
    backend_proc.wait()
    frontend_proc.wait()
except KeyboardInterrupt:
    backend_proc.terminate()
    frontend_proc.terminate()
    print("Processes terminated.")
