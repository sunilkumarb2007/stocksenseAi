from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/{ticker}")
def get_prediction(ticker: str):
    ticker = ticker.upper()
    
    # Mock AI Prediction Engine
    # In a real app, this would query OpenAI or an internal ML model 
    # to retrieve sentiment, technicals, and output a structured confidence score
    
    trends = ["Bullish", "Bearish", "Neutral"]
    
    # Deterministic mock based on ticker length so it doesn't change every refresh
    idx = len(ticker) % 3
    trend = trends[idx]
    
    confidence = random.randint(70, 95)
    
    insights = [
        {"type": "positive", "title": "Strong RSI Divergence", "desc": "Indicating potential upward breakout in near term."},
        {"type": "positive", "title": "Positive Sentiment Spikes", "desc": "High volume of bullish options activity noted."},
        {"type": "negative", "title": "Macro Headwinds", "desc": "Supply chain constraints remain a minor limiting factor."}
    ]
    
    # Make some contextual responses based on trend
    if trend == "Bearish":
        insights = [
            {"type": "negative", "title": "MACD bearish divergence", "desc": "On daily timeframe. Support breached on high volume."},
            {"type": "negative", "title": "Insider Selling", "desc": "Notable insider liquidation in past 48 hours."}
        ]
    elif trend == "Neutral":
        insights = [
            {"type": "neutral", "title": "Consolidating Volume", "desc": "Price action is compressing between key moving averages. Awaiting catalyst."}
        ]

    return {
        "ticker": ticker,
        "trend": trend,
        "confidence": confidence,
        "insights": insights
    }
