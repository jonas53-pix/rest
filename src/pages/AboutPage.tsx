import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: '12+ yrs', description: 'Serving Cityville' },
    { label: '4.8⭐', description: '2,400+ reviews' },
    { label: 'Farm-to-Table', description: '85% local suppliers' }
  ];

  const values = [
    {
      title: 'Hospitality First',
      description: 'Warm, attentive service for every guest, every time.'
    },
    {
      title: 'Sustainable Sourcing',
      description: 'We partner with nearby farms and fisheries for peak freshness.'
    },
    {
      title: 'Seasonal Menus',
      description: 'Dishes evolve with the seasons to showcase the best ingredients.'
    }
  ];

  const team = [
    {
      name: 'Ava Martinez',
      title: 'Executive Chef',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Noah Kim',
      title: 'General Manager',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Maya Patel',
      title: 'Sommelier',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Locally sourced, seasonally inspired since 2012. Crafted on the riverside for our community.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <img
                src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Restaurant at night"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Values */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Believe</h2>
            <div className="space-y-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Team and Location */}
          <div className="space-y-12">
            {/* Team Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet the Team</h2>
              <div className="space-y-6">
                {team.map((member, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-gray-600">
                        {member.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit Us Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Visit Us</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Open today
                </span>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Restaurant location map"
                  className="w-full h-64 object-cover"
                />
                
                <div className="p-6">
                  <div className="space-y-4 text-gray-600 mb-6">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 mt-0.5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">123 Riverside Ave, Cityville</div>
                        <div className="text-sm">Waterfront seating • Private dining room</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      to="/menu"
                      className="bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      View Menu
                    </Link>
                    <Link
                      to="/reservations"
                      className="border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
                    >
                      Make a Reservation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;