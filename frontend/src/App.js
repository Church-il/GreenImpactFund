import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Stories from './pages/Stories';
import Organizations from './pages/Organizations';
import Donations from './components/Donations';
import Profile from './pages/Profile';
import SettingsDashboard from './pages/SettingsDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import DonationImpact from './pages/DonationImpact';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <AppWithNavbar />
      </Router>
    </Provider>
  );
}

function AppWithNavbar() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '*' || location.pathname === '/404';

  return (
    <>
      {!isNotFoundPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stories" element={<ProtectedRoute><Stories /></ProtectedRoute>} />
        <Route path="/organizations" element={<ProtectedRoute><Organizations /></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsDashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/donation-impact" element={<ProtectedRoute><DonationImpact /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
