# 📊 StockSense AI – Market Trend Prediction Platform

A production-grade AI-powered stock market intelligence platform supporting Indian (NSE/BSE) and global stocks with real-time prices, Gemini AI chatbot, and Google authentication.

---

## ✨ Features

- 🤖 **AI Chatbot** – Ask about any stock (TCS, Reliance, Tamil Nadu stocks) — powered by Google Gemini
- 🔐 **Google Firebase Auth** – Secure login with Google popup/redirect
- 📈 **Live Stock Prices** – Alpha Vantage API with USD → ₹ INR conversion
- 💹 **Indian Stock Support** – NSE / BSE stocks including Tamil Nadu companies
- 🎨 **Premium Dark UI** – Glassmorphism, animations, fully responsive
- 🛡️ **Protected Routes** – Dashboard only accessible after login

---

## 🗂️ Project Structure

```
StockSense-AI/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/  (Sidebar, ChatBox)
│   │   ├── context/     (AuthContext)
│   │   ├── pages/       (Landing, Dashboard, Markets, Watchlist, Login)
│   │   └── services/    (firebase.js, api.js)
│   ├── .env.example
│   └── index.html
├── backend/           # FastAPI Python
│   ├── app/
│   │   ├── routes/      (chat, stocks, predict, watchlist)
│   │   └── services/    (stock_service)
│   ├── .env.example
│   ├── main.py
│   └── requirements.txt
├── vercel.json
└── .gitignore
```

---

## ⚙️ Local Setup

### 1. Clone

```bash
git clone https://github.com/sunilkumarb2007/StockSense-Ai.git
cd StockSense-Ai
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
# Fill in your Firebase + API values in .env
npm install
npm run dev
# → http://localhost:5173
```

### 3. Backend

```bash
cd backend
cp .env.example .env
# Fill in your STOCK_API_KEY and GOOGLE_API_KEY
pip install -r requirements.txt
uvicorn main:app --reload
# → http://localhost:8000
# → Swagger docs: http://localhost:8000/docs
```

---

## 🔑 Environment Variables

### `frontend/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend URL (e.g. `http://localhost:8000`) |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

### `backend/.env`

| Variable | Description |
|---|---|
| `STOCK_API_KEY` | Alpha Vantage API key (free at alphavantage.co) |
| `GOOGLE_API_KEY` | Google AI Studio key (free at aistudio.google.com) |

---

## 🚀 Deployment

### Frontend → Vercel
1. Connect repo to [vercel.com](https://vercel.com)
2. Add all `VITE_` environment variables in Vercel dashboard
3. Deploy — Vercel auto-detects the `vercel.json` config

### Backend → Render
1. Create a new **Web Service** on [render.com](https://render.com)
2. Set **Build Command**: `pip install -r requirements.txt`
3. Set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
4. Add `STOCK_API_KEY` and `GOOGLE_API_KEY` in environment variables
5. Update `VITE_API_URL` in Vercel to point to your Render URL

---

## 💬 AI Chatbot Examples

Ask the floating chat button (bottom-right):

- *"TCS price"* → ₹ INR price + AI trend analysis
- *"Best Tamil Nadu stocks"* → curated list + Gemini insights
- *"Is Reliance bullish?"* → trend + confidence score
- *"Investment plan for ₹50,000"* → Gemini AI portfolio advice

---

## 🏗️ Built With

- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: FastAPI, Python 3.13, google-genai, Alpha Vantage
- **Auth**: Firebase Authentication (Google Sign-In)
- **AI**: Google Gemini 2.0 Flash
- **Stock Data**: Alpha Vantage API (NSE/BSE + US Markets)
