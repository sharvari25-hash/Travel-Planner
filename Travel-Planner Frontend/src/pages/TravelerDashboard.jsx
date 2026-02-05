import React from 'react';
import TravelerSidebar from '../components/dashboard/traveler/TravelerSidebar';
import TravelerHeader from '../components/dashboard/traveler/TravelerHeader';
import ActiveTripsWidget from '../components/dashboard/traveler/ActiveTripsWidget';
import UpcomingTripWidget from '../components/dashboard/traveler/UpcomingTripWidget';
import SavedPlacesWidget from '../components/dashboard/traveler/SavedPlacesWidget';
import RemainingBudgetWidget from '../components/dashboard/traveler/RemainingBudgetWidget';
import UpcomingTripHero from '../components/dashboard/traveler/UpcomingTripHero';
import ExploreDestinationsWidget from '../components/dashboard/traveler/ExploreDestinationsWidget';
import BudgetSummaryWidget from '../components/dashboard/traveler/BudgetSummaryWidget';

export default function UserTravelDashboard() {
  return (
    <div className="flex h-screen bg-[#F3F6FD] font-sans overflow-hidden">
      <TravelerSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <TravelerHeader />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, John!</h1>
            <p className="text-gray-500 mt-1">Ready to explore your next adventure?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <ActiveTripsWidget />
            <UpcomingTripWidget />
            <SavedPlacesWidget />
            <RemainingBudgetWidget />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto">
            <UpcomingTripHero />
            <div className="space-y-6">
              <ExploreDestinationsWidget />
              <BudgetSummaryWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}