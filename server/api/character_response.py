from dotenv import load_dotenv
from openai import OpenAI
import os
import asyncio

async def request_character_response(character: str, prompt: str):
    load_dotenv()
    openai_api_key = os.getenv('OPENAI_API_KEY')

    client = OpenAI(api_key=openai_api_key)

    res = client.chat.completions.create(
            model="gpt-4o",
            max_completion_tokens=200,
            stream=True,
            messages=[
                {
                    "role": "system", 
                    "content": "You are a Dwigth Schrute. You are in a meeting with Michael Scott and a new intern to tech him sales. You are the assistant to the regional manager."
                    
                },
                {
                    "role": "user",
                    "content": "Intern" + prompt
                }
            ]
        )
    
    for chunk in res:
        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content