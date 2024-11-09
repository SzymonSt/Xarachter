import socket
from api.channel import Channel

SOCKET_PORT = 8080
BUFFER_SIZE = 1024

channels_map = {}

def socket_server_thread_handler():
    user_mode = True

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('0.0.0.0', SOCKET_PORT))
    s.listen()

    while True:

        conn, addr = s.accept()
        channels_map[addr] = Channel(addr, [], conn)
        data = ""
        
        while channels_map[addr]:
            data += str(channels_map[addr].conn.recv(BUFFER_SIZE))
            if data == b'':
                channels_map[addr].conn.close()

        print(f"Dane od {addr}: {data}")
            

            
            

    