from fastapi import APIRouter, HTTPException
import os
import requests

router = APIRouter()

API_KEY = os.getenv("STOCK_API_KEY", "")

@router.get("/{ticker}")
def get_stock_data(ticker: str):
    ticker = ticker.upper()
    
    # If no API key provided, return high-quality mock data 
    # to maintain the premium dashboard feel
    if not API_KEY or API_KEY == "dummy":
        return {
            "ticker": ticker,
            "current_price": 189.43 if ticker == "AAPL" else 412.15 if ticker == "MSFT" else 875.28,
            "change_24h": 1.25,
            "change_amount": 2.34,
            "company_name": "Apple Inc." if ticker == "AAPL" else "Mock Company",
            "market_cap": "2.95T",
            "volume": "52M",
            "pe_ratio": 28.45,
            "range_52w": "$124 - $198",
            "exchange": "NASDAQ"
        }
        
    # Example Finnhub Integration
    try:
        url = f"https://finnhub.io/api/v1/quote?symbol={ticker}&token={API_KEY}"
        res = requests.get(url)
        data = res.json()
        
        return {
            "ticker": ticker,
            "current_price": data.get("c", 0),
            "change_24h": data.get("dp", 0),
            "change_amount": data.get("d", 0),
            "company_name": ticker, # Would need another API call for profile
            "market_cap": "N/A",
            "volume": "N/A",
            "pe_ratio": "N/A",
            "range_52w": "N/A",
            "exchange": "N/A"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
