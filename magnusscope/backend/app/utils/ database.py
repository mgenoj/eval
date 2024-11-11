# app/utils/database.py
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

def connect_to_mongo():
    MONGO_URI = os.getenv("MONGO_URI")
    client = AsyncIOMotorClient(MONGO_URI)
    return client
