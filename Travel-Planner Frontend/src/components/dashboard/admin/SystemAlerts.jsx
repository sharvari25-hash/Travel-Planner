import React from 'react';
import { FaExclamationTriangle, FaCloudSun } from 'react-icons/fa';
import SectionTitle from '../shared/SectionTitle';

const SystemAlerts = () => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <SectionTitle title="System Alerts" actions={
           <div className="flex gap-2 text-gray-400">
              <span className="cursor-pointer hover:text-blue-600">{'<'}</span>
              <span className="cursor-pointer hover:text-blue-600">{'>'}</span>
           </div>
      } />
      <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <FaExclamationTriangle className="text-yellow-500 mt-1" />
              <div>
                  <h4 className="text-sm font-semibold text-gray-800">API Rate Limit Warning</h4>
                  <p className="text-xs text-gray-500 mt-1">Approaching 90% quota</p>
              </div>
          </div>
           <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">!</div>
              <div>
                  <h4 className="text-sm font-semibold text-red-800">2 Failed Bookings</h4>
                  <p className="text-xs text-red-600 mt-1">Check logs immediately</p>
              </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <FaCloudSun className="text-blue-500 mt-1" />
              <div>
                  <h4 className="text-sm font-semibold text-gray-800">Weather Alert: Storm in Tokyo</h4>
                  <p className="text-xs text-gray-500 mt-1">Flight delays expected</p>
              </div>
          </div>
      </div>
  </div>
);

export default SystemAlerts;