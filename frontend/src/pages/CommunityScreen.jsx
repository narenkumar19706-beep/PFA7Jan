import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare } from "lucide-react";
import PawIcon from "@/components/icons/PawIcon";
import BottomNav from "@/components/BottomNav";
import { useLocationContext } from "@/context/LocationContext";

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
  const { location: userLocation, isLocating } = useLocationContext();

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
      case 'available': return '#4CAF50';
      case 'busy': return '#FF9800';
      case 'offline': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          <button 
            className="relative p-2"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">
            Rapid
          </h1>
          <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
            Response Team
          </h2>
        </div>

        {/* Location Info */}
        <div className="mt-8">
          <p className="text-base text-foreground">
            Local Volunteer Network
          </p>
          <div className="flex items-center gap-2 mt-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              {isLocating ? "Detecting..." : userLocation.district || "Your District"}
            </h3>
            {isLocating && (
              <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <p className="text-xs text-secondary tracking-[0.15em] mt-4 uppercase">
            VOLUNTEERS IN YOUR AREA
          </p>
        </div>

        {/* Volunteer List */}
        <div className="mt-6 space-y-3">
          {volunteers.map((volunteer) => (
            <div 
              key={volunteer.id}
              className="bg-[#1A1A1A] border border-accent p-4 flex items-center gap-4"
            >
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ backgroundColor: volunteer.bgColor }}
              >
                <img 
                  src={volunteer.avatar} 
                  alt={volunteer.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-foreground truncate">
                  {volunteer.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getStatusColor(volunteer.status) }}
                  />
                  <span className={`text-sm ${volunteer.status === 'offline' ? 'text-secondary' : 'text-foreground'}`}>
                    {volunteer.statusText}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleMessage(volunteer)}
                disabled={volunteer.status === 'offline'}
                className="w-10 h-10 sm:w-12 sm:h-12 border border-foreground flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activePath="/community" />
    </div>
  );
}
