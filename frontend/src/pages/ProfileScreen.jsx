import { useState, useEffect } from "react";
import { ArrowRight, Eye, EyeOff, User, Building2, GraduationCap, Stethoscope, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

// Role options with icons
const roleOptions = [
  {
    id: "individual",
    title: "Individual",
    description: "Personal volunteer account",
    icon: User
  },
  {
    id: "ngo",
    title: "NGO",
    description: "Animal Welfare Organization",
    icon: Building2
  },
  {
    id: "school",
    title: "School",
    description: "Educational Institution",
    icon: GraduationCap
  },
  {
    id: "veterinarian",
    title: "Veterinarian",
    description: "Veterinary Clinic",
    icon: Stethoscope
  }
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showAddress, setShowAddress] = useState(true); // Show address by default
  const [pageLoaded, setPageLoaded] = useState(false);
  
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    address: "",
    district: ""
  });

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-populate location on mount
  useEffect(() => {
    handleAutoPopulate();
  }, []);

  const handleAutoPopulate = () => {
    // Don't run if already locating
    if (isLocating) return;
    
    setIsLocating(true);
    
    // Try to get actual geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In production, you would use reverse geocoding here
          // For now, simulate with mock data based on actual coords
          console.log("Got coordinates:", position.coords.latitude, position.coords.longitude);
          
          setFormData(prev => ({
            ...prev,
            address: "123 MG Road, Koramangala",
            district: "Bangalore Urban"
          }));
          setIsLocating(false);
          toast.success("Location detected successfully");
        },
        (error) => {
          console.log("Geolocation error, using fallback:", error.message);
          // Fallback to mock data
          setFormData(prev => ({
            ...prev,
            address: "123 MG Road, Koramangala",
            district: "Bangalore Urban"
          }));
          setIsLocating(false);
          toast.success("Location detected successfully");
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      // Browser doesn't support geolocation, use mock data
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          address: "123 MG Road, Koramangala",
          district: "Bangalore Urban"
        }));
        setIsLocating(false);
        toast.success("Location detected successfully");
      }, 1500);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoleSelect = (roleId) => {
    setFormData(prev => ({
      ...prev,
      role: roleId
    }));
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
    <div className={`min-h-screen min-h-dvh bg-background flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10 safe-area-top safe-area-bottom max-w-lg mx-auto w-full transition-opacity duration-500 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Logo - Paw icon in square border */}
      <div className={`w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center transition-all duration-500 delay-100 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
      </div>

      {/* Title Section */}
      <div className={`mt-6 sm:mt-8 transition-all duration-500 delay-200 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">
          Rapid
        </h1>
        <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
          Response Team
        </h2>
      </div>

      {/* Role Selection Section */}
      <div className={`mt-6 sm:mt-8 transition-all duration-500 delay-300 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          How would you like to use PFA?
        </h3>
        <p className="text-sm text-secondary mt-2">
          Choose the option that best describes you
        </p>
      </div>

      {/* Role Cards */}
      <div className={`mt-5 grid grid-cols-2 gap-3 transition-all duration-500 delay-400 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        {roleOptions.map((role, index) => {
          const Icon = role.icon;
          const isSelected = formData.role === role.id;
          
          return (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`relative p-4 border transition-all duration-200 flex flex-col items-center text-center ${
                isSelected 
                  ? 'border-white bg-white/10' 
                  : 'border-accent hover:border-white/50 hover:bg-white/5'
              }`}
              style={{
                transitionDelay: `${400 + (index * 50)}ms`
              }}
            >
              {/* Selected checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" />
                </div>
              )}
              
              {/* Icon */}
              <div className={`w-12 h-12 border flex items-center justify-center mb-3 ${
                isSelected ? 'border-white' : 'border-accent'
              }`}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-secondary'}`} />
              </div>
              
              {/* Title */}
              <h4 className={`text-base font-bold ${isSelected ? 'text-white' : 'text-foreground'}`}>
                {role.title}
              </h4>
              
              {/* Description */}
              <p className={`text-xs mt-1 ${isSelected ? 'text-white/70' : 'text-secondary'}`}>
                {role.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Form Section */}
      <div className={`mt-6 space-y-4 flex-1 transition-all duration-500 delay-500 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
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
      <div className={`mt-6 transition-all duration-500 delay-600 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
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
      <div className={`mt-4 flex items-center justify-center gap-2 transition-all duration-500 delay-700 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
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
