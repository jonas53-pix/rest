import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Car, Armchair as Wheelchair } from 'lucide-react';

const ReservationsPage = () => {
  const [formData, setFormData] = useState({
    partySize: '2 people',
    occasion: 'None',
    fullName: '',
    phone: '',
    email: '',
    specialRequests: ''
  });

  const [selectedTime, setSelectedTime] = useState('7:00 PM');

  const availableTimes = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
  ];

  const handleInputChange = (e: React.Target & { name: string; value: string }) => {
    const { name, value } = e;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', { ...formData, time: selectedTime });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Table</h1>
          <p className="text-xl text-gray-600">Reserve your spot in seconds. Walk-ins welcome based on availability.</p>
          
          {/* Date and Time Display */}
          <div className="flex justify-center items-center space-x-6 mt-6 text-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span>Date: Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span>Time: {selectedTime}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Reservation Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reservation Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Party Size
                </label>
                <input
                  type="text"
                  name="partySize"
                  value={formData.partySize}
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occasion
                </label>
                <input
                  type="text"
                  name="occasion"
                  value={formData.occasion}
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange(e.target)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add notes (allergies, accessibility, seating preferences)"
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  Please arrive within 10 minutes of your reservation time. We hold tables for 15 minutes.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Find a Table
              </button>
            </form>
          </div>

          {/* Right Column - Availability and Summary */}
          <div className="space-y-8">
            {/* Available Times */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">TastyBite</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Open today
                </span>
              </div>
              
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Restaurant location map"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 mt-0.5 text-gray-400" />
                  <span>123 Riverside Ave, Cityville</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="h-5 w-5 text-gray-400" />
                  <span>Parking available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wheelchair className="h-5 w-5 text-gray-400" />
                  <span>Wheelchair accessible</span>
                </div>
              </div>
            </div>

            {/* Confirmation Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservation Summary</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Party:</span>
                  <span className="font-medium">{formData.partySize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">Today</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span>Deposit:</span>
                    <span className="font-medium">GH₵10</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6">
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;