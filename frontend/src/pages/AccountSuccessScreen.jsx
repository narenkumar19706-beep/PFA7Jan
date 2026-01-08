import { ArrowRight, Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PawIcon from "@/components/icons/PawIcon";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

// Storage key for registered users (simulates backend database)
const REGISTERED_USERS_KEY = 'pfa_registered_users';

export default function AccountSuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t } = useLanguage();
  
  // Get user data from navigation state
  const userData = location.state?.userData;
  const phoneNumber = location.state?.phoneNumber;

  const handleProceed = () => {
    const userToSave = {
      name: userData?.name || 'User',
      email: userData?.email || '',
      phone: phoneNumber || '',
      role: userData?.role || 'individual',
      address: userData?.address || '',
      district: userData?.district || '',
      joinedDays: 0, // New user
      createdAt: Date.now()
    };
    
    // Save user to registered users storage (simulates database)
    // This allows returning users to skip profile creation on future logins
    if (phoneNumber) {
      const registeredUsers = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '{}');
      registeredUsers[phoneNumber] = userToSave;
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));
    }
    
    // Log the user in with actual user data from profile creation
    login(userToSave);
    
    // Navigate to home
    navigate("/home", { replace: true });
  };

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10 safe-area-top safe-area-bottom max-w-lg mx-auto w-full">
      {/* Logo - Paw icon in square border */}
      <div 
        className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center animate-fade-in"
        style={{ animationDelay: '0.1s' }}
      >
        <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
      </div>

      {/* Title Section */}
      <div className="mt-8 sm:mt-10 md:mt-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">
          {t('appName')}
        </h1>
        <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
          {t('appSubtitle')}
        </h2>
      </div>

      {/* Tagline */}
      <div className="mt-6 sm:mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <p 
          className="text-base sm:text-lg md:text-xl text-foreground font-normal leading-snug"
          style={{ letterSpacing: '-0.3px' }}
        >
          {t('tagline')}
        </p>
        <p className="text-xs sm:text-sm text-secondary tracking-[1px] mt-2 uppercase font-normal">
          {t('taglineSubtext')}
        </p>
      </div>

      {/* Success Section */}
      <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
        {/* Checkmark Icon in Box */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
          <Check 
            className="w-7 h-7 sm:w-8 sm:h-8 text-foreground"
            strokeWidth={3}
          />
        </div>

        {/* Success Message */}
        <h3 className="mt-8 sm:mt-10 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center leading-tight">
          {t('accountCreated')}
        </h3>

        {/* Welcome Text */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-secondary font-normal text-center leading-relaxed max-w-xs">
          {t('welcomeMessage')}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[40px] sm:min-h-[60px]" />

      {/* Proceed to Dashboard Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white rounded-none">
          <button
            onClick={handleProceed}
            className="w-full h-12 sm:h-14 rounded-none flex items-center justify-between px-4 sm:px-6 bg-white"
            style={{ backgroundColor: 'white' }}
          >
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-[0.5px] uppercase text-black">
              {t('proceedToDashboard')}
            </span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-black flex-shrink-0">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="mt-5 sm:mt-6 md:mt-8 flex items-center justify-center gap-2 animate-fade-in" 
        style={{ animationDelay: '0.6s' }}
      >
        <span className="text-[10px] sm:text-xs text-secondary tracking-[0.6px] uppercase font-normal">
          {t('secureAccess')}
        </span>
        <span className="text-[10px] sm:text-xs text-secondary">•</span>
        <span className="text-[10px] sm:text-xs text-secondary tracking-[0.6px] uppercase font-normal">
          {t('privacyEnsured')}
        </span>
      </div>
    </div>
  );
}
