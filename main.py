from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import os
import secrets
from dotenv import load_dotenv
from pydantic import BaseModel
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize API key if not exists
if not os.getenv("API_KEY"):
    api_key = secrets.token_urlsafe(32)
    with open(".env", "w") as f:
        f.write(f"API_KEY={api_key}")
    load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# API key validation function
async def verify_api_key(x_api_key: Optional[str] = Header(None)):
    logger.debug(f"Received API key: {x_api_key}")
    logger.debug(f"Expected API key: {os.getenv('API_KEY')}")
    
    if not x_api_key:
        logger.error("API key is missing")
        raise HTTPException(status_code=401, detail="API key is missing")
    if x_api_key != os.getenv("API_KEY"):
        logger.error("Invalid API key")
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key

class ApiKeyResponse(BaseModel):
    api_key: str
    message: str

@app.get("/")
async def root():
    return {"message": "Welcome to the API Key Server"}

@app.get("/protected")
async def protected_route(api_key: str = Depends(verify_api_key)):
    logger.debug("Protected route accessed successfully")
    return {"message": "This is a protected route", "status": "success"}

@app.post("/generate-key", response_model=ApiKeyResponse)
async def generate_api_key():
    # Use the existing API key instead of generating a new one
    api_key = os.getenv("API_KEY")
    
    logger.debug(f"Returning existing API key: {api_key}")
    
    return {
        "api_key": api_key,
        "message": "API key retrieved successfully."
    } 