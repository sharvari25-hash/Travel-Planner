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
import ProtectedRoute from './components/ProtectedRoute';

import MyTrips from './pages/MyTrips';

import TripDetails from './pages/TripDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login-customer" element={<Layout><Login /></Layout>} />
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
          path="/dashboard" 
          element={
            <ProtectedRoute role="USER">
              <TravelerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/my-trips" 
          element={
            <ProtectedRoute role="USER">
              <MyTrips />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/my-trips/:id" 
          element={
            <ProtectedRoute role="USER">
              <TripDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Placeholder for other main layout routes */}
        <Route path="*" element={<Layout><div className="h-[50vh] flex items-center justify-center">Page Under Construction</div></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;