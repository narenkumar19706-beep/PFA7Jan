import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";
import BottomNav from "@/components/BottomNav";

export default function ReportBugScreen() {
  const navigate = useNavigate();
  const [bugDescription, setBugDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!bugDescription.trim()) {
      toast.error("Please describe the bug before submitting");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Bug report submitted successfully! Thank you for your feedback.");
    setBugDescription("");
    setIsSubmitting(false);
    
    // Navigate back to help & support after submission
    setTimeout(() => {
      navigate("/help-support");
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
          <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
            Response Team
          </h2>
        </div>

        {/* Section Label */}
        <div className="mt-8">
          <p className="text-xs text-secondary tracking-[0.2em] uppercase">
            HELP
          </p>
        </div>

        {/* Report a Bug Title */}
        <div className="mt-4">
          <h3 className="text-sm text-secondary tracking-[0.15em] uppercase">
            REPORT A BUG
          </h3>
        </div>

        {/* Bug Description Textarea */}
        <div className="mt-6 flex-1">
          <textarea
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
            placeholder="Describe the bug or issue you encountered..."
            className="w-full h-48 sm:h-56 p-4 bg-transparent border border-accent text-foreground placeholder-secondary/60 resize-none focus:outline-none focus:border-foreground transition-colors text-base"
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
              {isSubmitting ? "SUBMITTING..." : "SUBMIT BUG"}
            </span>
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activePath="/user-profile" />
    </div>
  );
}
