import React, { useState } from 'react';
import { useVenue } from '../../context/VenueContext';
import { PRESET_AI_QUERIES } from '../../data/mockVenueData';
import { Bot, Send, User } from 'lucide-react';

const RAG_PROMPTS = [
  "What is the wait time for Gate A right now?",
  "Where is the nearest hot dog stand to Section 112?",
  "What time does the event start?"
];

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

  const renderChip = (query, icon = '✨') => (
    <button
      key={query}
      onClick={() => askAIAssistant(query)}
      style={{
        background: '#f1f5f9',
        border: '1px solid #cbd5e1',
        color: '#334155',
        fontSize: '0.78rem',
        fontWeight: 600,
        padding: '8px 14px',
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        lineHeight: '1.4'
      }}
      onMouseOver={e => e.target.style.background = '#e2e8f0'}
      onMouseOut={e => e.target.style.background = '#f1f5f9'}
    >
      {icon} {query}
    </button>
  );

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '24px', height: '560px' }}>
      
      {/* Sidebar: Suggestions and RAG Prompts */}
      <div style={{ width: '32%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e2e8f0', paddingRight: '24px' }}>
        
        {/* Bot Title Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
            flexShrink: 0
          }}>
            <Bot size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                StadiaBot AI
              </h3>
              {geminiApiKey ? (
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>Live AI</span>
              ) : (
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>Offline Mode</span>
              )}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.3 }}>
              Powered by real-time stadium telemetry
            </p>
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Suggested Queries */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Suggested Queries
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PRESET_AI_QUERIES.map(q => renderChip(q))}
            </div>
          </div>

          {/* RAG Prompts */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              RAG Prompts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {RAG_PROMPTS.map(q => renderChip(q, '🤖'))}
            </div>
          </div>
        </div>

      </div>

      {/* Main Chat Interface */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
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
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: '0 2px 8px rgba(2,132,199,0.3)' }}>
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
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: '0 2px 8px rgba(79,70,229,0.3)' }}>
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
            type="button"
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

    </div>
  );
}
