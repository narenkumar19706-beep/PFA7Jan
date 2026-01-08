import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Camera, Square } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";
import { HomeIcon, CommunityIcon, SOSIcon, ProfileIcon } from "@/components/BottomNav";
import { useSOS } from "@/context/SOSContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SOSActiveScreen() {
  const navigate = useNavigate();
  const { sosState, isSOSActive, activatedAt, deactivateSOS } = useSOS();
  const { t } = useLanguage();
  
  // COUNT-UP timer state - starts at 0 and increments
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    // Initialize with calculated elapsed time if activatedAt exists
    if (activatedAt) {
      return Math.floor((Date.now() - activatedAt) / 1000);
    }
    return 0;
  });
  const timerRef = useRef(null);
  const startTimeRef = useRef(activatedAt);

  // Calculate elapsed time accurately based on activatedAt timestamp
  const calculateElapsedTime = useCallback(() => {
    if (!activatedAt) return 0;
    return Math.floor((Date.now() - activatedAt) / 1000);
  }, [activatedAt]);

  // Initialize and run COUNT-UP timer
  useEffect(() => {
    // If SOS is not active, redirect to home
    if (!isSOSActive) {
      navigate("/home", { replace: true });
      return;
    }

    // Update ref when activatedAt changes
    startTimeRef.current = activatedAt;

    // Start the COUNT-UP timer interval
    timerRef.current = setInterval(() => {
      // Always calculate from the original activatedAt timestamp
      // This ensures accuracy even after app backgrounding
      const currentElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(currentElapsed);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isSOSActive, activatedAt, navigate]);

  // Listen for SOS deactivation (real-time sync)
  useEffect(() => {
    if (!isSOSActive && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      // Auto-navigate away when SOS is deactivated by anyone
      navigate("/home", { replace: true });
    }
  }, [isSOSActive, navigate]);

  // Handle visibility change (app backgrounding/foregrounding)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isSOSActive && activatedAt) {
        // Recalculate elapsed time when app comes to foreground
        const currentElapsed = calculateElapsedTime();
        setElapsedSeconds(currentElapsed);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isSOSActive, activatedAt, calculateElapsedTime]);

  // Format time as MM:SS or HH:MM:SS if over an hour
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle STOP SOS - immediately deactivates for all users
  const handleStopSOS = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Deactivate SOS system-wide (updates localStorage and dispatches events)
    deactivateSOS();
    
    toast.success("SOS Alert Stopped", {
      description: "Alert has been deactivated for all responders"
    });
    
    navigate("/home", { replace: true });
  };

  const handleAddProof = () => {
    navigate("/add-proof");
  };

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'HOME', path: '/home' },
    { id: 'community', icon: CommunityIcon, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: SOSIcon, label: 'SOS', path: '/sos-active', isActive: true },
    { id: 'profile', icon: ProfileIcon, label: 'PROFILE', path: '/user-profile' },
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
          <h2 className="text-2xl sm:text-3xl text-white/60 leading-none mt-1">
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

          {/* COUNT-UP Timer - Shows elapsed time since activation */}
          <div className="mt-10 text-center">
            <p className="text-xs text-white/60 tracking-[0.2em] uppercase mb-2">
              ELAPSED TIME
            </p>
            <p className="text-5xl sm:text-6xl font-bold text-white tracking-wider font-mono">
              {formatTime(elapsedSeconds)}
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

      {/* Bottom Navigation - Custom for SOS Active */}
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
