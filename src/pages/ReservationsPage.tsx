import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Car, Armchair as Wheelchair, CheckCircle, AlertCircle, Users, Phone, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

interface AlternativeTime {
  time: string;
  available_tables: number;
}

interface AvailabilityResponse {
  available: boolean;
  table_id?: number;
  table_name?: string;
  message: string;
  alternatives: AlternativeTime[];
}

interface ReservationConfirmation {
  reservation_id: string;
  table_name: string;
  date: string;
  time: string;
  party_size: number;
  customer_name: string;
  status: string;
  confirmation_sent: boolean;
}

const ReservationsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();
  
  // Step management
  const [currentStep, setCurrentStep] = useState<'search' | 'availability' | 'details' | 'confirmation'>('search');
  
  // Search form data
  const [searchData, setSearchData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    partySize: 2
  });
  
  // Availability results
  const [availabilityResult, setAvailabilityResult] = useState<AvailabilityResponse | null>(null);
  const [selectedAlternativeTime, setSelectedAlternativeTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  // Reservation form data
  const [reservationData, setReservationData] = useState({
    fullName: user?.name || '',
    phone: '',
    email: user?.email || '',
    specialRequests: ''
  });
  
  // Confirmation data
  const [confirmationData, setConfirmationData] = useState<ReservationConfirmation | null>(null);

  const availableTimes = [
    '17:00', '17:30', '18:00', '18:30', 
    '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30'
  ];

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ 
      ...prev, 
      [name]: name === 'partySize' ? parseInt(value) : value 
    }));
  };

  const handleReservationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReservationData(prev => ({ ...prev, [name]: value }));
  };

  const checkAvailability = async () => {
    if (!isAuthenticated) {
      addNotification({
        type: 'warning',
        title: 'Login Required',
        message: 'Please log in to make a reservation.'
      });
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with actual API when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on time selection
      const isAvailable = Math.random() > 0.3; // 70% chance of availability
      
      if (isAvailable) {
        setAvailabilityResult({
          available: true,
          table_id: 2,
          table_name: 'Table 2',
          message: `Table for ${searchData.partySize} available at ${formatTime(searchData.time)}`,
          alternatives: []
        });
      } else {
        // Generate mock alternatives
        const alternatives: AlternativeTime[] = [
          { time: '18:00', available_tables: 2 },
          { time: '20:00', available_tables: 1 },
          { time: '20:30', available_tables: 3 }
        ];
        
        setAvailabilityResult({
          available: false,
          message: `No table available at ${formatTime(searchData.time)}, but available at other times`,
          alternatives
        });
      }
      
      setCurrentStep('availability');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to check availability. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const selectAlternativeTime = (time: string) => {
    setSelectedAlternativeTime(time);
    setSearchData(prev => ({ ...prev, time }));
    setAvailabilityResult(prev => prev ? {
      ...prev,
      available: true,
      table_id: 2,
      table_name: 'Table 2',
      message: `Table for ${searchData.partySize} available at ${formatTime(time)}`
    } : null);
  };

  const proceedToDetails = () => {
    setCurrentStep('details');
  };

  const confirmReservation = async () => {
    setLoading(true);
    try {
      // Mock API call for reservation confirmation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockConfirmation: ReservationConfirmation = {
        reservation_id: `RES-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        table_name: availabilityResult?.table_name || 'Table 2',
        date: searchData.date,
        time: searchData.time,
        party_size: searchData.partySize,
        customer_name: reservationData.fullName,
        status: 'confirmed',
        confirmation_sent: true
      };
      
      setConfirmationData(mockConfirmation);
      setCurrentStep('confirmation');
      
      addNotification({
        type: 'success',
        title: 'Reservation Confirmed!',
        message: `Your table has been reserved for ${formatDate(searchData.date)} at ${formatTime(searchData.time)}`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Reservation Failed',
        message: 'Failed to confirm reservation. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const startNewReservation = () => {
    setCurrentStep('search');
    setAvailabilityResult(null);
    setSelectedAlternativeTime('');
    setConfirmationData(null);
    setSearchData({
      date: new Date().toISOString().split('T')[0],
      time: '19:30',
      partySize: 2
    });
    setReservationData({
      fullName: user?.name || '',
      phone: '',
      email: user?.email || '',
      specialRequests: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Table</h1>
          <p className="text-xl text-gray-600">Reserve your spot in seconds. Walk-ins welcome based on availability.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { key: 'search', label: 'Search', icon: Calendar },
              { key: 'availability', label: 'Availability', icon: Clock },
              { key: 'details', label: 'Details', icon: User },
              { key: 'confirmation', label: 'Confirmation', icon: CheckCircle }
            ].map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.key;
              const isCompleted = ['search', 'availability', 'details'].indexOf(currentStep) > ['search', 'availability', 'details'].indexOf(step.key);
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isActive ? 'bg-blue-600 text-white' : 
                    isCompleted ? 'bg-green-600 text-white' : 
                    'bg-gray-200 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Search Form */}
          {currentStep === 'search' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find Available Tables</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={searchData.date}
                    onChange={handleSearchInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Time
                  </label>
                  <select
                    name="time"
                    value={searchData.time}
                    onChange={handleSearchInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {availableTimes.map(time => (
                      <option key={time} value={time}>
                        {formatTime(time)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    Party Size
                  </label>
                  <select
                    name="partySize"
                    value={searchData.partySize}
                    onChange={handleSearchInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(size => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={checkAvailability}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Checking Availability...</span>
                  </div>
                ) : (
                  'Find Table'
                )}
              </button>
            </div>
          )}

          {/* Step 2: Availability Results */}
          {currentStep === 'availability' && availabilityResult && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Table Availability</h2>
              
              {/* Search Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{formatDate(searchData.date)}</span>
                  <span>{formatTime(searchData.time)}</span>
                  <span>{searchData.partySize} {searchData.partySize === 1 ? 'person' : 'people'}</span>
                </div>
              </div>

              {availabilityResult.available ? (
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Great! We have a table for you</h3>
                  <p className="text-gray-600 mb-6">{availabilityResult.message}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-medium">
                      {availabilityResult.table_name} • {formatDate(searchData.date)} • {formatTime(searchData.time)}
                    </p>
                  </div>
                  <button
                    onClick={proceedToDetails}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue to Details
                  </button>
                </div>
              ) : (
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No tables available at that time</h3>
                  <p className="text-gray-600 mb-6">{availabilityResult.message}</p>
                  
                  {availabilityResult.alternatives.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Available Alternative Times</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {availabilityResult.alternatives.map((alt) => (
                          <button
                            key={alt.time}
                            onClick={() => selectAlternativeTime(alt.time)}
                            className={`p-4 border-2 rounded-lg transition-colors ${
                              selectedAlternativeTime === alt.time
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="font-medium text-gray-900">{formatTime(alt.time)}</div>
                            <div className="text-sm text-gray-600">
                              {alt.available_tables} table{alt.available_tables !== 1 ? 's' : ''} available
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      {selectedAlternativeTime && (
                        <button
                          onClick={proceedToDetails}
                          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Continue with {formatTime(selectedAlternativeTime)}
                        </button>
                      )}
                    </div>
                  )}
                  
                  <button
                    onClick={() => setCurrentStep('search')}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Try Different Date/Time
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Reservation Details */}
          {currentStep === 'details' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reservation Details</h2>
              
              {/* Reservation Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <h3 className="font-medium text-blue-900 mb-2">Your Reservation</h3>
                <div className="text-blue-800 space-y-1">
                  <p>{availabilityResult?.table_name} • {formatDate(searchData.date)}</p>
                  <p>{formatTime(searchData.time)} • {searchData.partySize} {searchData.partySize === 1 ? 'person' : 'people'}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={reservationData.fullName}
                    onChange={handleReservationInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={reservationData.phone}
                      onChange={handleReservationInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={reservationData.email}
                      onChange={handleReservationInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={reservationData.specialRequests}
                    onChange={handleReservationInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests, dietary restrictions, or accessibility needs..."
                  />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Please note:</strong> We hold tables for 15 minutes past the reservation time. 
                    For parties of 6 or more, a 20% service charge will be added to your bill.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentStep('availability')}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={confirmReservation}
                    disabled={loading || !reservationData.fullName || !reservationData.phone || !reservationData.email}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                      loading || !reservationData.fullName || !reservationData.phone || !reservationData.email
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Confirming...</span>
                      </div>
                    ) : (
                      'Confirm Reservation'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 'confirmation' && confirmationData && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Reservation Confirmed!</h2>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for choosing TastyBite. We look forward to serving you!
              </p>

              {/* Confirmation Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Reservation Details</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Reservation ID:</span>
                    <span className="font-medium">{confirmationData.reservation_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Table:</span>
                    <span className="font-medium">{confirmationData.table_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{formatDate(confirmationData.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{formatTime(confirmationData.time)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Party Size:</span>
                    <span className="font-medium">{confirmationData.party_size} {confirmationData.party_size === 1 ? 'person' : 'people'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">{confirmationData.customer_name}</span>
                  </div>
                </div>
              </div>

              {/* Confirmation Status */}
              {confirmationData.confirmation_sent ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                  <p className="text-green-800">
                    ✓ Confirmation email and SMS have been sent to you
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                  <p className="text-yellow-800">
                    ⚠ Reservation confirmed, but we couldn't send notifications. Please save your reservation ID.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startNewReservation}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Make Another Reservation
                </button>
                <a
                  href="tel:+1234567890"
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Call Restaurant
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-sm text-gray-600">
                <p>Need to make changes? Call us at (555) 123-4567</p>
                <p>We'll send you a reminder 2 hours before your reservation</p>
              </div>
            </div>
          )}
        </div>

        {/* Restaurant Info Sidebar */}
        {currentStep !== 'confirmation' && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">TastyBite Restaurant</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Open today
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 mt-0.5 text-gray-400" />
                    <span>Tesano-Accra, Ghana</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>Mon–Sun: 11:00am – 10:00pm</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Car className="h-5 w-5 text-gray-400" />
                    <span>Parking available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wheelchair className="h-5 w-5 text-gray-400" />
                    <span>Wheelchair accessible</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Call Restaurant
                  </button>
                  <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;