import { useState, useEffect } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    district: ""
  });

  // Auto-populate location on mount
  useEffect(() => {
    handleAutoPopulate();
  }, []);

  const handleAutoPopulate = () => {
    setIsLocating(true);
    
    // Simulate location detection - Mock functionality
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        address: "123 MG Road, Koramangala",
        district: "Bangalore Urban"
      }));
      setIsLocating(false);
      toast.success("Location detected successfully");
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateAccount = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - Mock functionality
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      navigate("/home");
    }, 1500);
  };

  const isFormValid = formData.fullName.trim() !== "";

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
      <div className="mt-6 sm:mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-none"
          style={{ letterSpacing: '-1.5px' }}
        >
          Rapid
        </h1>
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-secondary leading-none mt-1 sm:mt-2"
          style={{ letterSpacing: '-1px' }}
        >
          Response Team
        </h2>
      </div>

      {/* Tagline */}
      <div className="mt-6 sm:mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <p 
          className="text-lg sm:text-xl md:text-2xl text-foreground font-normal leading-snug"
          style={{ letterSpacing: '-0.5px' }}
        >
          where empathy meets action.
        </p>
        <p className="text-xs sm:text-sm text-secondary tracking-[1.2px] mt-2 uppercase font-normal">
          A collective for the conscious citizen.
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        
        {/* Full Name */}
        <div>
          <label className="text-xs sm:text-sm text-foreground tracking-[0.5px] uppercase font-bold">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Your Name"
            className="profile-input mt-2 sm:mt-3"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="text-xs sm:text-sm text-foreground tracking-[0.5px] uppercase font-bold">
            Email Address <span className="text-secondary font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="name@example.com"
            className="profile-input mt-2 sm:mt-3"
          />
        </div>

        {/* Address */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm text-foreground tracking-[0.5px] uppercase font-bold">
              Address
            </label>
            <button 
              onClick={handleAutoPopulate}
              disabled={isLocating}
              className="auto-populate-badge"
            >
              {isLocating ? "DETECTING..." : "AUTO POPULATE"}
            </button>
          </div>
          <div className="relative mt-2 sm:mt-3">
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder={isLocating ? "Detecting location..." : "Your Address"}
              className="profile-input pr-12"
              readOnly={isLocating}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <MapPin className="w-5 h-5 text-foreground" />
            </div>
          </div>
        </div>

        {/* District */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm text-foreground tracking-[0.5px] uppercase font-bold">
              District
            </label>
            <button 
              onClick={handleAutoPopulate}
              disabled={isLocating}
              className="auto-populate-badge"
            >
              {isLocating ? "DETECTING..." : "AUTO POPULATE"}
            </button>
          </div>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => handleInputChange("district", e.target.value)}
            placeholder={isLocating ? "Detecting..." : "Autofilled district"}
            className="profile-input mt-2 sm:mt-3"
            readOnly={isLocating}
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[20px] sm:min-h-[40px]" />

      {/* Create Account Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white rounded-none">
          <button
            onClick={handleCreateAccount}
            disabled={!isFormValid || isLoading}
            className="w-full h-12 sm:h-14 rounded-none flex items-center justify-between px-4 sm:px-6 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
            style={{ backgroundColor: 'white' }}
          >
            <span className="text-base sm:text-lg md:text-xl font-bold tracking-[1px] uppercase text-black">
              {isLoading ? "Creating..." : "Create Account"}
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
