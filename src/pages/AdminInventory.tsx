import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { ToggleLeft, ToggleRight } from 'lucide-react';

const AdminInventory = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Produce',
    parLevel: '',
    cost: '',
    supplier: ''
  });

  const filters = ['All', 'Low Stock', 'Out of Stock'];
  
  const inventoryItems = [
    {
      id: 1,
      name: 'Ribeye Steak 10oz',
      sku: 'RIB-001',
      tags: ['Meat'],
      autoReorder: true,
      category: 'Meat',
      supplier: 'Premium Meats Co.',
      status: 'In Stock',
      onHand: 45,
      parLevel: 20,
      unitCost: 'GH₵12.50',
      stockLevel: 'high'
    },
    {
      id: 2,
      name: 'Atlantic Salmon Fillet',
      sku: 'SAL-002',
      tags: ['Seafood'],
      autoReorder: true,
      category: 'Seafood',
      supplier: 'Ocean Fresh',
      status: 'Low',
      onHand: 8,
      parLevel: 15,
      unitCost: 'GH₵8.75',
      stockLevel: 'low'
    },
    {
      id: 3,
      name: 'Russet Potatoes 50lb',
      sku: 'POT-003',
      tags: ['Produce'],
      autoReorder: false,
      category: 'Produce',
      supplier: 'Farm Direct',
      status: 'In Stock',
      onHand: 12,
      parLevel: 5,
      unitCost: 'GH₵18.00',
      stockLevel: 'high'
    },
    {
      id: 4,
      name: 'Whole Milk 1gal',
      sku: 'MIL-004',
      tags: ['Dairy'],
      autoReorder: true,
      category: 'Dairy',
      supplier: 'Local Dairy',
      status: 'Out',
      onHand: 0,
      parLevel: 10,
      unitCost: 'GH₵3.25',
      stockLevel: 'out'
    },
    {
      id: 5,
      name: 'Extra Virgin Olive Oil',
      sku: 'OIL-005',
      tags: ['Pantry'],
      autoReorder: false,
      category: 'Pantry',
      supplier: 'Mediterranean Imports',
      status: 'In Stock',
      onHand: 24,
      parLevel: 8,
      unitCost: 'GH₵15.50',
      stockLevel: 'high'
    }
  ];

  const reorderShortcuts = [
    'Weekly Produce Order',
    'Meat & Seafood Replenishment',
    'Dairy & Eggs Restock'
  ];

  const handleCreateItem = () => {
    console.log('Creating item:', newItem);
    setNewItem({
      name: '',
      category: 'Produce',
      parLevel: '',
      cost: '',
      supplier: ''
    });
  };

  const getStockColor = (level) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-orange-100 text-orange-800';
      case 'out': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTagColor = (tag) => {
    const colors = {
      'Meat': 'bg-red-100 text-red-800',
      'Seafood': 'bg-blue-100 text-blue-800',
      'Produce': 'bg-green-100 text-green-800',
      'Dairy': 'bg-yellow-100 text-yellow-800',
      'Pantry': 'bg-purple-100 text-purple-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          searchPlaceholder="Search SKUs, items, categories..."
          showExport={true}
          showNew={true}
          newButtonText="New Item"
          exportButtonText="Export CSV"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Inventory</h1>
            <p className="text-gray-600">142 Items</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
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

              {/* Inventory Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Auto-reorder On
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Supplier
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          On Hand
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Par Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit Cost
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inventoryItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">{item.sku}</div>
                              <div className="flex space-x-1 mt-1">
                                {item.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTagColor(tag)}`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-blue-600 hover:text-blue-500">
                              {item.autoReorder ? (
                                <ToggleRight className="h-6 w-6" />
                              ) : (
                                <ToggleLeft className="h-6 w-6" />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.supplier}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStockColor(item.stockLevel)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.onHand}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.parLevel}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.unitCost}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-500 px-3 py-1 border border-blue-600 rounded text-xs">
                                Adjust
                              </button>
                              <button className="text-green-600 hover:text-green-500 px-3 py-1 border border-green-600 rounded text-xs">
                                Reorder
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">1-25 of 142</span>
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
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Inventory Value Cards */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Overview</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">GH₵12,480</div>
                    <div className="text-sm text-gray-600">On Hand Value</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">8</div>
                    <div className="text-sm text-gray-600">Low Stock</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-gray-600">Out of Stock</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Aug 18</div>
                    <div className="text-sm text-gray-600">Last Reorder</div>
                  </div>
                </div>
              </div>

              {/* Add New Item Form */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Item</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter item name"
                    />
                    <span className="text-xs text-gray-500">SKU Auto</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Produce</option>
                      <option>Meat</option>
                      <option>Seafood</option>
                      <option>Dairy</option>
                      <option>Pantry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Par Level
                    </label>
                    <input
                      type="number"
                      value={newItem.parLevel}
                      onChange={(e) => setNewItem({...newItem, parLevel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimum quantity"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost per Unit
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.cost}
                      onChange={(e) => setNewItem({...newItem, cost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Supplier name"
                    />
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setNewItem({
                        name: '',
                        category: 'Produce',
                        parLevel: '',
                        cost: '',
                        supplier: ''
                      })}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleCreateItem}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Item
                    </button>
                  </div>
                </div>
              </div>

              {/* Reorder Shortcuts */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reorder Shortcuts</h3>
                <div className="space-y-3">
                  {reorderShortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{shortcut}</span>
                      <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                        Open
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

export default AdminInventory;