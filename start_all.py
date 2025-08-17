import subprocess
import os
import signal
import time
import psutil
import threading
import sys
from queue import Queue, Empty

try:
    from colorama import init, Fore, Style
    init()
    COLORS = [Fore.CYAN, Fore.GREEN, Fore.MAGENTA]
except ImportError:
    COLORS = ["", "", ""]

# Update this path if Node.js is installed elsewhere
NPM_PATH = r"C:\Program Files\nodejs\npm.cmd"

# Define server commands and ports
SERVERS = [
    {
        "name": "frontend",
        "port": 3000,
        "cwd": os.path.abspath(os.path.join(os.path.dirname(__file__), "frontend")),
        "cmd": [NPM_PATH, "run", "dev"],
    },
    {
        "name": "backend",
        "port": 8000,
        "cwd": os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")),
        "cmd": ["poetry", "run", "uvicorn", "main:app", "--port", "8000"],
    },
    {
        "name": "studio",
        "port": 8081,
        "cwd": os.path.expanduser("~"),
        "cmd": ["autogenstudio", "--port", "8081"],
    },
]

def kill_process_on_port(port):
    """Kill any process running on the given port."""
    for proc in psutil.process_iter(['pid', 'name', 'connections']):
        for conn in proc.info.get('connections', []):
            if conn.status == psutil.CONN_LISTEN and conn.laddr.port == port:
                print(f"Killing process {proc.info['pid']} on port {port}")
                try:
                    proc.kill()
                except Exception as e:
                    print(f"Error killing process {proc.info['pid']}: {e}")

def safe_print(text):
    # Remove non-ASCII characters for Windows compatibility
    print(''.join([c if ord(c) < 128 else '?' for c in text]))

def stream_logs(proc, name, color, queue):
    def enqueue_output(stream, queue):
        for line in iter(stream.readline, b''):
            queue.put(line)
        stream.close()
    threading.Thread(target=enqueue_output, args=(proc.stdout, queue), daemon=True).start()
    threading.Thread(target=enqueue_output, args=(proc.stderr, queue), daemon=True).start()
    while True:
        try:
            line = queue.get(timeout=0.1)
        except Empty:
            if proc.poll() is not None:
                break
            continue
        try:
            decoded = line.decode(errors='replace').rstrip()
        except Exception:
            decoded = str(line).rstrip()
        safe_print(f"{color}[{name}]{Style.RESET_ALL} {decoded}")

def start_server(server, color):
    print(f"Starting {server['name']} server...")
    print(f"Command: {' '.join(server['cmd'])}")
    print(f"Working directory: {server['cwd']}")
    try:
        proc = subprocess.Popen(
            server['cmd'],
            cwd=server['cwd'],
            shell=False,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        queue = Queue()
        threading.Thread(target=stream_logs, args=(proc, server['name'], color, queue), daemon=True).start()
        return proc
    except FileNotFoundError as e:
        print(f"Error starting {server['name']} server: {e}")
        return None

def main():
    print("Stopping any running servers...")
    for server in SERVERS:
        kill_process_on_port(server['port'])
    time.sleep(2)
    print("Starting backend server first...")
    backend = next(s for s in SERVERS if s['name'] == 'backend')
    backend_proc = start_server(backend, COLORS[1])
    # Wait for backend to be ready
    import socket
    def wait_for_port(port, timeout=30):
        start = time.time()
        while time.time() - start < timeout:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                result = sock.connect_ex(('localhost', port))
                if result == 0:
                    return True
            time.sleep(0.5)
        return False
    if not wait_for_port(backend['port']):
        print(f"Backend server on port {backend['port']} did not start in time.")
        sys.exit(1)
    print("Backend server is running.")
    print("Starting frontend and studio servers...")
    frontend = next(s for s in SERVERS if s['name'] == 'frontend')
    studio = next(s for s in SERVERS if s['name'] == 'studio')
    frontend_proc = start_server(frontend, COLORS[0])
    studio_proc = start_server(studio, COLORS[2])
    print("All servers started.")
    print("Opening frontend in browser...")
    import webbrowser
    webbrowser.open("http://localhost:3000")
    print("Press Ctrl+C to exit and kill all servers.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping all servers...")
        for proc in [backend_proc, frontend_proc, studio_proc]:
            try:
                proc.terminate()
            except Exception:
                pass
        print("All servers stopped.")

if __name__ == "__main__":
    main()
