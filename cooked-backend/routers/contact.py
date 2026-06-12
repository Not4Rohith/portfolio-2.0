from schemas import ContactDetails
from fastapi import APIRouter, BackgroundTasks
from dotenv import load_dotenv
import os
import httpx

router=APIRouter()
load_dotenv()

DISCORD_WEBHOOK_URL=str(os.getenv("DISCORD_WEBHOOK_URL"))

async def discord_notif(name:str, email:str, message:str):
    discord_send={"content":f"**new message**\n**name:** {name}\n**email:**{email}\n**message:**{message}"}
    
    async with httpx.AsyncClient() as client:
        await client.post(DISCORD_WEBHOOK_URL, json=discord_send)

    

@router.post("/api/contact")
def Contact(node:ContactDetails, background_tasks:BackgroundTasks):
    background_tasks.add_task(discord_notif, node.name, node.email, node.message)
    return {"status": "success"}


