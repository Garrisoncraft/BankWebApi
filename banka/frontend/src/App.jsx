import React from 'react';
import './index.css'
import {Route, Routes, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import PasswordReset from './components/auth/PasswordReset'
import ClientDashboard from './components/dashboards/ClientDashboard';
import StaffDashboard from './components/dashboards/StaffDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NewPassword from './components/auth/NewPassword';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

const App = () => {

  const location = useLocation();
  const hideLayout = ['/login', '/signup', 'reset-password', 'new-password'].includes(location.pathname);

    
  return (
    <>
    {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/reset-password" element={<PasswordReset/>} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!hideLayout && <Footer />}

      </>
  );
};

export default App;
