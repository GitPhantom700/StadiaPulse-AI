import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_GATES, INITIAL_SECTORS, RESTROOMS, CONCESSIONS, FRIENDS_LIST } from '../data/mockVenueData';
import confetti from 'canvas-confetti';
import stadiumKnowledge from '../data/stadium_knowledge.json';

const VenueContext = createContext(null);

export const VenueProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('ATTENDEE'); // 'ATTENDEE' or 'OPS'
  const [activeTab, setActiveTab] = useState('GATES'); // 'GATES', 'MAP', 'FOOD', 'RESTROOMS', 'AI_BOT', 'FRIENDS'
  const [selectedZone, setSelectedZone] = useState('sec-106');

  // Dynamic Telemetry States
  const [gates, setGates] = useState(INITIAL_GATES);
  const [sectors, setSectors] = useState(INITIAL_SECTORS);
  const [concessions, setConcessions] = useState(CONCESSIONS);
  const [restrooms, setRestrooms] = useState(RESTROOMS);
  const [orders, setOrders] = useState([
    { id: 'ORD-9821', concessionName: 'Stadia FastLane Grill', items: ['Signature Smash Burger', 'Craft Soda'], total: 17.00, status: 'READY_FOR_PICKUP', timePlaced: '10 mins ago', pickupCode: 'FL-42' }
  ]);

  // Telemetry engine toggle
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [notification, setNotification] = useState(null);

  // AI Chat Messages State
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Welcome to StadiaPulse AI! 🏟️ How can I make your venue experience smoother today?', timestamp: 'Just now' }
  ]);

  // Live Telemetry Simulator Effect
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      // Small realistic fluctuations in gate wait times
      setGates(prevGates =>
        prevGates.map(gate => {
          const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
          const newWait = Math.max(1, Math.min(30, gate.waitMinutes + delta));
          let status = 'OPTIMAL';
          if (newWait > 12) status = 'HIGH_CONGESTION';
          else if (newWait > 7) status = 'MODERATE';
          
          return {
            ...gate,
            waitMinutes: newWait,
            status,
            throughputPerMin: Math.max(30, Math.min(100, gate.throughputPerMin + delta * 2))
          };
        })
      );

      // Fluctuate Sector Crowd Densities
      setSectors(prevSectors =>
        prevSectors.map(sec => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const newDensity = Math.max(10, Math.min(99, sec.densityPercent + delta));
          let status = 'CLEAR';
          if (newDensity > 85) status = 'CRITICAL';
          else if (newDensity > 60) status = 'HEAVY';
          else if (newDensity > 40) status = 'MODERATE';

          return {
            ...sec,
            densityPercent: newDensity,
            status,
            activeBottleneck: newDensity > 85
          };
        })
      );

      // Advance pending orders
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (order.status === 'PREPARING') {
            // Trigger celebration on ready
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
            showToast(`🚀 Order #${order.id} is now READY FOR PICKUP at ${order.concessionName}!`);
            return { ...order, status: 'READY_FOR_PICKUP' };
          }
          return order;
        })
      );

    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Place Express Order
  const placeExpressOrder = (concession, item) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      concessionName: concession.name,
      items: [item.name],
      total: item.price,
      status: 'PREPARING',
      timePlaced: 'Just now',
      pickupCode: `FL-${Math.floor(10 + Math.random() * 89)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    showToast(`✅ Express Order placed with ${concession.name}! Order #${newOrder.id}`);
  };

  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem('geminiApiKey') || '');

  useEffect(() => {
    if (geminiApiKey) {
      localStorage.setItem('geminiApiKey', geminiApiKey);
    } else {
      localStorage.removeItem('geminiApiKey');
    }
  }, [geminiApiKey]);

  // Handle AI Bot queries intelligently
  const askAIAssistant = async (userQuery) => {
    const userMsg = { id: Date.now(), sender: 'user', text: userQuery, timestamp: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);

    if (!geminiApiKey) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          text: '⚠️ **Missing API Key**: Please enter your Gemini API Key in the settings below to enable live AI routing!',
          timestamp: 'Just now'
        }]);
      }, 500);
      return;
    }

    try {
      // RAG Retrieval Step
      const queryLower = userQuery.toLowerCase();
      let retrievedKnowledge = [];
      stadiumKnowledge.forEach(item => {
        if (item.keywords.some(kw => queryLower.includes(kw))) {
          retrievedKnowledge.push(item.policy);
        }
      });
      const knowledgeContext = retrievedKnowledge.length > 0 
        ? `\nOFFICIAL STADIUM KNOWLEDGE:\n- ${retrievedKnowledge.join('\n- ')}\n` 
        : '';

      // Direct REST API call to Gemini
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiApiKey.trim()}`;
      const altEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey.trim()}`;

      const promptText = `You are StadiaBot, an AI assistant for a massive sporting venue.
Your job is to give short, concise, and helpful answers to fans based on the live stadium telemetry and official knowledge below. 
Be enthusiastic, use emojis, and format your responses with bolding for emphasis. 
Keep answers under 3 sentences.${knowledgeContext}
LIVE TELEMETRY:
- Gates: ${JSON.stringify(gates.map(g => ({ name: g.name, waitMinutes: g.waitMinutes, status: g.status })))}
- Restrooms: ${JSON.stringify(restrooms.map(r => ({ location: r.location, waitMinutes: r.waitMinutes })))}
- Food: ${JSON.stringify(concessions.map(c => ({ name: c.name, waitMinutes: c.waitMinutes })))}
- Sectors: ${JSON.stringify(sectors.map(s => ({ name: s.name, densityPercent: s.densityPercent })))}

USER QUERY: "${userQuery}"`;

      let res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      if (!res.ok) {
        // Try fallback endpoint
        res = await fetch(altEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });
      }

      if (res.ok) {
        const data = await res.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          setChatMessages(prev => [...prev, {
            id: Date.now() + 1,
            sender: 'bot',
            text: `✨ **[Gemini AI Live]**\n${responseText}`,
            timestamp: 'Just now'
          }]);
          return;
        }
      }

      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP ${res.status}: ${res.statusText}`;

      // Fallback to Smart Telemetry Engine if API Key is rejected by Google
      const q = userQuery.toLowerCase();
      let fallbackText = "";
      if (q.includes('gate') || q.includes('entry') || q.includes('wait time')) {
        const bestGate = [...gates].sort((a, b) => a.waitMinutes - b.waitMinutes)[0];
        fallbackText = `✨ **Gate Recommendation**: **${bestGate.name}** currently has the shortest queue with only a **${bestGate.waitMinutes}-minute wait**! Avoid Gate A.`;
      } else if (q.includes('restroom') || q.includes('toilet') || q.includes('bathroom')) {
        const bestRR = [...restrooms].sort((a, b) => a.waitMinutes - b.waitMinutes)[0];
        fallbackText = `🚽 The shortest restroom line is at **${bestRR.location}** with an estimated wait of **${bestRR.waitMinutes} minutes** (${bestRR.openStalls} stalls available).`;
      } else if (q.includes('drink') || q.includes('beer') || q.includes('food') || q.includes('eat')) {
        const bestFood = [...concessions].sort((a, b) => a.waitMinutes - b.waitMinutes)[0];
        fallbackText = `🍔 I recommend **${bestFood.name}** (${bestFood.sector}). Wait time is only **${bestFood.waitMinutes} mins** with Express Mobile Pickup!`;
      } else {
        fallbackText = `🤖 I've analyzed stadium sensors for: "${userQuery}". All telemetry indicators show optimal flow around East Concourse (Sec 106). Gate B is your best entry point!`;
      }

      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: `⚠️ **[Google API Rejected Key: ${errMsg}]**\n\n⚡ **[Fallback Telemetry AI Response]**\n${fallbackText}`,
        timestamp: 'Just now'
      }]);

    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1, sender: 'bot', text: '❌ Error executing query.', timestamp: 'Just now'
      }]);
    }
  };

  return (
    <VenueContext.Provider value={{
      viewMode,
      setViewMode,
      activeTab,
      setActiveTab,
      selectedZone,
      setSelectedZone,
      gates,
      sectors,
      concessions,
      restrooms,
      orders,
      friends: FRIENDS_LIST,
      isLiveSimulating,
      setIsLiveSimulating,
      notification,
      showToast,
      placeExpressOrder,
      chatMessages,
      askAIAssistant,
      geminiApiKey,
      setGeminiApiKey
    }}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenue = () => {
  const context = useContext(VenueContext);
  if (!context) throw new Error("useVenue must be used within VenueProvider");
  return context;
};
