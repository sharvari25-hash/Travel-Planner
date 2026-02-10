import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../lib/AuthContext';
import {
  deleteBookingRequest,
  getBookingRequests,
  updateBookingRequestStatus,
} from '../../../lib/bookingRequests';

const statusStyles = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

const transportLabels = {
  suv: 'Luxury SUV',
  van: 'Comfort Van',
  bus: 'Shuttle Bus',
};

const getRouteStatusFilter = (tab) => {
  if (tab === 'pending') {
    return 'PENDING';
  }

  if (tab === 'approved') {
    return 'APPROVED';
  }

  if (tab === 'rejected') {
    return 'REJECTED';
  }

  return 'ALL';
};

const formatDate = (dateValue) =>
  new Date(dateValue).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const AdminBookingsPanel = () => {
  const { user } = useAuth();
  const { tab } = useParams();
  const isAdmin = user?.role === 'ADMIN';

  const [bookingRequests, setBookingRequests] = useState(() => getBookingRequests());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [actionSelections, setActionSelections] = useState({});

  const routeStatusFilter = getRouteStatusFilter(tab);
  const activeStatusFilter = routeStatusFilter === 'ALL' ? statusFilter : routeStatusFilter;

  const summary = useMemo(
    () => ({
      total: bookingRequests.length,
      pending: bookingRequests.filter((entry) => entry.status === 'PENDING').length,
      approved: bookingRequests.filter((entry) => entry.status === 'APPROVED').length,
      rejected: bookingRequests.filter((entry) => entry.status === 'REJECTED').length,
    }),
    [bookingRequests]
  );

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return bookingRequests.filter((entry) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        entry.id.toLowerCase().includes(normalizedSearch) ||
        entry.travelerName.toLowerCase().includes(normalizedSearch) ||
        entry.travelerEmail.toLowerCase().includes(normalizedSearch) ||
        entry.destination.toLowerCase().includes(normalizedSearch);

      const matchesStatus = activeStatusFilter === 'ALL' || entry.status === activeStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookingRequests, searchTerm, activeStatusFilter]);

  const handleStatusUpdate = (requestId, status) => {
    const note =
      status === 'REJECTED'
        ? window.prompt('Optional note for rejection:', 'Please update travel date and submit again.') || ''
        : '';

    const updated = updateBookingRequestStatus(requestId, status, note);
    setBookingRequests(updated);
  };

  const handleDelete = (requestId) => {
    const updated = deleteBookingRequest(requestId);
    setBookingRequests(updated);
  };

  const handleActionChange = (requestId, action) => {
    if (!action) {
      return;
    }

    const statusByAction = {
      APPROVE: 'APPROVED',
      REJECT: 'REJECTED',
      PENDING: 'PENDING',
    };

    const nextStatus = statusByAction[action];
    if (nextStatus) {
      handleStatusUpdate(requestId, nextStatus);
    }

    setActionSelections((current) => ({
      ...current,
      [requestId]: '',
    }));
  };

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800">Bookings</h3>
        <p className="text-sm text-gray-500 mt-2">
          Only users with the ADMIN role can manage booking approvals.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review traveler requests and approve or reject bookings.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setBookingRequests(getBookingRequests())}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Total Requests</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{summary.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-700 mt-1">{summary.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{summary.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Rejected</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{summary.rejected}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5">
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by booking ID, traveler, email, or destination"
            className="w-full md:flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            disabled={routeStatusFilter !== 'ALL'}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="py-3 font-medium">Booking</th>
                <th className="py-3 font-medium">Traveler</th>
                <th className="py-3 font-medium">Tour Date</th>
                <th className="py-3 font-medium">Transport</th>
                <th className="py-3 font-medium">Travelers</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="py-3">
                    <p className="font-semibold text-gray-800">{entry.id}</p>
                    <p className="text-xs text-gray-500">
                      {entry.destination}, {entry.country}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Requested {formatDate(entry.requestedAt)}
                    </p>
                  </td>
                  <td className="py-3">
                    <p className="font-medium text-gray-800">{entry.travelerName}</p>
                    <p className="text-xs text-gray-500">{entry.travelerEmail}</p>
                  </td>
                  <td className="py-3 text-gray-700">{formatDate(entry.travelDate)}</td>
                  <td className="py-3 text-gray-700">{transportLabels[entry.transportation] || entry.transportation}</td>
                  <td className="py-3 text-gray-700">{entry.travelersCount}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[entry.status] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {entry.status}
                    </span>
                    {entry.adminNote ? (
                      <p className="text-xs text-gray-500 mt-1 max-w-[240px]">{entry.adminNote}</p>
                    ) : null}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={actionSelections[entry.id] || ''}
                        onChange={(event) => {
                          const selectedAction = event.target.value;
                          setActionSelections((current) => ({
                            ...current,
                            [entry.id]: selectedAction,
                          }));
                          handleActionChange(entry.id, selectedAction);
                        }}
                        className="px-2 py-1 rounded-md text-xs border border-gray-200 bg-white text-gray-700"
                      >
                        <option value="">Set Action</option>
                        <option value="APPROVE">Approve</option>
                        <option value="REJECT">Reject</option>
                        <option value="PENDING">Set Pending</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleDelete(entry.id)}
                        className="px-2 py-1 rounded-md text-xs bg-red-100 hover:bg-red-200 text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 ? (
          <p className="text-sm text-gray-500 py-6 text-center">No booking requests found.</p>
        ) : null}
      </div>
    </section>
  );
};

export default AdminBookingsPanel;
