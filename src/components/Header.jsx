import React from 'react';
import { useVenue } from '../context/VenueContext';
import { Activity, Smartphone, Sliders, Bell } from 'lucide-react';

export default function Header() {
  const { viewMode, setViewMode, isLiveSimulating, setIsLiveSimulating, notification } = useVenue();

  return (
    <header style={{ marginBottom: '24px' }}>
      {notification && (
        <div className="toast-notification">
          <Bell size={20} color="#10b981" />
          <span>{notification}</span>
        </div>
      )}

      {/* Clean Slate Container (matching reference image sidebar style) */}
      <div className="header-slate-panel" style={{ padding: '20px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
          }}>
            <Activity size={28} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                StadiaPulse <span style={{ color: '#6ee7b7' }}>AI</span>
              </h1>
              <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', color: '#e2e8f0', fontWeight: 700 }}>
                CHALLENGE 1
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '2px' }}>
              Real-Time Smart Venue Crowd Intelligence Platform
            </p>
          </div>
        </div>

        {/* Control Controls & Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* Live Telemetry Status indicator */}
          <button 
            onClick={() => setIsLiveSimulating(!isLiveSimulating)}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            title="Click to toggle live telemetry simulation"
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isLiveSimulating ? '#34d399' : '#94a3b8',
              display: 'inline-block'
            }} className={isLiveSimulating ? 'pulse-ring' : ''}></span>
            {isLiveSimulating ? 'Live Telemetry Active' : 'Simulation Paused'}
          </button>

          {/* View Mode Toggle Switch */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.35)',
            padding: '4px',
            borderRadius: '14px',
            display: 'flex',
            gap: '4px'
          }}>
            <button
              onClick={() => setViewMode('ATTENDEE')}
              style={{
                background: viewMode === 'ATTENDEE' ? '#ffffff' : 'transparent',
                color: viewMode === 'ATTENDEE' ? '#0f172a' : '#cbd5e1',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: viewMode === 'ATTENDEE' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Smartphone size={16} color={viewMode === 'ATTENDEE' ? '#4f46e5' : '#cbd5e1'} />
              Attendee Experience
            </button>

            <button
              onClick={() => setViewMode('OPS')}
              style={{
                background: viewMode === 'OPS' ? '#ffffff' : 'transparent',
                color: viewMode === 'OPS' ? '#0f172a' : '#cbd5e1',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: viewMode === 'OPS' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Sliders size={16} color={viewMode === 'OPS' ? '#0284c7' : '#cbd5e1'} />
              Venue Ops Command Center
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
