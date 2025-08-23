import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users } from 'lucide-react';

const AdminReservations = () => {
  const [selectedDate, setSelectedDate] = useState(15);
  const [viewMode, setViewMode] = useState('Week View');
  const [formData, setFormData] = useState({
    fullName: '',
    date: '',
    time: '',
    partySize: '',
    notes: ''
  });

  const weekDays = [
    { day: 'Mon', date: 10, bookings: 12, tables: 8 },
    { day: 'Tue', date: 11, bookings: 8, tables: 6 },
    { day: 'Wed', date: 12, bookings: 15, tables: 10 },
    { day: 'Thu', date: 13, bookings: 10, tables: 7 },
    { day: 'Fri', date: 14, bookings: 18, tables: 12 },
    { day: 'Sat', date: 15, bookings: 22, tables: 15 },
    { day: 'Sun', date: 16, bookings: 16, tables: 11 }
  ];

  const upcomingReservations = [
    {
      name: 'Doris Pousah',
      time: '7:00 PM',
      party: '4 people',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Emmanuel Anabilla',
      time: '7:30 PM',
      party: '2 people',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Janet Ansah',
      time: '8:00 PM',
      party: '6 people',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'David Wilson',
      time: '8:30 PM',
      party: '3 people',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveReservation = () => {
    console.log('Saving reservation:', formData);
    // Reset form
    setFormData({
      fullName: '',
      date: '',
      time: '',
      partySize: '',
      notes: ''
    });
  };

  const handleClearForm = () => {
    setFormData({
      fullName: '',
      date: '',
      time: '',
      partySize: '',
      notes: ''
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          searchPlaceholder="Search reservations, guests, tables..."
          showExport={true}
          exportButtonText="Export"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Reservations</h1>
            
            {/* View Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
              <button
                onClick={() => setViewMode('Week View')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'Week View'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setViewMode('Day View')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'Day View'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Day View
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900">March 2025</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Today
                  </button>
                </div>

                {/* Week Calendar */}
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day) => (
                    <div
                      key={day.date}
                      onClick={() => setSelectedDate(day.date)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedDate === day.date
                          ? 'border-blue-500 bg-blue-50'
                          : day.bookings > 0
                          ? 'border-green-200 bg-green-50 hover:border-green-300'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {day.day} {day.date}
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          {day.bookings} bookings
                        </div>
                        <div className="text-xs text-gray-500">
                          {day.tables} tables
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bookings Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Bookings</h3>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">14</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
              </div>

              {/* Upcoming Reservations */}
              <h4 className="font-medium text-gray-900 mb-3">Upcoming Reservations</h4>
              <div className="space-y-3">
                {upcomingReservations.map((reservation, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={reservation.avatar}
                      alt={reservation.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {reservation.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {reservation.time} • {reservation.party}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reservation Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">New Reservation</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter guest name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Party Size
                  </label>
                  <input
                    type="number"
                    name="partySize"
                    value={formData.partySize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of guests"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Special requests, allergies, etc."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleClearForm}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleSaveReservation}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReservations;