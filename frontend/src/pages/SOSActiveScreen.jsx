import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, Camera, Square } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

export default function SOSActiveScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeRemaining, setTimeRemaining] = useState(150); // 2:30 in seconds
  const timerRef = useRef(null);

  // Start countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopSOS = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    toast.success("SOS Alert Stopped");
    navigate("/home");
  };

  const handleAddProof = () => {
    navigate("/add-proof");
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME', path: '/home' },
    { id: 'community', icon: Users, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: Megaphone, label: 'SOS', path: '/sos-active', isActive: true },
    { id: 'profile', icon: User, label: 'PROFILE', path: '/user-profile' },
  ];

  return (
    <div className="min-h-screen min-h-dvh flex flex-col safe-area-top safe-area-bottom sos-active-bg">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header with Logo and Bell */}
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-white/30 flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          
          {/* Notification Bell */}
          <button 
            className="relative p-2"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Title Section */}
        <div className="mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-none">
            Rapid
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-white/60 leading-none mt-1 italic">
            Response Team
          </h2>
        </div>

        {/* SOS Activated Text */}
        <div className="mt-6">
          <h3 
            className="text-lg sm:text-xl font-bold tracking-[0.2em] uppercase"
            style={{ color: '#E50000' }}
          >
            SOS ACTIVATED!
          </h3>
        </div>

        {/* Active Signal Area */}
        <div className="flex-1 flex flex-col items-center justify-center py-8">
          {/* Pulsing Signal - Oval shape */}
          <div className="relative w-48 h-32 sm:w-56 sm:h-40 flex items-center justify-center">
            {/* Outer pulsing rings */}
            <div className="absolute inset-0 rounded-[50%] sos-signal-ring sos-signal-ring-1" />
            <div className="absolute inset-0 rounded-[50%] sos-signal-ring sos-signal-ring-2" />
            <div className="absolute inset-0 rounded-[50%] sos-signal-ring sos-signal-ring-3" />
            
            {/* Main oval */}
            <div 
              className="relative w-40 h-24 sm:w-48 sm:h-28 rounded-[50%] flex flex-col items-center justify-center z-10"
              style={{ backgroundColor: '#E50000' }}
            >
              {/* Signal waves icon */}
              <div className="flex items-center gap-1 mb-1">
                <div className="w-1 h-3 bg-white rounded-full opacity-60"></div>
                <div className="w-1 h-5 bg-white rounded-full"></div>
                <div className="w-1 h-3 bg-white rounded-full opacity-60"></div>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white tracking-[0.15em]">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mt-10 text-center">
            <p className="text-xs text-white/60 tracking-[0.2em] uppercase mb-2">
              ALERT DURATION
            </p>
            <p className="text-5xl sm:text-6xl font-bold text-white tracking-wider">
              {formatTime(timeRemaining)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          {/* Stop SOS Button */}
          <button
            onClick={handleStopSOS}
            className="w-full h-14 bg-[#1A1A1A] border border-accent flex items-center justify-center gap-3"
          >
            <Square className="w-4 h-4" style={{ color: '#E50000', fill: '#E50000' }} />
            <span className="text-sm font-bold text-white tracking-[0.15em] uppercase">
              STOP SOS
            </span>
          </button>

          {/* Add Proof Button */}
          <button
            onClick={handleAddProof}
            className="w-full h-14 bg-[#1A1A1A] border border-accent flex items-center justify-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white tracking-[0.15em] uppercase">
              ADD PROOF
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1F1F1F] border-t border-white/10 safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = item.isActive;
            const Icon = item.icon;
            const isSOS = item.id === 'sos';
            
            return (
              <button
                key={item.id}
                onClick={() => !item.isActive && navigate(item.path)}
                className={`flex flex-col items-center justify-center px-4 py-2 transition-colors ${
                  isActive ? 'bg-white/10 rounded-lg' : ''
                }`}
              >
                <Icon 
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isSOS ? 'text-[#E50000]' : isActive ? 'text-white' : 'text-white/50'
                  }`} 
                />
                <span 
                  className={`text-[10px] sm:text-xs mt-1 tracking-[0.5px] ${
                    isSOS ? 'text-[#E50000] font-bold' : isActive ? 'text-white font-bold' : 'text-white/50 font-normal'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
