import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/admin/AdminSidebar';
import AdminHeader from '../components/dashboard/admin/AdminHeader';
import AdminOverviewContent from '../components/dashboard/admin/AdminOverviewContent';
import AdminUserManagementPanel from '../components/dashboard/admin/AdminUserManagementPanel';
import AdminSettingsPanel from '../components/dashboard/admin/AdminSettingsPanel';
import AdminBookingsPanel from '../components/dashboard/admin/AdminBookingsPanel';
import AdminPaymentsPanel from '../components/dashboard/admin/AdminPaymentsPanel';

export default function TravelAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F3F6FD] font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <AdminHeader />
        <div className="p-8">
          <Routes>
            <Route index element={<AdminOverviewContent />} />
            <Route path="user-management" element={<AdminUserManagementPanel />} />
            <Route path="user-management/:tab" element={<AdminUserManagementPanel />} />
            <Route path="bookings" element={<AdminBookingsPanel />} />
            <Route path="bookings/:tab" element={<AdminBookingsPanel />} />
            <Route path="budget-payments" element={<AdminPaymentsPanel />} />
            <Route path="budget-payments/:tab" element={<AdminPaymentsPanel />} />
            <Route path="settings" element={<AdminSettingsPanel />} />
            <Route path="*" element={<AdminOverviewContent />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
