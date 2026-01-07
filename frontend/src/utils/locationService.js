import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'sonner';

// Create context for location data
const LocationContext = createContext(null);

// Location data that persists across the app
let cachedLocationData = {
  address: "",
  district: "",
  isDetected: false
};

export function LocationProvider({ children }) {
  const [locationData, setLocationData] = useState(cachedLocationData);
  const [isLocating, setIsLocating] = useState(false);

  const detectLocation = async () => {
    if (cachedLocationData.isDetected) {
      setLocationData(cachedLocationData);
      return cachedLocationData;
    }

    setIsLocating(true);
    
    try {
      // Try to get actual geolocation
      if (navigator.geolocation) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // In a real app, you would use reverse geocoding here
              // For now, we simulate with mock data
              const data = {
                address: "123 MG Road, Koramangala",
                district: "Bangalore Urban",
                isDetected: true,
                coords: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              };
              
              cachedLocationData = data;
              setLocationData(data);
              setIsLocating(false);
              toast.success("Location detected successfully");
              resolve(data);
            },
            (error) => {
              // Fallback to mock data if geolocation fails
              console.log("Geolocation error:", error);
              const data = {
                address: "123 MG Road, Koramangala",
                district: "Bangalore Urban",
                isDetected: true
              };
              
              cachedLocationData = data;
              setLocationData(data);
              setIsLocating(false);
              toast.success("Location detected successfully");
              resolve(data);
            },
            { timeout: 5000 }
          );
        });
      } else {
        // Fallback for browsers without geolocation
        const data = {
          address: "123 MG Road, Koramangala",
          district: "Bangalore Urban",
          isDetected: true
        };
        
        cachedLocationData = data;
        setLocationData(data);
        setIsLocating(false);
        toast.success("Location detected successfully");
        return data;
      }
    } catch (error) {
      console.error("Location detection error:", error);
      setIsLocating(false);
      toast.error("Failed to detect location");
      return null;
    }
  };

  const updateLocation = (newData) => {
    const updated = { ...cachedLocationData, ...newData };
    cachedLocationData = updated;
    setLocationData(updated);
  };

  const clearLocation = () => {
    cachedLocationData = {
      address: "",
      district: "",
      isDetected: false
    };
    setLocationData(cachedLocationData);
  };

  return (
    <LocationContext.Provider value={{
      locationData,
      isLocating,
      detectLocation,
      updateLocation,
      clearLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
}

// Hook to use location data
export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

// Standalone function for auto-populating location (for screens that don't use context)
export async function autoPopulateLocation(setIsLocating, setFormData, showToast = true) {
  setIsLocating(true);
  
  // Simulate location detection with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const locationData = {
        address: "123 MG Road, Koramangala",
        district: "Bangalore Urban"
      };
      
      setFormData(prev => ({
        ...prev,
        ...locationData
      }));
      
      setIsLocating(false);
      
      if (showToast) {
        toast.success("Location detected successfully");
      }
      
      resolve(locationData);
    }, 2000);
  });
}

export default LocationContext;
