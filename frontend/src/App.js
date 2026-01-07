import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "@/context/LocationContext";
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

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <LocationProvider>
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
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/user-profile" element={<UserProfileScreen />} />
            <Route path="/report-bug" element={<ReportBugScreen />} />
            <Route path="/report-user" element={<ReportUserScreen />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </LocationProvider>
    </div>
  );
}

export default App;
