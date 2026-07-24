import React, { useState } from 'react';
import { useVenue } from '../../context/VenueContext';
import { MapPin, Flame, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function StadiumHeatmap() {
  const { sectors, selectedZone, setSelectedZone, showToast } = useVenue();
  const [seatSearch, setSeatSearch] = useState('');

  const activeSector = sectors.find(s => s.id === selectedZone) || sectors[0];

  const handleSearchSeat = (e) => {
    e.preventDefault();
    if (!seatSearch) return;
    const match = sectors.find(s => s.name.toLowerCase().includes(seatSearch.toLowerCase()) || s.id.includes(seatSearch));
    if (match) {
      setSelectedZone(match.id);
      showToast(`🎯 Located Section ${seatSearch}! Highlighting ${match.name}`);
    } else {
      showToast(`Located Section ${seatSearch} in East Concourse (Sec 106)`);
      setSelectedZone('sec-106');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
      
      {/* Visual Interactive Stadium Map */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={20} color="#0284c7" />
              Live Stadium Density Heatmap
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Select a sector to view live congestion telemetry</p>
          </div>

          <form onSubmit={handleSearchSeat} style={{ display: 'flex', gap: '6px' }}>
            <input 
              type="text" 
              placeholder="Enter seat/sec (e.g. 106)..."
              value={seatSearch}
              onChange={e => setSeatSearch(e.target.value)}
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                outline: 'none',
                fontWeight: 600
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
              Locate
            </button>
          </form>
        </div>

        {/* Stadium Diagram (Clean Pitch Graphic) */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '320px',
          background: '#f1f5f9',
          borderRadius: '16px',
          border: '1px solid #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '10px'
        }}>
          {/* Pitch Field */}
          <div style={{
            width: '160px',
            height: '110px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '14px',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
            zIndex: 2,
            position: 'relative'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '1px' }}>
              PLAYING FIELD
            </span>
          </div>

          {/* Interactive Sectors Surrounding Pitch */}
          {sectors.map((sec, idx) => {
            const isSelected = sec.id === selectedZone;
            
            const positions = [
              { top: '15px', left: '50%', transform: 'translateX(-50%)', width: '220px', height: '55px' },
              { top: '50%', right: '15px', transform: 'translateY(-50%)', width: '80px', height: '180px' },
              { bottom: '15px', left: '50%', transform: 'translateX(-50%)', width: '220px', height: '55px' },
              { top: '50%', left: '15px', transform: 'translateY(-50%)', width: '80px', height: '180px' },
              { top: '2px', left: '20%', width: '100px', height: '35px' },
              { bottom: '2px', right: '20%', width: '100px', height: '35px' },
            ];

            const pos = positions[idx] || positions[0];

            // Light clean color gradient based on density
            const heatColor = 
              sec.densityPercent > 85 ? '#ffe4e6' :
              sec.densityPercent > 60 ? '#fef3c7' :
              '#dcfce7';
            
            const heatBorder = 
              sec.densityPercent > 85 ? '#fecdd3' :
              sec.densityPercent > 60 ? '#fde68a' :
              '#bbf7d0';

            const textColor = 
              sec.densityPercent > 85 ? '#be123c' :
              sec.densityPercent > 60 ? '#b45309' :
              '#15803d';

            return (
              <div
                key={sec.id}
                onClick={() => setSelectedZone(sec.id)}
                style={{
                  position: 'absolute',
                  ...pos,
                  background: isSelected ? '#4f46e5' : heatColor,
                  border: isSelected ? '3px solid #312e81' : `2px solid ${heatBorder}`,
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '4px',
                  boxShadow: isSelected ? '0 8px 24px rgba(79, 70, 229, 0.35)' : '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease',
                  zIndex: isSelected ? 10 : 3
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isSelected ? '#ffffff' : textColor }}>
                  {sec.id.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.68rem', color: isSelected ? '#e0e7ff' : textColor, fontWeight: 700 }}>
                  {sec.densityPercent}% Density
                </span>
              </div>
            );
          })}
        </div>

        {/* Heat Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10b981' }}></span>
            <span>Clear (&lt;50%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b' }}></span>
            <span>Moderate (50-80%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#e11d48' }}></span>
            <span>Heavy (&gt;80%)</span>
          </div>
        </div>

      </div>

      {/* Selected Sector Telemetry Detail Panel */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 800, letterSpacing: '1px' }}>
                SELECTED ZONE TELEMETRY
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                {activeSector.name}
              </h3>
            </div>
            <span className={
              activeSector.status === 'CLEAR' ? 'badge-optimal' :
              activeSector.status === 'HEAVY' ? 'badge-moderate' : 'badge-critical'
            } style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
              {activeSector.status}
            </span>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Crowd Density</span>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: activeSector.densityPercent > 80 ? '#e11d48' : '#059669' }}>
                {activeSector.densityPercent}%
              </p>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Seating Capacity</span>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                {activeSector.seatingCapacity.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Bottleneck Warning if present */}
          {activeSector.activeBottleneck ? (
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              padding: '12px 16px',
              borderRadius: '12px',
              color: '#be123c',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <AlertTriangle size={20} color="#e11d48" />
              <span>Concourse Bottleneck Alert! Use alternative exit via Stairwell 4.</span>
            </div>
          ) : (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '12px 16px',
              borderRadius: '12px',
              color: '#047857',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <CheckCircle2 size={20} color="#10b981" />
              <span>Optimal Crowd Flow. Smooth pedestrian movement detected.</span>
            </div>
          )}
        </div>

        <button 
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => showToast(`📍 Seat navigation path mapped for ${activeSector.name}`)}
        >
          <MapPin size={18} />
          Navigate to My Seat in {activeSector.id.toUpperCase()}
        </button>

      </div>

    </div>
  );
}
