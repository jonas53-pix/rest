
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="block">Email: TastyBite@gmail.com</span>
                <span className="block">auth/login</span>
                <span className="block">Tesano-Accra</span>
              </p>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                Careers
              </Link>
              <Link to="/team" className="text-gray-300 hover:text-white transition-colors">
                Our Team
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                FAQs
              </Link>
            </div>
          </div>

          {/* Logo and Hours */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">TB</span>
              </div>
              <span className="text-xl font-bold">TastyBite</span>
            </div>
            <p className="text-gray-300 mb-2">Open daily 11am – 10pm</p>
            <p className="text-gray-300">@TastyBite</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 TastyBite. All rights reserved.
          </p>
          <Link
            to="/terms"
            className="text-gray-400 hover:text-white text-sm transition-colors mt-2 md:mt-0"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;