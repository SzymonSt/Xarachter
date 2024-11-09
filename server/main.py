import sys
import signal
import os
import threading
from socket_server.server import socket_server_thread_handler
from socket_client.client import socket_client_thread_handler

stop_event = threading.Event()

def handle_sigint(signum, frame):
    print("\nShutting down...")
    stop_event.set()
    sys.exit(0)

signal.signal(signal.SIGINT, handle_sigint)

def main():
    os.remove('./net/socket')
    server_thread = threading.Thread(target=socket_server_thread_handler)
    client_thread = threading.Thread(target=socket_client_thread_handler)

    server_thread.start()
    client_thread.start()

    server_thread.join()
    client_thread.join()


if __name__ == '__main__':
    main()