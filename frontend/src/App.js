import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "@/pages/LoginScreen";
import OTPScreen from "@/pages/OTPScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import AccountSuccessScreen from "@/pages/AccountSuccessScreen";
import DashboardScreen from "@/pages/DashboardScreen";
import CommunityScreen from "@/pages/CommunityScreen";
import SOSHistoryScreen from "@/pages/SOSHistoryScreen";
import SOSActiveScreen from "@/pages/SOSActiveScreen";
import AddProofScreen from "@/pages/AddProofScreen";
import UserProfileScreen from "@/pages/UserProfileScreen";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/otp" element={<OTPScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/account-success" element={<AccountSuccessScreen />} />
          <Route path="/home" element={<DashboardScreen />} />
          <Route path="/community" element={<CommunityScreen />} />
          <Route path="/sos" element={<SOSHistoryScreen />} />
          <Route path="/sos-active" element={<SOSActiveScreen />} />
          <Route path="/add-proof" element={<AddProofScreen />} />
          <Route path="/user-profile" element={<UserProfileScreen />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
