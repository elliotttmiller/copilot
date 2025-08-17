# Dependency Check & Install Script
# This script ensures all required dependencies are installed for backend, frontend, and studio before starting servers.

import subprocess
import os
import sys

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(PROJECT_ROOT, "backend")
FRONTEND_DIR = os.path.join(PROJECT_ROOT, "frontend")

# Helper to run a command and print output
def run_cmd(cmd, cwd=None):
    print(f"\nRunning: {' '.join(cmd)} in {cwd or PROJECT_ROOT}")
    result = subprocess.run(cmd, cwd=cwd, shell=False)
    if result.returncode != 0:
        print(f"Error running {' '.join(cmd)}")
        sys.exit(result.returncode)

# Check and install backend dependencies
print("Checking backend dependencies...")
run_cmd([sys.executable, "-m", "pip", "install", "poetry"], cwd=BACKEND_DIR)
run_cmd(["poetry", "install", "--no-root"], cwd=BACKEND_DIR)

# Check and install frontend dependencies
print("Checking frontend dependencies...")
run_cmd(["npm", "install"], cwd=FRONTEND_DIR)
run_cmd(["npm", "update"], cwd=FRONTEND_DIR)

# Check and install studio (global)
print("Checking AutoGen Studio...")
try:
    subprocess.run(["autogenstudio", "--version"], shell=False, check=True)
except Exception:
    print("AutoGen Studio not found. Installing globally...")
    run_cmd([sys.executable, "-m", "pip", "install", "autogenstudio"])

print("All dependencies are installed and up to date.")
