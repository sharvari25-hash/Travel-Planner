import React from 'react';
import DashboardLayout from '../components/dashboard/shared/DashboardLayout';
import StatCard from '../components/dashboard/shared/StatCard';
import SystemAnalyticsChart from '../components/dashboard/admin/SystemAnalyticsChart';
import UserManagementTable from '../components/dashboard/admin/UserManagementTable';
import ApiHealthMonitor from '../components/dashboard/admin/ApiHealthMonitor';
import BookingLogs from '../components/dashboard/admin/BookingLogs';
import { Users, Briefcase, DollarSign, Activity } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value="1,258" icon={<Users size={24} />} color="primary" />
          <StatCard title="Total Bookings" value="3,402" icon={<Briefcase size={24} />} color="accent" />
          <StatCard title="Total Revenue" value="$1.2M" icon={<DollarSign size={24} />} color="success" />
          <StatCard title="API Status" value="Healthy" icon={<Activity size={24} />} color="success" />
        </div>

        {/* Analytics and API Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">User Growth</h3>
            <SystemAnalyticsChart />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">API Health</h3>
            <ApiHealthMonitor />
          </div>
        </div>

        {/* User Management Table */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
          <UserManagementTable />
        </div>

        {/* Booking Logs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Real-time Bookings</h2>
          <BookingLogs />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
