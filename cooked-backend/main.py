# 1. Import the main FastAPI tool from the library you installed
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import contact
from routers import spotify

# 2. Create an "instance" of FastAPI. 
# This 'app' variable is your actual server.

app = FastAPI()

# 3. Create a Route. 
# The @ symbol is a "decorator". It tells the server: 
# "If someone visits the root URL ('/'), run the function directly below it."

    # 4. Return some data. FastAPI automatically converts Python dictionaries into JSON!

app.add_middleware(
    CORSMiddleware,
    # MUST be exactly this string. No trailing slash at the end!
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router)
app.include_router(spotify.router)










