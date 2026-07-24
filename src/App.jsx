import React from 'react';
import { VenueProvider, useVenue } from './context/VenueContext';
import Header from './components/Header';
import GateWaitTimes from './components/AttendeeView/GateWaitTimes';
import StadiumHeatmap from './components/AttendeeView/StadiumHeatmap';
import RestroomTracker from './components/AttendeeView/RestroomTracker';
import FoodOrdering from './components/AttendeeView/FoodOrdering';
import AIConsole from './components/AttendeeView/AIConsole';
import FriendFinder from './components/AttendeeView/FriendFinder';
import TicketScanner from './components/AttendeeView/TicketScanner';
import CrowdHeatmapOps from './components/OperationsView/CrowdHeatmapOps';
import { AnimatePresence, motion } from 'framer-motion';
import { LogIn, Flame, Bath, UtensilsCrossed, Bot, Users, QrCode } from 'lucide-react';

function MainApp() {
  const { viewMode, activeTab, setActiveTab } = useVenue();

  const navItems = [
    { id: 'TICKET', label: 'Ticket QR Wallet', icon: QrCode },
    { id: 'GATES', label: 'Entry Gates & Routing', icon: LogIn },
    { id: 'MAP', label: 'Interactive Heatmap', icon: Flame },
    { id: 'FOOD', label: 'Express Concessions', icon: UtensilsCrossed },
    { id: 'RESTROOMS', label: 'Restroom Tracker', icon: Bath },
    { id: 'AI_BOT', label: 'StadiaBot AI', icon: Bot },
    { id: 'FRIENDS', label: 'Group Radar', icon: Users },
  ];

  return (
    <div className="app-container">
      <Header />

      <AnimatePresence mode="wait">
        {viewMode === 'ATTENDEE' ? (
          <motion.div
            key="attendee-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Attendee Navigation Bar */}
            <div style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              marginBottom: '24px',
              paddingBottom: '4px'
            }}>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' : '#ffffff',
                      color: isActive ? '#ffffff' : '#475569',
                      border: isActive ? '2px solid #312e81' : '1px solid #e2e8f0',
                      padding: '12px 20px',
                      borderRadius: '16px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      whiteSpace: 'nowrap',
                      boxShadow: isActive ? '0 6px 18px rgba(79, 70, 229, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={18} color={isActive ? '#ffffff' : '#64748b'} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Active Attendee Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'TICKET' && <TicketScanner />}
                {activeTab === 'GATES' && <GateWaitTimes />}
                {activeTab === 'MAP' && <StadiumHeatmap />}
                {activeTab === 'FOOD' && <FoodOrdering />}
                {activeTab === 'RESTROOMS' && <RestroomTracker />}
                {activeTab === 'AI_BOT' && <AIConsole />}
                {activeTab === 'FRIENDS' && <FriendFinder />}
              </motion.div>
            </AnimatePresence>

          </motion.div>
        ) : (
          /* Ops Control Dashboard View */
          <motion.div
            key="ops-view"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <CrowdHeatmapOps />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #cbd5e1',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.82rem',
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <strong>StadiaPulse AI</strong> — PromptWars Challenge 1 Submission
        </div>
        <div>
          Real-Time Sensor Telemetry Engine v1.0 • Built with React & Vite
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <VenueProvider>
      <MainApp />
    </VenueProvider>
  );
}
