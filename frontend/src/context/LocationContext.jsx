import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const LocationContext = createContext(null);

// Fallback location (used only if everything fails)
const FALLBACK_LOCATION = {
  address: "Location unavailable",
  district: "Unknown",
  isDetected: false
};

export function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    address: "",
    district: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    fullAddress: "",
    coords: null,
    isDetected: false
  });
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState(null);

  // Reverse geocode coordinates to get address using free API
  const reverseGeocode = async (latitude, longitude) => {
    try {
      // Using OpenStreetMap Nominatim API (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'RapidResponseTeamPWA/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      
      if (data && data.address) {
        const addr = data.address;
        
        // Build a readable address string
        const addressParts = [];
        
        // Street level details
        if (addr.house_number) addressParts.push(addr.house_number);
        if (addr.road || addr.street) addressParts.push(addr.road || addr.street);
        if (addr.neighbourhood || addr.suburb) addressParts.push(addr.neighbourhood || addr.suburb);
        
        // Area/locality
        const area = addr.suburb || addr.neighbourhood || addr.village || addr.town || '';
        
        // City
        const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || '';
        
        // District
        const district = addr.state_district || addr.district || addr.county || city;
        
        // State
        const state = addr.state || '';
        
        // Country
        const country = addr.country || '';
        
        // Pincode
        const pincode = addr.postcode || '';
        
        // Build full address
        let fullAddress = addressParts.join(', ');
        if (area && !fullAddress.includes(area)) fullAddress += (fullAddress ? ', ' : '') + area;
        if (city && !fullAddress.includes(city)) fullAddress += (fullAddress ? ', ' : '') + city;
        
        // Build display address (shorter version for input field)
        let displayAddress = '';
        if (addr.road || addr.street) {
          displayAddress = addr.road || addr.street;
          if (addr.neighbourhood || addr.suburb) {
            displayAddress += ', ' + (addr.neighbourhood || addr.suburb);
          }
        } else if (addr.neighbourhood || addr.suburb) {
          displayAddress = addr.neighbourhood || addr.suburb;
        } else if (area) {
          displayAddress = area;
        }
        if (city && !displayAddress.includes(city)) {
          displayAddress += (displayAddress ? ', ' : '') + city;
        }
        
        return {
          address: displayAddress || fullAddress || data.display_name,
          district: district,
          city: city,
          state: state,
          country: country,
          pincode: pincode,
          fullAddress: data.display_name,
          coords: { lat: latitude, lng: longitude },
          isDetected: true
        };
      }
      
      throw new Error('No address found');
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      // Return basic coords-based info if geocoding fails
      return {
        address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
        district: "Location detected",
        city: "",
        state: "",
        country: "",
        pincode: "",
        fullAddress: "",
        coords: { lat: latitude, lng: longitude },
        isDetected: true
      };
    }
  };

  // Detect location using browser geolocation API
  const detectLocation = useCallback(async () => {
    setIsLocating(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      toast.error('Geolocation not supported');
      setIsLocating(false);
      return;
    }
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 60000 // Cache for 1 minute
          }
        );
      });
      
      const { latitude, longitude } = position.coords;
      
      // Get address from coordinates
      const locationData = await reverseGeocode(latitude, longitude);
      
      setLocation(locationData);
      setIsLocating(false);
      toast.success('Location detected successfully');
      
      return locationData;
    } catch (err) {
      console.error('Location detection error:', err);
      setIsLocating(false);
      
      let errorMessage = 'Failed to detect location';
      if (err.code === 1) {
        errorMessage = 'Location access denied. Please enable location permissions.';
      } else if (err.code === 2) {
        errorMessage = 'Location unavailable. Please try again.';
      } else if (err.code === 3) {
        errorMessage = 'Location request timed out. Please try again.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      return null;
    }
  }, []);

  // Auto-detect on mount
  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  // Refresh location (re-detect)
  const refreshLocation = useCallback(() => {
    return detectLocation();
  }, [detectLocation]);

  // Manually update location
  const updateLocation = useCallback((newLocation) => {
    setLocation(prev => ({
      ...prev,
      ...newLocation,
      isDetected: true
    }));
  }, []);

  return (
    <LocationContext.Provider value={{
      location,
      isLocating,
      error,
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
    return {
      location: FALLBACK_LOCATION,
      isLocating: false,
      error: null,
      detectLocation: () => {},
      refreshLocation: () => {},
      updateLocation: () => {}
    };
  }
  return context;
}

export default LocationContext;
