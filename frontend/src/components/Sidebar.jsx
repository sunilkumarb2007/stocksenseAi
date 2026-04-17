import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#081425] flex flex-col py-8 border-r border-slate-800/20 z-40 hidden md:flex">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border border-outline-variant/30 overflow-hidden">
          {currentUser && currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="User" className="w-full h-full object-cover" />
          ) : (
              <span className="material-symbols-outlined text-primary text-xl">account_circle</span>
          )}
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-50 uppercase tracking-widest font-headline mb-1 leading-tight">StockSense AI</h1>
          <p className="text-slate-500 font-label text-[10px] uppercase tracking-wider">Pro Account</p>
        </div>
      </div>
      
      <button className="mx-6 mb-8 bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-headline font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-[0_8px_16px_-4px_rgba(190,198,224,0.2)] transition-all">
        <span className="material-symbols-outlined text-sm">add</span>
        New Analysis
      </button>
      
      <nav className="flex-1 space-y-1 overflow-y-auto">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `flex items-center px-6 py-3 font-label text-sm transition-all ${isActive ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-500 translate-x-1' : 'text-slate-500 hover:text-slate-100 hover:bg-slate-800/50 group'}`}
        >
          <span className="material-symbols-outlined mr-3 text-lg group-hover:scale-110 transition-transform">dashboard</span>
          Dashboard
        </NavLink>
        <NavLink 
          to="/markets" 
          className={({ isActive }) => `flex items-center px-6 py-3 font-label text-sm transition-all ${isActive ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-500 translate-x-1' : 'text-slate-500 hover:text-slate-100 hover:bg-slate-800/50 group'}`}
        >
          <span className="material-symbols-outlined mr-3 text-lg group-hover:scale-110 transition-transform">query_stats</span>
          Markets
        </NavLink>
        <NavLink 
          to="/watchlist" 
          className={({ isActive }) => `flex items-center px-6 py-3 font-label text-sm transition-all ${isActive ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-500 translate-x-1' : 'text-slate-500 hover:text-slate-100 hover:bg-slate-800/50 group'}`}
        >
          <span className="material-symbols-outlined mr-3 text-lg group-hover:scale-110 transition-transform">star</span>
          Watchlist
        </NavLink>
      </nav>
      
      <div className="mt-auto px-0 border-t border-slate-800/20 pt-6 cursor-pointer">
        <div className="space-y-1">
          <div className="text-slate-500 flex items-center px-6 py-3 hover:bg-slate-800/30 font-label text-sm hover:text-slate-100 transition-all group">
            <span className="material-symbols-outlined mr-3 text-lg group-hover:rotate-45 transition-transform">settings</span>
            Settings
          </div>
          <div onClick={logout} className="text-tertiary flex items-center px-6 py-3 hover:bg-tertiary-container/20 font-label text-sm transition-all group">
            <span className="material-symbols-outlined mr-3 text-lg group-hover:block transition-transform">logout</span>
            Logout
          </div>
        </div>
        
        <div className="mt-6 px-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-fixed ghost-border overflow-hidden">
             {currentUser && currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined font-light">account_circle</span>
              )}
          </div>
          <div className="overflow-hidden">
            <p className="font-body text-sm font-medium text-slate-200 truncate">{currentUser ? currentUser.displayName : 'Guest'}</p>
            <p className="font-label text-xs text-slate-500 truncate">{currentUser ? currentUser.email : ''}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
