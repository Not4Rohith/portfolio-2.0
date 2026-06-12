import os
import requests
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = str(os.getenv("SPOTIFY_CLIENT_ID"))
CLIENT_SECRET = str(os.getenv("SPOTIFY_CLIENT_SECRET"))
REFRESH_TOKEN = str(os.getenv("SPOTIFY_REFRESH_TOKEN"))


def get_access_token():
    response = requests.post(
        "https://accounts.spotify.com/api/token",
        data={
            "grant_type": "refresh_token",
            "refresh_token": REFRESH_TOKEN,
        },
        auth=(CLIENT_ID, CLIENT_SECRET),
    #     headers= {
    #     'Content-Type': 'application/x-www-form-urlencoded'
    # NOTE: Spotify docs does say that 
    #   },
    )

    response.raise_for_status()
    print(response.json())
    return response.json()["access_token"]

access_token = get_access_token()

response = requests.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    
    headers={
        "Authorization": f"Bearer {access_token}"
    }
)

# print(response.json())