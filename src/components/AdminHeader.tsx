import React from 'react';
import { Search, Download, Plus, Bell } from 'lucide-react';

interface AdminHeaderProps {
  title?: string;
  searchPlaceholder?: string;
  showExport?: boolean;
  showNew?: boolean;
  showAlerts?: boolean;
  onExport?: () => void;
  onNew?: () => void;
  newButtonText?: string;
  exportButtonText?: string;
  additionalInfo?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  searchPlaceholder = "Search...",
  showExport = false,
  showNew = false,
  showAlerts = false,
  onExport,
  onNew,
  newButtonText = "New",
  exportButtonText = "Export",
  additionalInfo
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {additionalInfo && (
            <div className="text-sm text-gray-600">
              {additionalInfo}
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {showAlerts && (
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-4 w-4" />
              <span>Alerts</span>
            </button>
          )}
          
          {showExport && (
            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>{exportButtonText}</span>
            </button>
          )}
          
          {showNew && (
            <button
              onClick={onNew}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>{newButtonText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;