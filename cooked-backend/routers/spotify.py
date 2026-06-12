from fastapi import APIRouter, Depends
from dotenv import load_dotenv
import httpx
import os



router=APIRouter()
load_dotenv()

SPOTIFY_CLIENT_ID=str(os.getenv("SPOTIFY_CLIENT_ID"))
SPOTIFY_CLIENT_SECRET=str(os.getenv("SPOTIFY_CLIENT_SECRET"))
SPOTIFY_REFRESH_TOKEN=str(os.getenv("SPOTIFY_REFRESH_TOKEN"))


async def fetch_access_token():
    async with httpx.AsyncClient() as client:
        response= await client.post(
            'https://accounts.spotify.com/api/token',
            data={
                "grant_type": 'refresh_token',
                "refresh_token": SPOTIFY_REFRESH_TOKEN,
            },
            auth=(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
            headers={
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        )
    response.raise_for_status()
    return response.json()



async def currently_playing():
    access_token_full=await fetch_access_token()
    access_token=access_token_full["access_token"]
    async with httpx.AsyncClient() as client:
        response =await client.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            headers={
                "Authorization":f"Bearer {access_token}"
            }

        )
        if response.status_code == 204:
            return {"is_playing": False, "message": "Nothing is currently playing"}

    response.raise_for_status()
    return response.json()


@router.get('/api/spotify/now-playing')
async def now_playing(nowPlaying:dict=Depends(currently_playing)):
    final_return_dict={}
    if nowPlaying["is_playing"]==False:
        final_return_dict["isPlaying"]=False

    final_return_dict["isPlaying"]=nowPlaying["is_playing"]
    final_return_dict["title"]=nowPlaying["item"]["album"]["name"]
    final_return_dict["artist"]=nowPlaying["item"]["artists"][0]["name"]
    final_return_dict["albumImageUrl"]=nowPlaying["item"]["album"]["images"][0]["url"]
    final_return_dict["songUrl"]=nowPlaying["item"]["album"]["external_urls"]["spotify"]

    return final_return_dict



            