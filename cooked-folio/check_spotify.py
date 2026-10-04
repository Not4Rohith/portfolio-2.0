import os
import sys
import requests
import base64

def check_credentials(client_id, client_secret, refresh_token):
    print("=" * 50)
    print("Step 1: Refreshing access token...")
    print("=" * 50)

    token_url = "https://accounts.spotify.com/api/token"
    auth_header = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()

    headers = {
        "Authorization": f"Basic {auth_header}",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
    }

    resp = requests.post(token_url, headers=headers, data=data)

    if resp.status_code != 200:
        print(f"❌ FAILED (status {resp.status_code})")
        print(f"Response: {resp.text}")
        print()
        if resp.status_code == 400:
            print("This usually means: invalid client_id/client_secret combo,")
            print("or the refresh_token is invalid/expired/revoked.")
        elif resp.status_code == 401:
            print("This usually means: client_id or client_secret is wrong.")
        return False

    token_data = resp.json()
    access_token = token_data.get("access_token")
    print("✅ SUCCESS — got a new access token")
    print(f"Token type: {token_data.get('token_type')}")
    print(f"Expires in: {token_data.get('expires_in')} seconds")
    print(f"Scope: {token_data.get('scope')}")
    if "refresh_token" in token_data:
        print("Note: Spotify issued a NEW refresh token (rotating tokens enabled).")
    print()

    print("=" * 50)
    print("Step 2: Verifying access token works against the API...")
    print("=" * 50)

    me_resp = requests.get(
        "https://api.spotify.com/v1/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    if me_resp.status_code == 200:
        me = me_resp.json()
        print("✅ SUCCESS — access token is valid and working")
        print(f"Logged in as: {me.get('display_name')} ({me.get('id')})")
        print(f"Account type: {me.get('product')}")
        return True
    else:
        print(f"⚠️ Token refresh worked, but /v1/me call failed (status {me_resp.status_code})")
        print(f"Response: {me_resp.text}")
        print("This could mean the token lacks the required scope, or another issue.")
        return False


if __name__ == "__main__":
    client_id = os.environ.get("SPOTIFY_CLIENT_ID") or input("Client ID: ").strip()
    client_secret = os.environ.get("SPOTIFY_CLIENT_SECRET") or input("Client Secret: ").strip()
    refresh_token = os.environ.get("SPOTIFY_REFRESH_TOKEN") or input("Refresh Token: ").strip()

    ok = check_credentials(client_id, client_secret, refresh_token)
    sys.exit(0 if ok else 1)