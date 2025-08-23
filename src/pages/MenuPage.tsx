import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus } from 'lucide-react';

const MenuPage = () => {
  const { addToCart, items, getTotal } = useCart();
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const categories = [
    { name: 'Starters', count: 8 },
    { name: 'Main Dishes', count: 12 },
    { name: 'Soups', count: 6 },
    { name: 'Desserts', count: 4 },
    { name: 'Drinks', count: 10 }
  ];

  const dietaryFilters = ['Vegan', 'Gluten-free'];

  const menuItems = [
    {
      id: '1',
      name: 'Kelewele',
      description: 'Spiced fried plantain cubes with ginger and pepper',
      price: 15,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      category: 'Starters'
    },
    {
      id: '2',
      name: 'Bofrot',
      description: 'Traditional Ghanaian doughnuts, sweet and fluffy',
      price: 12,
      image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      category: 'Starters'
    },
    {
      id: '3',
      name: 'Groundnut Soup',
      description: 'Rich peanut soup with vegetables and spices',
      price: 18,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      category: 'Starters'
    },
    {
      id: '4',
      name: 'Jollof Rice with Chicken',
      description: 'Aromatic rice cooked in tomato sauce with grilled chicken',
      price: 35,
      image: 'https://images.pexels.com/photos/8477552/pexels-photo-8477552.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      category: 'Main Dishes'
    },
    {
      id: '5',
      name: 'Banku with Grilled Tilapia',
      description: 'Fermented corn dough served with grilled tilapia and pepper sauce',
      price: 40,
      image: 'https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      category: 'Main Dishes'
    },
    {
      id: '6',
      name: 'Bofrot with Honey',
      description: 'Sweet Ghanaian doughnuts drizzled with local honey',
      price: 15,
      image: 'https://images.pexels.com/photos/7035697/pexels-photo-7035697.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      category: 'Desserts'
    },
    {
      id: '7',
      name: 'Sobolo',
      description: 'Refreshing hibiscus drink with ginger and spices',
      price: 12,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      category: 'Drinks'
    }
  ];

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredItems = menuItems.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse the Menu</h1>
          <p className="text-xl text-gray-600">Order online for pickup or delivery. Freshly prepared, always.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === category.name
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="float-right text-sm text-gray-500">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Filters */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dietary Filters</h3>
                <div className="space-y-2">
                  {dietaryFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleFilterToggle(filter)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors mr-2 mb-2 ${
                        selectedFilters.includes(filter)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                                             <span className="text-xl font-bold text-blue-600">
                         GH₵{item.price}
                       </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Cart</h3>
                <span className="text-sm text-gray-500">{items.length} items</span>
              </div>

              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                                                 <span className="text-sm font-medium text-gray-900">
                           GH₵{item.price * item.quantity}
                         </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                                             <span>GH₵{getTotal()}</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Go to Checkout</span>
                  </button>

                  {/* Quick Order */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Soup of the Day
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">GH₵9</span>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-500">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;