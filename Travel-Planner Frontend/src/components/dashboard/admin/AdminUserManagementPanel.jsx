import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../lib/AuthContext';
import { initialAdminUsers } from '../../../lib/mockAdminUsers';

const statusStyles = {
  ACTIVE: 'bg-green-100 text-green-700',
  SUSPENDED: 'bg-red-100 text-red-700',
  DISABLED: 'bg-gray-200 text-gray-700',
};

const normalizeDate = (dateValue) => {
  if (dateValue === 'Never') {
    return 'Never';
  }

  return new Date(dateValue).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getFiltersFromRoute = (tab) => {
  if (tab === 'admins') {
    return { role: 'ADMIN', status: 'ALL' };
  }

  if (tab === 'suspended') {
    return { role: 'ALL', status: 'SUSPENDED' };
  }

  return { role: 'ALL', status: 'ALL' };
};

const AdminUserManagementPanel = () => {
  const { user } = useAuth();
  const { tab } = useParams();
  const routeFilters = getFiltersFromRoute(tab);
  const isAdmin = user?.role === 'ADMIN';

  const [users, setUsers] = useState(initialAdminUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const activeRoleFilter = routeFilters.role === 'ALL' ? roleFilter : routeFilters.role;
  const activeStatusFilter = routeFilters.status === 'ALL' ? statusFilter : routeFilters.status;

  const filteredUsers = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return users.filter((entry) => {
      const matchesSearch =
        searchTerm.length === 0 ||
        entry.name.toLowerCase().includes(searchTerm) ||
        entry.email.toLowerCase().includes(searchTerm);

      const matchesRole = activeRoleFilter === 'ALL' || entry.role === activeRoleFilter;
      const matchesStatus = activeStatusFilter === 'ALL' || entry.status === activeStatusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, activeRoleFilter, activeStatusFilter]);

  const summary = useMemo(
    () => ({
      total: users.length,
      active: users.filter((entry) => entry.status === 'ACTIVE').length,
      suspended: users.filter((entry) => entry.status === 'SUSPENDED').length,
      disabled: users.filter((entry) => entry.status === 'DISABLED').length,
    }),
    [users]
  );

  const updateUserRole = (id, newRole) => {
    if (!isAdmin) {
      return;
    }

    setUsers((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, role: newRole } : entry))
    );
  };

  const updateUserStatus = (id, newStatus) => {
    if (!isAdmin) {
      return;
    }

    setUsers((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, status: newStatus } : entry))
    );
  };

  const removeUser = (id) => {
    if (!isAdmin) {
      return;
    }

    setUsers((current) => current.filter((entry) => entry.id !== id));
  };

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
        <p className="text-sm text-gray-500 mt-2">
          Only users with the ADMIN role can manage users.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage demo users, roles, and account status from a single admin panel.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Total Users</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{summary.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Active</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{summary.active}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Suspended</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{summary.suspended}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Disabled</p>
          <p className="text-2xl font-bold text-gray-700 mt-1">{summary.disabled}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5">
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email"
            className="w-full md:flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            disabled={routeFilters.role !== 'ALL'}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admins</option>
            <option value="USER">Users</option>
          </select>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            disabled={routeFilters.status !== 'ALL'}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="py-3 font-medium">User</th>
                <th className="py-3 font-medium">Role</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Trips</th>
                <th className="py-3 font-medium">Last Login</th>
                <th className="py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{entry.name}</p>
                        <p className="text-xs text-gray-500">{entry.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <select
                      value={entry.role}
                      onChange={(event) => updateUserRole(entry.id, event.target.value)}
                      className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                    </select>
                  </td>
                  <td className="py-3">
                    <select
                      value={entry.status}
                      onChange={(event) => updateUserStatus(entry.id, event.target.value)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold border border-transparent ${
                        statusStyles[entry.status] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="SUSPENDED">SUSPENDED</option>
                      <option value="DISABLED">DISABLED</option>
                    </select>
                  </td>
                  <td className="py-3 text-gray-700">{entry.tripsBooked}</td>
                  <td className="py-3 text-gray-700">{normalizeDate(entry.lastLogin)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeUser(entry.id)}
                        className="px-2 py-1 rounded-md text-xs bg-red-100 hover:bg-red-200 text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <p className="text-sm text-gray-500 py-6 text-center">
            No users match your current filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default AdminUserManagementPanel;
