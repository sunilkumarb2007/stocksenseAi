import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I am StockSense AI. Ask me about Indian stocks, like 'TCS price' or 'Is Reliance bullish?'" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const endOfMessagesRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/chat`, { message: userMsg });
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-surface-container-high/90 backdrop-blur-xl border border-outline-variant/30 rounded-2xl w-80 sm:w-96 mb-4 shadow-[0_24px_48px_-12px_rgba(4,14,31,0.5)] overflow-hidden flex flex-col transition-all h-[500px]">
          <div className="bg-gradient-to-r from-primary to-primary-container p-4 flex justify-between items-center text-on-primary">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <span className="font-headline font-bold text-sm tracking-wide">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-surface-container-lowest/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl p-3 text-sm font-body ${msg.sender === 'user' ? 'bg-primary/20 text-on-surface border border-primary/30 rounded-tr-none' : 'bg-surface-container text-on-surface-variant border border-outline-variant/20 rounded-tl-none line-clamp-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-container text-on-surface-variant border border-outline-variant/20 rounded-xl rounded-tl-none p-3 flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          <div className="p-3 bg-surface-container border-t border-outline-variant/20 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about a stock..."
              className="flex-1 bg-surface-container-lowest border border-outline-variant/15 text-sm rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
            <button onClick={handleSend} disabled={loading} className="bg-primary/20 text-primary p-2 rounded-lg hover:bg-primary/30 transition-colors disabled:opacity-50">
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-container text-on-secondary rounded-full flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(74,225,118,0.4)] hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
        </button>
      )}
    </div>
  );
};

export default ChatBox;
