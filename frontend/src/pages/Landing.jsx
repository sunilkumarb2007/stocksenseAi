import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-background text-on-background font-body min-h-screen antialiased selection:bg-primary selection:text-on-primary">
      {/* TopNavBar */}
      <nav className="bg-[#081425]/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-slate-700/15 shadow-2xl shadow-blue-900/10">
        <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-slate-100 font-headline">
            StockSense AI
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <span className="text-blue-400 font-semibold border-b-2 border-blue-400 pb-1 text-sm tracking-wide cursor-pointer">Features</span>
            <span className="text-slate-400 hover:text-slate-100 transition-colors text-sm tracking-wide cursor-pointer">Pricing</span>
            <span className="text-slate-400 hover:text-slate-100 transition-colors text-sm tracking-wide cursor-pointer">About</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="hidden md:inline-block text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium px-4 py-2 hover:bg-slate-800/40 rounded-lg">Login</Link>
            <Link to="/dashboard" className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity scale-95 duration-200 transition-transform">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[150px] z-0 pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px] z-0 pointer-events-none"></div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 bg-surface-container-high/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-outline-variant/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-medium tracking-wide text-on-surface-variant uppercase">Platform v2.4 Live</span>
          </div>
          
          <h1 className="font-headline font-extrabold text-5xl md:text-7xl tracking-tight mb-6 max-w-4xl leading-tight">
            Master the Market with <span className="bg-gradient-to-r from-primary via-blue-200 to-white text-gradient">AI Precision</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 font-light leading-relaxed">
            High-frequency insights powered by deep learning. Uncover hidden patterns, anticipate volatility, and trade with absolute clarity in the obsidian void of the market.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(190,198,224,0.3)] transition-all duration-300 flex items-center justify-center group">
              Get Started Now
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 glass-panel text-on-surface font-medium rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center group">
              <span className="material-symbols-outlined mr-2 text-primary group-hover:scale-110 transition-transform">play_circle</span>
              Watch Demo
            </button>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 w-full max-w-5xl relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-0 h-32 pointer-events-none"></div>
            <div className="glass-panel rounded-xl overflow-hidden ambient-shadow border-t border-l border-white/5">
              <img alt="Financial charts" className="w-full h-auto object-cover opacity-80 mix-blend-screen grayscale-[30%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4-QlRPbuUjCLTt5EOrVV9SZ58uspxLhWfVTaI-Kn6ezT3k5Lti20mZzxQcNyhCXuh5jIe0MizJE3vsn1ALvlqwMIjYbSsNUimBPs_a3GurjiVnk12PXdLKhdbMUfMku423iGzN4YOOhhcIhHV0y1O8dZrRJ4a6IuXnxazMsEMeOu6CRwVDAuRaSUsI21-hDFiTewsmhpin00fHbmWiorxHpB_lf_oGb5p6YzRHOcD1ThNa7PzakLChnRBoBhQTp4Kt-JmDdRyjDu4"/>
              <div className="absolute top-8 left-8 glass-panel px-4 py-3 rounded-lg flex flex-col animate-[float_4s_ease-in-out_infinite]">
                <span className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">AI Signal: AAPL</span>
                <div className="flex items-center space-x-2">
                  <span className="font-headline font-bold text-xl text-secondary">Strong Buy</span>
                  <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="mb-16">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-on-surface mb-4">Core Intelligence</h2>
            <p className="text-on-surface-variant text-lg max-w-xl">The analytical engine driving next-generation portfolios. Designed for zero friction and maximum insight.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
            {/* Feature 1 */}
            <div className="glass-panel rounded-xl p-8 md:col-span-2 group hover:bg-surface-container-high transition-colors duration-500">
              <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center border border-outline-variant/30 mb-6 group-hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-primary">satellite_alt</span>
              </div>
              <h3 className="font-headline font-semibold text-2xl text-on-surface mb-3">Real-Time Telemetry</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 max-w-md">Sub-millisecond data feeds direct from major exchanges. We strip away the noise to present pure price action on the obsidian canvas.</p>
              
              <div className="bg-surface-container-lowest/50 rounded-lg p-4 border border-outline-variant/10">
                <div className="flex justify-between text-xs text-on-surface-variant border-b border-outline-variant/10 pb-2 mb-2 uppercase tracking-wider">
                  <span>Asset</span><span>Price</span><span>24h Change</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-sm">BTC/USD</span>
                  <span className="font-mono text-sm">64,230.50</span>
                  <span className="text-secondary text-xs flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">arrow_upward</span>2.4%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-sm">ETH/USD</span>
                  <span className="font-mono text-sm">3,450.12</span>
                  <span className="text-tertiary text-xs flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">arrow_downward</span>0.8%</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel rounded-xl p-8 flex flex-col group hover:bg-surface-container-high transition-colors duration-500">
              <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center border border-outline-variant/30 mb-6 group-hover:border-secondary/50 transition-colors">
                <span className="material-symbols-outlined text-secondary">psychology</span>
              </div>
              <h3 className="font-headline font-semibold text-xl text-on-surface mb-3">Predictive Forecasting</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">Our proprietary neural networks digest millions of data points to deliver immediate Bullish or Bearish verdicts.</p>
              <div className="space-y-3">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-secondary font-medium text-sm">Bullish Signal</span>
                  <span className="material-symbols-outlined text-secondary">trending_up</span>
                </div>
                <div className="bg-tertiary/10 border border-tertiary/20 rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-tertiary font-medium text-sm">Bearish Signal</span>
                  <span className="material-symbols-outlined text-tertiary">trending_down</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel rounded-xl p-8 md:col-span-3 flex flex-col md:flex-row items-center gap-10 group hover:bg-surface-container-high transition-colors duration-500">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center border border-outline-variant/30 mb-6 group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-primary">donut_large</span>
                </div>
                <h3 className="font-headline font-semibold text-2xl text-on-surface mb-3">Deep Order Book Analytics</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-lg mb-6">Visualize liquidity walls and whale movements before they impact price action. High-end editorial curation applied to complex financial data structures.</p>
                <div className="text-primary text-sm font-medium hover:underline flex items-center cursor-pointer">
                  Explore Analytics
                  <span className="material-symbols-outlined text-[16px] ml-1">chevron_right</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-48 bg-surface-container-lowest/40 rounded-xl border border-outline-variant/20 relative overflow-hidden flex items-end">
                <div className="w-full flex items-end justify-around px-4 pb-4 space-x-2 h-full opacity-60 pt-8">
                  <div className="w-full bg-outline-variant/40 rounded-t-sm h-[30%] hover:bg-primary/50 transition-colors cursor-pointer"></div>
                  <div className="w-full bg-outline-variant/40 rounded-t-sm h-[50%] hover:bg-primary/50 transition-colors cursor-pointer"></div>
                  <div className="w-full bg-secondary/60 rounded-t-sm h-[80%] relative group cursor-pointer">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Volume Spike</div>
                  </div>
                  <div className="w-full bg-outline-variant/40 rounded-t-sm h-[40%] hover:bg-primary/50 transition-colors cursor-pointer"></div>
                  <div className="w-full bg-tertiary/60 rounded-t-sm h-[60%] hover:bg-tertiary/80 transition-colors cursor-pointer"></div>
                  <div className="w-full bg-outline-variant/40 rounded-t-sm h-[20%] hover:bg-primary/50 transition-colors cursor-pointer"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#081425] w-full py-12 mt-20 border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8">
          <div className="mb-6 md:mb-0">
            <span className="text-slate-500 font-label text-sm uppercase tracking-wider text-center">
              © 2024 StockSense AI. Editorial Data for High-Frequency Insights.
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="text-slate-500 hover:text-blue-400 transition-colors font-label text-sm uppercase tracking-wider cursor-pointer">Privacy Policy</span>
            <span className="text-slate-500 hover:text-blue-400 transition-colors font-label text-sm uppercase tracking-wider cursor-pointer">Terms of Service</span>
            <span className="text-slate-500 hover:text-blue-400 transition-colors font-label text-sm uppercase tracking-wider cursor-pointer">API Documentation</span>
            <span className="text-slate-500 hover:text-blue-400 transition-colors font-label text-sm uppercase tracking-wider cursor-pointer">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
