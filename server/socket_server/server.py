import asyncio
import websockets
from urllib.parse import urlparse, parse_qs

from api.character_response import request_character_response
from api.channel import Channel

connected_channels = set()

async def handler(websocket):
    parsed_path = urlparse(websocket.request.path)
    query_params = parse_qs(parsed_path.query)
    
    user_id = query_params.get("user_id", [None])[0]
    characters = query_params.get("characters", [None])[0].split(",")

    participants = dict()
    participants[user_id] = {
        "conn": websocket,
        "type": "user"
    }

    for character in characters:
        participants[character] = {
            "conn": request_character_response,
            "type": "character"
        }

    chan = Channel(
        participants=participants
    )

    connected_channels.add(chan)
    try:
        async for message in websocket:
            chan.add_message({
                        "sender": user_id,
                        "message": message
                    })
            candidates = chan.participants.copy()

            del candidates[user_id]

            for message in chan.messages[-2:]:
                try:
                    print(f"deleting {message['sender']}")
                    del candidates[message["sender"]]
                except KeyError:
                    pass
            
            await broadcast(f"Broadcast: {message}", chan, candidates, participants[user_id])
        connected_channels.remove(chan)
    except websockets.ConnectionClosed:
        print("Client disconnected")
    finally:
        print(f"Client disconnected. Total clients: {len(connected_channels)}")

async def broadcast(message, chan, receivers, user):
    if connected_channels:
        response = ""
        print(receivers)
        for k, participant in receivers.items():
            try:
                if participant["type"] == "user":
                    await participant["websocket"].send(message)
                else:
                    async for m in participant["conn"](k, message):
                        if m:
                            print(m)
                            response += m
                            await user["conn"].send({
                                "sender": k,
                                "message": m
                            })
                    chan.add_message({
                            "sender": k,
                            "message": response
                        })
                    
            except Exception as e:
                print(f"Error: {e}")

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        print("WebSocket server started on ws://localhost:8765")
        await asyncio.Future()

asyncio.run(main())
