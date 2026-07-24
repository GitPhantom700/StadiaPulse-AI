import React, { useState } from 'react';
import { useVenue } from '../../context/VenueContext';
import { PRESET_AI_QUERIES } from '../../data/mockVenueData';
import { Bot, Send, User } from 'lucide-react';

export default function AIConsole() {
  const { chatMessages, askAIAssistant, geminiApiKey, setGeminiApiKey } = useVenue();
  const [inputText, setInputText] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    askAIAssistant(inputText);
    setInputText('');
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '560px' }}>
      
      {/* Bot Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)'
        }}>
          <Bot size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            StadiaBot AI Venue Assistant
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Powered by real-time stadium sensors & queue telemetry
          </p>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div style={{ display: 'flex', gap: '8px', padding: '12px 0', overflowX: 'auto' }}>
        {PRESET_AI_QUERIES.map((query, i) => (
          <button
            key={i}
            onClick={() => askAIAssistant(query)}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#334155',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={e => e.target.style.background = '#e2e8f0'}
            onMouseOut={e => e.target.style.background = '#f1f5f9'}
          >
            ✨ {query}
          </button>
        ))}
      </div>

      {/* Chat History Box */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        background: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        marginBottom: '16px'
      }}>
        {chatMessages.map(msg => (
          <div 
            key={msg.id}
            style={{
              display: 'flex',
              gap: '10px',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}
          >
            {msg.sender === 'bot' && (
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', shrink: 0, boxShadow: '0 2px 8px rgba(2,132,199,0.3)' }}>
                <Bot size={18} />
              </div>
            )}

            <div style={{
              background: msg.sender === 'user' ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' : '#ffffff',
              color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
              padding: '12px 16px',
              borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
              fontSize: '0.9rem',
              lineHeight: '1.45',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              border: msg.sender === 'bot' ? '1px solid #e2e8f0' : undefined
            }}>
              <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <div style={{ fontSize: '0.68rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : '#94a3b8', marginTop: '6px', textAlign: 'right' }}>
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', shrink: 0, boxShadow: '0 2px 8px rgba(79,70,229,0.3)' }}>
                <User size={18} />
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          placeholder="Ask StadiaBot about gate queues, food, restrooms..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          style={{
            flex: 1,
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#0f172a',
            padding: '12px 16px',
            borderRadius: '14px',
            fontSize: '0.9rem',
            outline: 'none',
            fontWeight: 600
          }}
        />
        <button type="submit" className="btn-primary" style={{ borderRadius: '14px' }}>
          <Send size={18} />
        </button>
      </form>

      {/* API Key Settings */}
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ⚙️ AI Settings
        </button>
        {showSettings && (
          <input 
            type="password"
            placeholder="Enter Google Gemini API Key"
            value={geminiApiKey}
            onChange={(e) => setGeminiApiKey(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
        )}
      </div>

    </div>
  );
}
