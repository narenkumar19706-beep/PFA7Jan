import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PawIcon from "@/components/icons/PawIcon";

export default function LoginScreen() {
  const [phoneDigits, setPhoneDigits] = useState(Array(10).fill(""));
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleDigitChange = (index, value) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    
    const newDigits = [...phoneDigits];
    newDigits[index] = digit;
    setPhoneDigits(newDigits);

    // Auto-advance to next input
    if (digit && index < 9) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!phoneDigits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 9) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 10);
    const newDigits = [...phoneDigits];
    
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    
    setPhoneDigits(newDigits);
    
    // Focus the next empty input or last input
    const nextEmptyIndex = newDigits.findIndex(d => !d);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[9]?.focus();
    }
  };

  const handleProceed = () => {
    const phoneNumber = phoneDigits.join("");
    
    if (phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - Mock functionality
    setTimeout(() => {
      setIsLoading(false);
      toast.success("OTP sent to +91 " + phoneNumber);
      // In a real app, this would navigate to OTP verification screen
    }, 1500);
  };

  const isPhoneComplete = phoneDigits.every(d => d !== "");

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

      {/* Phone Input Section */}
      <div className="mt-10 sm:mt-12 md:mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <label className="text-xs sm:text-sm text-secondary tracking-[1.2px] uppercase font-normal">
          Mobile Number
        </label>
        
        <div className="mt-3 sm:mt-4 flex items-center border-b border-accent pb-2 sm:pb-3">
          {/* Country Code */}
          <span 
            className="text-2xl sm:text-3xl md:text-4xl text-secondary font-normal"
            style={{ letterSpacing: '-1px' }}
          >
            +91
          </span>
          
          {/* Phone Digits - Left to right input */}
          <div className="flex ml-3 sm:ml-4">
            {phoneDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-[22px] sm:w-[26px] md:w-[28px] h-8 sm:h-10 md:h-12 text-center text-2xl sm:text-3xl md:text-4xl font-normal bg-transparent border-none outline-none text-foreground placeholder:text-secondary focus:outline-none"
                style={{ letterSpacing: '-1px', caretColor: 'white' }}
                placeholder="0"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[40px] sm:min-h-[60px]" />

      {/* Proceed Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white rounded-none">
          <button
            onClick={handleProceed}
            disabled={!isPhoneComplete || isLoading}
            className="w-full h-12 sm:h-14 rounded-none flex items-center justify-between px-4 sm:px-6 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
            style={{ backgroundColor: 'white' }}
          >
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-[1.5px] uppercase text-black">
              {isLoading ? "Sending..." : "Proceed"}
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
