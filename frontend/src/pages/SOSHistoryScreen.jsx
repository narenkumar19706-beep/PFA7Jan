import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, MapPin, Navigation, MessageSquare, Clock, CheckCircle, Users } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";
import BottomNav from "@/components/BottomNav";

// Mock SOS alerts data - will be updated with detected location
const getAlertsData = (district) => ({
  current: [
    {
      id: 1,
      name: "Ananya Rao",
      initials: "AR",
      location: `from ${district}`,
      distance: "2km away",
      isAttending: true,
    },
    {
      id: 2,
      name: "Karan Johar",
      initials: "KJ",
      location: "from Indiranagar",
      distance: "4km away",
      isAttending: false,
    },
  ],
  past: [
    {
      id: 3,
      location: "from Mysore Road",
      resolved: true,
      closed: true,
    },
    {
      id: 4,
      location: "from Indiranagar",
      resolved: true,
      closed: true,
    },
    {
      id: 5,
      location: "from J.P. Nagar",
      resolved: true,
      closed: true,
    },
  ],
  myAlerts: {
    active: {
      id: 6,
      location: `from ${district}`,
      distance: "2km away",
      attendingCount: 3,
    },
    history: [
      {
        id: 7,
        location: "from Mysore Road",
        resolved: true,
        closed: true,
      },
      {
        id: 8,
        location: "from Indiranagar",
        resolved: true,
        closed: true,
      },
    ],
  },
});

