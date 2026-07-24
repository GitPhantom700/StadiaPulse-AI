import React from 'react';
import { useVenue } from '../../context/VenueContext';
import { Users, MapPin, MessageSquare } from 'lucide-react';

export default function FriendFinder() {
  const { friends, showToast } = useVenue();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="#4f46e5" />
            Group Sync & Friend Radar
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Share live locations & coordinate meeting points in real time</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => showToast("📍 Broadcasted meeting point request to group at Gate B Concourse!")}
        >
          <MapPin size={16} /> Set Group Meetup Point
        </button>
      </div>

      <div className="grid-cards">
        {friends.map(friend => (
          <div key={friend.id} className="glass-panel glass-card-interactive" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{ fontSize: '2rem', background: '#f1f5f9', width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1' }}>
                {friend.avatar}
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{friend.name}</h4>
                <div style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 700 }}>{friend.section}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', fontWeight: 600 }}>{friend.distanceAway}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '12px', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Current Activity:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669' }}>{friend.status}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                onClick={() => showToast(`💬 Message sent to ${friend.name}!`)}
              >
                <MessageSquare size={14} /> Ping
              </button>
              <button 
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                onClick={() => showToast(`📍 Navigating to ${friend.name} at ${friend.section}`)}
              >
                <MapPin size={14} /> Meet
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
