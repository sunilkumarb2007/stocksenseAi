import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const tickers = ['AAPL', 'SNOW', 'MSFT'];
        const results = await Promise.all(
          tickers.map(ticker => axios.get(`${API_URL}/api/predict/${ticker}`))
        );
        setPredictions(results.map(res => res.data));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch predictions", err);
        setLoading(false);
      }
    };
    fetchPredictions();
  }, [API_URL]);

  return (
    <div className="p-8 bg-surface min-h-screen">
      {/* Header area */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface">Overview</h2>
          <p className="font-body text-on-surface-variant mt-1 text-sm">Real-time AI analysis & market pulse.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input className="bg-surface-container-lowest ghost-border rounded-full py-2 pl-10 pr-4 text-sm font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 w-64 transition-all" placeholder="Search ticker, pattern..." type="text" />
          </div>
          <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center ghost-border text-on-surface-variant hover:text-on-surface transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Live Market Overview */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[{name: 'S&P 500', price: '5,147.21', change: '1.24%', up: true},
          {name: 'NASDAQ', price: '16,401.84', change: '1.87%', up: true},
          {name: 'DOW JONES', price: '39,069.59', change: '0.15%', up: false},
          {name: 'VIX', price: '13.24', change: '4.20%', up: false}
         ].map(idx => (
           <div key={idx.name} className="glass-panel rounded-xl p-4 flex flex-col relative overflow-hidden group hover:bg-surface-container transition-colors duration-300 cursor-pointer">
             <div className="flex justify-between items-start mb-2">
               <div>
                 <span className="font-headline font-semibold text-on-surface">{idx.name}</span>
                 <p className="font-label text-xs text-on-surface-variant">INDEX</p>
               </div>
               <span className={`${idx.up ? 'bg-secondary/10 text-secondary' : 'bg-tertiary-container/30 text-tertiary'} font-body text-sm flex items-center font-medium px-2 py-0.5 rounded`}>
                 <span className="material-symbols-outlined text-[16px] mr-1">{idx.up ? 'arrow_upward' : 'arrow_downward'}</span>
                 {idx.change}
               </span>
             </div>
             <div className="font-headline text-2xl font-bold text-on-surface mb-4">{idx.price}</div>
             <div className="h-8 w-full mt-auto relative">
               <div className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-t ${idx.up ? 'from-secondary/20' : 'from-tertiary/20'} to-transparent opacity-50`}></div>
               <svg className={`w-full h-full ${idx.up ? 'stroke-secondary' : 'stroke-tertiary'} fill-none stroke-2`} preserveAspectRatio="none" viewBox="0 0 100 30">
                 {idx.up ? <path d="M0,20 Q10,15 20,25 T40,10 T60,18 T80,5 T100,2"></path> : <path d="M0,5 Q10,10 20,8 T40,20 T60,15 T80,25 T100,28"></path>}
               </svg>
             </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Chart Area */}
          <div className="glass-panel rounded-xl p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-headline text-xl font-bold text-on-surface flex items-center gap-2">
                  NVDA 
                  <span className="bg-primary-container text-primary text-xs px-2 py-1 rounded-full font-label font-medium ghost-border">FEATURED AI PICK</span>
                </h3>
                <p className="font-body text-sm text-on-surface-variant">NVIDIA Corporation</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-label text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded transition-colors">1D</button>
                <button className="px-3 py-1 text-xs font-label text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded transition-colors">1W</button>
                <button className="px-3 py-1 text-xs font-label bg-surface-container-highest text-primary rounded ghost-border">1M</button>
                <button className="px-3 py-1 text-xs font-label text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded transition-colors">YTD</button>
              </div>
            </div>
            {/* Faux Chart */}
            <div className="h-72 w-full relative border-l border-b border-outline-variant/30 pl-4 pb-4">
              <div className="absolute left-[-30px] h-full flex flex-col justify-between text-[10px] text-on-surface-variant font-label py-4">
                <span>$950</span><span>$900</span><span>$850</span><span>$800</span><span>$750</span>
              </div>
              <div className="w-full h-[calc(100%-16px)] flex flex-col justify-between pointer-events-none">
                {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-outline-variant/10"></div>)}
              </div>
              <div className="absolute inset-0 pl-4 py-4 pr-1 overflow-hidden pointer-events-none">
                 <div className="absolute bottom-0 left-4 w-[calc(100%-16px)] h-[calc(100%-32px)] bg-gradient-to-t from-primary/20 to-transparent"></div>
                 <svg className="absolute bottom-0 left-4 w-[calc(100%-16px)] h-[calc(100%-32px)] stroke-primary fill-none stroke-[3px]" preserveAspectRatio="none" viewBox="0 0 1000 300">
                    <path d="M0,250 C100,240 150,280 250,220 C350,160 400,200 500,120 C600,40 700,150 800,80 C900,10 950,50 1000,20"></path>
                 </svg>
                 <div className="absolute right-1 top-[20%] w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(190,198,224,0.8)]"></div>
              </div>
            </div>
          </div>

          {/* Movers Table */}
          <div className="glass-panel rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Momentum Movers</h3>
            <div className="w-full">
              <div className="grid grid-cols-5 gap-4 py-3 px-4 bg-surface-container-lowest rounded-t-lg text-xs font-label text-on-surface-variant tracking-wider uppercase">
                <div className="col-span-2">Asset</div><div className="text-right">Price</div><div className="text-right">24h Chg</div><div className="text-right">Vol (M)</div>
              </div>
              <div className="space-y-1 mt-1">
                {[
                  { ticker: 'SMCI', name: 'Super Micro', type: 'Hardware', price: '$1,074.34', chg: '+12.4%', vol: '42.1', c: 'text-secondary' },
                  { ticker: 'ARM', name: 'Arm Holdings', type: 'Semiconductors', price: '$142.10', chg: '+8.2%', vol: '28.5', c: 'text-secondary' },
                  { ticker: 'TSLA', name: 'Tesla Inc.', type: 'Automotive', price: '$175.22', chg: '-4.5%', vol: '115.2', c: 'text-tertiary' }
                ].map((item) => (
                  <div key={item.ticker} className="grid grid-cols-5 gap-4 py-3 px-4 bg-surface hover:bg-surface-container-lowest transition-colors rounded items-center group cursor-pointer">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-headline text-[10px] font-bold text-on-surface ghost-border">{item.ticker}</div>
                      <div>
                        <div className="font-body text-sm font-medium text-on-surface">{item.name}</div>
                        <div className="font-label text-[10px] text-on-surface-variant">{item.type}</div>
                      </div>
                    </div>
                    <div className="text-right font-body text-sm text-on-surface">{item.price}</div>
                    <div className={`text-right font-body text-sm font-medium ${item.c}`}>{item.chg}</div>
                    <div className="text-right font-body text-sm text-on-surface-variant">{item.vol}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span> Alpha Signals
              </h3>
            </div>
          </div>

          {loading ? (
            <div className="text-on-surface-variant font-body">Loading predictions...</div>
          ) : (
            predictions.map(pred => {
              const isBull = pred.trend === "Bullish";
              const isBear = pred.trend === "Bearish";
              const isNeutral = pred.trend === "Neutral";
              
              let styleCls = isBull ? "border-secondary/20 shadow-[0_24px_48px_-12px_rgba(0,185,84,0.05)]" : 
                            (isBear ? "border-tertiary/20 shadow-[0_24px_48px_-12px_rgba(255,179,173,0.05)]" : "border-primary/20");
              let badgeCls = isBull ? "bg-on-secondary-container text-secondary" : 
                            (isBear ? "bg-tertiary-container text-tertiary" : "bg-primary-container text-primary");
              let icon = isBull ? "trending_up" : (isBear ? "trending_down" : "swap_horiz");

              return (
                <div key={pred.ticker} className={`glass-panel rounded-xl p-5 relative overflow-hidden group cursor-pointer border ${styleCls} transition-all`}>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="bg-surface-container-highest p-2 rounded-lg ghost-border">
                        <span className="font-headline font-bold text-on-surface">{pred.ticker}</span>
                      </div>
                    </div>
                    <div className={`${badgeCls} px-3 py-1 rounded-full text-xs font-label font-bold flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-[14px]">{icon}</span>
                      {pred.confidence || 50}% {pred.trend.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-xs font-label text-on-surface-variant leading-relaxed line-clamp-2 mt-4 relative z-10">
                    {pred.insights && pred.insights.length > 0 ? pred.insights[0].desc : "AI is awaiting more data parameters."}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
