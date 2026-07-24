import React, { useState } from 'react';
import { useVenue } from '../../context/VenueContext';
import { QrCode, CheckCircle2, Ticket, Sparkles, Navigation, ShieldCheck } from 'lucide-react';

export default function TicketScanner() {
  const { setSelectedZone, setActiveTab, showToast } = useVenue();
  const [scannedTicket, setScannedTicket] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const ticketData = {
        ticketId: 'STADIA-2026-X99',
        eventName: 'Grand Championship Finals',
        holder: 'Attendee Guest',
        gate: 'Gate B (North-East Express)',
        section: 'Sec 106 (East Concourse)',
        row: 'Row 12 • Seat 4',
        fastlanePass: true,
        entryStatus: 'VALID & VERIFIED'
      };
      setScannedTicket(ticketData);
      showToast("🎟️ Ticket Verified! Gate B Express Pass Activated.");
    }, 1200);
  };

  const handleNavigateToSeat = () => {
    setSelectedZone('sec-106');
    setActiveTab('MAP');
    showToast("📍 Highlighting Section 106 on the Interactive Heatmap!");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Scanner Header Banner */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #e0f2fe 100%)',
        border: '1px solid #c7d2fe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '16px',
            background: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)'
          }}>
            <QrCode size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#312e81', margin: 0, fontWeight: 800 }}>
              Smart Digital Ticket Wallet & QR Verifier
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#4338ca', marginTop: '2px', fontWeight: 600 }}>
              Scan your event pass to receive instant personalized entry gate routing & seat navigation
            </p>
          </div>
        </div>

        <button 
          className="btn-primary"
          onClick={handleSimulateScan}
          disabled={isScanning}
          style={{ padding: '12px 20px', fontSize: '0.9rem' }}
        >
          <QrCode size={18} />
          {isScanning ? 'Verifying Ticket QR...' : 'Scan Digital Ticket QR'}
        </button>
      </div>

      {/* Ticket Details Display */}
      {scannedTicket ? (
        <div className="glass-panel" style={{ padding: '24px', border: '2px solid #10b981', background: '#ffffff' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={26} color="#10b981" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 800, letterSpacing: '1px' }}>VERIFIED PASS</span>
                <h4 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>{scannedTicket.eventName}</h4>
              </div>
            </div>
            <span className="badge-optimal" style={{ padding: '6px 14px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 800 }}>
              <CheckCircle2 size={16} /> VALIDATED TICKET
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Recommended Entry</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>{scannedTicket.gate}</p>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>4-min queue time</span>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Seat Location</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{scannedTicket.section}</p>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{scannedTicket.row}</span>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>VIP Perks</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4f46e5', marginTop: '2px' }}>FastLane Food Pass</p>
              <span style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 700 }}>Express Concession Queue Active</span>
            </div>

          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={handleNavigateToSeat} style={{ flex: 1, justifyContent: 'center' }}>
              <Navigation size={18} /> Show Seat on Interactive Map
            </button>
          </div>

        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: '#ffffff' }}>
          <Ticket size={48} color="#94a3b8" style={{ marginBottom: '12px' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155' }}>No Digital Ticket Loaded</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', marginBottom: '20px' }}>
            Click the "Scan Digital Ticket QR" button above to verify your venue pass and trigger automated gate assignment.
          </p>
          <button className="btn-secondary" onClick={handleSimulateScan}>
            <Sparkles size={16} /> Simulate Ticket Scan Demo
          </button>
        </div>
      )}

    </div>
  );
}
