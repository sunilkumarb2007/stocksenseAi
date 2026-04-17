import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockDetail = () => {
  const [data, setData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const ticker = "AAPL"; // Featured stock

  useEffect(() => {
    const fetchAapl = async () => {
      try {
        const [stockRes, predRes] = await Promise.all([
          axios.get(`${API_URL}/api/stocks/${ticker}`),
          axios.get(`${API_URL}/api/predict/${ticker}`)
        ]);
        setData(stockRes.data);
        setPrediction(predRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchAapl();
  }, [API_URL]);

  if(loading || !data || !prediction) return <div className="p-8 text-on-surface">Loading data from backend...</div>;

  const isBull = prediction.trend === "Bullish";
  const isBear = prediction.trend === "Bearish";

  return (
    <div className="flex-1 h-full overflow-y-auto bg-surface relative">
      <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10 flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-surface-container-high/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight">{data.company_name}</h1>
              <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-mono text-xs border border-outline-variant/30">{data.ticker}</span>
              <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-mono text-xs border border-outline-variant/30">{data.exchange}</span>
            </div>
            <p className="text-sm font-label text-on-surface-variant">Consumer Electronics • Information Technology</p>
          </div>
          <div className="text-left md:text-right">
            <div className="text-4xl font-headline font-bold text-on-surface mb-1 tracking-tight">${data.current_price?.toFixed(2)}</div>
            <div className="flex items-center md:justify-end gap-2 text-secondary font-medium">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+${data.change_amount?.toFixed(2)} ({data.change_24h}%)</span>
              <span className="text-xs text-on-surface-variant ml-2 font-normal">Today</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-panel rounded-xl p-6 flex flex-col h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-headline font-semibold text-on-surface">Price Action</h2>
              </div>
              <div className="flex gap-3 mb-4">
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">stacked_line_chart</span> RSI
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs text-primary">
                  <span className="material-symbols-outlined text-[14px]">show_chart</span> MACD
                </button>
              </div>
              <div className="flex-1 bg-surface-container-lowest rounded-lg border border-outline-variant/20 relative overflow-hidden flex items-center justify-center">
                 <div className="relative z-10 flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2">monitoring</span>
                  <span className="text-sm text-on-surface-variant/50 font-medium">Interactive Chart View</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-panel rounded-lg p-4">
                <p className="text-xs text-on-surface-variant font-label mb-1">Market Cap</p>
                <p className="text-lg font-headline font-semibold text-on-surface">{data.market_cap}</p>
              </div>
              <div className="glass-panel rounded-lg p-4">
                <p className="text-xs text-on-surface-variant font-label mb-1">Vol / Avg</p>
                <p className="text-lg font-headline font-semibold text-on-surface">{data.volume}</p>
              </div>
              <div className="glass-panel rounded-lg p-4">
                <p className="text-xs text-on-surface-variant font-label mb-1">P/E Ratio</p>
                <p className="text-lg font-headline font-semibold text-on-surface">{data.pe_ratio}</p>
              </div>
              <div className="glass-panel rounded-lg p-4">
                <p className="text-xs text-on-surface-variant font-label mb-1">52W Range</p>
                <p className="text-lg font-headline font-semibold text-on-surface text-sm mt-1">{data.range_52w}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`glass-panel rounded-xl p-6 relative overflow-hidden group ${isBull ? 'border-secondary/20 shadow-[0_24px_48px_-12px_rgba(0,185,84,0.05)]' : isBear ? 'border-tertiary/20' : 'border-primary/20'}`}>
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <span className="material-symbols-outlined text-primary">memory</span>
                <h2 className="text-sm font-headline uppercase tracking-wider text-on-surface-variant font-semibold">StockSense AI Forecast</h2>
              </div>
              <div className="flex items-end gap-4 mb-6 relative z-10">
                <div className={`${isBull?'bg-on-secondary-container/80 text-secondary border-secondary/30':isBear?'bg-tertiary-container text-tertiary border-tertiary':'bg-primary-container text-primary'} px-4 py-2 rounded-lg border  flex items-center gap-2 shadow-[0_0_15px_rgba(74,225,118,0.15)]`}>
                  <span className="material-symbols-outlined">{isBull?'trending_up':isBear?'trending_down':'swap_horiz'}</span>
                  <span className="font-headline font-bold text-xl">{prediction.trend}</span>
                </div>
                <div className="flex flex-col pb-1">
                  <span className="text-xs text-on-surface-variant">Confidence Score</span>
                  <span className="text-lg font-headline font-bold text-on-surface">{prediction.confidence}%</span>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                {prediction.insights.map((ins, i) => (
                  <div key={i} className="bg-surface-container-lowest/50 rounded-lg p-3 border border-outline-variant/10">
                    <div className="flex items-start gap-2">
                       <span className={`material-symbols-outlined ${ins.type==='negative'? 'text-tertiary':'text-secondary'} text-[16px] mt-0.5`}>
                         {ins.type === 'positive' ? 'check_circle' : ins.type === 'negative' ? 'remove_circle' : 'info'}
                       </span>
                      <div>
                        <p className="text-sm text-on-surface font-medium">{ins.title}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">{ins.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-xl p-6 flex-1 flex flex-col h-full min-h-[300px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-headline uppercase tracking-wider text-on-surface-variant font-semibold">News & Sentiment</h2>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                <div className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-on-surface-variant font-mono">Bloomberg • 10m ago</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-medium border border-secondary/20">Positive</span>
                  </div>
                  <p className="text-sm text-on-surface group-hover:text-primary transition-colors leading-snug">Apple unveils next-generation silicon, promising major efficiency gains across product lines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