export default function SOSHistoryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('current');
  const [userDistrict, setUserDistrict] = useState("Bangalore Urban");
  const [isLocating, setIsLocating] = useState(false);
  const [alerts, setAlerts] = useState(getAlertsData("Bangalore Urban"));

  // Auto-detect location on mount
  useEffect(() => {
    autoDetectLocation();
  }, []);

  const autoDetectLocation = () => {
    setIsLocating(true);
    
    // Simulate location detection
    setTimeout(() => {
      const district = "Bangalore Urban";
      setUserDistrict(district);
      setAlerts(getAlertsData(district));
      setIsLocating(false);
    }, 1500);
  };

  const handleAttend = (alertId) => {
    setAlerts(prev => ({
      ...prev,
      current: prev.current.map(alert => 
        alert.id === alertId 
          ? { ...alert, isAttending: !alert.isAttending }
          : alert
      )
    }));
    toast.success("Attendance status updated");
  };

  const handleNavigate = (alert) => {
    toast.info(`Opening navigation to ${alert.name}'s location...`);
  };

  const handleMessage = (alert) => {
    navigate("/chat", { 
      state: { 
        volunteer: {
          name: alert.name,
          initials: alert.initials,
          status: 'available'
        }
      }
    });
  };

  const handleChat = () => {
    navigate("/chat", { 
      state: { 
        volunteer: {
          name: "Group Chat",
          initials: "GC",
          status: 'available'
        }
      }
    });
  };

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header with Logo and Bell */}
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          {/* Notification Bell */}
          <button 
            className="relative p-2"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Title Section */}
        <div className="mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">
            Rapid
          </h1>
          <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
            Response Team
          </h2>
        </div>

        {/* SOS Alerts Header */}
        <div className="mt-6 flex items-center gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            SOS Alerts
          </h3>
          <span className="w-2 h-2 rounded-full bg-[#E53935]" />
        </div>

        {/* Tab Bar */}
        <div className="mt-4 bg-[#262626] rounded-lg p-1 flex">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold tracking-wide transition-all ${
              activeTab === 'current'
                ? 'bg-white text-black'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            CURRENT
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold tracking-wide transition-all ${
              activeTab === 'past'
                ? 'bg-[#424242] text-white'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            PAST
          </button>
          <button
            onClick={() => setActiveTab('myAlerts')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold tracking-wide transition-all ${
              activeTab === 'myAlerts'
                ? 'bg-white text-black'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            MY ALERTS
          </button>
        </div>

        {/* Alert Cards */}
        <div className="mt-4 space-y-3">
          {activeTab === 'current' && (
            <>
              {alerts.current.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-secondary">No active alerts in your area</p>
                </div>
              ) : (
                alerts.current.map((alert) => (
                  <div 
                    key={alert.id}
                    className="bg-[#202020] border border-[#333333] rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#333333] rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg sm:text-xl font-bold text-foreground">
                          {alert.initials}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl font-bold text-foreground">
                          {alert.name}
                        </h4>
                        <p className="text-sm text-secondary mt-0.5">
                          {alert.location}
                        </p>
                      </div>
                      <div className="bg-[#333333] rounded-lg px-3 py-1.5 flex items-center gap-1.5 flex-shrink-0">
                        <MapPin className="w-4 h-4 text-foreground" />
                        <span className="text-sm font-semibold text-foreground">
                          {alert.distance}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => handleAttend(alert.id)}
                        className={`flex-1 h-10 sm:h-11 rounded-lg font-bold text-sm tracking-wide transition-all ${
                          alert.isAttending
                            ? 'bg-white text-black'
                            : 'bg-[#202020] border border-[#333333] text-foreground hover:bg-[#2a2a2a]'
                        }`}
                      >
                        {alert.isAttending ? 'ATTENDING' : 'ATTEND'}
                      </button>
                      <button
                        onClick={() => handleNavigate(alert)}
                        className="w-10 h-10 sm:w-11 sm:h-11 bg-[#202020] border border-[#333333] rounded-lg flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
                      >
                        <Navigation className="w-5 h-5 text-foreground" />
                      </button>
                      <button
                        onClick={() => handleMessage(alert)}
                        className="w-10 h-10 sm:w-11 sm:h-11 bg-[#202020] border border-[#333333] rounded-lg flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
                      >
                        <MessageSquare className="w-5 h-5 text-foreground" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'past' && (
            <>
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-[#333333]" />
                <span className="text-xs text-secondary tracking-[1px] uppercase">History</span>
                <div className="flex-1 h-px bg-[#333333]" />
              </div>
              
              {alerts.past.map((alert) => (
                <div 
                  key={alert.id}
                  className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg overflow-hidden"
                >
                  <div className="p-4 flex items-center justify-between">
                    <p className="text-base text-secondary">
                      {alert.location}
                    </p>
                    <div className="bg-[#333333] border border-[#424242] rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-secondary">
                        Resolved
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#2A2A2A] px-4 py-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-foreground" />
                    <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                      Closed
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'myAlerts' && (
            <>
              {alerts.myAlerts.active && (
                <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg sm:text-xl font-bold text-foreground">
                      {alerts.myAlerts.active.location}
                    </h4>
                    <div className="bg-[#2A2A2A] rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-semibold text-foreground">
                        {alerts.myAlerts.active.distance}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => toast.info("Viewing attendees...")}
                      className="flex-1 h-11 sm:h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center gap-2"
                    >
                      <Users className="w-5 h-5 text-foreground" />
                      <span className="text-base font-bold text-foreground">
                        {alerts.myAlerts.active.attendingCount} ATTENDING
                      </span>
                    </button>
                    <button
                      onClick={handleChat}
                      className="flex-1 h-11 sm:h-12 bg-white rounded-lg flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5 text-black" />
                      <span className="text-base font-bold text-black">
                        CHAT
                      </span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 py-2 mt-2">
                <div className="flex-1 h-px bg-[#333333]" />
                <span className="text-xs text-secondary tracking-[1px] uppercase">History</span>
                <div className="flex-1 h-px bg-[#333333]" />
              </div>

              {alerts.myAlerts.history.map((alert) => (
                <div 
                  key={alert.id}
                  className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg overflow-hidden"
                >
                  <div className="p-4 flex items-center justify-between">
                    <p className="text-base text-secondary">
                      {alert.location}
                    </p>
                    <div className="bg-[#333333] border border-[#424242] rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-secondary">
                        Resolved
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#2A2A2A] px-4 py-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-foreground" />
                    <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                      Closed
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activePath="/sos" />
    </div>
  );
}
