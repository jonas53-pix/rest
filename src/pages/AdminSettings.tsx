import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { 
  Store, 
  CreditCard, 
  Globe, 
  Bell, 
  Truck, 
  Shield, 
  Palette,
  ToggleLeft,
  ToggleRight,
  Lock,
  ChevronRight,
  Upload
} from 'lucide-react';

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState('Restaurant Info');
  const [activeTab, setActiveTab] = useState('Security');
  const [settings, setSettings] = useState({
    restaurantName: 'TastyBite',
    contactEmail: 'TastyBite@gmail.com',
    phone: 'auth/login',
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
    defaultCurrency: 'USD ($)',
    locale: 'English (US)',
    taxRate: '8.5',
    serviceCharge: '10',
    pricesIncludeTax: false,
    autoApplyServiceCharge: true,
    orderNotificationsEmail: 'orders@TastyBite.com',
    reservationNotificationsEmail: 'reservations@TastyBite.com',
    emailAlerts: true,
    smsAlerts: false,
    require2FA: false,
    passwordRotation: true
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field: string) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings);
  };

  const renderPaymentsSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Methods</h2>
        <p className="text-gray-600">
          Choose or add a payment method for orders and reservations. Your currency is USD ($).
        </p>
      </div>

      {/* Saved Cards Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Cards</h3>
        <div className="space-y-3">
          {/* Card 1 - Visa */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                VISA
              </div>
              <div>
                <div className="font-medium text-gray-900">Personal</div>
                <div className="text-sm text-gray-600">**** 4242</div>
                <div className="text-sm text-gray-500">Exp 08/28</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                Default
              </button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium">
                Remove
              </button>
            </div>
          </div>

          {/* Card 2 - Mastercard */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                MC
              </div>
              <div>
                <div className="font-medium text-gray-900">Business</div>
                <div className="text-sm text-gray-600">**** 5454</div>
                <div className="text-sm text-gray-500">Exp 11/27</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                Set default
              </button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Card Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Card</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Full name on card"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1234 1234 1234 1234"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="MM / YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Country or region"
            />
          </div>
          <p className="text-sm text-gray-500">
            We securely store payment info. You can change your default anytime.
          </p>
        </div>
      </div>

      {/* Other Options Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Options</h3>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cash on Delivery
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Apple Pay
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Google Pay
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto">
            Connect
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-6 border-t">
        <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
          Switch currency
        </button>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save payment method
          </button>
        </div>
      </div>
    </div>
  );

  const renderLocaleAndTaxSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto space-y-8">
      {/* General Settings */}
      <div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Currency</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">USD ($)</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Locale (language)</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">English (US)</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Timezone</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">GMT-5 (EST)</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Changing currency will not convert existing prices. Update menu prices separately if needed.
        </p>
      </div>

      {/* Tax Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Settings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Tax behavior</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Exclusive (added at checkout)</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Default tax rate</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">8.5%</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Apply to</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">All items</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          You can override tax rates per menu item or category in the menu settings.
        </p>
      </div>

      {/* Addresses */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Addresses</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Business location</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">123 Riverside Ave, Cityville</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Billing address</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Same as business location</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Tax is calculated based on your business location unless overridden at checkout.
        </p>
      </div>

      {/* Invoice & Receipt */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice & Receipt</h3>
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">Invoice prefix</label>
          <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">INV-</div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto space-y-8">
      {/* General Notifications */}
      <div>
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">Push (mobile)</label>
          <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Enabled</div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Team members can override their own channel preferences in their profiles.
        </p>
      </div>

      {/* Order & Service */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order & Service</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">New online order</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Email + Push</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Order delayed</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Email only</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Table request</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Push only</div>
          </div>
        </div>
      </div>

      {/* Reservations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservations</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">New reservation</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Email + Push</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">No-show alert</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Email only</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Waitlist updates</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Push only</div>
          </div>
        </div>
      </div>

      {/* Financial */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Daily sales summary</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Email only</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Chargebacks & disputes</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Email + Push</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Low inventory</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Email only</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeliveryAndPickupSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto space-y-8">
      {/* Fees & Minimums */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fees & Minimums</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Delivery fee</label>
            <div className="flex space-x-2">
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">$3.99 flat</div>
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Free over</div>
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">$40.00</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Order minimum</label>
            <div className="flex space-x-2">
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">$15.00</div>
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Delivery</div>
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">$10.00 pickup</div>
            </div>
          </div>
        </div>
      </div>

      {/* Couriers */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Couriers</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Method</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">In-house drivers</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Driver assignment</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Auto-assign by zone</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Driver tip handling</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Keep 100%</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Switch to partner integrations (DoorDash, Uber) if you need coverage beyond your staff.
        </p>
      </div>

      {/* Pickup Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pickup Options</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Enable pickup</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Yes</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Pickup prep time</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">15 minutes</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Curbside notes</label>
            <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">Call when you arrive</div>
          </div>
        </div>
      </div>

      {/* Delivery Zones */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Zones</h3>
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-500">Map component placeholder</p>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {['Security', 'Passwords', '2FA'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Require 2FA for admins</span>
                <button onClick={() => handleToggle('require2FA')}>
                  {settings.require2FA ? (
                    <ToggleRight className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">Recommended for owner and manager roles</p>
            </div>
            <div className="ml-8 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Authenticator app</h4>
              <p className="text-sm text-gray-600 mb-3">Time-based one-time codes (TOTP)</p>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Set up</button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Applies to Dashboard and POS sign-ins.</p>
        </div>

        {/* Password & Session */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Session</h3>
          <div className="grid grid-cols-2 gap-8 mb-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Minimum password strength
              </h4>
              <p className="text-sm text-gray-600 mb-2">8+ chars, mixed case, number</p>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">Standard</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Session timeout</h4>
              <p className="text-sm text-gray-600 mb-2">Auto sign-out after inactivity</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="30 minutes"
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                  readOnly
                />
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Change</button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Password rotation</span>
              <p className="text-sm text-gray-500">Force change every 180 days</p>
            </div>
            <button onClick={() => handleToggle('passwordRotation')}>
              {settings.passwordRotation ? (
                <ToggleRight className="h-6 w-6 text-blue-600" />
              ) : (
                <ToggleLeft className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Recovery & Devices */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recovery & Devices</h3>
          <div className="grid grid-cols-2 gap-8 mb-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Backup codes</h4>
              <p className="text-sm text-gray-600 mb-2">Generate one-time recovery codes</p>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Generate</button>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Trusted devices</h4>
              <p className="text-sm text-gray-600 mb-2">2 devices remembered</p>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Manage</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Allowed locations</span>
              <p className="text-sm text-gray-500">Restrict logins by country</p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</button>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Security tips</h4>
          <p className="text-sm text-blue-700">
            Use 2FA for all admins, rotate passwords annually, and review device logins monthly.
          </p>
        </div>
      </div>
    </div>
  );

  const renderBrandingSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {['Theme', 'Typography', 'Logo'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              tab === 'Theme'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {/* Logo & Favicon */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo & Favicon</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Upload logo</h4>
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-1">Favicon</h4>
                <p className="text-sm text-gray-600 mb-2">48x48 PNG or ICO</p>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Upload</button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">
                    LG
                  </div>
                  <span className="font-medium">Your Brand</span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Order now</button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">Primary color</h4>
                <p className="text-sm text-gray-600 mb-2">Buttons and links</p>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Change</button>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Colors */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Colors</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-2"></div>
              <h4 className="font-medium text-gray-900">Primary</h4>
              <p className="text-sm text-gray-500">Main brand color</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto mb-2"></div>
              <h4 className="font-medium text-gray-900">Secondary</h4>
              <p className="text-sm text-gray-500">Supporting color</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto mb-2"></div>
              <h4 className="font-medium text-gray-900">Accent</h4>
              <p className="text-sm text-gray-500">Highlights</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
              <h4 className="font-medium text-gray-900">Muted</h4>
              <p className="text-sm text-gray-500">Subtle elements</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Colors apply to landing page, checkout, and email templates.
          </p>
        </div>

        {/* Typography */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Base size</h4>
              <p className="text-sm text-gray-600 mb-2">14px (recommended)</p>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Change</button>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                Headings scale
                <ChevronRight className="h-4 w-4 ml-2" />
              </h4>
              <p className="text-sm text-gray-600">H1-H4 sizes</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We use your system font for performance and consistency.
          </p>
        </div>
      </div>
    </div>
  );

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
        return renderPaymentsSection();

      case 'Locale & Tax':
        return renderLocaleAndTaxSection();

      case 'Notifications':
        return renderNotificationsSection();

      case 'Delivery & Pickup':
        return renderDeliveryAndPickupSection();

      case 'Security':
        return renderSecuritySection();

      case 'Branding':
        return renderBrandingSection();

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
          additionalInfo="Environment: Production • Currency: USD"
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
    </div>
  );
};

export default AdminSettings;