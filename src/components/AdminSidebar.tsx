import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ClipboardList, 
  Calendar, 
  Package, 
  Users, 
  Settings, 
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminSidebarProps {
  isExpanded?: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isExpanded = true }) => {
  const { user, logout, setLogoutCallback } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['management', 'site-settings']);

  // Set up logout callback to redirect to sign-in page
  React.useEffect(() => {
    setLogoutCallback(() => () => navigate('/login'));
  }, [setLogoutCallback, navigate]);

  const isActivePage = (path: string) => location.pathname === path;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'POS', path: '/admin/pos', icon: ShoppingCart },
    { name: 'Orders', path: '/admin/orders', icon: ClipboardList },
    { name: 'Reservations', path: '/admin/reservations', icon: Calendar },
    { name: 'Inventory', path: '/admin/inventory', icon: Package },
  ];

  const managementItems = [
    { name: 'Admins', path: '/admin/admins', icon: Users },
  ];

  const siteSettingsItems = [
    { name: 'Menu', path: '/admin/menu', icon: ClipboardList },
    { name: 'Categories', path: '/admin/categories', icon: Settings },
    { name: 'General Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className={`bg-gray-900 text-white h-screen flex flex-col ${isExpanded ? 'w-64' : 'w-16'} transition-all duration-300`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          {isExpanded && (
            <span className="text-xl font-bold">Resto Admin</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <div className="space-y-2 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActivePage(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {isExpanded && <span>{item.name}</span>}
              </Link>
            );
          })}

          {/* Management Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('management')}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-400 hover:text-white transition-colors"
            >
              {isExpanded && <span className="text-sm font-medium">Management</span>}
              {isExpanded && (
                expandedSections.includes('management') ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.includes('management') && isExpanded && (
              <div className="ml-3 mt-2 space-y-1">
                {managementItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActivePage(item.path)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Site Settings Section */}
          <div className="mt-4">
            <button
              onClick={() => toggleSection('site-settings')}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-400 hover:text-white transition-colors"
            >
              {isExpanded && <span className="text-sm font-medium">Site Settings</span>}
              {isExpanded && (
                expandedSections.includes('site-settings') ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.includes('site-settings') && isExpanded && (
              <div className="ml-3 mt-2 space-y-1">
                {siteSettingsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActivePage(item.path)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
            alt="Alex Morgan"
            className="w-10 h-10 rounded-full"
          />
          {isExpanded && (
            <div className="flex-1">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-gray-400">Super Admin</div>
            </div>
          )}
        </div>
        
        {isExpanded && (
          <button
            onClick={logout}
            className="flex items-center space-x-2 w-full mt-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;