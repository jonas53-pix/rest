import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { Plus, Archive, Edit, Trash2 } from 'lucide-react';

const AdminCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Mains');
  const [categoryData, setCategoryData] = useState({
    name: 'Mains',
    visibility: 'Active',
    description: 'Main course dishes including steaks, seafood, and signature entrees',
    slug: 'mains'
  });

  const categories = [
    { name: 'Mains', items: 12, active: true },
    { name: 'Starters', items: 8, active: true },
    { name: 'Seafood', items: 6, active: true },
    { name: 'Salads', items: 5, active: true },
    { name: 'Desserts', items: 7, active: true },
    { name: 'Beverages', items: 15, active: true },
    { name: 'Specials', items: 3, active: false },
    { name: 'Kids Menu', items: 4, active: true },
    { name: 'Sides', items: 6, active: true }
  ];

  const categoryItems = [
    {
      id: 'DISH-001',
      name: 'Ribeye Steak 10oz',
      price: '$32.00',
      status: 'Active'
    },
    {
      id: 'DISH-002',
      name: 'Atlantic Salmon Fillet',
      price: '$28.00',
      status: 'Active'
    },
    {
      id: 'DISH-003',
      name: 'Grilled Chicken Breast',
      price: '$24.00',
      status: 'Active'
    },
    {
      id: 'DISH-004',
      name: 'Lamb Chops',
      price: '$36.00',
      status: 'Hidden'
    },
    {
      id: 'DISH-005',
      name: 'Vegetarian Pasta',
      price: '$18.00',
      status: 'Active'
    }
  ];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    const category = categories.find(cat => cat.name === categoryName);
    setCategoryData({
      name: categoryName,
      visibility: category?.active ? 'Active' : 'Hidden',
      description: `${categoryName} category description`,
      slug: categoryName.toLowerCase().replace(/\s+/g, '-')
    });
  };

  const handleSaveCategory = () => {
    console.log('Saving category:', categoryData);
  };

  const handleArchiveCategory = () => {
    console.log('Archiving category:', selectedCategory);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          searchPlaceholder="Search categories, groups..."
          showExport={true}
          showNew={true}
          newButtonText="New Category"
          exportButtonText="Import"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Categories List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
                <span className="text-sm text-gray-500">9 Total</span>
              </div>
              
              <div className="flex space-x-4 mb-4">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option>Sort: Manual</option>
                  <option>Sort: Alphabetical</option>
                  <option>Sort: Most Items</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option>Visibility</option>
                  <option>Active</option>
                  <option>Hidden</option>
                </select>
              </div>

              <div className="space-y-2 mb-6">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-600">{category.items} items</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        category.active ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center text-sm text-gray-500 mb-4">
                Drag to Reorder
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Preview
                </button>
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Order
                </button>
              </div>
            </div>

            {/* Edit Category */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Edit Category</h2>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleArchiveCategory}
                      className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Archive className="h-4 w-4" />
                      <span>Archive</span>
                    </button>
                    <button
                      onClick={handleSaveCategory}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={categoryData.name}
                      onChange={(e) => setCategoryData({...categoryData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visibility
                    </label>
                    <select
                      value={categoryData.visibility}
                      onChange={(e) => setCategoryData({...categoryData, visibility: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Active</option>
                      <option>Hidden</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={categoryData.description}
                      onChange={(e) => setCategoryData({...categoryData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={categoryData.slug}
                      onChange={(e) => setCategoryData({...categoryData, slug: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Items</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Items in Category */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Items in '{selectedCategory}' <span className="text-gray-500 font-normal">(12)</span>
                  </h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Filter by tag"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dish ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dish Name
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
                      {categoryItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              item.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                  <span className="text-sm text-gray-700">1-12 of 12</span>
                  <div className="flex space-x-1">
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                      Prev
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                      1
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

export default AdminCategories;