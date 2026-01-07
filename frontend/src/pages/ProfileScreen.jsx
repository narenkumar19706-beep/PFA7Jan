import { useState, useEffect } from "react";
import { ArrowRight, Eye, EyeOff, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    address: "",
    district: ""
  });

  const roles = [
    "Volunteer",
    "Coordinator",
    "Veterinarian",
    "Rescuer",
    "Foster Parent",
    "Donor"
  ];

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

  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      role: role
    }));
    setIsRoleDropdownOpen(false);
  };

  const handleCreateAccount = () => {
    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }
    
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - Mock functionality
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to account success screen
      navigate("/account-success");
    }, 1500);
  };

  const isFormValid = formData.role !== "" && formData.fullName.trim() !== "";

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10 safe-area-top safe-area-bottom max-w-lg mx-auto w-full">
      {/* Logo - Paw icon in square border */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
        <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
      </div>

      {/* Title Section */}
      <div className="mt-6 sm:mt-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground italic leading-none">
          Rapid
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary leading-none mt-1">
          Response Team
        </h2>
      </div>

      {/* Tagline */}
      <div className="mt-4 sm:mt-6">
        <p className="text-base sm:text-lg text-foreground font-medium">
          where empathy meets action.
        </p>
        <p className="text-xs text-secondary tracking-[0.15em] uppercase mt-1">
          A COLLECTIVE FOR THE CONSCIOUS CITIZEN.
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 flex-1">
        
        {/* Role Dropdown */}
        <div>
          <label className="text-xs text-secondary tracking-[0.2em] uppercase block mb-2">
            ROLE
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="w-full h-14 px-4 bg-transparent border border-accent text-left flex items-center justify-between focus:outline-none focus:border-foreground transition-colors"
            >
              <span className={formData.role ? "text-foreground" : "text-secondary/70"}>
                {formData.role || "Select Role"}
              </span>
              <ChevronDown className={`w-5 h-5 text-secondary transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isRoleDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1A1A] border border-accent z-50 max-h-48 overflow-y-auto">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className="w-full px-4 py-3 text-left text-foreground hover:bg-white/10 transition-colors border-b border-accent/50 last:border-b-0"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="text-xs text-secondary tracking-[0.2em] uppercase block mb-2">
            FULL NAME
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Your Name"
            className="w-full h-14 px-4 bg-transparent border border-accent text-foreground placeholder-secondary/70 focus:outline-none focus:border-foreground transition-colors"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="text-xs text-secondary tracking-[0.2em] uppercase block mb-2">
            EMAIL ADDRESS <span className="text-secondary/70">(OPTIONAL)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="name@example.com"
            className="w-full h-14 px-4 bg-transparent border border-accent text-foreground placeholder-secondary/70 focus:outline-none focus:border-foreground transition-colors"
          />
        </div>

        {/* Address */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-secondary tracking-[0.2em] uppercase">
              ADDRESS
            </label>
            <button 
              onClick={handleAutoPopulate}
              disabled={isLocating}
              className="px-3 py-1 bg-transparent border border-accent text-[10px] text-secondary tracking-[0.1em] uppercase hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              {isLocating ? "DETECTING..." : "AUTO POPULATE"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showAddress ? "text" : "password"}
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder={isLocating ? "Detecting location..." : "Your Address"}
              className="w-full h-14 px-4 pr-12 bg-transparent border border-accent text-foreground placeholder-secondary/70 focus:outline-none focus:border-foreground transition-colors"
              readOnly={isLocating}
            />
            <button
              type="button"
              onClick={() => setShowAddress(!showAddress)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground transition-colors"
            >
              {showAddress ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* District */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-secondary tracking-[0.2em] uppercase">
              DISTRICT
            </label>
            <button 
              onClick={handleAutoPopulate}
              disabled={isLocating}
              className="px-3 py-1 bg-transparent border border-accent text-[10px] text-secondary tracking-[0.1em] uppercase hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              {isLocating ? "DETECTING..." : "AUTO POPULATE"}
            </button>
          </div>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => handleInputChange("district", e.target.value)}
            placeholder={isLocating ? "Detecting..." : "Autofilled district"}
            className="w-full h-14 px-4 bg-transparent border border-accent text-foreground placeholder-secondary/70 focus:outline-none focus:border-foreground transition-colors"
            readOnly={isLocating}
          />
        </div>
      </div>

      {/* Create Account Button */}
      <div className="mt-6">
        <button
          onClick={handleCreateAccount}
          disabled={!isFormValid || isLoading}
          className="w-full h-14 bg-white flex items-center justify-between px-4 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-black">
            {isLoading ? "Creating..." : "CREATE ACCOUNT"}
          </span>
          <div className="w-10 h-10 flex items-center justify-center border border-black">
            <ArrowRight className="w-4 h-4 text-black" />
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-[10px] text-secondary tracking-[0.15em] uppercase">
          SECURE ACCESS
        </span>
        <span className="text-[10px] text-secondary">•</span>
        <span className="text-[10px] text-secondary tracking-[0.15em] uppercase">
          PRIVACY ENSURED
        </span>
      </div>
    </div>
  );
}
