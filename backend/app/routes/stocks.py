from fastapi import APIRouter, HTTPException
import os
import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '..', '.env'))

router = APIRouter()

API_KEY = os.getenv("STOCK_API_KEY", "")
USD_TO_INR = 83.0

# Comprehensive mock database with INR prices
MOCK_DATA = {
    # US Stocks (price in USD, will convert to INR)
    "AAPL":  {"price_usd": 189.43, "change": 1.25, "amount": 2.34, "name": "Apple Inc.", "cap": "₹244.8T", "vol": "52M", "pe": 28.45, "range": "₹10,292-₹16,451", "exchange": "NASDAQ"},
    "MSFT":  {"price_usd": 412.15, "change": 0.87, "amount": 3.56, "name": "Microsoft Corp.", "cap": "₹253.1T", "vol": "28M", "pe": 35.2, "range": "₹27,990-₹35,688", "exchange": "NASDAQ"},
    "NVDA":  {"price_usd": 875.28, "change": 3.45, "amount": 29.2, "name": "NVIDIA Corp.", "cap": "₹178.5T", "vol": "42M", "pe": 72.1, "range": "₹49,820-₹78,932", "exchange": "NASDAQ"},
    "TSLA":  {"price_usd": 175.22, "change": -2.1, "amount": -3.76, "name": "Tesla Inc.", "cap": "₹46.2T", "vol": "115M", "pe": 48.3, "range": "₹13,200-₹21,900", "exchange": "NASDAQ"},
    # Indian Stocks (BSE/NSE) — price in INR directly (no conversion needed)
    "TCS":         {"price_usd": 44.0, "change": 1.1, "amount": 0.48, "name": "Tata Consultancy Services", "cap": "₹15.2L Cr", "vol": "3.2M", "pe": 31.2, "range": "₹3,215-₹4,592", "exchange": "NSE/BSE"},
    "RELIANCE":    {"price_usd": 35.0, "change": 0.8, "amount": 0.28, "name": "Reliance Industries", "cap": "₹19.8L Cr", "vol": "8.5M", "pe": 28.7, "range": "₹2,221-₹3,217", "exchange": "NSE/BSE"},
    "INFY":        {"price_usd": 19.0, "change": -0.5, "amount": -0.10, "name": "Infosys Ltd.", "cap": "₹6.1L Cr", "vol": "6.2M", "pe": 23.8, "range": "₹1,285-₹1,882", "exchange": "NSE/BSE"},
    "HDFCBANK":    {"price_usd": 20.0, "change": 1.3, "amount": 0.26, "name": "HDFC Bank", "cap": "₹11.5L Cr", "vol": "5.4M", "pe": 19.4, "range": "₹1,426-₹1,882", "exchange": "NSE/BSE"},
    "SBIN":        {"price_usd": 8.5,  "change": 2.1, "amount": 0.18, "name": "State Bank of India", "cap": "₹7.2L Cr", "vol": "12.1M", "pe": 11.2, "range": "₹595-₹912", "exchange": "NSE/BSE"},
    "WIPRO":       {"price_usd": 6.0,  "change": -0.8, "amount": -0.05, "name": "Wipro Ltd.", "cap": "₹2.5L Cr", "vol": "4.2M", "pe": 21.3, "range": "₹405-₹582", "exchange": "NSE/BSE"},
    "ITC":         {"price_usd": 3.5,  "change": 0.6, "amount": 0.02, "name": "ITC Ltd.", "cap": "₹3.4L Cr", "vol": "9.8M", "pe": 27.1, "range": "₹243-₹342", "exchange": "NSE/BSE"},
    # Tamil Nadu companies
    "CPCL":        {"price_usd": 10.0, "change": 1.8, "amount": 0.18, "name": "Chennai Petroleum Corp.", "cap": "₹14,900Cr", "vol": "1.2M", "pe": 8.4, "range": "₹682-₹1,072", "exchange": "NSE/BSE"},
    "TNPL":        {"price_usd": 4.5,  "change": 0.9, "amount": 0.04, "name": "Tamil Nadu Newsprint", "cap": "₹3,200Cr", "vol": "0.8M", "pe": 14.2, "range": "₹298-₹428", "exchange": "NSE/BSE"},
    "RAMCOCEM":    {"price_usd": 9.0,  "change": 1.2, "amount": 0.11, "name": "Ramco Cements", "cap": "₹18,500Cr", "vol": "0.6M", "pe": 42.1, "range": "₹628-₹982", "exchange": "NSE/BSE"},
    "CGPOWER":     {"price_usd": 6.5,  "change": 2.4, "amount": 0.16, "name": "CG Power & Industrial", "cap": "₹12,800Cr", "vol": "2.4M", "pe": 55.3, "range": "₹328-₹782", "exchange": "NSE/BSE"},
    "LAOPALA":     {"price_usd": 3.0,  "change": -0.3, "amount": -0.01, "name": "La Opala RG", "cap": "₹2,100Cr", "vol": "0.4M", "pe": 38.2, "range": "₹198-₹342", "exchange": "NSE/BSE"},
}


