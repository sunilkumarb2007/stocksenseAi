from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load .env from the backend directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from app.routes import stocks, predict, watchlist, chat

app = FastAPI(title="StockSense AI Backend", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(stocks.router, prefix="/api/stocks", tags=["stocks"])
app.include_router(predict.router, prefix="/api/predict", tags=["prediction"])
app.include_router(watchlist.router, prefix="/api/watchlist", tags=["watchlist"])

@app.get("/")
def health():
    return {"status": "ok", "service": "StockSense AI API v2"}
