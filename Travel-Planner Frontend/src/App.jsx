import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';

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
          {/* Placeholder routes for other links */}
          <Route path="*" element={<div className="h-[50vh] flex items-center justify-center">Page Under Construction</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;