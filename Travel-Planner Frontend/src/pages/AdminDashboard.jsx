import React from 'react';
import AdminSidebar from '../components/dashboard/admin/AdminSidebar';
import AdminHeader from '../components/dashboard/admin/AdminHeader';
import StatCard from '../components/dashboard/shared/StatCard';
import BookingsOverviewChart from '../components/dashboard/admin/BookingsOverviewChart';
import UserManagementTable from '../components/dashboard/admin/UserManagementTable';
import RecentBookingsTable from '../components/dashboard/admin/RecentBookingsTable';
import BudgetSummary from '../components/dashboard/admin/BudgetSummary';
import SystemAlerts from '../components/dashboard/admin/SystemAlerts';
import PopularDestinations from '../components/dashboard/admin/PopularDestinations';
import SectionTitle from '../components/dashboard/shared/SectionTitle';

export default function TravelAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F3F6FD] font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <AdminHeader />
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Users" value="12,450" subtext="Increased by 12%" />
            <StatCard title="Active Trips" value="320" subtext="Current active travelers" />
            <StatCard 
                title="Total Bookings" 
                value="7,890" 
                subtext="Flights | Hotels | Activities"
                icon={<div className="flex gap-1 text-xs">✈️ 🏨 🎫</div>}
            />
            <StatCard title="Total Revenue" value="$156,780" subtext="Gross income" color="text-yellow-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <BookingsOverviewChart />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UserManagementTable />
                    <RecentBookingsTable />
                    <BudgetSummary />
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                         <SectionTitle title="System Alerts" />
                         <img src="https://images.unsplash.com/photo-1558486012-818148f97520?auto=format&fit=crop&w=500&q=80" alt="Landscape" className="w-full h-24 object-cover rounded-lg mb-2 opacity-80" />
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <PopularDestinations />
                <SystemAlerts />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}