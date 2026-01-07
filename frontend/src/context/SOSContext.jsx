import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SOSContext = createContext(null);

const SOS_STORAGE_KEY = 'pfa_sos_state';

export function SOSProvider({ children }) {
  const [sosState, setSOSState] = useState({
    isActive: false,
    activatedAt: null,
    initiator: null,
    location: null
  });

  // Load SOS state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SOS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if SOS is still active (not stale)
        if (parsed.isActive && parsed.activatedAt) {
          setSOSState(parsed);
        } else {
          localStorage.removeItem(SOS_STORAGE_KEY);
        }
      } catch (e) {
        localStorage.removeItem(SOS_STORAGE_KEY);
      }
    }
  }, []);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === SOS_STORAGE_KEY) {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setSOSState(parsed);
          } catch (err) {
            console.error('Error parsing SOS state:', err);
          }
        } else {
          // SOS was cleared
          setSOSState({
            isActive: false,
            activatedAt: null,
            initiator: null,
            location: null
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Activate SOS
  const activateSOS = useCallback((initiatorData, locationData) => {
    const newState = {
      isActive: true,
      activatedAt: Date.now(),
      initiator: initiatorData,
      location: locationData
    };
    
    setSOSState(newState);
    localStorage.setItem(SOS_STORAGE_KEY, JSON.stringify(newState));
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('sosStateChange', { detail: newState }));
  }, []);

  // Deactivate SOS - immediately clears for all users
  const deactivateSOS = useCallback(() => {
    const newState = {
      isActive: false,
      activatedAt: null,
      initiator: null,
      location: null
    };
    
    setSOSState(newState);
    localStorage.removeItem(SOS_STORAGE_KEY);
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('sosStateChange', { detail: newState }));
  }, []);

  // Listen for custom events (same-tab sync)
  useEffect(() => {
    const handleSOSChange = (e) => {
      setSOSState(e.detail);
    };

    window.addEventListener('sosStateChange', handleSOSChange);
    return () => window.removeEventListener('sosStateChange', handleSOSChange);
  }, []);

  // Calculate elapsed time since activation
  const getElapsedTime = useCallback(() => {
    if (!sosState.isActive || !sosState.activatedAt) {
      return 0;
    }
    return Math.floor((Date.now() - sosState.activatedAt) / 1000);
  }, [sosState.isActive, sosState.activatedAt]);

  return (
    <SOSContext.Provider value={{
      sosState,
      isSOSActive: sosState.isActive,
      activatedAt: sosState.activatedAt,
      activateSOS,
      deactivateSOS,
      getElapsedTime
    }}>
      {children}
    </SOSContext.Provider>
  );
}

export function useSOS() {
  const context = useContext(SOSContext);
  if (!context) {
    throw new Error('useSOS must be used within a SOSProvider');
  }
  return context;
}

export default SOSContext;
