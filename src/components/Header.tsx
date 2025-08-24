import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone, User, LogOut, Settings, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout, isAuthenticated, setLogoutCallback } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Set up logout callback to redirect to home page
  useEffect(() => {
    setLogoutCallback(() => () => navigate('/'));
  }, [setLogoutCallback, navigate]);

  const isActivePage = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">TB</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TastyBite</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActivePage('/') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActivePage('/menu') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Menu
            </Link>
            <Link
              to="/reservations"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActivePage('/reservations') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Reservations
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActivePage('/about') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActivePage('/contact') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/checkout"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-medium">Checkout</span>
              <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getItemCount()}
              </span>
            </Link>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      <Sun className="h-4 w-4 mr-2" />
                      Change Theme
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Call button */}
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:block">Call</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <nav className="flex space-x-4 overflow-x-auto">
            <Link
              to="/"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-blue-600 ${
                isActivePage('/') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-blue-600 ${
                isActivePage('/menu') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Menu
            </Link>
            <Link
              to="/reservations"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-blue-600 ${
                isActivePage('/reservations') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Reservations
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-blue-600 ${
                isActivePage('/about') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-blue-600 ${
                isActivePage('/contact') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;