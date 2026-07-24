import React from 'react';
import { useVenue } from '../../context/VenueContext';
import { Sparkles, Clock, Accessibility } from 'lucide-react';

export default function RestroomTracker() {
  const { restrooms, showToast } = useVenue();

  const sortedRestrooms = [...restrooms].sort((a, b) => a.waitMinutes - b.waitMinutes);
  const bestRestroom = sortedRestrooms[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Smart Restroom Recommendation Banner */}
      <div className="glass-panel" style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%)',
        border: '1px solid #bae6fd',
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
            background: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
          }}>
            <Sparkles size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#0369a1', margin: 0, fontWeight: 800 }}>
              Shortest Restroom Line Nearby
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#0284c7', marginTop: '2px', fontWeight: 600 }}>
              <strong>{bestRestroom.location}</strong> has only a <strong>{bestRestroom.waitMinutes}-minute wait</strong> ({bestRestroom.openStalls} stalls available right now).
            </p>
          </div>
        </div>

        <button 
          className="btn-primary"
          onClick={() => showToast(`📍 Route to ${bestRestroom.location} active! Walk 40m right.`)}
        >
          Navigate to Restroom
        </button>
      </div>

      {/* Restrooms Grid */}
      <div className="grid-cards">
        {restrooms.map(rr => {
          const isBest = rr.id === bestRestroom.id;
          return (
            <div 
              key={rr.id}
              className="glass-panel glass-card-interactive"
              style={{
                padding: '20px',
                border: isBest ? '2px solid #0284c7' : undefined
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{rr.location}</h4>
                  {rr.accessible && (
                    <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Accessibility size={14} /> Wheelchair Accessible
                    </span>
                  )}
                </div>
                <span className={
                  rr.crowdLevel === 'LOW' ? 'badge-optimal' :
                  rr.crowdLevel === 'HIGH' ? 'badge-moderate' : 'badge-critical'
                } style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {rr.crowdLevel} CROWD
                </span>
              </div>

              {/* Wait time & Stalls */}
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
                  <Clock size={20} color={rr.waitMinutes <= 4 ? '#059669' : '#be123c'} />
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Wait Time:</span>
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: rr.waitMinutes <= 4 ? '#059669' : '#be123c' }}>
                  {rr.waitMinutes} mins
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#64748b', marginBottom: '16px', fontWeight: 600 }}>
                <span>Available Stalls:</span>
                <strong style={{ color: '#0f172a' }}>{rr.openStalls} / {rr.totalStalls} Open</strong>
              </div>

              <button 
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => showToast(`📍 Route to ${rr.location} loaded.`)}
              >
                Guide Me Here
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}
