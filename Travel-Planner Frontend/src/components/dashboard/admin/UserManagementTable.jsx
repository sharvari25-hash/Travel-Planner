import React from 'react';
import DataTable from '../shared/DataTable';
import { Edit, Trash2, Shield, ShieldOff } from 'lucide-react';

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'ADMIN', status: 'Active' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', role: 'USER', status: 'Active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'USER', status: 'Suspended' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'USER', status: 'Active' },
];

const RoleBadge = ({ role }) => {
  const roleClasses = role === 'ADMIN' 
    ? 'bg-purple-200 text-purple-700' 
    : 'bg-green-200 text-green-700';
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleClasses}`}>
      {role}
    </span>
  );
};

const StatusBadge = ({ status }) => {
    const statusClasses = status === 'Active' 
      ? 'bg-blue-200 text-blue-700' 
      : 'bg-yellow-200 text-yellow-700';
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses}`}>
        {status}
      </span>
    );
  };

const UserManagementTable = () => {
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', cell: (row) => <RoleBadge role={row.role} /> },
    { header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
          <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
          <button className="text-yellow-500 hover:text-yellow-700">
            {row.status === 'Active' ? <ShieldOff size={18} /> : <Shield size={18} />}
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={users} />;
};

export default UserManagementTable;
