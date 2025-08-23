import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { Edit, UserX, ToggleLeft, ToggleRight } from 'lucide-react';

const AdminAdmins = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedAdmin, setSelectedAdmin] = useState('Jamie Lee');
  const [newAdmin, setNewAdmin] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Staff'
  });
  const [permissions, setPermissions] = useState({
    'Orders: Create & Refund': true,
    'Reservations: Manage': true,
    'Menu: Edit': false,
    'Settings: Access': false
  });

  const filters = ['All', 'Pending Invites', 'Deactivated'];
  
  const admins = [
    {
      name: 'Alex Morgan',
      email: 'alex@restomanage.com',
      role: 'Super Admin',
      lastActive: 'Today, 09:24',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Jamie Lee',
      email: 'jamie@restomanage.com',
      role: 'Manager',
      lastActive: 'Yesterday',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Taylor Brooks',
      email: 'taylor@restomanage.com',
      role: 'Shift Lead',
      lastActive: '2d ago',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Sam Carter',
      email: 'sam@restomanage.com',
      role: 'Staff',
      lastActive: 'Online',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Ava Patel',
      email: 'ava@restomanage.com',
      role: 'Staff',
      lastActive: '1w ago',
      status: 'deactivated',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    }
  ];

  const handleSendInvite = () => {
    console.log('Sending invite:', newAdmin);
    setNewAdmin({
      fullName: '',
      email: '',
      phone: '',
      role: 'Staff'
    });
  };

  const handlePermissionToggle = (permission) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'deactivated': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          searchPlaceholder="Search admins, emails, roles..."
          showExport={true}
          showNew={true}
          newButtonText="Invite Admin"
          exportButtonText="Export"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Admins</h1>
            <p className="text-gray-600">5 Active</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-gray-600">Pending Invites</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-gray-600">Deactivated</div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex space-x-4">
                  {filters.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        activeFilter === filter
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Members Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option>Filter by role</option>
                      <option>Super Admin</option>
                      <option>Manager</option>
                      <option>Shift Lead</option>
                      <option>Staff</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option>Status</option>
                      <option>Active</option>
                      <option>Deactivated</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Active
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {admins.map((admin, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={admin.avatar}
                                alt={admin.name}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <span className="text-sm font-medium text-gray-900">
                                {admin.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {admin.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {admin.role}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusColor(admin.status)}`}>
                            {admin.lastActive}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-500">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-500">
                                <UserX className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Invite New Admin */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Invite New Admin</h3>
                  <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                    Email invite
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newAdmin.fullName}
                      onChange={(e) => setNewAdmin({...newAdmin, fullName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={newAdmin.phone}
                      onChange={(e) => setNewAdmin({...newAdmin, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select role
                    </label>
                    <select
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Staff</option>
                      <option>Shift Lead</option>
                      <option>Manager</option>
                      <option>Super Admin</option>
                    </select>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setNewAdmin({
                        fullName: '',
                        email: '',
                        phone: '',
                        role: 'Staff'
                      })}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleSendInvite}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Send Invite
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Permissions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Permissions</h3>
                  <span className="text-sm text-blue-600">For: {selectedAdmin}</span>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(permissions).map(([permission, enabled]) => (
                    <div key={permission} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{permission}</span>
                      <button onClick={() => handlePermissionToggle(permission)}>
                        {enabled ? (
                          <ToggleRight className="h-6 w-6 text-blue-600" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-gray-400" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAdmins;