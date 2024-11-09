import socket
from interfaces.queues import shared_speech_queue, shared_text_queue

SOCKET_PORT = 8080
BUFFER_SIZE = 1024

def socket_server_thread_handler():
    s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    s.bind('./net/socket')
    s.listen()

    while True:

        conn,_ = s.accept()
        data = None
        while conn:
            data = conn.recv(BUFFER_SIZE)
            if data == b'':
                break
        
            if data: 
                shared_text_queue.put(data.decode())
            print(shared_speech_queue.empty())
            if not shared_speech_queue.empty():
                data = shared_speech_queue.get()
                print(f"Data after processing: {data}\n")
                conn.sendall(data.encode())

    