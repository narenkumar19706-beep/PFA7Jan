import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import PawIcon from "@/components/icons/PawIcon";

export default function OTPScreen() {
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get phone number from navigation state (or use default for demo)
  const phoneNumber = location.state?.phoneNumber || "9876543210";

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newDigits = [...otpDigits];
    
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    
    setOtpDigits(newDigits);
    
    const nextEmptyIndex = newDigits.findIndex(d => !d);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const otp = otpDigits.join("");
    
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - Mock functionality
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to verification success screen
      navigate("/verified");
    }, 1500);
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendTimer(30);
    toast.success("OTP resent to +91 " + phoneNumber);
  };

  const isOTPComplete = otpDigits.every(d => d !== "");

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
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-none"
          style={{ letterSpacing: '-1.5px' }}
        >
          Rapid
        </h1>
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-secondary leading-none mt-2 sm:mt-3"
          style={{ letterSpacing: '-1px' }}
        >
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

      {/* OTP Section */}
      <div className="mt-10 sm:mt-12 md:mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <p className="text-base sm:text-lg md:text-xl text-foreground font-normal leading-relaxed">
          Enter the 6 digit OTP received on your mobile number.
        </p>
        
        {/* OTP Input Boxes */}
        <div className="mt-6 sm:mt-8 flex gap-2 sm:gap-3 md:gap-4">
          {otpDigits.map((digit, index) => (
            <div 
              key={index}
              className="relative w-11 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16"
            >
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="otp-input w-full h-full text-center text-xl sm:text-2xl md:text-3xl font-normal bg-transparent rounded outline-none text-foreground"
                aria-label={`OTP Digit ${index + 1}`}
              />
              {/* Placeholder dot when empty */}
              {!digit && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-secondary text-2xl sm:text-3xl">○</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resend OTP */}
        <div className="mt-6 sm:mt-8 flex justify-end">
          <button
            onClick={handleResendOTP}
            disabled={!canResend}
            className="text-xs sm:text-sm text-secondary tracking-[1.2px] uppercase font-normal hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {canResend ? "Resend OTP" : `Resend OTP in ${resendTimer}s`}
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[40px] sm:min-h-[60px]" />

      {/* Verify Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white rounded-none">
          <button
            onClick={handleVerify}
            disabled={!isOTPComplete || isLoading}
            className="w-full h-12 sm:h-14 rounded-none flex items-center justify-between px-4 sm:px-6 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
            style={{ backgroundColor: 'white' }}
          >
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-[1.5px] uppercase text-black">
              {isLoading ? "Verifying..." : "Verify"}
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
