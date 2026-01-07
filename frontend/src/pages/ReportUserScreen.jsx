import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User } from "lucide-react";
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

  const currentPath = location.pathname;

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

        {/* Tagline */}
        <div className="mt-4">
          <p className="text-sm text-secondary tracking-wide">
            where empathy meets action.
          </p>
          <p className="text-xs text-secondary tracking-[0.15em] uppercase mt-1">
            A COLLECTIVE FOR THE CONSCIOUS CITIZEN.
          </p>
        </div>

        {/* Report a User Section */}
        <div className="mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground italic">
            Report a User
          </h2>
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
            className="w-full h-14 px-4 bg-transparent border border-accent text-foreground placeholder-secondary/70 focus:outline-none focus:border-foreground transition-colors font-mono text-base"
          />
        </div>

        {/* Reason Textarea */}
        <div className="mt-6">
          <label className="text-xs text-secondary tracking-[0.2em] uppercase block mb-3">
            REASON FOR REPORT
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe the violation..."
            className="w-full h-40 sm:h-48 p-4 bg-transparent border border-accent text-foreground placeholder-secondary/70 resize-none focus:outline-none focus:border-foreground transition-colors font-mono text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-14 bg-white text-black font-bold text-sm tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT REPORT"}
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1F1F1F] border-t border-accent safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = item.path === '/user-profile'; // Keep profile highlighted since this is a sub-page
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
