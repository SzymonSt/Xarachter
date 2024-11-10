import sys
import signal
from socket_server.server import socket_server_thread_handler
import os

def handle_sigint(signum, frame):
    print("\nShutting down...")
    sys.exit(0)

signal.signal(signal.SIGINT, handle_sigint)

def main():
    socket_server_thread_handler()

if __name__ == '__main__':
    main()