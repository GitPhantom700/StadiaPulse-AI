// Mock data for StadiaPulse AI Venue Telemetry Engine

export const INITIAL_GATES = [
  { id: 'gate-a', name: 'Gate A (Main North)', waitMinutes: 18, capacity: 85, status: 'HIGH_CONGESTION', throughputPerMin: 42, distanceMeters: 120, recommended: false },
  { id: 'gate-b', name: 'Gate B (North-East Express)', waitMinutes: 4, capacity: 25, status: 'OPTIMAL', throughputPerMin: 78, distanceMeters: 250, recommended: true },
  { id: 'gate-c', name: 'Gate C (East Entrance)', waitMinutes: 12, capacity: 60, status: 'MODERATE', throughputPerMin: 55, distanceMeters: 400, recommended: false },
  { id: 'gate-d', name: 'Gate D (South VIP & General)', waitMinutes: 3, capacity: 20, status: 'OPTIMAL', throughputPerMin: 85, distanceMeters: 310, recommended: true },
  { id: 'gate-e', name: 'Gate E (West Entrance)', waitMinutes: 15, capacity: 75, status: 'HIGH_CONGESTION', throughputPerMin: 48, distanceMeters: 550, recommended: false },
  { id: 'gate-f', name: 'Gate F (South-West Transit)', waitMinutes: 6, capacity: 35, status: 'OPTIMAL', throughputPerMin: 70, distanceMeters: 290, recommended: false }
];

export const INITIAL_SECTORS = [
  { id: 'sec-101', name: 'North Stand Lower (Sec 101-105)', densityPercent: 88, tempC: 24, status: 'HEAVY', seatingCapacity: 4500, activeBottleneck: true },
  { id: 'sec-106', name: 'East Concourse (Sec 106-112)', densityPercent: 42, tempC: 22, status: 'CLEAR', seatingCapacity: 6000, activeBottleneck: false },
  { id: 'sec-113', name: 'South Fan Zone (Sec 113-120)', densityPercent: 94, tempC: 26, status: 'CRITICAL', seatingCapacity: 7500, activeBottleneck: true },
  { id: 'sec-121', name: 'West Concourse (Sec 121-128)', densityPercent: 35, tempC: 21, status: 'CLEAR', seatingCapacity: 5500, activeBottleneck: false },
  { id: 'sec-201', name: 'North Tier Upper (Sec 201-208)', densityPercent: 55, tempC: 23, status: 'MODERATE', seatingCapacity: 8000, activeBottleneck: false },
  { id: 'sec-209', name: 'South Tier Upper (Sec 209-216)', densityPercent: 68, tempC: 24, status: 'MODERATE', seatingCapacity: 8500, activeBottleneck: false },
];

export const RESTROOMS = [
  { id: 'rr-1', location: 'Near Gate B (Sec 104)', waitMinutes: 2, totalStalls: 18, openStalls: 11, accessible: true, crowdLevel: 'LOW' },
  { id: 'rr-2', location: 'Main North Plaza (Sec 101)', waitMinutes: 14, totalStalls: 24, openStalls: 2, accessible: true, crowdLevel: 'HIGH' },
  { id: 'rr-3', location: 'East Concourse (Sec 109)', waitMinutes: 4, totalStalls: 16, openStalls: 9, accessible: true, crowdLevel: 'LOW' },
  { id: 'rr-4', location: 'South Fan Zone (Sec 115)', waitMinutes: 16, totalStalls: 20, openStalls: 1, accessible: false, crowdLevel: 'CRITICAL' },
  { id: 'rr-5', location: 'West Plaza (Sec 124)', waitMinutes: 3, totalStalls: 15, openStalls: 10, accessible: true, crowdLevel: 'LOW' },
];

