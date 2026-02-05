import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const SettingRow = ({ icon: Icon, title, value }) => (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
               {typeof Icon === 'string' ? <img src={Icon} alt="" className="w-full h-full object-cover rounded" /> : <Icon size={14} />}
            </div>
            <div className="text-sm">
                <div className="font-semibold text-gray-700">{title}</div>
                <div className="text-gray-400 text-xs">{value}</div>
            </div>
        </div>
        <FaChevronRight className="text-gray-300 text-xs" />
    </div>
)

export default SettingRow;