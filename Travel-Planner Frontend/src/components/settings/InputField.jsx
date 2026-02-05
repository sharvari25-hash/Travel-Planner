import React from 'react';

const InputField = ({ label, type = "text", defaultValue, readOnly, action }) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
    <div className="flex gap-2">
      <input 
        type={type} 
        defaultValue={defaultValue} 
        readOnly={readOnly}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${readOnly ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-200 focus:border-blue-400'}`}
      />
      {action && (
        <button className="bg-blue-600 text-white px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          {action}
        </button>
      )}
    </div>
  </div>
);

export default InputField;