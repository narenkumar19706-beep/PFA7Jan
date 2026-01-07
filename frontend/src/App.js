import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "@/pages/LoginScreen";
import OTPScreen from "@/pages/OTPScreen";
import VerificationSuccessScreen from "@/pages/VerificationSuccessScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import HomeScreen from "@/pages/HomeScreen";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/otp" element={<OTPScreen />} />
          <Route path="/verified" element={<VerificationSuccessScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
