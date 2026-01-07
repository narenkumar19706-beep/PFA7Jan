import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

// Mock volunteer data
const volunteers = [
  {
    id: 1,
    name: "Ananya Rao",
    status: "available",
    statusText: "Available Now",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    bgColor: "#29B6F6"
  },
  {
    id: 2,
    name: "Arjun Nair",
    status: "busy",
    statusText: "Busy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    bgColor: "#00BCD4"
  },
  {
    id: 3,
    name: "Meera Iyer",
    status: "available",
    statusText: "Available Now",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    bgColor: "#009688"
  },
  {
    id: 4,
    name: "Vikram Singh",
    status: "offline",
    statusText: "Offline",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    bgColor: "#7CB342"
  }
];

export default function CommunityScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasNotification, setHasNotification] = useState(true);

  const handleMessage = (volunteer) => {
    navigate("/chat", { 
      state: { 
        volunteer: {
          name: volunteer.name,
          initials: volunteer.name.split(' ').map(n => n[0]).join(''),
          status: volunteer.status
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#4CAF50'; // Green
      case 'busy':
        return '#FF9800'; // Orange
      case 'offline':
        return '#9E9E9E'; // Gray
      default:
        return '#9E9E9E';
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
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent bg-[#2A2A2A] flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          {/* Notification Bell */}
          <button 
            className="relative p-2"
            onClick={() => {
              navigate("/notifications");
            }}
          >
            <Bell className="w-6 h-6 text-foreground" />
            {hasNotification && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
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

        {/* Location Info */}
        <div className="mt-6 sm:mt-8">
          <p className="text-base sm:text-lg text-foreground">
            Local Volunteer Network
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
            Bengaluru District
          </h3>
          <p className="text-xs sm:text-sm text-secondary tracking-[1px] mt-4 uppercase">
            Volunteers in your area
          </p>
        </div>

        {/* Volunteer List */}
        <div className="mt-6 space-y-3 sm:space-y-4">
          {volunteers.map((volunteer) => (
            <div 
              key={volunteer.id}
              className="bg-[#2A2A2A] rounded-lg p-4 flex items-center gap-4"
            >
              {/* Profile Image */}
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ backgroundColor: volunteer.bgColor }}
              >
                <img 
                  src={volunteer.avatar} 
                  alt={volunteer.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Volunteer Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-lg sm:text-xl font-bold text-foreground truncate">
                  {volunteer.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getStatusColor(volunteer.status) }}
                  />
                  <span 
                    className={`text-sm ${
                      volunteer.status === 'offline' ? 'text-secondary' : 'text-foreground'
                    }`}
                  >
                    {volunteer.statusText}
                  </span>
                </div>
              </div>

              {/* Message Button */}
              <button
                onClick={() => handleMessage(volunteer)}
                disabled={volunteer.status === 'offline'}
                className="w-10 h-10 sm:w-12 sm:h-12 border border-foreground rounded-lg flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-accent safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                  isActive 
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
