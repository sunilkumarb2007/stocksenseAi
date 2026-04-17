import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const StockDetail = () => {
  const [data, setData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  const ticker = "TCS"; // Featured Indian stock

  useEffect(() => {
    const fetchData = async () => {
      const [stock, pred] = await Promise.all([
        api.getStock(ticker),
        api.getPredict(ticker),
      ]);
      setData(stock);
      setPrediction(pred);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-on-surface-variant font-body">Loading market data...</div>;
  if (!data || !prediction) return <div className="p-8 text-tertiary font-body">Unable to load stock data. Backend may be starting up.</div>;

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
            <p className="text-sm font-label text-on-surface-variant">NSE/BSE Listed • India</p>
          </div>
          <div className="text-left md:text-right">
            <div className="text-4xl font-headline font-bold text-on-surface mb-1 tracking-tight">
              {data.current_price_inr || `₹${data.current_price?.toFixed(2)}`}
            </div>
            <div className={`flex items-center md:justify-end gap-2 font-medium ${data.change_24h >= 0 ? 'text-secondary' : 'text-tertiary'}`}>
              <span className="material-symbols-outlined text-sm">{data.change_24h >= 0 ? 'trending_up' : 'trending_down'}</span>
              <span>{data.change_24h >= 0 ? '+' : ''}{data.change_24h}% Today</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-panel rounded-xl p-6 flex flex-col h-[440px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-headline font-semibold text-on-surface">Price Action</h2>
                <div className="flex gap-2">
                  {['1D','1W','1M','YTD'].map(t => (
                    <button key={t} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-high transition-colors">{t}</button>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-surface-container-lowest rounded-lg border border-outline-variant/20 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/10 to-transparent"></div>
                  <svg className="absolute bottom-0 left-0 w-full h-full stroke-secondary/60 fill-none stroke-2" preserveAspectRatio="none" viewBox="0 0 1000 300">
                    <path d="M0,250 C100,240 150,280 250,220 C350,160 400,200 500,120 C600,40 700,150 800,80 C900,10 950,50 1000,20"></path>
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <span className="text-xs text-on-surface-variant/60 font-label">Connect AlphaVantage key for live chart data</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {label: 'Market Cap', val: data.market_cap},
                {label: 'Volume',     val: data.volume},
                {label: 'P/E Ratio',  val: data.pe_ratio},
                {label: '52W Range',  val: data.range_52w},
              ].map(m => (
                <div key={m.label} className="glass-panel rounded-lg p-4">
                  <p className="text-xs text-on-surface-variant font-label mb-1">{m.label}</p>
                  <p className="text-lg font-headline font-semibold text-on-surface">{m.val || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`glass-panel rounded-xl p-6 relative overflow-hidden border ${isBull ? 'border-secondary/20' : isBear ? 'border-tertiary/20' : 'border-primary/20'}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">memory</span>
                <h2 className="text-sm font-headline uppercase tracking-wider text-on-surface-variant font-semibold">StockSense AI Forecast</h2>
              </div>
              <div className="flex items-end gap-4 mb-5">
                <div className={`${isBull ? 'bg-secondary/10 text-secondary border-secondary/30' : isBear ? 'bg-tertiary-container text-tertiary border-tertiary/30' : 'bg-primary-container text-primary border-primary/30'} px-4 py-2 rounded-lg border flex items-center gap-2`}>
                  <span className="material-symbols-outlined">{isBull ? 'trending_up' : isBear ? 'trending_down' : 'swap_horiz'}</span>
                  <span className="font-headline font-bold text-xl">{prediction.trend}</span>
                </div>
                <div className="flex flex-col pb-1">
                  <span className="text-xs text-on-surface-variant">Confidence</span>
                  <span className="text-2xl font-headline font-bold text-on-surface">{prediction.confidence}%</span>
                </div>
              </div>
              <div className="space-y-3">
                {prediction.insights?.map((ins, i) => (
                  <div key={i} className="bg-surface-container-lowest/50 rounded-lg p-3 border border-outline-variant/10">
                    <div className="flex items-start gap-2">
                      <span className={`material-symbols-outlined text-[16px] mt-0.5 ${ins.type === 'negative' ? 'text-tertiary' : ins.type === 'positive' ? 'text-secondary' : 'text-on-surface-variant'}`}>
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

            <div className="glass-panel rounded-xl p-6 flex-1">
              <h2 className="text-sm font-headline uppercase tracking-wider text-on-surface-variant font-semibold mb-4">News & Sentiment</h2>
              <div className="space-y-4">
                {[
                  {src: 'Economic Times', age: '5m', tag: 'Positive', tagCls: 'bg-secondary/10 text-secondary border-secondary/20', text: `${data.ticker} gains on strong quarterly earnings beat and robust order book.`},
                  {src: 'Mint', age: '2h', tag: 'Neutral', tagCls: 'bg-surface-container-highest text-on-surface-variant border-outline-variant/30', text: 'IT sector sees mixed trading ahead of US Fed rate decision.'},
                  {src: 'Business Standard', age: '4h', tag: 'Positive', tagCls: 'bg-secondary/10 text-secondary border-secondary/20', text: `FII inflows into Indian IT stocks continue; ${data.ticker} among top picks.`},
                ].map((n, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-on-surface-variant font-mono">{n.src} • {n.age} ago</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${n.tagCls}`}>{n.tag}</span>
                    </div>
                    <p className="text-sm text-on-surface group-hover:text-primary transition-colors leading-snug">{n.text}</p>
                    {i < 2 && <hr className="border-outline-variant/20 mt-4" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
