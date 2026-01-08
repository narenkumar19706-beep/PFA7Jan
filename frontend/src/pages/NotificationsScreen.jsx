import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, ArrowRight, CheckCircle, UserPlus } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";
import { useLanguage } from "@/context/LanguageContext";

// Mock notifications data
const initialNotifications = [
  {
    id: 1,
    type: "alert_attending",
    titleKey: "alertAttending",
    titleParams: { name: "Ananya Rao" },
    subtitle: "Bangalore District",
    time: "5m",
    icon: "megaphone",
    iconBg: "#FFCDD2",
    iconColor: "#C62828",
    action: "view",
  },
  {
    id: 2,
    type: "new_volunteer",
    titleKey: "newVolunteerJoined",
    subtitle: "Indiranagar Team",
    time: "2h",
    icon: "user",
    iconBg: "#333333",
    iconColor: "#FFFFFF",
    action: "dismiss",
  },
  {
    id: 3,
    type: "alert_resolved",
    titleKey: "alertResolved",
    titleParams: { location: "Mysore Road" },
    subtitle: "Status updated",
    time: "1d",
    icon: "check",
    iconBg: "#C8E6C9",
    iconColor: "#2E7D32",
    action: "none",
  },
];

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isHindi } = useLanguage();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [hasNotification, setHasNotification] = useState(true);

  const handleViewAlert = (notification) => {
    toast.success(t('viewAlert'));
    navigate("/sos");
  };

  const handleDismiss = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.success(t('dismiss'));
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case "megaphone":
        return <Megaphone className="w-6 h-6" />;
      case "user":
        return <UserPlus className="w-6 h-6" />;
      case "check":
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Bell className="w-6 h-6" />;
    }
  };

  // Get notification title text based on type
  const getNotificationTitle = (notification) => {
    if (isHindi) {
      switch (notification.type) {
        case "alert_attending":
          return `${notification.titleParams?.name || 'कोई'} आपके अलर्ट पर आ रहे हैं`;
        case "new_volunteer":
          return "नया वॉलंटियर आपके जिले में जुड़ा";
        case "alert_resolved":
          return `अलर्ट हल हो गया: ${notification.titleParams?.location || ''}`;
        default:
          return notification.subtitle;
      }
    } else {
      switch (notification.type) {
        case "alert_attending":
          return `${notification.titleParams?.name || 'Someone'} is attending your alert`;
        case "new_volunteer":
          return "New volunteer joined your district";
        case "alert_resolved":
          return `Alert Resolved: ${notification.titleParams?.location || ''}`;
        default:
          return notification.subtitle;
      }
    }
  };

  const navItems = [
    { id: 'home', icon: Home, labelKey: 'navHome', path: '/home' },
    { id: 'community', icon: Users, labelKey: 'navCommunity', path: '/community' },
    { id: 'sos', icon: Megaphone, labelKey: 'navSOS', path: '/sos' },
    { id: 'profile', icon: User, labelKey: 'navProfile', path: '/user-profile' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header with Logo and Bell */}
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-[#333333] bg-[#1A1A1A] flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          {/* Notification Bell */}
          <button 
            className="relative p-2"
            onClick={() => {
              setHasNotification(false);
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
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">
            {t('appName')}
          </h1>
          <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
            {t('appSubtitle')}
          </h2>
        </div>

        {/* Tagline with Red Border */}
        <div className="mt-6 sm:mt-8 border-l-4 border-[#E53935] pl-4">
          <p className="text-sm sm:text-base text-[#E0E0E0] uppercase tracking-wider">
            {t('tagline')}
          </p>
          <p className="text-xs sm:text-sm text-[#E0E0E0] uppercase tracking-wider mt-1">
            {t('taglineSubtext')}
          </p>
        </div>

        {/* Notifications Title */}
        <div className="mt-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Notifications
          </h3>
        </div>

        {/* Notification Cards */}
        <div className="mt-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <Bell className="w-12 h-12 text-secondary mx-auto mb-4 opacity-50" />
              <p className="text-secondary">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4"
              >
                {/* Top Row - Icon, Text, Timestamp */}
                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: notification.iconBg }}
                  >
                    <div style={{ color: notification.iconColor }}>
                      {getIcon(notification.icon)}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-secondary mt-0.5">
                      {notification.subtitle}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <span className="text-xs text-secondary flex-shrink-0">
                    {notification.time}
                  </span>
                </div>

                {/* Action Button */}
                {notification.action !== "none" && (
                  <div className="mt-4">
                    {notification.action === "view" ? (
                      <button
                        onClick={() => handleViewAlert(notification)}
                        className="w-full h-11 bg-white rounded flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                      >
                        <span className="text-sm font-bold text-[#0D0D0D] tracking-wide uppercase">
                          View Alert
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#0D0D0D]" />
                      </button>
                    ) : notification.action === "dismiss" ? (
                      <button
                        onClick={() => handleDismiss(notification.id)}
                        className="w-full h-11 bg-[#333333] rounded flex items-center justify-center gap-2 hover:bg-[#3a3a3a] transition-colors"
                      >
                        <span className="text-sm font-bold text-foreground tracking-wide uppercase">
                          Dismiss
                        </span>
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[#333333] safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-[#1A1A1A]' : 'hover:bg-white/5'
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
