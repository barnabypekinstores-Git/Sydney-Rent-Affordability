// REAL NSW Rent Data - From your CSV file
const realSydneyData = [
  // First 10 postcodes from your CSV
  {
    "name": "Sydney CBD",
    "postcode": "2000",
    "lat": -33.8688,
    "lng": 151.2093,
    "medianRent": { "1": 850, "2": 1270, "3": 1950, "4": 0 },
    "commuteCBD": 0,
    "transportScore": 10,
    "description": "Central business district"
  },
  {
    "name": "Ultimo",
    "postcode": "2007",
    "lat": -33.880,
    "lng": 151.197,
    "medianRent": { "1": 649, "2": 975, "3": 0, "4": 0 },
    "commuteCBD": 5,
    "transportScore": 9,
    "description": "Near UTS and ABC building"
  },
  {
    "name": "Chippendale",
    "postcode": "2008",
    "lat": -33.886,
    "lng": 151.200,
    "medianRent": { "1": 810, "2": 1000, "3": 0, "4": 0 },
    "commuteCBD": 8,
    "transportScore": 9,
    "description": "Trendy area near Central Station"
  },
  {
    "name": "Pyrmont",
    "postcode": "2009",
    "lat": -33.871,
    "lng": 151.195,
    "medianRent": { "1": 720, "2": 950, "3": 1400, "4": 0 },
    "commuteCBD": 10,
    "transportScore": 8,
    "description": "Waterfront suburb with casino"
  },
  {
    "name": "Surry Hills",
    "postcode": "2010",
    "lat": -33.887,
    "lng": 151.213,
    "medianRent": { "1": 700, "2": 988, "3": 1748, "4": 0 },
    "commuteCBD": 12,
    "transportScore": 9,
    "description": "Fashionable inner-city suburb"
  },
  {
    "name": "Haymarket",
    "postcode": "2011",
    "lat": -33.879,
    "lng": 151.205,
    "medianRent": { "1": 670, "2": 1098, "3": 1700, "4": 0 },
    "commuteCBD": 8,
    "transportScore": 9,
    "description": "Chinatown and market district"
  },
  {
    "name": "Zetland",
    "postcode": "2017",
    "lat": -33.912,
    "lng": 151.210,
    "medianRent": { "1": 830, "2": 1120, "3": 0, "4": 0 },
    "commuteCBD": 15,
    "transportScore": 8,
    "description": "New apartment developments"
  },
  {
    "name": "Parramatta",
    "postcode": "2150",
    "lat": -33.814,
    "lng": 151.001,
    "medianRent": { "1": 600, "2": 680, "3": 870, "4": 0 },
    "commuteCBD": 30,
    "transportScore": 8,
    "description": "Major Western Sydney CBD"
  },
  {
    "name": "Liverpool",
    "postcode": "2170",
    "lat": -33.924,
    "lng": 150.925,
    "medianRent": { "1": 500, "2": 525, "3": 650, "4": 0 },
    "commuteCBD": 45,
    "transportScore": 7,
    "description": "South Western Sydney hub"
  },
  {
    "name": "Chatswood",
    "postcode": "2067",
    "lat": -33.796,
    "lng": 151.183,
    "medianRent": { "1": 750, "2": 910, "3": 1260, "4": 0 },
    "commuteCBD": 20,
    "transportScore": 9,
    "description": "North shore commercial center"
  },
  {
    "name": "Bondi",
    "postcode": "2026",
    "lat": -33.891,
    "lng": 151.277,
    "medianRent": { "1": 800, "2": 1050, "3": 1500, "4": 0 },
    "commuteCBD": 25,
    "transportScore": 8,
    "description": "World famous beach suburb"
  },
  {
    "name": "Newtown",
    "postcode": "2042",
    "lat": -33.898,
    "lng": 151.178,
    "medianRent": { "1": 565, "2": 795, "3": 0, "4": 0 },
    "commuteCBD": 15,
    "transportScore": 9,
    "description": "Bohemian cultural hub"
  },
  {
    "name": "Marrickville",
    "postcode": "2204",
    "lat": -33.910,
    "lng": 151.155,
    "medianRent": { "1": 620, "2": 750, "3": 0, "4": 0 },
    "commuteCBD": 20,
    "transportScore": 8,
    "description": "Inner West creative community"
  },
  {
    "name": "Wolli Creek",
    "postcode": "2205",
    "lat": -33.928,
    "lng": 151.152,
    "medianRent": { "1": 715, "2": 880, "3": 1200, "4": 0 },
    "commuteCBD": 18,
    "transportScore": 9,
    "description": "Modern transport-oriented development"
  }
];

// Make it available to your website
const sydneySuburbs = realSydneyData;