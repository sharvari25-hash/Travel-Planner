
export const myTrips = [
  {
    id: 1,
    destination: "Paris, France",
    startDate: "2024-08-15",
    endDate: "2024-08-22",
    status: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760c0337?auto=format&fit=crop&w=800&q=60",
    collaborators: [
      { id: 1, name: "Alice", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
      { id: 2, name: "Bob", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
    ],
    budget: {
      total: 3000,
      spent: 1200,
    },
  },
  {
    id: 2,
    destination: "Kyoto, Japan",
    startDate: "2024-09-10",
    endDate: "2024-09-20",
    status: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=60",
    collaborators: [
      { id: 3, name: "Charlie", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
    ],
    budget: {
      total: 5000,
      spent: 2500,
    },
  },
  {
    id: 3,
    destination: "Santorini, Greece",
    startDate: "2024-07-01",
    endDate: "2024-07-10",
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1563789031959-4c02bcb40312?auto=format&fit=crop&w=800&q=60",
    collaborators: [],
     budget: {
      total: 4000,
      spent: 3800,
    },
  },
    {
    id: 4,
    destination: "Bali, Indonesia",
    startDate: "2024-10-05",
    endDate: "2024-10-15",
    status: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1559628233-eb1b1a4559a9?auto=format&fit=crop&w=800&q=60",
    collaborators: [
      { id: 4, name: "David", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
      { id: 5, name: "Eve", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
    ],
    budget: {
      total: 3500,
      spent: 1500,
    },
  },
];
