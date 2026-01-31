import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholder routes for other links */}
          <Route path="*" element={<div className="h-[50vh] flex items-center justify-center">Page Under Construction</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;