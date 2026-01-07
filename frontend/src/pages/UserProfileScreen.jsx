import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, Headphones, FileQuestion, Pencil, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

export default function UserProfileScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user data
  const userData = {
    initials: "AR",
    name: "Ananya Rao",
    joinedDays: 120
  };

  const menuItems = [
    { 
      id: 'help', 
      icon: Headphones, 
      label: 'Help & Support',
      onClick: () => navigate("/report-bug")
    },
    { 
      id: 'faq', 
      icon: FileQuestion, 
      label: 'FAQ',
      onClick: () => navigate("/report-user")
    },
  ];

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME', path: '/home' },
    { id: 'community', icon: Users, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: Megaphone, label: 'SOS', path: '/sos' },
    { id: 'profile', icon: User, label: 'PROFILE', path: '/user-profile' },
  ];

  const currentPath = location.pathname;

  const handleEditProfile = () => {
    toast.info("Edit profile coming soon!");
  };

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          {/* Notification Bell */}
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
          </button>
        </div>

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="text-foreground">Rapid</span>
            <br />
            <span className="text-secondary">Response Team</span>
          </h1>
        </div>

        {/* User Avatar Section */}
        <div className="mt-10 flex flex-col items-center">
          {/* Avatar Box with Edit Button */}
          <div className="relative">
            <div className="w-32 h-32 sm:w-36 sm:h-36 border border-accent flex items-center justify-center bg-transparent">
              <span className="text-4xl sm:text-5xl font-bold text-[#4A7C7C]">
                {userData.initials}
              </span>
            </div>
            {/* Edit Button */}
            <button
              onClick={handleEditProfile}
              className="absolute bottom-0 right-0 w-10 h-10 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Pencil className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* User Name */}
          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-foreground italic">
            {userData.name}
          </h2>

          {/* Joined Date */}
          <p className="mt-2 text-xs sm:text-sm text-secondary tracking-[0.2em] uppercase">
            JOINED {userData.joinedDays} DAYS AGO
          </p>
        </div>

        {/* Menu Items */}
        <div className="mt-10 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="w-full flex items-center border border-accent p-4 hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 border border-accent flex items-center justify-center mr-4">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <span className="flex-1 text-left text-lg font-bold text-foreground">
                  {item.label}
                </span>
                <ChevronRight className="w-6 h-6 text-secondary" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1F1F1F] border-t border-accent safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-foreground' : 'text-secondary'}`} />
                <span className={`text-[10px] sm:text-xs mt-1 tracking-[0.5px] ${isActive ? 'text-foreground font-bold' : 'text-secondary font-normal'}`}>
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
