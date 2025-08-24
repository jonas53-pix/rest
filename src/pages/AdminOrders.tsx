import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { Eye, Printer, CreditCard, CheckCircle, MoreHorizontal, RefreshCw } from 'lucide-react';
import { orderService, Order } from '../services/orderService';
import { useNotifications } from '../context/NotificationContext';

const AdminOrders = () => {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousOrderCount, setPreviousOrderCount] = useState(0);
  const [filters, setFilters] = useState({
    date: 'Today',
    orderType: 'All',
    payment: 'All',
    status: 'All'
  });

  const tabs = ['All', 'Open', 'Preparing', 'Ready', 'Completed'];
  
  // Fetch orders from backend
  useEffect(() => {
    fetchOrders();
    
    // Set up auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchOrders, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await orderService.getOrders();
      
      // Check for new orders
      if (fetchedOrders.length > previousOrderCount && previousOrderCount > 0) {
        const newOrders = fetchedOrders.length - previousOrderCount;
        addNotification({
          type: 'success',
          title: 'New Orders!',
          message: `${newOrders} new order${newOrders > 1 ? 's' : ''} received`,
        });
      }
      
      setOrders(fetchedOrders);
      setPreviousOrderCount(fetchedOrders.length);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      
      // Show success notification
      addNotification({
        type: 'success',
        title: 'Order Updated',
        message: `Order status updated to ${newStatus}`,
      });
      
      // Refresh orders after update
      fetchOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update order status',
      });
    }
  };

  // Calculate metrics from real data
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const openOrders = orders.filter(order => 
    ['pending', 'confirmed', 'preparing'].includes(order.status)
  ).length;

  const metrics = [
    { title: 'Total Orders', value: totalOrders.toString(), color: 'text-blue-600' },
    { title: 'Revenue', value: `GH₵${totalRevenue.toFixed(2)}`, color: 'text-green-600' },
    { title: 'Avg. Ticket', value: `GH₵${avgTicket.toFixed(2)}`, color: 'text-purple-600' },
    { title: 'Open Orders', value: openOrders.toString(), color: 'text-orange-600' }
  ];

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get payment status color
  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        
        {/* Refresh Button */}
        <div className="px-6 pt-4">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Orders</span>
          </button>
        </div>
        
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

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading orders...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchOrders}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Orders Table */}
          {!loading && !error && (
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
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-medium text-sm">
                                {order.customer?.name?.charAt(0) || 'C'}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">
                                {order.customer?.name || 'Customer'}
                              </span>
                              <p className="text-xs text-gray-500">
                                {order.customer?.email || 'No email'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="capitalize">{order.order_type.replace('_', ' ')}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <br />
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.payment_status)}`}>
                              {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          GH₵{order.total_amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-500" title="View Details">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-500" title="Print Receipt">
                              <Printer className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(order.id, 'preparing')}
                              className="text-orange-600 hover:text-orange-500" 
                              title="Mark as Preparing"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(order.id, 'ready')}
                              className="text-green-600 hover:text-green-500" 
                              title="Mark as Ready"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-500" title="More Options">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
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
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminOrders;