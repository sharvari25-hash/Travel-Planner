import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { createBookingRequest } from '../lib/bookingRequests';
import { createPaymentRecord } from '../lib/paymentHistory';

const PENDING_BOOKING_STORAGE_KEY = 'pendingTourBookingCheckout';

const paymentMethodLabels = {
  CARD: 'Card',
  UPI: 'UPI',
  BANK_TRANSFER: 'Bank Transfer',
};

const transportLabels = {
  suv: 'Luxury SUV',
  van: 'Comfort Van',
  bus: 'Shuttle Bus',
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

const readPendingBooking = (stateValue) => {
  if (stateValue) {
    return stateValue;
  }

  if (typeof window === 'undefined' || !window.sessionStorage) {
    return null;
  }

  const raw = window.sessionStorage.getItem(PENDING_BOOKING_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    window.sessionStorage.removeItem(PENDING_BOOKING_STORAGE_KEY);
    return null;
  }
};

const DemoPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const pendingBooking = useMemo(
    () => readPendingBooking(location.state?.pendingBooking),
    [location.state]
  );

  if (!pendingBooking) {
    return (
      <div className="bg-gray-100 min-h-screen pt-32 pb-16">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">No Pending Booking Found</h1>
          <p className="text-sm text-gray-500 mt-3">
            Start from a tour page, fill traveler details, then continue to payment.
          </p>
          <Link
            to="/tours"
            className="inline-block mt-6 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  const travelersCount = Array.isArray(pendingBooking.travelers)
    ? pendingBooking.travelers.length
    : 1;

  const totalAmount =
    Math.max(1, travelersCount) * (Number(pendingBooking.amountPerTraveler) || 0);

  const handlePayNow = () => {
    if (!user || user.role !== 'USER') {
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    setMessage('');

    const bookingRequest = createBookingRequest({
      travelerName: pendingBooking.travelerName,
      travelerEmail: pendingBooking.travelerEmail,
      destination: pendingBooking.destination,
      country: pendingBooking.country,
      travelDate: pendingBooking.travelDate,
      transportation: pendingBooking.transportation,
      travelers: pendingBooking.travelers,
    });

    createPaymentRecord({
      bookingId: bookingRequest.id,
      travelerName: pendingBooking.travelerName,
      travelerEmail: pendingBooking.travelerEmail,
      method: paymentMethod,
      amount: totalAmount,
      currency: 'INR',
      status: 'SUCCESS',
    });

    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(PENDING_BOOKING_STORAGE_KEY);
    }

    setMessage(`Payment successful. Booking ${bookingRequest.id} sent for admin approval.`);
    window.setTimeout(() => {
      navigate('/user/dashboard/my-trips');
    }, 1000);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800">Demo Payment</h1>
            <p className="text-sm text-gray-500 mt-1">
              Complete payment to submit your booking request.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Payment Method</span>
                <select
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {Object.entries(paymentMethodLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Name on Payment</span>
                <input
                  type="text"
                  defaultValue={pendingBooking.travelerName}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Reference Email</span>
                <input
                  type="email"
                  defaultValue={pendingBooking.travelerEmail}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </label>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePayNow}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {isProcessing ? 'Processing...' : `Pay ${formatAmount(totalAmount, 'INR')}`}
              </button>

              {message ? <p className="text-sm text-green-700">{message}</p> : null}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
            <h2 className="text-lg font-bold text-gray-800">Booking Summary</h2>
            <div className="space-y-2 mt-4 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">Tour:</span> {pendingBooking.destination},{' '}
                {pendingBooking.country}
              </p>
              <p>
                <span className="font-medium text-gray-800">Date:</span>{' '}
                {formatDate(pendingBooking.travelDate)}
              </p>
              <p>
                <span className="font-medium text-gray-800">Travelers:</span> {travelersCount}
              </p>
              <p>
                <span className="font-medium text-gray-800">Transport:</span>{' '}
                {transportLabels[pendingBooking.transportation] || pendingBooking.transportation}
              </p>
              <p className="pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-800">Amount:</span>{' '}
                <span className="font-bold text-gray-900">
                  {formatAmount(totalAmount, 'INR')}
                </span>
              </p>
            </div>

            <Link
              to={`/tours/${pendingBooking.destination.toLowerCase().replace(/\s/g, '-')}`}
              className="inline-block mt-5 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPayment;
