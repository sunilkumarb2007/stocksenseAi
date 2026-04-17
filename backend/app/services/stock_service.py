import os
import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '..', '.env'))

API_KEY = os.getenv("STOCK_API_KEY", "")
USD_TO_INR = 83.0


def usd_to_inr(price: float) -> float:
    return round(price * USD_TO_INR, 2)


def get_stock_price(symbol: str) -> float:
    """Fetch price from AlphaVantage. Falls back to mock data if key is missing."""
    MOCK = {
        "TCS.BSE": 44.0,
        "RELIANCE.BSE": 35.0,
        "INFY.BSE": 19.0,
        "HDFCBANK.BSE": 20.0,
        "SBIN.BSE": 8.0,
        "WIPRO.BSE": 7.0,
        "ITC.BSE": 3.5,
        "TATAMOTORS.BSE": 12.0,
        "HCLTECH.BSE": 18.0,
        "AAPL": 189.0,
        "MSFT": 412.0,
        "NVDA": 875.0,
        "TSLA": 175.0,
        "CPCL.BSE": 10.0,
        "TNPL.BSE": 4.5,
        "RAMCOCEM.BSE": 9.0,
        "CGPOWER.BSE": 6.5,
        "LAOPALA.BSE": 3.0,
        "PCBL.BSE": 2.5,
    }

    if not API_KEY or API_KEY == "dummy":
        return MOCK.get(symbol.upper(), 50.0)

    try:
        url = (
            f"https://www.alphavantage.co/query"
            f"?function=GLOBAL_QUOTE&symbol={symbol}&apikey={API_KEY}"
        )
        res = requests.get(url, timeout=8).json()
        price_str = res.get("Global Quote", {}).get("05. price", "0")
        return float(price_str or 0)
    except Exception as e:
        print(f"AlphaVantage error for {symbol}: {e}")
        return MOCK.get(symbol.upper(), 50.0)
