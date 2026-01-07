import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PawIcon from "@/components/icons/PawIcon";

export default function VerificationSuccessScreen() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to profile creation screen
    navigate("/profile");
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
          Rapid
        </h1>
        <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
          Response Team
        </h2>
      </div>

      {/* Tagline */}
      <div className="mt-8 sm:mt-10 md:mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <p 
          className="text-xl sm:text-2xl md:text-3xl text-foreground font-normal leading-snug"
          style={{ letterSpacing: '-0.5px' }}
        >
          where empathy meets action.
        </p>
        <p className="text-xs sm:text-sm text-secondary tracking-[1.2px] mt-2 sm:mt-3 uppercase font-normal">
          A collective for the conscious citizen.
        </p>
      </div>

      {/* Success Section */}
      <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
        {/* Checkmark Icon in Box */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 border border-foreground flex items-center justify-center">
          <Check 
            className="w-9 h-9 sm:w-11 sm:h-11" 
            style={{ color: '#34D392' }}
            strokeWidth={3}
          />
        </div>

        {/* Success Message */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-foreground font-normal text-center">
          Your OTP has been verified successfully.
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[40px] sm:min-h-[60px]" />

      {/* Continue Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white rounded-none">
          <button
            onClick={handleContinue}
            className="w-full h-12 sm:h-14 rounded-none flex items-center justify-between px-4 sm:px-6 bg-white"
            style={{ backgroundColor: 'white' }}
          >
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-[1.5px] uppercase text-black">
              Continue
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
          Secure Access
        </span>
        <span className="text-[10px] sm:text-xs text-secondary">•</span>
        <span className="text-[10px] sm:text-xs text-secondary tracking-[0.6px] uppercase font-normal">
          Privacy Ensured
        </span>
      </div>
    </div>
  );
}
