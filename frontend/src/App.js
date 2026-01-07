import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LocationProvider } from "@/context/LocationContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginScreen from "@/pages/LoginScreen";
import OTPScreen from "@/pages/OTPScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import AccountSuccessScreen from "@/pages/AccountSuccessScreen";
import DashboardScreen from "@/pages/DashboardScreen";
import CommunityScreen from "@/pages/CommunityScreen";
import SOSHistoryScreen from "@/pages/SOSHistoryScreen";
import SOSActiveScreen from "@/pages/SOSActiveScreen";
import AddProofScreen from "@/pages/AddProofScreen";
import ChatScreen from "@/pages/ChatScreen";
import NotificationsScreen from "@/pages/NotificationsScreen";
import UserProfileScreen from "@/pages/UserProfileScreen";
import ReportBugScreen from "@/pages/ReportBugScreen";
import ReportUserScreen from "@/pages/ReportUserScreen";
import { Toaster } from "@/components/ui/sonner";

// Protected Route component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// Public Route component (redirects to home if already logged in)
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - redirect to home if logged in */}
      <Route path="/" element={<PublicRoute><LoginScreen /></PublicRoute>} />
      <Route path="/otp" element={<PublicRoute><OTPScreen /></PublicRoute>} />
      <Route path="/profile" element={<PublicRoute><ProfileScreen /></PublicRoute>} />
      <Route path="/account-success" element={<PublicRoute><AccountSuccessScreen /></PublicRoute>} />
      
      {/* Protected routes - require authentication */}
      <Route path="/home" element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><CommunityScreen /></ProtectedRoute>} />
      <Route path="/sos" element={<ProtectedRoute><SOSHistoryScreen /></ProtectedRoute>} />
      <Route path="/sos-active" element={<ProtectedRoute><SOSActiveScreen /></ProtectedRoute>} />
      <Route path="/add-proof" element={<ProtectedRoute><AddProofScreen /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsScreen /></ProtectedRoute>} />
      <Route path="/user-profile" element={<ProtectedRoute><UserProfileScreen /></ProtectedRoute>} />
      <Route path="/report-bug" element={<ProtectedRoute><ReportBugScreen /></ProtectedRoute>} />
      <Route path="/report-user" element={<ProtectedRoute><ReportUserScreen /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <AuthProvider>
        <LocationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Toaster position="top-center" />
        </LocationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
