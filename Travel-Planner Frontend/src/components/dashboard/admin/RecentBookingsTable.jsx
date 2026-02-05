import React from 'react';
import SectionTitle from '../shared/SectionTitle';

const bookings = [
  { id: '#56789', user: 'Sarah K.', type: 'Flight', color: 'bg-green-100 text-green-700' },
  { id: '#56732', user: 'David L.', type: 'Hotel', color: 'bg-red-100 text-red-700' },
  { id: '#56608', user: 'Lisa M.', type: 'Tour', color: 'bg-gray-700 text-white' },
];

const RecentBookingsTable = () => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <SectionTitle title="Recent Bookings" actions={
           <div className="flex gap-2 text-gray-400">
              <span className="cursor-pointer hover:text-blue-600">{'<'}</span>
              <span className="cursor-pointer hover:text-blue-600">{'>'}</span>
           </div>
      }/>
      <table className="w-full text-left text-sm">
          <thead className="text-gray-400 border-b">
              <tr>
                  <th className="pb-2 font-medium">Booking ID</th>
                  <th className="pb-2 font-medium">User</th>
                  <th className="pb-2 font-medium">Status</th>
              </tr>
          </thead>
          <tbody className="divide-y">
              {bookings.map((booking, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                      <td className="py-3 text-gray-500">{booking.id}</td>
                      <td className="py-3 font-medium text-gray-700">{booking.user}</td>
                      <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${booking.color}`}>
                              {booking.type}
                          </span>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div>
);

export default RecentBookingsTable;