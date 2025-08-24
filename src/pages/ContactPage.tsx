import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    email: '',
    phone: '',
    subject: 'Question about private events',
    message: ''
  });

  const handleInputChange = (e: React.Target & { name: string; value: string }) => {
    const { name, value } = e;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message sent:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Contact TastyBite
              </h1>
              <p className="text-xl text-gray-600">
                We'd love to hear from you. Send a message, call us, or stop by TastyBite.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1210622/pexels-photo-1210622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Boat on river"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
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
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Question about private events"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange(e.target)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hello! I'd like to inquire about hosting a 30-person dinner next month. What packages are available?"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  className="text-blue-600 font-medium hover:text-blue-500"
                >
                  Add attachment
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Contact Details & Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Visit or Call</h2>
              
              {/* Address */}
              <div className="mb-6">
                <div className="flex items-start space-x-3 mb-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Tesano-Accra</div>
                    <div className="text-gray-600">Accra District</div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="mb-6">
                <div className="flex items-start space-x-3 mb-2">
                  <Clock className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Mon–Sun: 11:00am – 10:00pm</div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Open now
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a href="tel:0533458268" className="text-blue-600 hover:text-blue-500">
                    0533458268
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a href="mailto:TastyBite@gmail.com" className="text-blue-600 hover:text-blue-500">
                    TastyBite@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 pb-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Find Us on the Map</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Navigation className="h-4 w-4" />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
              
              <img
                src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                alt="Map of TastyBite location"
                className="w-full h-64 object-cover"
              />
              
              <div className="p-6 pt-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Parking available behind the building</div>
                  <div>Accessible entrance on 2nd Street</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  <a
                    href="tel:5551234567"
                    className="bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="/reservations"
                    className="border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
                  >
                    Book a Table
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;