import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { Eye, Printer, CreditCard, CheckCircle, MoreHorizontal } from 'lucide-react';

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [filters, setFilters] = useState({
    date: 'Today',
    orderType: 'All',
    payment: 'All',
    status: 'All'
  });

  const tabs = ['All', 'Open', 'Preparing', 'Ready', 'Completed'];
  
  const metrics = [
    { title: 'Total Orders', value: '128', color: 'text-blue-600' },
    { title: 'Revenue', value: 'GH₵3,842', color: 'text-green-600' },
    { title: 'Avg. Ticket', value: 'GH₵30.02', color: 'text-purple-600' },
    { title: 'Open Orders', value: '17', color: 'text-orange-600' }
  ];

  const orders = [
    {
      id: '#1234',
      customer: { name: 'John Doe', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
      type: 'Dine-in',
      status: 'Paid',
      statusColor: 'bg-green-100 text-green-800',
      total: 'GH₵56.40'
    },
    {
      id: '#1235',
      customer: { name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
      type: 'Pickup',
      status: 'Preparing',
      statusColor: 'bg-yellow-100 text-yellow-800',
      total: 'GH₵32.00'
    },
    {
      id: '#1236',
      customer: { name: 'Mike Johnson', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
      type: 'Delivery',
      status: 'Unpaid',
      statusColor: 'bg-red-100 text-red-800',
      total: 'GH₵67.25'
    },
    {
      id: '#1237',
      customer: { name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
      type: 'Dine-in',
      status: 'Cancelled',
      statusColor: 'bg-gray-100 text-gray-800',
      total: 'GH₵28.75'
    },
    {
      id: '#1238',
      customer: { name: 'David Brown', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
      type: 'Pickup',
      status: 'Ready',
      statusColor: 'bg-blue-100 text-blue-800',
      total: 'GH₵45.50'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          searchPlaceholder="Search orders, customers, tickets..."
          showExport={true}
          showNew={true}
          newButtonText="New Order"
          exportButtonText="Export"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Orders</h1>
            
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit mb-6">
              <button className="px-4 py-2 bg-white text-gray-900 shadow-sm rounded-md text-sm font-medium">
                Today
              </button>
            </div>

            {/* Status Tabs */}
            <div className="flex space-x-6 border-b border-gray-200">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
                <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={order.customer.avatar}
                            alt={order.customer.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {order.customer.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-500">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-500">
                            <Printer className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-500">
                            <CreditCard className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-500">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-500">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Filters and Pagination */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <div className="flex space-x-4">
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>Date</option>
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>This Week</option>
                  </select>
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>Order Type</option>
                    <option>Dine-in</option>
                    <option>Pickup</option>
                    <option>Delivery</option>
                  </select>
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>Payment</option>
                    <option>Paid</option>
                    <option>Unpaid</option>
                  </select>
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>Status</option>
                    <option>Preparing</option>
                    <option>Ready</option>
                    <option>Completed</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Showing 1-25 of 256</span>
                  <div className="flex space-x-1">
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                      Prev
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminOrders;