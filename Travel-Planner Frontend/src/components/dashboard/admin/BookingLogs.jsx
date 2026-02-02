import React from 'react';

const logs = [
  { id: 1, user: 'Charlie Brown', tour: 'Lake Louise and Banff Trip', amount: '$299', time: '2m ago' },
  { id: 2, user: 'Bob Williams', tour: 'Bali Island Paradise', amount: '$1799', time: '5m ago' },
  { id: 3, user: 'Alice Johnson', tour: 'Swiss Alps Adventure', amount: '$2499', time: '10m ago' },
  { id: 4, user: 'Diana Prince', tour: 'Private Badland Tour', amount: '$499', time: '12m ago' },
];

const BookingLogs = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {logs.map((log, logIdx) => (
            <li key={log.id}>
              <div className="relative pb-8">
                {logIdx !== logs.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-white">
                      <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        New booking by <a href="#" className="font-medium text-gray-900">{log.user}</a>
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time>{log.time}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingLogs;
