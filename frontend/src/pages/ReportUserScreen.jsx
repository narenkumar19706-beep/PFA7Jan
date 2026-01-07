import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

export default function ReportUserScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME', path: '/home' },
    { id: 'community', icon: Users, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: Megaphone, label: 'SOS', path: '/sos' },
    { id: 'profile', icon: User, label: 'PROFILE', path: '/user-profile' },
  ];

  const handleSubmit = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username or ID");
      return;
    }
    
    if (!reason.trim()) {
      toast.error("Please describe the reason for reporting");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("User report submitted successfully! Our team will review it.");
    setUsername("");
    setReason("");
    setIsSubmitting(false);
    
    // Navigate back to community after submission
    setTimeout(() => {
      navigate("/community");
    }, 1500);
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
            Rapid
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary leading-none mt-1 italic">
            Response Team
          </h2>
        </div>

        {/* Section Labels */}
        <div className="mt-8">
          <p className="text-xs text-secondary tracking-[0.2em] uppercase">
            COMMUNITY
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-sm text-secondary tracking-[0.15em] uppercase">
            REPORT A USER
          </h3>
        </div>

        {/* Username Input */}
        <div className="mt-6">
          <label className="text-xs text-secondary tracking-[0.2em] uppercase block mb-3">
            USERNAME OR ID
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
            className="w-full h-14 px-4 bg-transparent border border-accent text-foreground placeholder-secondary/60 focus:outline-none focus:border-foreground transition-colors text-base"
          />
        </div>

        {/* Reason Textarea */}
        <div className="mt-6 flex-1">
          <label className="text-xs text-secondary tracking-[0.2em] uppercase block mb-3">
            REASON FOR REPORT
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe the violation..."
            className="w-full h-32 sm:h-40 p-4 bg-transparent border border-accent text-foreground placeholder-secondary/60 resize-none focus:outline-none focus:border-foreground transition-colors text-base"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-14 bg-white flex items-center justify-between px-6 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-black">
              {isSubmitting ? "SUBMITTING..." : "SUBMIT REPORT"}
            </span>
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1F1F1F] border-t border-accent safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = item.path === '/user-profile';
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center px-4 py-2 transition-colors ${isActive ? 'bg-white/10 rounded-lg' : ''}`}
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
