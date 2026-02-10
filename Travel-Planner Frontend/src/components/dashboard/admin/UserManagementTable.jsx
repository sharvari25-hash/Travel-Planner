import React from 'react';
import SectionTitle from '../shared/SectionTitle';

const statusStyles = {
  ACTIVE: 'bg-green-100 text-green-700',
  SUSPENDED: 'bg-yellow-100 text-yellow-700',
  DISABLED: 'bg-gray-200 text-gray-700',
};

const UserManagementTable = ({ users = [] }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <SectionTitle title="User Management" actions={
          <div className="flex gap-2 text-gray-400">
              <span className="cursor-pointer hover:text-blue-600">{'<'}</span>
              <span className="cursor-pointer hover:text-blue-600">{'>'}</span>
          </div>
      } />
      <table className="w-full text-left text-sm">
          <thead className="text-gray-400 border-b">
              <tr>
                  <th className="pb-2 font-medium">User</th>
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Actions</th>
              </tr>
          </thead>
          <tbody className="divide-y">
              {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50">
                      <td className="py-3 flex items-center gap-2">
                          <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
                          <span className="font-medium text-gray-700">{user.name}</span>
                      </td>
                      <td className="py-3 text-gray-500 text-xs">{user.email}</td>
                      <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusStyles[user.status] || 'bg-gray-100 text-gray-700'}`}>
                              {user.status}
                          </span>
                      </td>
                      <td className="py-3">
                          <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700">View</button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
      {users.length === 0 ? (
        <p className="text-xs text-gray-500 mt-3">No users found.</p>
      ) : null}
  </div>
);

export default UserManagementTable;
