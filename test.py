import asyncio
import time
from websockets.asyncio.client import connect

async def send_message():
    uri = "ws://localhost:8080"
    async with connect(uri) as ws:
        while True:
            message  = "Some message"
            ws.send(message)
            ws.recv(1024)
            time.sleep(1)