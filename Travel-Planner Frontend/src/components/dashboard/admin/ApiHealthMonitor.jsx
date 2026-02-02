import React from 'react';

const services = [
  { name: 'Spring Boot Backend', status: 'online' },
  { name: 'Amadeus API', status: 'online' },
  { name: 'OpenWeather API', status: 'degraded' },
  { name: 'Google Maps API', status: 'offline' },
];

const ApiHealthMonitor = () => {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'online':
        return { dot: 'bg-green-500', text: 'text-green-700' };
      case 'degraded':
        return { dot: 'bg-yellow-500', text: 'text-yellow-700' };
      case 'offline':
        return { dot: 'bg-red-500', text: 'text-red-700' };
      default:
        return { dot: 'bg-gray-400', text: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-4">
      {services.map((service) => {
        const { dot, text } = getStatusClasses(service.status);
        return (
          <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${dot}`}></div>
              <p className="font-medium text-gray-700">{service.name}</p>
            </div>
            <p className={`font-semibold text-sm capitalize ${text}`}>
              {service.status}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ApiHealthMonitor;
