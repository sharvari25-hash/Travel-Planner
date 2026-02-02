const generatePlan = (days) => {
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
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "USA",
    destination: "Orlando, FL",
    category: "Family",
    description: "The theme park capital of the world (Disney & Universal).",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1597466599227-9ee496952358?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Denmark",
    destination: "Billund",
    category: "Family",
    description: "The home of LEGO—The original Legoland and LEGO House.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1558269839-a8585c1575a8?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Singapore",
    destination: "Sentosa Island",
    category: "Family",
    description: "Universal Studios, giant aquariums, and clean beaches.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Australia",
    destination: "Gold Coast",
    category: "Family",
    description: "Great surf schools and numerous wildlife sanctuaries.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1523482284999-568b5abe1611?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  // Romantic Couple Retreats
  {
    country: "Greece",
    destination: "Santorini",
    category: "Couple",
    description: "Iconic blue domes, sunset cruises, and wine tasting.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1563789031959-4c02bcb40312?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Maldives",
    destination: "Baa Atoll",
    category: "Couple",
    description: "Private overwater villas and dining under the stars.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1516406742982-616d153735b8?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "France",
    destination: "Paris",
    category: "Couple",
    description: "The 'City of Love'—picnics by the Eiffel Tower and art.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1502602898657-3e91760c0337?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Italy",
    destination: "Amalfi Coast",
    category: "Couple",
    description: "Stunning cliffside towns and private boat tours.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1533105079780-52b9be462077?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Indonesia",
    destination: "Ubud, Bali",
    category: "Couple",
    description: "Jungle swings, luxury spas, and spiritual retreats.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1559628233-eb1b1a4559a9?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  // Adventure & Nature
  {
    country: "Switzerland",
    destination: "Interlaken",
    category: "Adventure",
    description: "Paragliding, skiing, and scenic mountain trains.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Iceland",
    destination: "Reykjavík",
    category: "Adventure",
    description: "Northern Lights, Blue Lagoon, and massive waterfalls.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1500043357865-c6b88278f097?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "New Zealand",
    destination: "Queenstown",
    category: "Adventure",
    description: "Bungee jumping, hiking, and 'Lord of the Rings' tours.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Norway",
    destination: "Lofoten Islands",
    category: "Adventure",
    description: "Hiking through fjords and seeing the Midnight Sun.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1519526238942-e6f10d3a5a3a?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Canada",
    destination: "Banff",
    category: "Adventure",
    description: "Turquoise lakes and rocky mountain wildlife.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1501114676295-bbbcc7a12466?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  // Culture & Heritage
  {
    country: "Italy",
    destination: "Rome",
    category: "Culture",
    description: "The Colosseum, Roman Forum, and world-class pasta.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1529181103339-634b36450382?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Egypt",
    destination: "Giza/Cairo",
    category: "Culture",
    description: "The Great Pyramids and incredible Nile River cruises.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1569031419332-690a58699a46?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Spain",
    destination: "Barcelona",
    category: "Culture",
    description: "Gaudí’s architecture and vibrant night markets.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1523531294919-42fc7c6a1439?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Turkey",
    destination: "Cappadocia",
    category: "Culture",
    description: "Famous hot air balloon rides over ancient cave dwellings.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1544026122-fd37a01e65d2?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
  {
    country: "Thailand",
    destination: "Chiang Mai",
    category: "Culture",
    description: "Ancient temples, cooking classes, and elephant sanctuaries.",
    duration: Math.floor(Math.random() * 21) + 5,
    img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=60",
    get plan() { return generatePlan(this.duration); }
  },
];