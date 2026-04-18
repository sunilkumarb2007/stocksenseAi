// Centralized API service — all calls go through here
const BASE = import.meta.env.VITE_API_URL;

export const api = {
  async getStock(ticker) {
    try {
      const res = await fetch(`${BASE}/api/stocks/${ticker}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(`getStock(${ticker}):`, e);
      return null;
    }
  },

  async getPredict(ticker) {
    try {
      const res = await fetch(`${BASE}/api/predict/${ticker}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(`getPredict(${ticker}):`, e);
      return null;
    }
  },

  async getWatchlist() {
    try {
      const res = await fetch(`${BASE}/api/watchlist/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error("getWatchlist:", e);
      return [];
    }
  },

  async addToWatchlist(ticker) {
    try {
      const res = await fetch(`${BASE}/api/watchlist/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker }),
      });
      return await res.json();
    } catch (e) {
      console.error("addToWatchlist:", e);
      return null;
    }
  },

  async chat(message) {
    try {
      const res = await fetch(`${BASE}/api/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.reply || "AI server issue. Please try again.";
    } catch (e) {
      console.error("chat:", e);
      return "AI is taking longer than usual... please wait ⏳";
    }
  },
};
