from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load .env — works both locally and on Render (where env vars are injected directly)
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

from app.routes import stocks, predict, watchlist, chat

app = FastAPI(title="StockSense AI", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten to specific domain post-deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router,      prefix="/api/chat",      tags=["Chat"])
app.include_router(stocks.router,    prefix="/api/stocks",    tags=["Stocks"])
app.include_router(predict.router,   prefix="/api/predict",   tags=["Predict"])
app.include_router(watchlist.router, prefix="/api/watchlist", tags=["Watchlist"])

@app.get("/")
def root():
    return {"status": "ok", "service": "StockSense AI API v2.0"}
