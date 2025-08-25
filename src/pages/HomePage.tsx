import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, Clock, Truck, CreditCard, Star } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Utensils,
      title: 'Online Ordering',
      description: 'Order your favorite dishes online with just a few clicks'
    },
    {
      icon: Calendar,
      title: 'Table Reservations',
      description: 'Book your table in advance for a guaranteed dining experience'
    },
    {
      icon: CreditCard,
      title: 'Easy Checkout',
      description: 'Secure and fast payment processing for all your orders'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick delivery to your doorstep within 30-45 minutes'
    }
  ];

  const popularDishes = [
    {
      name: 'Jollof Rice',
      price: 'GH₵25',
      image: 'https://images.pexels.com/photos/15146310/pexels-photo-15146310.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      name: 'Banku with Tilapia',
      price: 'GH₵35',
      image: 'https://images.pexels.com/photos/12737543/pexels-photo-12737543.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      name: 'Kelewele',
      price: 'GH₵15',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Faab002d11bac4e6d92d14db9aa5e95bc%2F622e4aeab3714664b16487e2af0bf48b?format=webp&width=800'
    }
  ];

  const testimonials = [
    {
      name: 'Doris Pousah',
      text: 'Amazing food and exceptional service. The online ordering system makes it so convenient!',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Emmanuel Anabilla',
      text: 'Best restaurant in town. Fresh ingredients and perfect flavors every time.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Janet Ansah',
      text: 'The reservation system is fantastic. Always get our favorite table by the window.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Delicious Meals, Easy Reservations, Fast Orders
              </h1>
              <p className="text-xl text-gray-600 mt-6">
                Experience culinary excellence with our farm-to-table cuisine. Order online for delivery or make a reservation for an unforgettable dining experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/menu"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  <Utensils className="h-5 w-5 mr-2" />
                  Order Now
                </Link>
                <Link
                  to="/menu"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                >
                  View All Menus
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Faab002d11bac4e6d92d14db9aa5e95bc%2Fd2776700ae2f4b2792b6ece4c3f58f5e?format=webp&width=800"
                alt="Traditional meal served on banana leaf with rice, meat, noodles, sausages, and fresh vegetables"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-gray-600">
              Complete dining solutions at your fingertips
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Dishes
            </h2>
            <p className="text-xl text-gray-600">
              Our customers' favorite picks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDishes.map((dish, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dish.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {dish.price}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Restaurant interior"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                About Our Restaurant
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Since 2012, TastyBite has been serving the finest locally-sourced, 
                seasonally-inspired cuisine in a warm and welcoming atmosphere. Our 
                commitment to quality ingredients, exceptional service, and innovative 
                flavors has made us a beloved destination for food lovers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From our farm-to-table approach to our sustainable practices, every 
                aspect of our restaurant reflects our passion for creating memorable 
                dining experiences that bring people together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <span className="font-semibold text-gray-900">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
