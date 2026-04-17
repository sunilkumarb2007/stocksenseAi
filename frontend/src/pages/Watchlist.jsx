import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [tickerInput, setTickerInput] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/watchlist`);
      const tickers = res.data;
      setWatchlist(tickers);

      const sData = await Promise.all(
        tickers.map(async t => {
          const stock = await axios.get(`${API_URL}/api/stocks/${t}`);
          const pred = await axios.get(`${API_URL}/api/predict/${t}`);
          return { ...stock.data, prediction: pred.data };
        })
      );
      setStockData(sData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if(!tickerInput) return;
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/watchlist`, { ticker: tickerInput });
      setTickerInput('');
      fetchData();
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-12 relative overflow-x-hidden min-h-screen bg-surface">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight">Watchlist</h2>
          <p className="text-on-surface-variant font-label text-sm mt-1">AI-monitored high-priority assets.</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
          </div>
          <input value={tickerInput} onChange={e=>setTickerInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && handleAdd()} className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block pl-12 p-3.5 transition-all outline-none focus:shadow-[0_0_15px_rgba(190,198,224,0.2)]" placeholder="Add Ticker (e.g., TSLA, NVDA)" type="text" />
          <button onClick={handleAdd} className="absolute inset-y-1 right-1 px-3 py-1 bg-surface-container-high hover:bg-surface-bright text-on-surface rounded-md text-xs font-semibold transition-colors">
            Add
          </button>
        </div>
      </header>

      {loading ? (
        <div className="text-on-surface">Loading Watchlist Data...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {stockData.map((data) => {
            const isBull = data.prediction?.trend === "Bullish";
            const up = data.change_amount > 0;
            return (
              <article key={data.ticker} className="glass-panel backdrop-blur-xl rounded-xl p-6 hover:bg-surface-container transition-all group relative overflow-hidden flex flex-col gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{data.ticker}</h3>
                    <p className="text-on-surface-variant font-label text-xs mt-0.5">{data.company_name}</p>
                  </div>
                  <div className={`${isBull ? 'bg-on-secondary-container/20 text-secondary border-secondary/20' : 'bg-tertiary-container text-tertiary border-tertiary/20'} border px-3 py-1 rounded-full flex items-center gap-1.5`}>
                    <span className="material-symbols-outlined text-[14px]">{isBull ? 'trending_up' : 'trending_down'}</span>
                    <span className="font-label text-xs font-semibold">{data.prediction?.trend}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div>
                    <div className="text-3xl font-headline font-bold text-on-surface tracking-tight">${data.current_price?.toFixed(2)}</div>
                    <div className={`${up ? 'text-secondary' : 'text-tertiary'} font-label text-sm font-semibold flex items-center gap-1 mt-1`}>
                      <span className="material-symbols-outlined text-[16px]">{up ? 'arrow_upward' : 'arrow_downward'}</span>
                      {up?'+':''}{data.change_24h}%
                    </div>
                  </div>
                  <div className="w-24 h-12 relative flex items-end opacity-80">
                    <div className={`absolute bottom-0 w-full h-full bg-gradient-to-t ${up ? 'from-secondary/20' : 'from-tertiary/20'} to-transparent rounded-sm`}></div>
                    <svg className={`w-full h-full ${up ? 'stroke-secondary' : 'stroke-tertiary'} fill-none absolute bottom-0 left-0 z-10`} preserveAspectRatio="none" viewBox="0 0 100 40">
                      {up ? <path d="M0,35 Q10,25 20,30 T40,20 T60,15 T80,5 T100,0" strokeLinecap="round" strokeWidth="2"></path> : <path d="M0,5 Q20,10 40,25 T60,20 T80,35 T100,40" strokeLinecap="round" strokeWidth="2"></path>}
                    </svg>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
