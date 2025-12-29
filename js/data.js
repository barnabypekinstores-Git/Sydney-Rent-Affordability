// Sydney suburb data - Will replace with real data from your Power Query analysis
const sydneySuburbs = [
    {
        name: "Sydney CBD",
        postcode: "2000",
        lat: -33.8688,
        lng: 151.2093,
        medianRent: { "1": 700, "2": 950, "3": 1300, "4": 1800 },
        commuteCBD: 0,
        transportScore: 10,
        description: "Central business district"
    },
    {
        name: "Surry Hills",
        postcode: "2010",
        lat: -33.887,
        lng: 151.213,
        medianRent: { "1": 650, "2": 850, "3": 1100, "4": 1400 },
        commuteCBD: 10,
        transportScore: 9,
        description: "Trendy inner-city suburb close to CBD"
    },
    {
        name: "Newtown",
        postcode: "2042",
        lat: -33.898,
        lng: 151.178,
        medianRent: { "1": 600, "2": 780, "3": 1000, "4": 1300 },
        commuteCBD: 15,
        transportScore: 9,
        description: "Vibrant cultural hub with great transport"
    },
    {
        name: "Parramatta",
        postcode: "2150",
        lat: -33.814,
        lng: 151.001,
        medianRent: { "1": 500, "2": 600, "3": 750, "4": 900 },
        commuteCBD: 30,
        transportScore: 8,
        description: "Major CBD of Western Sydney"
    },
    {
        name: "Liverpool",
        postcode: "2170",
        lat: -33.924,
        lng: 150.925,
        medianRent: { "1": 400, "2": 480, "3": 550, "4": 650 },
        commuteCBD: 45,
        transportScore: 7,
        description: "Affordable area with growing infrastructure"
    },
    {
        name: "Penrith",
        postcode: "2750",
        lat: -33.750,
        lng: 150.700,
        medianRent: { "1": 320, "2": 380, "3": 450, "4": 520 },
        commuteCBD: 60,
        transportScore: 6,
        description: "Western Sydney suburb with good value"
    },
    {
        name: "Chatswood",
        postcode: "2067",
        lat: -33.796,
        lng: 151.183,
        medianRent: { "1": 600, "2": 800, "3": 1000, "4": 1300 },
        commuteCBD: 20,
        transportScore: 9,
        description: "North shore commercial hub"
    },
    {
        name: "Bondi",
        postcode: "2026",
        lat: -33.891,
        lng: 151.277,
        medianRent: { "1": 700, "2": 950, "3": 1200, "4": 1500 },
        commuteCBD: 25,
        transportScore: 8,
        description: "World famous beachside suburb"
    },
    {
        name: "Manly",
        postcode: "2095",
        lat: -33.797,
        lng: 151.288,
        medianRent: { "1": 650, "2": 850, "3": 1100, "4": 1400 },
        commuteCBD: 35,
        transportScore: 7,
        description: "Northern beaches seaside suburb"
    },
    {
        name: "Hurstville",
        postcode: "2220",
        lat: -33.967,
        lng: 151.100,
        medianRent: { "1": 450, "2": 550, "3": 650, "4": 750 },
        commuteCBD: 25,
        transportScore: 8,
        description: "Southern suburb with good transport"
    }
];