import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, LogOut } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

export default function UserProfileScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
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
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
          <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
        </div>

        <div className="mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Profile</h1>
          <p className="text-sm text-secondary mt-2">Manage your account</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="p-4 bg-[#1A1A1A] rounded-lg">
            <p className="text-xs text-secondary uppercase tracking-wide">Name</p>
            <p className="text-lg text-foreground mt-1">Ananya</p>
          </div>
          <div className="p-4 bg-[#1A1A1A] rounded-lg">
            <p className="text-xs text-secondary uppercase tracking-wide">Phone</p>
            <p className="text-lg text-foreground mt-1">+91 9876543210</p>
          </div>
          <div className="p-4 bg-[#1A1A1A] rounded-lg">
            <p className="text-xs text-secondary uppercase tracking-wide">Location</p>
            <p className="text-lg text-foreground mt-1">Bangalore Urban</p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full h-12 bg-[#D32F2F] rounded-lg flex items-center justify-center gap-2 text-white font-bold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

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
