import React from 'react';
import StatCard from '../shared/StatCard';
import BookingsOverviewChart from './BookingsOverviewChart';
import UserManagementTable from './UserManagementTable';
import RecentBookingsTable from './RecentBookingsTable';
import BudgetSummary from './BudgetSummary';
import SystemAlerts from './SystemAlerts';
import PopularDestinations from './PopularDestinations';
import SectionTitle from '../shared/SectionTitle';
import { getPaymentHistory } from '../../../lib/paymentHistory';
import { formatInr } from '../../../lib/pricing';

const AdminOverviewContent = () => {
  const totalRevenue = getPaymentHistory()
    .filter((entry) => entry.status === 'SUCCESS')
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="12,450" subtext="Increased by 12%" />
        <StatCard title="Active Trips" value="320" subtext="Current active travelers" />
        <StatCard
          title="Total Bookings"
          value="7,890"
          subtext="Flights | Hotels | Activities"
          icon={<div className="flex gap-1 text-xs">F | H | A</div>}
        />
        <StatCard title="Total Revenue" value={formatInr(totalRevenue)} subtext="Gross income" color="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 min-w-0">
          <BookingsOverviewChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UserManagementTable />
            <RecentBookingsTable />
            <BudgetSummary />
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <SectionTitle title="System Alerts" />
              <img
                src="https://images.unsplash.com/photo-1558486012-818148f97520?auto=format&fit=crop&w=500&q=80"
                alt="Landscape"
                className="w-full h-24 object-cover rounded-lg mb-2 opacity-80"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <PopularDestinations />
          <SystemAlerts />
        </div>
      </div>
    </>
  );
};

export default AdminOverviewContent;