export const CONCESSIONS = [
  {
    id: 'conc-1',
    name: 'Stadia FastLane Grill',
    sector: 'Sec 106 (East Concourse)',
    waitMinutes: 4,
    queueLength: 6,
    expressPickupAvailable: true,
    rating: 4.8,
    category: 'Burgers & Fries',
    popularItem: 'Signature Smash Burger',
    items: [
      { id: 'm1', name: 'Signature Smash Burger', price: 12.50, prepTimeMins: 3, tags: ['Bestseller'] },
      { id: 'm2', name: 'Crispy Stadium Fries', price: 6.00, prepTimeMins: 2, tags: ['Vegetarian'] },
      { id: 'm3', name: 'Craft Soda / Refill Cup', price: 4.50, prepTimeMins: 1, tags: ['Fast'] },
    ]
  },
  {
    id: 'conc-2',
    name: 'Nacho & Taco Central',
    sector: 'Sec 115 (South Fan Zone)',
    waitMinutes: 15,
    queueLength: 22,
    expressPickupAvailable: true,
    rating: 4.6,
    category: 'Mexican & Snacks',
    popularItem: 'Loaded Stadium Nachos',
    items: [
      { id: 'm4', name: 'Loaded Stadium Nachos', price: 11.00, prepTimeMins: 2, tags: ['Bestseller'] },
      { id: 'm5', name: 'Chipotle Chicken Tacos (3x)', price: 13.00, prepTimeMins: 4, tags: ['Gluten-Free'] },
      { id: 'm6', name: 'Churro Bites w/ Chocolate', price: 5.50, prepTimeMins: 2, tags: ['Sweet'] },
    ]
  },
  {
    id: 'conc-3',
    name: 'Hydration & Brew Express',
    sector: 'Sec 122 (West Concourse)',
    waitMinutes: 2,
    queueLength: 3,
    expressPickupAvailable: true,
    rating: 4.9,
    category: 'Drinks & Quick Snacks',
    popularItem: 'Ice Cold Draft Beer',
    items: [
      { id: 'm7', name: 'Ice Cold Premium Draft (16oz)', price: 9.50, prepTimeMins: 1, tags: ['Bestseller'] },
      { id: 'm8', name: 'Zero-Sugar Electrolyte Blast', price: 5.00, prepTimeMins: 1, tags: ['Hydration'] },
      { id: 'm9', name: 'Artisan Soft Pretzel w/ Cheese', price: 7.00, prepTimeMins: 1, tags: ['Fast'] },
    ]
  },
  {
    id: 'conc-4',
    name: 'Green Field Vegan Eats',
    sector: 'Sec 103 (North Stand)',
    waitMinutes: 3,
    queueLength: 4,
    expressPickupAvailable: true,
    rating: 4.7,
    category: 'Healthy & Vegan',
    popularItem: 'Beyond Sausage Roll',
    items: [
      { id: 'm10', name: 'Beyond Sausage & Peppers Roll', price: 12.00, prepTimeMins: 3, tags: ['Vegan'] },
      { id: 'm11', name: 'Avocado Crunch Wrap', price: 11.50, prepTimeMins: 3, tags: ['Vegan'] },
      { id: 'm12', name: 'Fresh Fruit & Berry Bowl', price: 6.50, prepTimeMins: 1, tags: ['Fresh'] },
    ]
  }
];

export const FRIENDS_LIST = [
  { id: 'f1', name: 'Sarah Chen', section: 'Sec 106 - Row 12', distanceAway: '45m away', avatar: '👩‍💻', status: 'At Concession' },
  { id: 'f2', name: 'Marcus Johnson', section: 'Sec 114 - Row 4', distanceAway: '180m away', avatar: '⚽', status: 'In Seat' },
  { id: 'f3', name: 'Alex Rivera', section: 'Gate B Entrance', distanceAway: '320m away', avatar: '🎧', status: 'Entering Venue' }
];

export const PRESET_AI_QUERIES = [
  "Which entry gate has the shortest wait time right now?",
  "Where is the nearest restroom with no queue near Section 106?",
  "Where can I buy cold drinks without waiting in line?",
  "How crowded is the South Fan Zone?",
  "What is the recommended route to my seat in Section 106?"
];
