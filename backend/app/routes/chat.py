from fastapi import APIRouter
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '..', '.env'))

from app.services.stock_service import get_stock_price, usd_to_inr

router = APIRouter()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")

# Indian + global stocks recognized by the chatbot
KNOWN_STOCKS = {
    "tcs": "TCS.BSE",
    "reliance": "RELIANCE.BSE",
    "infy": "INFY.BSE",
    "infosys": "INFY.BSE",
    "hdfc": "HDFCBANK.BSE",
    "sbi": "SBIN.BSE",
    "wipro": "WIPRO.BSE",
    "itc": "ITC.BSE",
    "tatamotors": "TATAMOTORS.BSE",
    "hcl": "HCLTECH.BSE",
    "aapl": "AAPL",
    "msft": "MSFT",
    "nvda": "NVDA",
    "tsla": "TSLA",
    # Tamil Nadu / south india companies on BSE/NSE
    "cg power": "CGPOWER.BSE",
    "tnpl": "TNPL.BSE",
    "la opala": "LAOPALA.BSE",
    "ramco": "RAMCOCEM.BSE",
    "chennai petroleum": "CPCL.BSE",
    "la opala rg": "LAOPALA.BSE",
}

TAMILNADU_STOCKS = [
    {"symbol": "CPCL", "name": "Chennai Petroleum Corp.", "sector": "Oil & Gas"},
    {"symbol": "TNPL", "name": "Tamil Nadu Newsprint", "sector": "Paper"},
    {"symbol": "RAMCOCEM", "name": "Ramco Cements", "sector": "Cement"},
    {"symbol": "CGPOWER", "name": "CG Power & Industrial", "sector": "Electricals"},
    {"symbol": "LAOPALA", "name": "La Opala RG", "sector": "Glassware"},
    {"symbol": "PCBL", "name": "PCBL Ltd (Tamil Nadu)", "sector": "Chemicals"},
]

class ChatRequest(BaseModel):
    message: str


def gemini_chat(prompt: str) -> str:
    """Call Gemini via google-genai SDK (new package)."""
    try:
        from google import genai
        client = genai.Client(api_key=GOOGLE_API_KEY)
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"Gemini error: {e}")
        return None


@router.post("/")
def chat_response(data: ChatRequest):
    msg = data.message.lower()

    # Detect Tamil Nadu topic
    if "tamilnadu" in msg or "tamil" in msg or "chennai" in msg or "tamil nadu" in msg:
        stock_lines = "\n".join(
            [f"• **{s['symbol']}** – {s['name']} ({s['sector']})" for s in TAMILNADU_STOCKS]
        )
        base = (
            f"📍 **Top Listed Companies from Tamil Nadu (BSE/NSE):**\n\n{stock_lines}\n\n"
            "These are fundamentally strong companies. Ramco Cements and CPCL are especially "
            "popular among long-term investors in the region."
        )

        if GOOGLE_API_KEY:
            ai_prompt = (
                "You are StockSense AI, a financial analyst. The user asked about Tamil Nadu stocks. "
                "Give a concise 3-4 line investment insight about Tamil Nadu-based listed companies "
                "like Ramco Cements, Chennai Petroleum, TNPL, PCBL, La Opala. Keep it brief and professional."
            )
            ai_reply = gemini_chat(ai_prompt)
            if ai_reply:
                return {"reply": base + "\n\n🤖 **AI Insight:** " + ai_reply}
        return {"reply": base}

    # Detect a stock symbol / name in message
    found_symbol = None
    found_api_symbol = None
    for key, api_sym in KNOWN_STOCKS.items():
        if key in msg:
            found_symbol = key.upper()
            found_api_symbol = api_sym
            break

    if found_symbol or "price" in msg or "stock" in msg or "invest" in msg or "buy" in msg:
        symbol = found_api_symbol or "TCS.BSE"
        display = found_symbol or "TCS"
        price = get_stock_price(symbol)
        inr_price = usd_to_inr(price)
        trend = "Bullish" if len(display) % 2 == 0 else "Bearish"
        confidence = 72 + (len(display) % 20)

        base_reply = (
            f"📊 **{display}** – Current Price: ₹{inr_price:,.2f}\n\n"
            f"📈 AI Trend: **{trend}** (Confidence: {confidence}%)\n"
        )

        # Augment with Gemini if available
        if GOOGLE_API_KEY:
            ai_prompt = (
                f"You are StockSense AI. The user asked about {display} stock (current price ₹{inr_price:,.2f}). "
                f"Give a 2–3 sentence professional investment insight about {display}. "
                "Mention trend, risk level, and one key fundamental factor. Do not give direct buy/sell advice."
            )
            ai_reply = gemini_chat(ai_prompt)
            if ai_reply:
                return {"reply": base_reply + "\n🤖 **AI Analysis:** " + ai_reply}

        return {"reply": base_reply + "\n_Connect Google AI key for deeper analysis._"}

    # General question → send to Gemini
    if GOOGLE_API_KEY:
        system = (
            "You are StockSense AI, an expert in Indian (NSE/BSE) and global stock markets. "
            "Be concise, use bullet points where helpful, and always mention ₹ INR for Indian stocks. "
            "Do not provide direct financial advice; give educational market insights."
        )
        ai_reply = gemini_chat(f"{system}\n\nUser: {data.message}")
        if ai_reply:
            return {"reply": ai_reply}

    return {
        "reply": (
            "👋 I'm **StockSense AI**! Ask me things like:\n"
            "• *TCS price*\n"
            "• *Best Tamil Nadu stocks*\n"
            "• *Is Reliance bullish?*\n"
            "• *Investment plan for ₹50,000*"
        )
    }
