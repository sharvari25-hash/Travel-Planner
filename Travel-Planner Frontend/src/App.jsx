import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import TourDetailsPage from './pages/TourDetailsPage';
import AllTours from './pages/AllTours';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-customer" element={<Login />} />
          <Route path="/signup-customer" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/tours" element={<AllTours />} />
          <Route path="/tours/:slug" element={<TourDetailsPage />} />
          {/* Placeholder routes for other links */}
          <Route path="*" element={<div className="h-[50vh] flex items-center justify-center">Page Under Construction</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;