import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, MapPin } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";
import BottomNav from "@/components/BottomNav";
import { useLocationContext } from "@/context/LocationContext";

export default function DashboardScreen() {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const { location: userLocation, isLocating } = useLocationContext();
  
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  // Get user name from state or use default
  const userName = routeLocation.state?.userName || "Ananya";

  const handleSOSStart = () => {
    setIsHolding(true);
    setHoldProgress(0);
    
    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      progress += 100 / 30;
      setHoldProgress(Math.min(progress, 100));
    }, 100);
    
    holdTimerRef.current = setTimeout(() => {
      triggerSOS();
    }, 3000);
  };

  const handleSOSEnd = () => {
    setIsHolding(false);
    setHoldProgress(0);
    
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const triggerSOS = () => {
    setIsHolding(false);
    setHoldProgress(0);
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    toast.success("SOS Alert Activated!", { duration: 2000 });
    
    setTimeout(() => {
      navigate("/sos-active", {
        state: { userLocation }
      });
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          <button 
            className="relative p-2"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">
            Rapid
          </h1>
          <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
            Response Team
          </h2>
        </div>

        {/* Greeting */}
        <div className="mt-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Hello {userName}!
          </h3>
          <p className="text-xs text-secondary tracking-[0.15em] mt-2 uppercase">
            WELCOME TO PEOPLE FOR ANIMALS.
          </p>
          
          {/* Location Display */}
          <div className="mt-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">
              {isLocating ? "Detecting location..." : userLocation.district || "Location not available"}
            </span>
          </div>
        </div>

        {/* SOS Button */}
        <div className="flex-1 flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
              isHolding ? 'sos-glow-active' : 'sos-glow'
            }`} />
            
            <button
              className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center z-10 touch-none select-none"
              style={{ 
                backgroundColor: '#D32F2F',
                boxShadow: isHolding 
                  ? '0 0 60px 20px rgba(211, 47, 47, 0.6), 0 0 100px 40px rgba(211, 47, 47, 0.3)'
                  : '0 0 40px 10px rgba(211, 47, 47, 0.4), 0 0 80px 20px rgba(211, 47, 47, 0.2)'
              }}
              onMouseDown={handleSOSStart}
              onMouseUp={handleSOSEnd}
              onMouseLeave={handleSOSEnd}
              onTouchStart={handleSOSStart}
              onTouchEnd={handleSOSEnd}
              onTouchCancel={handleSOSEnd}
            >
              <span className="text-5xl sm:text-6xl font-bold text-white">SOS</span>
              <span className="text-xl sm:text-2xl font-normal text-white mt-1">HELP</span>
              
              {isHolding && (
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                  <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${holdProgress * 3.02} 302`} />
                </svg>
              )}
            </button>
          </div>

          <p className="mt-8 text-xs text-secondary text-center tracking-[0.15em] uppercase leading-relaxed">
            PRESS AND HOLD FOR 3 SECONDS<br />TO ACTIVATE
          </p>
        </div>
      </div>

      <BottomNav activePath="/home" />
    </div>
  );
}
