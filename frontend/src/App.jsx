import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-background text-on-background">
      <Sidebar />
      <div className="flex-1 md:ml-64 h-screen overflow-y-auto w-full relative">
        {children}
        <ChatBox />
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected App Routes wrapped with Sidebar layout */}
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/markets" element={<ProtectedRoute><AppLayout><StockDetail /></AppLayout></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><AppLayout><Watchlist /></AppLayout></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
