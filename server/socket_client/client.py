import socket
from interfaces.queues import shared_speech_queue, shared_text_queue

def socket_client_thread_handler():
    # s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # s.connect(('<eleven_labs>', 8080))

    while True:
        if not shared_text_queue.empty():
            data = shared_text_queue.get()
            print("Data form queue" + data + "\n")
            # s.send(data.encode())
            # while connection:
            #     data = connection.recv(BUFFER_SIZE)
            data = "data after some work"
            shared_speech_queue.put("AAAAAAA")

        else:
            continue