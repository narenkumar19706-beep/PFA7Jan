import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, MapPin, Navigation, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

// Mock SOS alerts data
const alertsData = {
  current: [
    {
      id: 1,
      name: "Ananya Rao",
      initials: "AR",
      location: "from Bengaluru District",
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
      name: "Priya Sharma",
      initials: "PS",
      location: "from Koramangala",
      distance: "3km away",
      isAttending: false,
      resolved: true,
    },
  ],
  myAlerts: [
    {
      id: 4,
      name: "You",
      initials: "ME",
      location: "from MG Road",
      distance: "0km",
      isAttending: false,
      isOwn: true,
    },
  ],
};

export default function SOSHistoryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('current');
  const [alerts, setAlerts] = useState(alertsData);
  const [hasNotification, setHasNotification] = useState(true);

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
    toast.success(`Opening chat with ${alert.name}...`);
  };

  const getAlertsByTab = () => {
    switch (activeTab) {
      case 'current':
        return alerts.current;
      case 'past':
        return alerts.past;
      case 'myAlerts':
        return alerts.myAlerts;
      default:
        return alerts.current;
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME', path: '/home' },
    { id: 'community', icon: Users, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: Megaphone, label: 'SOS', path: '/sos' },
    { id: 'profile', icon: User, label: 'PROFILE', path: '/user-profile' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header with Logo and Bell */}
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent bg-[#262626] flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          {/* Notification Bell */}
          <button 
            className="relative p-2"
            onClick={() => {
              setHasNotification(false);
              toast.info("No new notifications");
            }}
          >
            <Bell className="w-6 h-6 text-foreground" />
            {hasNotification && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-[#E53935] rounded-full" />
            )}
          </button>
        </div>

        {/* Title Section */}
        <div className="mt-6 sm:mt-8">
          <h1 
            className="text-4xl sm:text-5xl font-bold text-foreground leading-none"
            style={{ letterSpacing: '-1px' }}
          >
            Rapid
          </h1>
          <h2 
            className="text-2xl sm:text-3xl font-normal text-secondary leading-none mt-1"
            style={{ letterSpacing: '-0.5px' }}
          >
            Response Team
          </h2>
        </div>

        {/* SOS Alerts Header */}
        <div className="mt-6 sm:mt-8 flex items-center gap-2">
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
                ? 'bg-white text-black'
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
          {getAlertsByTab().length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-secondary">No alerts in this category</p>
            </div>
          ) : (
            getAlertsByTab().map((alert) => (
              <div 
                key={alert.id}
                className="bg-[#202020] border border-[#333333] rounded-lg p-4"
              >
                {/* Top Row - Avatar, Name, Location, Distance */}
                <div className="flex items-start gap-3">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#333333] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl font-bold text-foreground">
                      {alert.initials}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-bold text-foreground">
                      {alert.name}
                    </h4>
                    <p className="text-sm text-secondary mt-0.5">
                      {alert.location}
                    </p>
                  </div>

                  {/* Distance Badge */}
                  <div className="bg-[#333333] rounded-lg px-3 py-1.5 flex items-center gap-1.5 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-foreground" />
                    <span className="text-sm font-semibold text-foreground">
                      {alert.distance}
                    </span>
                  </div>
                </div>

                {/* Bottom Row - Actions */}
                <div className="mt-4 flex items-center gap-2">
                  {/* Attending Button */}
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

                  {/* Navigate Button */}
                  <button
                    onClick={() => handleNavigate(alert)}
                    className="w-10 h-10 sm:w-11 sm:h-11 bg-[#202020] border border-[#333333] rounded-lg flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
                  >
                    <Navigation className="w-5 h-5 text-foreground" />
                  </button>

                  {/* Message Button */}
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
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-accent safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            const isSOS = item.id === 'sos';
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                  isSOS && isActive
                    ? 'bg-[#E53935]'
                    : isActive 
                    ? 'bg-[#2A2A2A]' 
                    : 'hover:bg-white/5'
                }`}
              >
                <Icon 
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isActive ? 'text-foreground' : 'text-secondary'
                  }`} 
                />
                <span 
                  className={`text-[10px] sm:text-xs mt-1 tracking-[0.5px] ${
                    isActive ? 'text-foreground font-bold' : 'text-secondary font-normal'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
