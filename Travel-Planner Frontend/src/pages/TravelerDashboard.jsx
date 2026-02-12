import React, { useCallback, useEffect, useState } from 'react';
import TravelerSidebar from '../components/dashboard/traveler/TravelerSidebar';
import TravelerHeader from '../components/dashboard/traveler/TravelerHeader';
import ActiveTripsWidget from '../components/dashboard/traveler/ActiveTripsWidget';
import UpcomingTripWidget from '../components/dashboard/traveler/UpcomingTripWidget';
import SavedPlacesWidget from '../components/dashboard/traveler/SavedPlacesWidget';
import RemainingBudgetWidget from '../components/dashboard/traveler/RemainingBudgetWidget';
import UpcomingTripHero from '../components/dashboard/traveler/UpcomingTripHero';
import ExploreDestinationsWidget from '../components/dashboard/traveler/ExploreDestinationsWidget';
import BudgetSummaryWidget from '../components/dashboard/traveler/BudgetSummaryWidget';
import { useAuth } from '../lib/AuthContext';
import { getTravelerDashboard } from '../lib/travelerDashboard';

export default function UserTravelDashboard() {
  const { user, token } = useAuth();
  const isTraveler = user?.role === 'USER';

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((current) => !current);
  }, []);

  const handleCloseMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      if (!isTraveler || !token) {
        if (isMounted) {
          setDashboardData(null);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setFetchError('');

      try {
        const payload = await getTravelerDashboard(token);
        if (isMounted) {
          setDashboardData(payload);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error?.message || 'Unable to load dashboard.');
          setDashboardData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [isTraveler, token]);

  const travelerName = dashboardData?.travelerName || user?.name || 'Traveler';
  const overview = dashboardData?.overview;

  return (
    <div className="flex h-screen bg-[#F3F6FD] font-sans overflow-hidden">
      <TravelerSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleCloseMobileSidebar}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <TravelerHeader
          onMenuToggle={handleToggleMobileSidebar}
          isMenuOpen={isMobileSidebarOpen}
        />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {travelerName}!</h1>
            <p className="text-gray-500 mt-1">Ready to explore your next adventure?</p>
          </div>

          {fetchError ? (
            <p className="mb-6 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
              {fetchError}
            </p>
          ) : null}

          {isLoading ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-sm text-gray-500">
              Loading dashboard...
            </div>
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <ActiveTripsWidget
                activeTrips={dashboardData?.activeTrips || []}
                totalActive={Number(overview?.upcomingTrips || 0)}
              />
              <UpcomingTripWidget upcomingTrip={dashboardData?.upcomingTrip || null} />
              <SavedPlacesWidget savedPlaces={dashboardData?.savedPlaces || { total: 0, topPlaces: [] }} />
              <RemainingBudgetWidget overview={overview || { totalBudget: 0, spentBudget: 0, remainingBudget: 0 }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto">
              <UpcomingTripHero upcomingTrip={dashboardData?.upcomingTrip || null} />
            <div className="space-y-6">
                <ExploreDestinationsWidget destinations={dashboardData?.exploreDestinations || []} />
                <BudgetSummaryWidget activities={dashboardData?.budgetActivities || []} />
              </div>
            </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
