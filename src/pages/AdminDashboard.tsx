import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const metrics = [
    {
      title: 'Outstanding Orders',
      value: '28',
      change: '+12%',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'New Orders',
      value: '142',
      change: '+8%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Online Orders',
      value: '96',
      change: '-3%',
      trend: 'down',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '238',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', total: 'GH₵45.50', status: 'Preparing', statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: '#1235', customer: 'Jane Smith', total: 'GH₵32.00', status: 'Delivered', statusColor: 'bg-green-100 text-green-800' },
    { id: '#1236', customer: 'Mike Johnson', total: 'GH₵67.25', status: 'Pending', statusColor: 'bg-gray-100 text-gray-800' },
    { id: '#1237', customer: 'Sarah Wilson', total: 'GH₵28.75', status: 'Preparing', statusColor: 'bg-yellow-100 text-yellow-800' }
  ];

  const reservations = [
    { name: 'Courtney Henry', time: '7:00 PM', party: '4 people' },
    { name: 'Wade Warren', time: '7:30 PM', party: '2 people' },
    { name: 'Jenny Wilson', time: '8:00 PM', party: '6 people' }
  ];

  const admins = [
    { name: 'Alex Morgan', email: 'alex@TastyBite.com', role: 'Super Admin', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
    { name: 'Jamie Lee', email: 'jamie@TastyBite.com', role: 'Manager', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
    { name: 'Taylor Brooks', email: 'taylor@TastyBite.com', role: 'Staff', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          searchPlaceholder="Search orders, customers, menu..."
          showAlerts={true}
          showNew={true}
          newButtonText="New Order"
          additionalInfo="Overview • This Week"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Chart Placeholder */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales & Orders</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Bar/Line Chart Placeholder</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.total}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* POS Quick Sale */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">POS Quick Sale</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Item"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <textarea
                  placeholder="Notes"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Clear
                  </button>
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Reservations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservations</h3>
              <div className="space-y-4">
                {reservations.map((reservation, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{reservation.name}</p>
                      <p className="text-sm text-gray-600">{reservation.time}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{reservation.party}</p>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200 transition-colors">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full hover:bg-red-200 transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admins Profile */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Admins</h3>
                <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                  New Admin
                </button>
              </div>
              <div className="space-y-3">
                {admins.map((admin, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{admin.name}</p>
                      <p className="text-xs text-gray-500 truncate">{admin.role}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-500 text-xs">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;