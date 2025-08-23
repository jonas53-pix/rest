import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import PaymentMethodsModal from '../components/PaymentMethodsModal';
import { 
  Store, 
  CreditCard, 
  Globe, 
  Bell, 
  Truck, 
  Shield, 
  Palette,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState('Restaurant Info');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [settings, setSettings] = useState({
    restaurantName: 'TastyBite',
    contactEmail: 'TastyBite@gmail.com',
    phone: '(555) 123-4567',
    address: '123 Riverside Ave, Cityville',
    openingHours: 'Mon-Sun, 10:00-22:00',
    timeZone: 'GMT-5 (EST)',
    acceptOnlineOrders: true,
    acceptOnlineReservations: true,
    paymentProvider: 'Stripe',
    payoutSchedule: 'Daily',
    publishableKey: 'pk_test_****',
    secretKey: 'sk_test_****',
    testMode: true,
    defaultCurrency: 'GHS (GH₵)',
    locale: 'English (US)',
    taxRate: '8.5',
    serviceCharge: '10',
    pricesIncludeTax: false,
    autoApplyServiceCharge: true,
    orderNotificationsEmail: 'orders@TastyBite.com',
    reservationNotificationsEmail: 'reservations@TastyBite.com',
    emailAlerts: true,
    smsAlerts: false
  });

  const sections = [
    { name: 'Restaurant Info', icon: Store },
    { name: 'Payments', icon: CreditCard },
    { name: 'Locale & Tax', icon: Globe },
    { name: 'Notifications', icon: Bell },
    { name: 'Delivery & Pickup', icon: Truck },
    { name: 'Security', icon: Shield },
    { name: 'Branding', icon: Palette }
  ];

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (section) => {
    console.log(`Saving ${section} settings:`, settings);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Restaurant Info':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Restaurant Info</h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Preview Site
                </button>
                <button 
                  onClick={() => handleSave('Restaurant Info')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  value={settings.restaurantName}
                  onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) => handleInputChange('openingHours', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone
                </label>
                <select
                  value={settings.timeZone}
                  onChange={(e) => handleInputChange('timeZone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>GMT-5 (EST)</option>
                  <option>GMT-8 (PST)</option>
                  <option>GMT-6 (CST)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Accept Online Orders</span>
                <button onClick={() => handleToggle('acceptOnlineOrders')}>
                  {settings.acceptOnlineOrders ? (
                    <ToggleRight className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Accept Online Reservations</span>
                <button onClick={() => handleToggle('acceptOnlineReservations')}>
                  {settings.acceptOnlineReservations ? (
                    <ToggleRight className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case 'Payments':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Payments</h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Test Mode
                </button>
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Payment Methods
                </button>
                <button 
                  onClick={() => handleSave('Payments')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider
                </label>
                <select
                  value={settings.paymentProvider}
                  onChange={(e) => handleInputChange('paymentProvider', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Stripe</option>
                  <option>PayPal</option>
                  <option>Square</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payout Schedule
                </label>
                <select
                  value={settings.payoutSchedule}
                  onChange={(e) => handleInputChange('payoutSchedule', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publishable Key
                </label>
                <input
                  type="password"
                  value={settings.publishableKey}
                  onChange={(e) => handleInputChange('publishableKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secret Key
                </label>
                <input
                  type="password"
                  value={settings.secretKey}
                  onChange={(e) => handleInputChange('secretKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'Locale & Tax':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Locale & Tax</h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Recalculate
                </button>
                <button 
                  onClick={() => handleSave('Locale & Tax')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Currency
                </label>
                <select
                  value={settings.defaultCurrency}
                  onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>GHS (GH₵)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Locale
                </label>
                <select
                  value={settings.locale}
                  onChange={(e) => handleInputChange('locale', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange('taxRate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Charge (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.serviceCharge}
                  onChange={(e) => handleInputChange('serviceCharge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Prices include tax</span>
                <button onClick={() => handleToggle('pricesIncludeTax')}>
                  {settings.pricesIncludeTax ? (
                    <ToggleRight className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Auto-apply service charge</span>
                <button onClick={() => handleToggle('autoApplyServiceCharge')}>
                  {settings.autoApplyServiceCharge ? (
                    <ToggleRight className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Send Test
                </button>
                <button 
                  onClick={() => handleSave('Notifications')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Notifications Email
                </label>
                <input
                  type="email"
                  value={settings.orderNotificationsEmail}
                  onChange={(e) => handleInputChange('orderNotificationsEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reservation Notifications Email
                </label>
                <input
                  type="email"
                  value={settings.reservationNotificationsEmail}
                  onChange={(e) => handleInputChange('reservationNotificationsEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Email Alerts</span>
                <button onClick={() => handleToggle('emailAlerts')}>
                  {settings.emailAlerts ? (
                    <ToggleRight className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">SMS Alerts</span>
                <button onClick={() => handleToggle('smsAlerts')}>
                  {settings.smsAlerts ? (
                    <ToggleRight className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{activeSection}</h2>
            <p className="text-gray-600">Settings for {activeSection} will be implemented here.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          searchPlaceholder="Search settings..."
          additionalInfo="Environment: Production • Currency: GHS"
          showNew={false}
          showExport={false}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">General Settings</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.name}
                      onClick={() => setActiveSection(section.name)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.name
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{section.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {renderSection()}
            </div>
          </div>
        </main>
      </div>
      
      {/* Payment Methods Modal */}
      <PaymentMethodsModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
      />
    </div>
  );
};

export default AdminSettings;