def get_mock(ticker: str) -> dict:
    d = MOCK_DATA.get(ticker, {
        "price_usd": 50.0, "change": 0.5, "amount": 0.25,
        "name": ticker, "cap": "N/A", "vol": "N/A",
        "pe": "N/A", "range": "N/A", "exchange": "NSE/BSE"
    })
    inr = round(d["price_usd"] * USD_TO_INR, 2)
    return {
        "ticker": ticker,
        "current_price": inr,
        "current_price_inr": f"₹{inr:,.2f}",
        "change_24h": d["change"],
        "change_amount": round(d["amount"] * USD_TO_INR, 2),
        "company_name": d["name"],
        "market_cap": d["cap"],
        "volume": d["vol"],
        "pe_ratio": d["pe"],
        "range_52w": d["range"],
        "exchange": d["exchange"],
        "currency": "INR",
    }


@router.get("/{ticker}")
def get_stock_data(ticker: str):
    ticker = ticker.upper().replace(".BSE", "").replace(".NSE", "")

    # Always use mock data for Indian stocks
    if ticker in MOCK_DATA and not API_KEY:
        return get_mock(ticker)

    if not API_KEY:
        return get_mock(ticker)

    # AlphaVantage lookup
    try:
        sym = ticker if ticker in ["AAPL", "MSFT", "NVDA", "TSLA"] else f"{ticker}.BSE"
        url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={sym}&apikey={API_KEY}"
        res = requests.get(url, timeout=8).json()
        gq = res.get("Global Quote", {})
        price_usd = float(gq.get("05. price", 0) or 0)

        if price_usd == 0:
            return get_mock(ticker)

        inr = round(price_usd * USD_TO_INR, 2)
        change = float(gq.get("10. change percent", "0").replace("%", "") or 0)
        amt = float(gq.get("09. change", 0) or 0)

        return {
            "ticker": ticker,
            "current_price": inr,
            "current_price_inr": f"₹{inr:,.2f}",
            "change_24h": round(change, 2),
            "change_amount": round(amt * USD_TO_INR, 2),
            "company_name": MOCK_DATA.get(ticker, {}).get("name", ticker),
            "market_cap": MOCK_DATA.get(ticker, {}).get("cap", "N/A"),
            "volume": gq.get("06. volume", "N/A"),
            "pe_ratio": MOCK_DATA.get(ticker, {}).get("pe", "N/A"),
            "range_52w": MOCK_DATA.get(ticker, {}).get("range", "N/A"),
            "exchange": MOCK_DATA.get(ticker, {}).get("exchange", "N/A"),
            "currency": "INR",
        }
    except Exception as e:
        return get_mock(ticker)
