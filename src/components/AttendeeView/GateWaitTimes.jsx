import React from 'react';
import { useVenue } from '../../context/VenueContext';
import { LogIn, Clock, Sparkles, Navigation, Users } from 'lucide-react';

export default function GateWaitTimes() {
  const { gates, showToast } = useVenue();

  const sortedGates = [...gates].sort((a, b) => a.waitMinutes - b.waitMinutes);
  const bestGate = sortedGates[0];
  const worstGate = sortedGates[sortedGates.length - 1];
  const savedMinutes = worstGate.waitMinutes - bestGate.waitMinutes;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Smart Recommendation Banner - Light Sage Theme */}
      <div className="glass-panel" style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 100%)',
        border: '1px solid #a7f3d0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}>
            <Sparkles size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#065f46', margin: 0, fontWeight: 800 }}>
              AI Gate Routing Optimization
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#047857', marginTop: '2px' }}>
              Head to <strong>{bestGate.name}</strong> for entry in just <strong>{bestGate.waitMinutes} mins</strong>! Save ~{savedMinutes} mins compared to congested gates.
            </p>
          </div>
        </div>

        <button 
          className="btn-primary"
          onClick={() => showToast(`📍 Route to ${bestGate.name} set! Walk 250m east around stadium.`)}
          style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
        >
          <Navigation size={18} />
          Guide Me to {bestGate.name.split(' ')[0]}
        </button>
      </div>

      {/* Gates Grid */}
      <div className="grid-cards">
        {gates.map(gate => {
          const isBest = gate.id === bestGate.id;
          return (
            <div 
              key={gate.id}
              className="glass-panel glass-card-interactive"
              style={{
                padding: '20px',
                position: 'relative',
                border: isBest ? '2px solid #10b981' : undefined
              }}
            >
              {isBest && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '16px',
                  background: '#10b981',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.7rem',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}>
                  RECOMMENDED FASTEST
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{gate.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{gate.distanceMeters} meters away</span>
                </div>
                <span className={
                  gate.status === 'OPTIMAL' ? 'badge-optimal' :
                  gate.status === 'MODERATE' ? 'badge-moderate' : 'badge-critical'
                } style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {gate.status}
                </span>
              </div>

              {/* Wait Time Indicator */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={20} color={gate.waitMinutes < 5 ? '#059669' : gate.waitMinutes < 12 ? '#d97706' : '#e11d48'} />
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Estimated Queue:</span>
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: gate.waitMinutes < 5 ? '#059669' : gate.waitMinutes < 12 ? '#d97706' : '#e11d48' }}>
                  {gate.waitMinutes} mins
                </span>
              </div>

              {/* Capacity Progress Bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
                  <span>Gate Capacity</span>
                  <span>{gate.capacity}% occupied</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${gate.capacity}%`,
                    height: '100%',
                    background: gate.capacity < 50 ? '#10b981' : gate.capacity < 75 ? '#f59e0b' : '#ef4444',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <Users size={14} />
                  <span>{gate.throughputPerMin} people/min</span>
                </div>
                <button
                  className="btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  onClick={() => showToast(`Navigating to ${gate.name}...`)}
                >
                  Navigate
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
