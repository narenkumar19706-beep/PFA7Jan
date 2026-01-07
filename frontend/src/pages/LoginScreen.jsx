import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
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
    <div className="min-h-screen min-h-dvh bg-background flex flex-col px-6 py-10 safe-area-top safe-area-bottom">
      {/* Logo - Paw icon in square border */}
      <div 
        className="w-16 h-16 border border-accent flex items-center justify-center animate-fade-in"
        style={{ animationDelay: '0.1s' }}
      >
        <PawIcon className="w-8 h-8 text-foreground" />
      </div>

      {/* Title Section */}
      <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-[72px] font-bold text-foreground leading-none" style={{ letterSpacing: '-1.5px' }}>
          Rapid
        </h1>
        <h2 className="text-[48px] font-normal text-secondary leading-none mt-4" style={{ letterSpacing: '-1px' }}>
          Response Team
        </h2>
      </div>

      {/* Tagline */}
      <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <p className="text-[32px] text-foreground font-normal leading-snug" style={{ letterSpacing: '-0.8px' }}>
          where empathy meets action.
        </p>
        <p className="text-[16px] text-secondary tracking-[1.2px] mt-4 uppercase font-normal">
          A collective for the conscious citizen.
        </p>
      </div>

      {/* Phone Input Section */}
      <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <label className="text-[16px] text-secondary tracking-[1.2px] uppercase font-normal">
          Mobile Number
        </label>
        
        <div className="mt-4 flex items-center gap-2 border-b border-accent pb-3">
          {/* Country Code */}
          <span className="text-[40px] text-secondary font-normal" style={{ letterSpacing: '-1px' }}>+91</span>
          
          {/* Phone Digits */}
          <div className="flex gap-0 flex-1 ml-2">
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
                className="w-[26px] h-12 text-center text-[40px] font-normal bg-transparent border-none outline-none text-foreground placeholder:text-secondary"
                style={{ letterSpacing: '-1px' }}
                placeholder="0"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[60px]" />

      {/* Proceed Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white">
          <button
            onClick={handleProceed}
            disabled={!isPhoneComplete || isLoading}
            className="w-full h-14 rounded-none flex items-center justify-between px-6 disabled:cursor-not-allowed bg-white"
            style={{ backgroundColor: 'white' }}
          >
            <span className="text-[24px] font-bold tracking-[1.5px] uppercase text-black">
              {isLoading ? "Sending..." : "Proceed"}
            </span>
            <div className="w-12 h-12 flex items-center justify-center border border-black">
              <ArrowRight className="w-5 h-5 text-black" />
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="mt-8 flex items-center justify-center gap-2 animate-fade-in" 
        style={{ animationDelay: '0.6s' }}
      >
        <span className="text-[12px] text-secondary tracking-[0.6px] uppercase font-normal">
          Secure Access
        </span>
        <span className="text-[12px] text-secondary">•</span>
        <span className="text-[12px] text-secondary tracking-[0.6px] uppercase font-normal">
          Privacy Ensured
        </span>
      </div>
    </div>
  );
}
