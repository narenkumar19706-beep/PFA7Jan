import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, Camera, Video } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

export default function AddProofScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [capturedMedia, setCapturedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const handleCapturePhoto = () => {
    // Mock: In real app, this would open camera
    setMediaType('photo');
    setCapturedMedia('photo_captured');
    toast.success("Photo captured successfully!");
  };

  const handleCaptureVideo = () => {
    // Mock: In real app, this would open video camera
    setMediaType('video');
    setCapturedMedia('video_captured');
    toast.success("Video captured successfully!");
  };

  const handleSubmit = () => {
    if (!capturedMedia) {
      toast.error("Please capture a photo or video first");
      return;
    }
    toast.success("Proof submitted successfully!");
    navigate("/sos-active");
  };

  const handleRetake = () => {
    setCapturedMedia(null);
    setMediaType(null);
    toast.info("Ready to capture again");
  };

  const handleCancel = () => {
    navigate("/sos-active");
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME', path: '/home' },
    { id: 'community', icon: Users, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: Megaphone, label: 'SOS', path: '/sos-active', isActive: true },
    { id: 'profile', icon: User, label: 'PROFILE', path: '/user-profile' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen min-h-dvh flex flex-col safe-area-top safe-area-bottom sos-active-bg">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header with Logo and Bell */}
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-[#5A1A1A] bg-[#220A0A] flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          
          {/* Notification Bell */}
          <button className="relative p-2">
            <Bell className="w-6 h-6 text-white/60" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Title Section */}
        <div className="mt-6 sm:mt-8">
          <h1 
            className="text-4xl sm:text-5xl font-bold text-white leading-none"
            style={{ letterSpacing: '-1px' }}
          >
            Rapid
          </h1>
          <h2 
            className="text-2xl sm:text-3xl font-normal text-white/60 leading-none mt-1"
            style={{ letterSpacing: '-0.5px' }}
          >
            Response Team
          </h2>
        </div>

        {/* Add Proof Section */}
        <div className="mt-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            ADD PROOF
          </h3>
          <div className="h-px bg-[#5A1A1A] mt-3" />
        </div>

        {/* Capture Cards */}
        <div className="mt-6 space-y-4">
          {/* Capture Live Photo */}
          <button
            onClick={handleCapturePhoto}
            className={`w-full p-8 rounded-lg flex flex-col items-center justify-center transition-all ${
              mediaType === 'photo' 
                ? 'bg-[#2A2A2A] border-2 border-white/30' 
                : 'bg-[#1A1A1A] hover:bg-[#222222]'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/40 flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white/60" />
            </div>
            <span className="text-sm sm:text-base text-white font-medium tracking-[1px] uppercase">
              {mediaType === 'photo' ? 'Photo Captured ✓' : 'Capture Live Photo'}
            </span>
          </button>

          {/* Capture Live Video */}
          <button
            onClick={handleCaptureVideo}
            className={`w-full p-8 rounded-lg flex flex-col items-center justify-center transition-all ${
              mediaType === 'video' 
                ? 'bg-[#2A2A2A] border-2 border-white/30' 
                : 'bg-[#1A1A1A] hover:bg-[#222222]'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4">
              <Video className="w-10 h-10 sm:w-12 sm:h-12 text-white/60" />
            </div>
            <span className="text-sm sm:text-base text-white font-medium tracking-[1px] uppercase">
              {mediaType === 'video' ? 'Video Captured ✓' : 'Capture Live Video'}
            </span>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[20px]" />

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!capturedMedia}
            className="flex-1 h-12 sm:h-14 bg-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm sm:text-base font-bold text-black tracking-[1px] uppercase">
              Submit
            </span>
          </button>

          {/* Retake Button */}
          <button
            onClick={handleRetake}
            disabled={!capturedMedia}
            className="flex-1 h-12 sm:h-14 bg-[#2A2A2A] rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm sm:text-base font-bold text-white tracking-[1px] uppercase">
              Retake
            </span>
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="flex-1 h-12 sm:h-14 bg-transparent border-2 border-[#FF0000] rounded-lg flex items-center justify-center"
          >
            <span className="text-sm sm:text-base font-bold text-[#FF0000] tracking-[1px] uppercase">
              Cancel
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#101010] border-t border-white/10 safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = item.isActive || currentPath === item.path;
            const Icon = item.icon;
            const isSOS = item.id === 'sos';
            
            return (
              <button
                key={item.id}
                onClick={() => !item.isActive && navigate(item.path)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <Icon 
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isSOS ? 'text-[#FF0000]' : isActive ? 'text-white' : 'text-white/50'
                  }`} 
                />
                <span 
                  className={`text-[10px] sm:text-xs mt-1 tracking-[0.5px] ${
                    isSOS ? 'text-[#FF0000] font-bold' : isActive ? 'text-white font-bold' : 'text-white/50 font-normal'
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
