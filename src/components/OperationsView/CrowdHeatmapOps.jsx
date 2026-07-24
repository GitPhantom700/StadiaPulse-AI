import React from 'react';
import { useVenue } from '../../context/VenueContext';
import { AlertOctagon, Users, ShieldAlert, Activity, Radio, CheckCircle2 } from 'lucide-react';

export default function CrowdHeatmapOps() {
  const { sectors, gates, showToast } = useVenue();

  const bottleneckSectors = sectors.filter(s => s.activeBottleneck || s.densityPercent > 80);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Operational Metrics Cards */}
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total In-Venue Attendance</span>
            <Users size={20} color="#0284c7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>32,450</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>↑ +1,200 entered last 15 mins</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Avg Entry Wait Time</span>
            <Activity size={20} color="#059669" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>7.8 mins</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>↓ -3.2 mins vs peak baseline</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Active Congestion Alerts</span>
            <AlertOctagon size={20} color="#e11d48" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#be123c' }}>
            {bottleneckSectors.length} Sectors
          </div>
          <span style={{ fontSize: '0.75rem', color: '#be123c', fontWeight: 700 }}>Action required in South Zone</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Roving Staff Deployment</span>
            <Radio size={20} color="#4f46e5" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4338ca' }}>42 Active</div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>100% telemetry sync</span>
        </div>

      </div>

      {/* Bottleneck Dispatch Action Panel */}
      {bottleneckSectors.length > 0 && (
        <div className="glass-panel" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #fff1f2 0%, #ffffff 100%)',
          border: '1px solid #fecdd3'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#be123c', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ShieldAlert size={22} color="#e11d48" />
            CRITICAL BOTTLENECK DISPATCH RECOMMENDED
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {bottleneckSectors.map(sec => (
              <div 
                key={sec.id}
                style={{
                  background: '#ffffff',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800 }}>{sec.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px', fontWeight: 600 }}>
                    Density at <strong style={{ color: '#be123c' }}>{sec.densityPercent}%</strong> ({sec.seatingCapacity} capacity). Flow rate slowing down.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => showToast(`📢 Sent mobile crowd push notification: "Please use East Spillover Stairs"`)}
                  >
                    Send Push Reroute
                  </button>
                  <button 
                    className="btn-primary"
                    style={{ fontSize: '0.8rem', background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' }}
                    onClick={() => showToast(`🚨 Dispatched 4 Roving Crowd Marshals to ${sec.id.toUpperCase()}`)}
                  >
                    Dispatch Staff Marshals
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* Sector & Gate Command Matrix */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Live Gate Control Matrix & Dynamic Lane Allocation
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontWeight: 700 }}>
                <th style={{ padding: '12px' }}>Gate Name</th>
                <th style={{ padding: '12px' }}>Queue Wait</th>
                <th style={{ padding: '12px' }}>Capacity</th>
                <th style={{ padding: '12px' }}>Throughput</th>
                <th style={{ padding: '12px' }}>Operational Action</th>
              </tr>
            </thead>
            <tbody>
              {gates.map(gate => (
                <tr key={gate.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 12px', fontWeight: 800, color: '#0f172a' }}>{gate.name}</td>
                  <td style={{ padding: '14px 12px', color: gate.waitMinutes > 10 ? '#be123c' : '#059669', fontWeight: 800 }}>
                    {gate.waitMinutes} mins
                  </td>
                  <td style={{ padding: '14px 12px', fontWeight: 600 }}>{gate.capacity}%</td>
                  <td style={{ padding: '14px 12px', fontWeight: 600 }}>{gate.throughputPerMin} ppl/min</td>
                  <td style={{ padding: '14px 12px' }}>
                    {gate.waitMinutes > 10 ? (
                      <button 
                        className="btn-primary" 
                        style={{ padding: '6px 12px', fontSize: '0.78rem', background: '#0284c7' }}
                        onClick={() => showToast(`⚡ Opened 2 Overflow Lanes at ${gate.name}!`)}
                      >
                        + Open Overflow Lane
                      </button>
                    ) : (
                      <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                        <CheckCircle2 size={14} /> Normal Operations
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
