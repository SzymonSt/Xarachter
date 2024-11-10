import asyncio
import websockets

async def send_message():
    uri = "ws://localhost:8765?user_id=me&characters=dwight,michael"
    async with websockets.connect(uri) as ws:
        print("Connected to the server")
        message = input("Enter message: ")
        await ws.send(message)
        while True:  # Use await here
            response = await ws.recv()  # Use await here
            print(f"{response}")

# Run the client
asyncio.run(send_message())