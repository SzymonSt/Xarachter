import socket

SOCKET_PORT = 8080
BUFFER_SIZE = 1024

def socket_server_thread_handler():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('0.0.0.0', SOCKET_PORT))
    s.listen()

    while True:

        conn,_ = s.accept()
        data = ""
        while conn:
            data += conn.recv(BUFFER_SIZE)
            if data == b'':
                break

        print(data)

            
            

    