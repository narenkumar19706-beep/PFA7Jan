import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Global location data
const LocationContext = createContext(null);

// Default location data
const DEFAULT_LOCATION = {
  address: "123 MG Road, Koramangala",
  district: "Bangalore Urban",
  isDetected: false
};

export function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    address: "",
    district: "",
    isDetected: false
  });
  const [isLocating, setIsLocating] = useState(true);

  // Auto-detect location on app start
  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    setIsLocating(true);
    
    // Simulate location detection with a short delay
    setTimeout(() => {
      setLocation({
        address: DEFAULT_LOCATION.address,
        district: DEFAULT_LOCATION.district,
        isDetected: true
      });
      setIsLocating(false);
      toast.success("Location detected successfully");
    }, 800);
  };

  const refreshLocation = () => {
    if (isLocating) return;
    
    setIsLocating(true);
    
    setTimeout(() => {
      setLocation({
        address: DEFAULT_LOCATION.address,
        district: DEFAULT_LOCATION.district,
        isDetected: true
      });
      setIsLocating(false);
      toast.success("Location updated successfully");
    }, 800);
  };

  const updateLocation = (newLocation) => {
    setLocation(prev => ({
      ...prev,
      ...newLocation,
      isDetected: true
    }));
  };

  return (
    <LocationContext.Provider value={{
      location,
      isLocating,
      detectLocation,
      refreshLocation,
      updateLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
}

// Hook to use location
export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    // Return default values if used outside provider
    return {
      location: DEFAULT_LOCATION,
      isLocating: false,
      detectLocation: () => {},
      refreshLocation: () => {},
      updateLocation: () => {}
    };
  }
  return context;
}

export default LocationContext;
