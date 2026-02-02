import React from 'react';
import DashboardLayout from '../components/dashboard/shared/DashboardLayout';
import StatCard from '../components/dashboard/shared/StatCard';
import UpcomingTripHero from '../components/dashboard/traveler/UpcomingTripHero';
import TripCardGrid from '../components/dashboard/traveler/TripCardGrid';
import BudgetProgressRing from '../components/dashboard/traveler/BudgetProgressRing';
import ItineraryTimeline from '../components/dashboard/traveler/ItineraryTimeline';
import { Briefcase, DollarSign, Map, Compass } from 'lucide-react';

const TravelerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Section: Hero and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UpcomingTripHero />
          </div>
          <div className="space-y-4">
            <StatCard
              title="Total Trips"
              value="12"
              icon={<Briefcase size={24} />}
              color="primary"
            />
            <StatCard
              title="Lifetime Spent"
              value="$8,450"
              icon={<DollarSign size={24} />}
              color="success"
            />
          </div>
        </div>

        {/* Middle Section: My Trips */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Trips</h2>
          <TripCardGrid />
        </div>

        {/* Bottom Section: Budget and Itinerary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Overview</h3>
            <BudgetProgressRing />
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Current Itinerary</h3>
            <ItineraryTimeline />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TravelerDashboard;
