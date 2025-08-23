import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

const AdminMenu = () => {
  const [activeTab, setActiveTab] = useState('Dishes');
  const [filters, setFilters] = useState({
    category: 'All',
    visibility: 'All',
    allergens: 'All'
  });
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'Starters',
    price: '',
    visibility: 'Active',
    allergens: []
  });

  const dishes = [
    {
      id: 1,
      name: 'Jollof Rice with Chicken',
      sku: 'JOL-001',
      category: 'Rice Dishes',
      price: 'GH₵35.00',
      status: 'Active',
      tags: ['Rice', 'Chicken'],
      image: 'https://images.pexels.com/photos/15146310/pexels-photo-15146310.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop'
    },
    {
      id: 2,
      name: 'Banku with Grilled Tilapia',
      sku: 'BAN-002',
      category: 'Traditional',
      price: 'GH₵40.00',
      status: 'Active',
      tags: ['Fish', 'Traditional'],
      image: 'https://images.pexels.com/photos/12737543/pexels-photo-12737543.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop'
    },
    {
      id: 3,
      name: 'Kelewele',
      sku: 'KEL-003',
      category: 'Starters',
      price: 'GH₵15.00',
      status: 'Active',
      tags: ['Plantain', 'Spicy'],
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop'
    },
    {
      id: 4,
      name: 'Waakye',
      sku: 'WAA-004',
      category: 'Rice Dishes',
      price: 'GH₵20.00',
      status: 'Hidden',
      tags: ['Rice', 'Beans'],
      image: 'https://images.pexels.com/photos/12737543/pexels-photo-12737543.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop'
    },
    {
      id: 5,
      name: 'Bofrot',
      sku: 'BOF-005',
      category: 'Desserts',
      price: 'GH₵12.00',
      status: 'Active',
      tags: ['Sweet', 'Traditional'],
      image: 'https://images.pexels.com/photos/8477552/pexels-photo-8477552.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop'
    }
  ];

  const menuGroups = [
    { name: 'Starters', items: 6 },
    { name: 'Rice Dishes', items: 8 },
    { name: 'Traditional', items: 10 },
    { name: 'Soups', items: 7 },
    { name: 'Desserts', count: 6 },
    { name: 'Beverages', items: 8 }
  ];

  const handleCreateDish = () => {
    console.log('Creating dish:', newDish);
    setNewDish({
      name: '',
      category: 'Starters',
      price: '',
      visibility: 'Active',
      allergens: []
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          searchPlaceholder="Search menu items, categories..."
          showExport={true}
          showNew={true}
          newButtonText="New Dish"
          exportButtonText="Export Menu"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Menu</h1>
            <p className="text-gray-600">68 Dishes</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex space-x-4">
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">Category</option>
                    <option value="Starters">Starters</option>
                    <option value="Mains">Mains</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                  <select
                    value={filters.visibility}
                    onChange={(e) => setFilters({...filters, visibility: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">Visibility</option>
                    <option value="Active">Active</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                  <select
                    value={filters.allergens}
                    onChange={(e) => setFilters({...filters, allergens: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">Allergens</option>
                    <option value="Gluten Free">Gluten Free</option>
                    <option value="Dairy Free">Dairy Free</option>
                    <option value="Nut Free">Nut Free</option>
                  </select>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('Dishes')}
                      className={`py-4 border-b-2 font-medium text-sm ${
                        activeTab === 'Dishes'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Dishes
                    </button>
                    <button
                      onClick={() => setActiveTab('Lunch & Dinner')}
                      className={`py-4 border-b-2 font-medium text-sm ${
                        activeTab === 'Lunch & Dinner'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Lunch & Dinner
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Preview
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Dishes Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dish
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            SKU
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dishes.map((dish) => (
                          <tr key={dish.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={dish.image}
                                  alt={dish.name}
                                  className="w-10 h-10 rounded-lg mr-3"
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {dish.name}
                                  </div>
                                  <div className="flex space-x-1 mt-1">
                                    {dish.tags.map((tag, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {dish.sku}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {dish.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dish.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                dish.status === 'Active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {dish.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-700">Showing 1-5 of 68</span>
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
              {/* Statistics */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dish Statistics</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">54</div>
                    <div className="text-sm text-gray-600">Active Dishes</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">14</div>
                    <div className="text-sm text-gray-600">Hidden</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">GH₵16.40</div>
                    <div className="text-sm text-gray-600">Avg. Price</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">9</div>
                    <div className="text-sm text-gray-600">Categories</div>
                  </div>
                </div>
              </div>

              {/* Add New Dish Form */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Dish</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dish Name
                    </label>
                    <input
                      type="text"
                      value={newDish.name}
                      onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter dish name"
                    />
                    <span className="text-xs text-gray-500">SKU Auto</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newDish.category}
                      onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Starters</option>
                      <option>Mains</option>
                      <option>Desserts</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={newDish.price}
                      onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visibility
                    </label>
                    <select
                      value={newDish.visibility}
                      onChange={(e) => setNewDish({...newDish, visibility: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Active</option>
                      <option>Hidden</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allergens
                    </label>
                    <select
                      multiple
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Gluten</option>
                      <option>Dairy</option>
                      <option>Nuts</option>
                      <option>Shellfish</option>
                    </select>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setNewDish({
                        name: '',
                        category: 'Starters',
                        price: '',
                        visibility: 'Active',
                        allergens: []
                      })}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleCreateDish}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Dish
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Groups */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu Groups</h3>
                <div className="space-y-3">
                  {menuGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{group.name}</div>
                        <div className="text-sm text-gray-600">{group.count} items</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                        Open
                      </button>
                    </div>
                  ))}
                  <div className="text-center text-sm text-gray-500 mt-4">
                    Drag to Reorder
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

export default AdminMenu;