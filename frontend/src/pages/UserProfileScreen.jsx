import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Headphones, Pencil, ChevronRight, LogOut } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function UserProfileScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  // Use auth user data - display actual user name from context
  const userData = {
    initials: user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : "U",
    name: user?.name || "User",
    joinedDays: user?.joinedDays || 0
  };

  const menuItems = [
    { 
      id: 'help', 
      icon: Headphones, 
      labelKey: 'profileMenuHelp',
      onClick: () => navigate("/help-support")
    },
  ];

  const handleEditProfile = () => {
    toast.info(t('editProfile'));
  };

  const handleLogout = () => {
    logout();
    toast.success(t('loggedOut'));
    navigate("/");
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
            className="relative p-2"
          >
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">
            {t('appName')}
          </h1>
          <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
            {t('appSubtitle')}
          </h2>
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
              className="absolute bottom-0 right-0 w-10 h-10 bg-white flex items-center justify-center"
            >
              <Pencil className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* User Name */}
          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-foreground">
            {userData.name}
          </h2>

          {/* Joined Date */}
          <p className="mt-2 text-xs text-secondary tracking-[0.2em] uppercase">
            {t('joinedDaysAgo', { days: userData.joinedDays })}
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
                className="w-full flex items-center border border-accent p-4"
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center border border-red-500/50 p-4 hover:bg-red-500/10 transition-colors"
          >
            <div className="w-12 h-12 border border-red-500/50 flex items-center justify-center mr-4">
              <LogOut className="w-6 h-6 text-red-500" />
            </div>
            <span className="flex-1 text-left text-lg font-bold text-red-500">
              Log Out
            </span>
            <ChevronRight className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activePath="/user-profile" />
    </div>
  );
}
