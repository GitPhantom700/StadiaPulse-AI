import React, { useState } from 'react';
import { useVenue } from '../../context/VenueContext';
import { ShoppingBag, Clock, Star, Zap } from 'lucide-react';

export default function FoodOrdering() {
  const { concessions, orders, placeExpressOrder } = useVenue();
  const [selectedConcession, setSelectedConcession] = useState(concessions[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Active Orders Track Banner */}
      {orders.length > 0 && (
        <div className="glass-panel" style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #e0e7ff 0%, #e0f2fe 100%)',
          border: '1px solid #c7d2fe'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#3730a3', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#4f46e5" />
            Your Active FastLane Express Orders ({orders.length})
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {orders.map(order => (
              <div 
                key={order.id}
                style={{
                  background: '#ffffff',
                  border: order.status === 'READY_FOR_PICKUP' ? '2px solid #10b981' : '1px solid #cbd5e1',
                  borderRadius: '14px',
                  padding: '12px 18px',
                  flex: '1 1 280px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{order.concessionName} • #{order.id}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                    {order.items.join(', ')}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#0284c7', marginTop: '4px', fontWeight: 700 }}>
                    Pickup Code: <span style={{ background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', border: '1px solid #bae6fd' }}>{order.pickupCode}</span>
                  </div>
                </div>

                <div>
                  {order.status === 'READY_FOR_PICKUP' ? (
                    <span className="badge-optimal" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>
                      READY FOR PICKUP 🎉
                    </span>
                  ) : (
                    <span className="badge-moderate" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                      PREPARING... ⏳
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* Concession Selection Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {concessions.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedConcession(c)}
            className="glass-panel"
            style={{
              padding: '12px 18px',
              borderRadius: '14px',
              border: selectedConcession.id === c.id ? '2px solid #4f46e5' : '1px solid #e2e8f0',
              background: selectedConcession.id === c.id ? '#eeefbe' : '#ffffff',
              color: selectedConcession.id === c.id ? '#312e81' : '#475569',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontWeight: 700,
              fontSize: '0.88rem',
              boxShadow: selectedConcession.id === c.id ? '0 4px 14px rgba(79, 70, 229, 0.15)' : 'none'
            }}
          >
            {c.name} ({c.waitMinutes}m wait)
          </button>
        ))}
      </div>

      {/* Selected Concession Menu */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>{selectedConcession.name}</h3>
              <span style={{ fontSize: '0.8rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700 }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" /> {selectedConcession.rating}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
              📍 Location: {selectedConcession.sector}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Current Counter Queue</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedConcession.waitMinutes <= 5 ? '#059669' : '#be123c' }}>
                {selectedConcession.waitMinutes} mins wait ({selectedConcession.queueLength} people)
              </div>
            </div>
            <span className="badge-optimal" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>
              <Zap size={14} /> FASTLANE EXPRESS
            </span>
          </div>

        </div>

        {/* Menu Items Grid */}
        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', marginBottom: '14px' }}>
          Select Item for Express Mobile Pickup:
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {selectedConcession.items.map(item => (
            <div 
              key={item.id}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h5 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>{item.name}</h5>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  {item.tags.map(t => (
                    <span key={t} style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <Clock size={14} /> Prep ~{item.prepTimeMins}m
                </span>
                <button
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  onClick={() => placeExpressOrder(selectedConcession, item)}
                >
                  Order Express
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
