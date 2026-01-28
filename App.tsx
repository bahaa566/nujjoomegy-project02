import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, UserRole } from './types.ts';
import { dbService } from './services/db.ts';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string) => Promise<boolean>;
  register: (name: string, phone: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// --- Protected Route ---
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Syncing with Nujoom Cloud...</p>
    </div>
  );
  
  // Guard: Redirect to Landing Page if not logged in
  if (!user) return <Navigate to="/" replace />;
  
  // Role Guard: Redirect to base if role doesn't match
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  
  return <>{children}</>;
};

// --- Pages ---
import Landing from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import PlayerDashboard from './pages/PlayerDashboard.tsx';
import ScoutDashboard from './pages/ScoutDashboard.tsx';
import ComparePlayers from './pages/ComparePlayers.tsx';
import Pricing from './pages/Pricing.tsx';

// --- Auth Provider ---
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = await dbService.getCurrentUser();
        if (storedUser) setUser(storedUser);
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (phone: string) => {
    const loggedUser = await dbService.login(phone);
    if (loggedUser) {
      setUser(loggedUser);
      return true;
    }
    return false;
  };

  const handleRegister = async (name: string, phone: string, role: UserRole) => {
    const newUser = await dbService.register(name, phone, role);
    setUser(newUser);
  };

  const handleLogout = () => {
    dbService.logout();
    setUser(null);
    navigate('/', { replace: true });
  };

  const authValue: AuthContextType = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={
        user ? (
          user.role === UserRole.PLAYER ? <Navigate to={`/player/${user.id}`} replace /> : <Navigate to="/scout" replace />
        ) : <Landing />
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pricing" element={<Pricing />} />
      
      <Route path="/player/:id" element={
        <ProtectedRoute allowedRoles={[UserRole.PLAYER]}>
          <PlayerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/scout" element={
        <ProtectedRoute allowedRoles={[UserRole.SCOUT]}>
          <ScoutDashboard />
        </ProtectedRoute>
      } />

      <Route path="/compare" element={
        <ProtectedRoute allowedRoles={[UserRole.SCOUT]}>
          <ComparePlayers />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;