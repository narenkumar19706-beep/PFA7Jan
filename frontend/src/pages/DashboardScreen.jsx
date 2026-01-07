import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

export default function DashboardScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [hasNotification, setHasNotification] = useState(true);
  const holdTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  // Get user name from state or use default
  const userName = location.state?.userName || "Ananya";

  const handleSOSStart = () => {
    setIsHolding(true);
    setHoldProgress(0);
    
    // Progress animation
    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      progress += 100 / 30; // 3 seconds = 30 intervals of 100ms
      setHoldProgress(Math.min(progress, 100));
    }, 100);
    
    // Trigger SOS after 3 seconds
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
    
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    toast.success("SOS Alert Activated!", {
      duration: 2000,
    });
    
    // Navigate to SOS active screen
    setTimeout(() => {
      navigate("/sos-active");
    }, 500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME', path: '/home' },
    { id: 'community', icon: Users, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: Megaphone, label: 'SOS', path: '/sos' },
    { id: 'profile', icon: User, label: 'PROFILE', path: '/user-profile' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header with Logo and Bell */}
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          {/* Notification Bell */}
          <button 
            className="relative p-2"
            onClick={() => {
              setHasNotification(false);
              toast.info("No new notifications");
            }}
          >
            <Bell className="w-6 h-6 text-foreground" />
            {hasNotification && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Title Section */}
        <div className="mt-6 sm:mt-8">
          <h1 
            className="text-4xl sm:text-5xl font-bold text-foreground leading-none"
            style={{ letterSpacing: '-1px' }}
          >
            Rapid
          </h1>
          <h2 
            className="text-2xl sm:text-3xl font-normal text-secondary leading-none mt-1"
            style={{ letterSpacing: '-0.5px' }}
          >
            Response Team
          </h2>
        </div>

        {/* Greeting */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Hello {userName}!
          </h3>
          <p className="text-xs sm:text-sm text-secondary tracking-[1px] mt-1 uppercase">
            Welcome to People for Animals.
          </p>
        </div>

        {/* SOS Button Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-8">
          {/* SOS Button with Glow */}
          <div className="relative">
            {/* Outer glow rings */}
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
              isHolding ? 'sos-glow-active' : 'sos-glow'
            }`} />
            
            {/* Main SOS Button */}
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
              <span className="text-5xl sm:text-6xl font-bold text-white">
                SOS
              </span>
              <span className="text-xl sm:text-2xl font-normal text-white mt-1">
                HELP
              </span>
              
              {/* Progress ring when holding */}
              {isHolding && (
                <svg 
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${holdProgress * 3.02} 302`}
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Instruction Text */}
          <p className="mt-8 text-sm sm:text-base text-secondary text-center tracking-[0.5px] uppercase leading-relaxed">
            Press and hold for 3 seconds<br />to activate
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1F1F1F] border-t border-accent safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.id === 'home' && currentPath === '/home');
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-white/10' 
                    : 'hover:bg-white/5'
                }`}
              >
                <Icon 
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isActive ? 'text-foreground' : 'text-secondary'
                  }`} 
                />
                <span 
                  className={`text-[10px] sm:text-xs mt-1 tracking-[0.5px] ${
                    isActive ? 'text-foreground font-bold' : 'text-secondary font-normal'
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
