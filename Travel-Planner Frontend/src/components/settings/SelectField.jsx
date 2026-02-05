import React from 'react';

const SelectField = ({ label, icon: Icon, options, defaultValue }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon />
      </div>
      <select 
        defaultValue={defaultValue}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none"
      >
        {options.map((opt, i) => <option key={i}>{opt}</option>)}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
        ▼
      </div>
    </div>
  </div>
);

export default SelectField;