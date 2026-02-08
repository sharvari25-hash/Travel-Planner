// Consolidated Tours Data with Itineraries and Weather Profiles

const generatePlan = (days) => {
  // Fallback plan generator if specific itinerary is missing (though all below have them)
  const activities = [
    "Arrival and Exploration", "Guided City Tour", "Museum Visit", "Local Market Tour", "Cooking Class",
    "Historical Site Visit", "Nature Hike", "Beach Day", "Boat Trip", "Wine Tasting", "Art Gallery Visit",
    "Live Music Performance", "Theater Show", "Shopping Spree", "Spa and Wellness", "Adventure Sports",
    "Photography Workshop", "Food Tasting Tour", "Cycling Tour", "Day Trip to a Nearby Town"
  ];
  const plan = [];
  for (let i = 1; i <= days; i++) {
    plan.push(`Day ${i}: ${activities[Math.floor(Math.random() * activities.length)]}`);
  }
  return plan;
};

export const allToursData = [
  // Family-Friendly Destinations
  {
    country: "Japan",
    destination: "Tokyo",
    category: "Family",
    description: "DisneySea, interactive museums, and incredibly safe streets.",
    duration: 7,
    img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival in Tokyo & Shinjuku Exploration",
      "Day 2: Tokyo Disneyland or DisneySea",
      "Day 3: Asakusa (Senso-ji Temple) & Skytree",
      "Day 4: Ghibli Museum & Inokashira Park",
      "Day 5: Harajuku & Shibuya Crossing",
      "Day 6: Day trip to Hakone (Mt. Fuji views)",
      "Day 7: Souvenir shopping & Departure"
    ],
    weatherProfile: { baseTemp: 18, baseHumidity: 60, baseWind: 10, defaultCondition: 'Cloudy' }
  },
  {
    country: "USA",
    destination: "Orlando, FL",
    category: "Family",
    description: "The theme park capital of the world (Disney & Universal).",
    duration: 6,
    img: "https://images.unsplash.com/photo-1597466599227-9ee496952358?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Disney Springs",
      "Day 2: Magic Kingdom",
      "Day 3: Epcot Center",
      "Day 4: Universal Studios Florida",
      "Day 5: Islands of Adventure",
      "Day 6: Relaxation at resort pool & Departure"
    ],
    weatherProfile: { baseTemp: 28, baseHumidity: 80, baseWind: 15, defaultCondition: 'Sunny' }
  },
  {
    country: "Denmark",
    destination: "Billund",
    category: "Family",
    description: "The home of LEGO—The original Legoland and LEGO House.",
    duration: 4,
    img: "https://images.unsplash.com/photo-1558269839-a8585c1575a8?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival in Billund & LEGO House Experience",
      "Day 2: Full day at LEGOLAND Billund",
      "Day 3: Lalandia Aquadome water park",
      "Day 4: Teddy Bear Art Museum & Departure"
    ],
    weatherProfile: { baseTemp: 12, baseHumidity: 70, baseWind: 20, defaultCondition: 'Rainy' }
  },
  {
    country: "Singapore",
    destination: "Sentosa Island",
    category: "Family",
    description: "Universal Studios, giant aquariums, and clean beaches.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Siloso Beach",
      "Day 2: Universal Studios Singapore",
      "Day 3: S.E.A. Aquarium & Adventure Cove Waterpark",
      "Day 4: Skyline Luge & Wings of Time show",
      "Day 5: Cable car ride & Departure"
    ],
    weatherProfile: { baseTemp: 31, baseHumidity: 90, baseWind: 10, defaultCondition: 'Stormy' }
  },
  {
    country: "Australia",
    destination: "Gold Coast",
    category: "Family",
    description: "Great surf schools and numerous wildlife sanctuaries.",
    duration: 8,
    img: "https://images.unsplash.com/photo-1523482284999-568b5abe1611?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Surfers Paradise Beach",
      "Day 2: Currumbin Wildlife Sanctuary",
      "Day 3: Sea World",
      "Day 4: Warner Bros. Movie World",
      "Day 5: Hinterland day trip (Lamington National Park)",
      "Day 6: Wet'n'Wild Gold Coast",
      "Day 7: SkyPoint Observation Deck & Shopping",
      "Day 8: Departure"
    ],
    weatherProfile: { baseTemp: 25, baseHumidity: 65, baseWind: 25, defaultCondition: 'Sunny' }
  },
  // Romantic Couple Retreats
  {
    country: "Greece",
    destination: "Santorini",
    category: "Couple",
    description: "Iconic blue domes, sunset cruises, and wine tasting.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1563789031959-4c02bcb40312?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival in Oia & Sunset viewing",
      "Day 2: Catamaran Cruise around the Caldera",
      "Day 3: Wine tasting tour at local vineyards",
      "Day 4: Relaxing at Red Beach & Fira exploration",
      "Day 5: Departure"
    ],
    weatherProfile: { baseTemp: 22, baseHumidity: 50, baseWind: 30, defaultCondition: 'Sunny' }
  },
  {
    country: "Maldives",
    destination: "Baa Atoll",
    category: "Couple",
    description: "Private overwater villas and dining under the stars.",
    duration: 6,
    img: "https://images.unsplash.com/photo-1516406742982-616d153735b8?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Seaplane transfer & Check-in to Overwater Villa",
      "Day 2: Snorkeling with Manta Rays",
      "Day 3: Couple's Spa Treatment",
      "Day 4: Sunset Dolphin Cruise",
      "Day 5: Private beach dinner",
      "Day 6: Departure"
    ],
    weatherProfile: { baseTemp: 29, baseHumidity: 85, baseWind: 15, defaultCondition: 'Partly Cloudy' }
  },
  {
    country: "France",
    destination: "Paris",
    category: "Couple",
    description: "The 'City of Love'—picnics by the Eiffel Tower and art.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1502602898657-3e91760c0337?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Eiffel Tower at night",
      "Day 2: Louvre Museum & Tuileries Garden",
      "Day 3: Montmartre & Sacré-Cœur Basilica",
      "Day 4: Seine River Dinner Cruise",
      "Day 5: Shopping at Champs-Élysées & Departure"
    ],
    weatherProfile: { baseTemp: 15, baseHumidity: 65, baseWind: 12, defaultCondition: 'Cloudy' }
  },
  {
    country: "Italy",
    destination: "Amalfi Coast",
    category: "Couple",
    description: "Stunning cliffside towns and private boat tours.",
    duration: 6,
    img: "https://images.unsplash.com/photo-1533105079780-52b9be462077?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival in Positano",
      "Day 2: Private boat tour to Capri",
      "Day 3: Visit to Amalfi & Ravello",
      "Day 4: Path of the Gods hike",
      "Day 5: Cooking class with local chef",
      "Day 6: Departure"
    ],
    weatherProfile: { baseTemp: 21, baseHumidity: 60, baseWind: 10, defaultCondition: 'Sunny' }
  },
  {
    country: "Indonesia",
    destination: "Ubud, Bali",
    category: "Couple",
    description: "Jungle swings, luxury spas, and spiritual retreats.",
    duration: 7,
    img: "https://images.unsplash.com/photo-1559628233-eb1b1a4559a9?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Villa check-in",
      "Day 2: Tegalalang Rice Terrace & Bali Swing",
      "Day 3: Sacred Monkey Forest Sanctuary",
      "Day 4: Tirta Empul Temple purification ritual",
      "Day 5: Traditional Balinese Massage",
      "Day 6: Campuhan Ridge Walk",
      "Day 7: Departure"
    ],
    weatherProfile: { baseTemp: 27, baseHumidity: 95, baseWind: 5, defaultCondition: 'Rainy' }
  },
  // Adventure & Nature
  {
    country: "Switzerland",
    destination: "Interlaken",
    category: "Adventure",
    description: "Paragliding, skiing, and scenic mountain trains.",
    duration: 6,
    img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival in Interlaken",
      "Day 2: Paragliding over the Alps",
      "Day 3: Jungfraujoch - Top of Europe train ride",
      "Day 4: Canyoning or White Water Rafting",
      "Day 5: Harder Kulm funicular",
      "Day 6: Departure"
    ],
    weatherProfile: { baseTemp: 10, baseHumidity: 55, baseWind: 8, defaultCondition: 'Partly Cloudy' }
  },
  {
    country: "Iceland",
    destination: "Reykjavík",
    category: "Adventure",
    description: "Northern Lights, Blue Lagoon, and massive waterfalls.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1500043357865-c6b88278f097?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Blue Lagoon soak",
      "Day 2: Golden Circle Tour (Geysir, Gullfoss)",
      "Day 3: South Coast waterfalls & Black Sand Beach",
      "Day 4: Glacier Hiking or Ice Cave tour",
      "Day 5: Reykjavík city walk & Departure"
    ],
    weatherProfile: { baseTemp: 5, baseHumidity: 70, baseWind: 35, defaultCondition: 'Cloudy' }
  },
  {
    country: "New Zealand",
    destination: "Queenstown",
    category: "Adventure",
    description: "Bungee jumping, hiking, and 'Lord of the Rings' tours.",
    duration: 7,
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Skyline Gondola",
      "Day 2: Milford Sound Cruise",
      "Day 3: Kawarau Bridge Bungee Jump",
      "Day 4: Jet boat ride on Shotover River",
      "Day 5: Glenorchy & Lord of the Rings locations",
      "Day 6: Hike Ben Lomond Track",
      "Day 7: Departure"
    ],
    weatherProfile: { baseTemp: 14, baseHumidity: 60, baseWind: 20, defaultCondition: 'Windy' }
  },
  {
    country: "Norway",
    destination: "Lofoten Islands",
    category: "Adventure",
    description: "Hiking through fjords and seeing the Midnight Sun.",
    duration: 6,
    img: "https://images.unsplash.com/photo-1519526238942-e6f10d3a5a3a?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival in Svolvær",
      "Day 2: Fishing village of Reine",
      "Day 3: Hike Reinebringen",
      "Day 4: Sea Eagle Safari",
      "Day 5: Henningsvær village exploration",
      "Day 6: Departure"
    ],
    weatherProfile: { baseTemp: 8, baseHumidity: 75, baseWind: 25, defaultCondition: 'Cloudy' }
  },
  {
    country: "Canada",
    destination: "Banff",
    category: "Adventure",
    description: "Turquoise lakes and rocky mountain wildlife.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1501114676295-bbbcc7a12466?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Banff Townsite",
      "Day 2: Lake Louise & Moraine Lake",
      "Day 3: Johnston Canyon Ice Walk (or hike)",
      "Day 4: Banff Gondola & Hot Springs",
      "Day 5: Departure"
    ],
    weatherProfile: { baseTemp: 12, baseHumidity: 40, baseWind: 15, defaultCondition: 'Partly Cloudy' }
  },
  // Culture & Heritage
  {
    country: "Italy",
    destination: "Rome",
    category: "Culture",
    description: "The Colosseum, Roman Forum, and world-class pasta.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1529181103339-634b36450382?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Trevi Fountain",
      "Day 2: Colosseum & Roman Forum",
      "Day 3: Vatican Museums & St. Peter's Basilica",
      "Day 4: Pantheon & Piazza Navona",
      "Day 5: Gelato tasting & Departure"
    ],
    weatherProfile: { baseTemp: 20, baseHumidity: 50, baseWind: 10, defaultCondition: 'Sunny' }
  },
  {
    country: "Egypt",
    destination: "Giza/Cairo",
    category: "Culture",
    description: "The Great Pyramids and incredible Nile River cruises.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1569031419332-690a58699a46?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival in Cairo",
      "Day 2: Pyramids of Giza & Sphinx",
      "Day 3: Egyptian Museum & Khan el-Khalili market",
      "Day 4: Day trip to Alexandria or Saqqara",
      "Day 5: Nile Dinner Cruise & Departure"
    ],
    weatherProfile: { baseTemp: 32, baseHumidity: 30, baseWind: 15, defaultCondition: 'Sunny' }
  },
  {
    country: "Spain",
    destination: "Barcelona",
    category: "Culture",
    description: "Gaudí’s architecture and vibrant night markets.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1523531294919-42fc7c6a1439?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Las Ramblas",
      "Day 2: Sagrada Família & Park Güell",
      "Day 3: Gothic Quarter walking tour",
      "Day 4: Casa Batlló & Tapas tour",
      "Day 5: Beach relaxation & Departure"
    ],
    weatherProfile: { baseTemp: 22, baseHumidity: 60, baseWind: 15, defaultCondition: 'Sunny' }
  },
  {
    country: "Turkey",
    destination: "Cappadocia",
    category: "Culture",
    description: "Famous hot air balloon rides over ancient cave dwellings.",
    duration: 4,
    img: "https://images.unsplash.com/photo-1544026122-fd37a01e65d2?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Cave Hotel Check-in",
      "Day 2: Sunrise Hot Air Balloon Ride",
      "Day 3: Göreme Open Air Museum & Pottery workshop",
      "Day 4: Derinkuyu Underground City & Departure"
    ],
    weatherProfile: { baseTemp: 18, baseHumidity: 45, baseWind: 10, defaultCondition: 'Partly Cloudy' }
  },
  {
    country: "Thailand",
    destination: "Chiang Mai",
    category: "Culture",
    description: "Ancient temples, cooking classes, and elephant sanctuaries.",
    duration: 5,
    img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=60",
    plan: [
      "Day 1: Arrival & Night Bazaar",
      "Day 2: Doi Suthep Temple",
      "Day 3: Elephant Jungle Sanctuary (Ethical)",
      "Day 4: Thai Cooking Class",
      "Day 5: Old City Temple Tour & Departure"
    ],
    weatherProfile: { baseTemp: 30, baseHumidity: 80, baseWind: 5, defaultCondition: 'Sunny' }
  },
];
