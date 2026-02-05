import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import TourDetailsPage from './pages/TourDetailsPage';
import AllTours from './pages/AllTours';
import TravelerDashboard from './pages/TravelerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SettingsPage from './pages/Settings';

import ProtectedRoute from './components/ProtectedRoute';

import MyTrips from './pages/MyTrips';

import TripDetails from './pages/TripDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup-customer" element={<Layout><Signup /></Layout>} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Layout><UserProfile /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route path="/tours" element={<Layout><AllTours /></Layout>} />
        <Route path="/tours/:destination" element={<Layout><TourDetailsPage /></Layout>} />
        


        {/* Protected Dashboard Routes */}
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute role="USER">
              <TravelerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/dashboard/my-trips" 
          element={
            <ProtectedRoute role="USER">
              <MyTrips />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/dashboard/my-trips/:id" 
          element={
            <ProtectedRoute role="USER">
              <TripDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/settings"
          element={
            <ProtectedRoute role="USER">
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Placeholder for other main layout routes */}
        import NotFound from './pages/NotFound';
// ...
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;