import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MenuPage from './pages/MenuPage';
import ReservationsPage from './pages/ReservationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminReservations from './pages/AdminReservations';
import AdminPOS from './pages/AdminPOS';
import AdminOrders from './pages/AdminOrders';
import AdminMenu from './pages/AdminMenu';
import AdminInventory from './pages/AdminInventory';
import AdminSettings from './pages/AdminSettings';
import AdminCategories from './pages/AdminCategories';
import AdminAdmins from './pages/AdminAdmins';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-white">
      {!location.pathname.startsWith('/admin') && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
          <Route path="/admin/pos" element={<AdminPOS />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/admins" element={<AdminAdmins />} />
        </Routes>
      </main>
      {!location.pathname.startsWith('/admin') && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;