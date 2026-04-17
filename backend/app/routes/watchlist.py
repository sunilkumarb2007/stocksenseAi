from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class WatchlistItem(BaseModel):
    ticker: str

# In-memory mock database for watchlist
fake_db = ["AAPL", "MSFT", "NVDA"]

@router.get("/", response_model=List[str])
def get_watchlist():
    return fake_db

@router.post("/")
def add_to_watchlist(item: WatchlistItem):
    ticker = item.ticker.upper()
    if ticker not in fake_db:
        fake_db.append(ticker)
    return {"status": "success", "watchlist": fake_db}

@router.delete("/{ticker}")
def remove_from_watchlist(ticker: str):
    ticker = ticker.upper()
    if ticker in fake_db:
        fake_db.remove(ticker)
    return {"status": "success", "watchlist": fake_db}
