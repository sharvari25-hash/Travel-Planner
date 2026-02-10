import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../lib/AuthContext';
import { getPaymentHistory } from '../../../lib/paymentHistory';

const statusStyles = {
  SUCCESS: 'bg-green-100 text-green-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  REFUNDED: 'bg-blue-100 text-blue-700',
  FAILED: 'bg-red-100 text-red-700',
};

const methodLabels = {
  CARD: 'Card',
  UPI: 'UPI',
  BANK_TRANSFER: 'Bank Transfer',
};

const getRouteStatusFilter = (tab) => {
  if (tab === 'successful') {
    return 'SUCCESS';
  }

  if (tab === 'pending') {
    return 'PENDING';
  }

  if (tab === 'refunded') {
    return 'REFUNDED';
  }

  return 'ALL';
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const formatAmount = (amount, currency) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency || 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const AdminPaymentsPanel = () => {
  const { user } = useAuth();
  const { tab } = useParams();
  const isAdmin = user?.role === 'ADMIN';

  const [payments] = useState(() => getPaymentHistory());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const routeStatusFilter = getRouteStatusFilter(tab);
  const activeStatusFilter = routeStatusFilter === 'ALL' ? statusFilter : routeStatusFilter;

  const filteredPayments = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return payments.filter((entry) => {
      const matchesSearch =
        search.length === 0 ||
        entry.id.toLowerCase().includes(search) ||
        entry.bookingId.toLowerCase().includes(search) ||
        entry.travelerName.toLowerCase().includes(search) ||
        entry.travelerEmail.toLowerCase().includes(search);

      const matchesStatus = activeStatusFilter === 'ALL' || entry.status === activeStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, activeStatusFilter]);

  const summary = useMemo(
    () => ({
      totalTransactions: payments.length,
      grossVolume: payments.reduce((sum, entry) => sum + Number(entry.amount || 0), 0),
      successful: payments.filter((entry) => entry.status === 'SUCCESS').length,
      refunded: payments.filter((entry) => entry.status === 'REFUNDED').length,
    }),
    [payments]
  );

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800">Payments</h3>
        <p className="text-sm text-gray-500 mt-2">
          Only users with the ADMIN role can view payment history.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Payment History</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review all traveler payment transactions from the admin dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Transactions</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{summary.totalTransactions}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Gross Volume</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{formatAmount(summary.grossVolume, 'INR')}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Successful</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{summary.successful}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Refunded</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{summary.refunded}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5">
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by payment ID, booking ID, traveler, or email"
            className="w-full md:flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            disabled={routeStatusFilter !== 'ALL'}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUCCESS">Successful</option>
            <option value="PENDING">Pending</option>
            <option value="REFUNDED">Refunded</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="py-3 font-medium">Payment ID</th>
                <th className="py-3 font-medium">Booking ID</th>
                <th className="py-3 font-medium">Traveler</th>
                <th className="py-3 font-medium">Method</th>
                <th className="py-3 font-medium">Paid Date</th>
                <th className="py-3 font-medium">Amount</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="py-3 font-semibold text-gray-800">{entry.id}</td>
                  <td className="py-3 text-gray-700">{entry.bookingId}</td>
                  <td className="py-3">
                    <p className="font-medium text-gray-800">{entry.travelerName}</p>
                    <p className="text-xs text-gray-500">{entry.travelerEmail}</p>
                  </td>
                  <td className="py-3 text-gray-700">{methodLabels[entry.method] || entry.method}</td>
                  <td className="py-3 text-gray-700">{formatDate(entry.paidAt)}</td>
                  <td className="py-3 text-gray-800 font-semibold">{formatAmount(entry.amount, 'INR')}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[entry.status] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 ? (
          <p className="text-sm text-gray-500 py-6 text-center">No payment history found for this filter.</p>
        ) : null}
      </div>
    </section>
  );
};

export default AdminPaymentsPanel;
