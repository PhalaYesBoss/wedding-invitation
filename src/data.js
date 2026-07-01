

export const INITIAL_GIFTS = [
  {
    id: 'gift-1',
    title: 'Traditional Wool Heritage Blanket',
    description: 'A premium, high-quality wool blanket, a symbol of warmth and family integration in our traditional celebrations.',
    price: 1500,
    category: 'Home',
    quantityNeeded: 2,
    quantityClaimed: 0,
    claims: [],
  },
  {
    id: 'gift-2',
    title: 'Le Creuset Casserole Dish (Sage Green)',
    description: 'An iconic, durable cast iron casserole dish in our signature wedding color to inspire home-cooked family meals.',
    price: 4200,
    category: 'Kitchen',
    quantityNeeded: 1,
    quantityClaimed: 0,
    claims: [],
  },
  {
    id: 'gift-3',
    title: 'Deluxe 12-Piece Porcelain Dinnerware Set',
    description: 'Elegant cream porcelain dinnerware for hosting family dinners and sharing stories.',
    price: 2400,
    category: 'Kitchen',
    quantityNeeded: 1,
    quantityClaimed: 0,
    claims: [],
  },
  {
    id: 'gift-4',
    title: 'Honeymoon Safari & Coastal Escapes Fund',
    description: 'Contribute what you wish towards our dream honeymoon exploring the beautiful South African coastlines and wildlife safaris.',
    category: 'Experience',
    quantityNeeded: 100, // unlimited contributions essentially
    quantityClaimed: 12,
    claims: [
      { guestName: 'Kabo & Lerato', quantity: 1, date: '2026-06-25' },
      { guestName: 'Aunt Sipho', quantity: 5, date: '2026-06-28' },
    ],
  },
  {
    id: 'gift-5',
    title: 'Traditional Lobola & Feast Celebration Fund',
    description: 'Support the traditional culinary preparations, cattle transport, and local village feast arrangements.',
    category: 'Experience',
    quantityNeeded: 150,
    quantityClaimed: 25,
    claims: [
      { guestName: 'Uncle Tsepo', quantity: 10, date: '2026-06-15' },
      { guestName: 'The Modise Family', quantity: 15, date: '2026-06-20' },
    ],
  },
  {
    id: 'gift-6',
    title: 'Nespresso Vertuo Lattissima Coffee Machine',
    description: 'For morning brews as we wake up together to start our new journey.',
    price: 4900,
    category: 'Kitchen',
    quantityNeeded: 1,
    quantityClaimed: 0,
    claims: [],
  },
  {
    id: 'gift-7',
    title: 'Egyptian Cotton Bedding Set (Queen)',
    description: '800-thread-count pure sateen cotton sheets in cream color.',
    price: 1800,
    category: 'Home',
    quantityNeeded: 2,
    quantityClaimed: 0,
    claims: [],
  },
  {
    id: 'gift-8',
    title: 'Handcrafted Soapstone Salad Bowl Set',
    description: 'A beautiful locally handcrafted centerpiece bowl with serving spoons.',
    price: 950,
    category: 'Home',
    quantityNeeded: 1,
    quantityClaimed: 1,
    claims: [
      { guestName: 'Thabo M.', quantity: 1, date: '2026-06-29' }
    ],
  },
];

export const SCRIPTURE_VERSE = {
  reference: 'MARK 10:9',
  translation: 'KJV',
  text: 'What therefore God hath joined together, let not man put asunder.',
};

export const WEDDING_DETAILS = {
  groom: 'Rodney',
  bride: 'Mathogonolo',
  date: 'Saturday, 05 September 2026',
  time: '11:00 AM',
  calendarYear: 2026,
  calendarMonth: 8, // September is index 8 (0-indexed in JS)
  calendarDay: 5,
  venue: {
    name: 'Manchester Outline (Hillside View)',
    address: 'House No. 70893, Zeerust, Lehurutshe 2880',
    coordinates: { lat: -25.5612, lng: 26.2411 }, // Zeerust, North West, South Africa
  },
  theme: 'Traditional Attire',
  rsvpContacts: [
    { name: 'Oratile', phone: '+27630288766', rawPhone: '0630288766' },
    { name: 'Thapelo', phone: '+27635910393', rawPhone: '0635910393' },
  ],
};
