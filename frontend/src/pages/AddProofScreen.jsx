import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, Camera, Video, X, Play, Trash2, Eye, Square, CircleDot } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

const MAX_VIDEOS = 4;
const MAX_VIDEO_DURATION = 120; // 2 minutes in seconds

export default function AddProofScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Media state
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState(null); // 'photo' or 'video'
  const [previewMedia, setPreviewMedia] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const chunksRef = useRef([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  // Start camera stream
  const startCamera = async (mode) => {
    try {
      const constraints = {
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: mode === 'video'
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      setCameraMode(mode);
      setShowCamera(true);
    } catch (error) {
      console.error('Camera access error:', error);
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setCameraMode(null);
    setIsRecording(false);
    setRecordingTime(0);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    
    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    const photoId = `photo_${Math.random().toString(36).substr(2, 9)}`;
    const newPhoto = {
      id: photoId,
      type: 'photo',
      data: photoDataUrl,
      timestamp: new Date().toISOString()
    };
    
    setPhotos(prev => [...prev, newPhoto]);
    toast.success("Photo captured!");
    stopCamera();
  };

  // Start video recording
  const startRecording = () => {
    if (!streamRef.current || videos.length >= MAX_VIDEOS) {
      if (videos.length >= MAX_VIDEOS) {
        toast.error(`Maximum ${MAX_VIDEOS} videos allowed per alert`);
      }
      return;
    }
    
    chunksRef.current = [];
    
    const options = { mimeType: 'video/webm;codecs=vp9' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options.mimeType = 'video/webm';
    }
    
    try {
      mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        
        const newVideo = {
          id: Date.now(),
          type: 'video',
          data: videoUrl,
          blob: blob,
          duration: recordingTime,
          timestamp: new Date().toISOString()
        };
        
        setVideos(prev => [...prev, newVideo]);
        toast.success(`Video recorded (${formatTime(recordingTime)})`);
        stopCamera();
      };
      
      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start recording timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          // Auto-stop at max duration
          if (newTime >= MAX_VIDEO_DURATION) {
            stopRecording();
            toast.info("Maximum recording time reached (2 minutes)");
          }
          return newTime;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Recording error:', error);
      toast.error("Unable to start recording");
    }
  };

  // Stop video recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Delete media
  const deleteMedia = (id, type) => {
    if (type === 'photo') {
      setPhotos(prev => prev.filter(p => p.id !== id));
    } else {
      setVideos(prev => {
        const video = prev.find(v => v.id === id);
        if (video?.data) {
          URL.revokeObjectURL(video.data);
        }
        return prev.filter(v => v.id !== id);
      });
    }
    toast.success(`${type === 'photo' ? 'Photo' : 'Video'} deleted`);
  };

  // Preview media
  const openPreview = (media) => {
    setPreviewMedia(media);
    setShowPreview(true);
  };

  // Submit proof
  const handleSubmit = async () => {
    if (photos.length === 0 && videos.length === 0) {
      toast.error("Please capture at least one photo or video");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`Proof submitted: ${photos.length} photo(s), ${videos.length} video(s)`);
    setIsSubmitting(false);
    navigate("/sos-active");
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME', path: '/home' },
    { id: 'community', icon: Users, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: Megaphone, label: 'SOS', path: '/sos-active', isActive: true },
    { id: 'profile', icon: User, label: 'PROFILE', path: '/user-profile' },
  ];

  const totalMedia = photos.length + videos.length;

  return (
    <div className="min-h-screen min-h-dvh flex flex-col safe-area-top safe-area-bottom sos-active-bg">
      {/* Camera View Overlay */}
      {showCamera && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Camera Preview */}
          <div className="flex-1 relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-full">
                <CircleDot className="w-4 h-4 text-white animate-pulse" />
                <span className="text-white text-sm font-bold">{formatTime(recordingTime)}</span>
                <span className="text-white/70 text-xs">/ {formatTime(MAX_VIDEO_DURATION)}</span>
              </div>
            )}
            
            {/* Close button */}
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Mode indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-1.5 rounded-full">
              <span className="text-white text-sm font-medium uppercase">
                {cameraMode === 'photo' ? 'Photo Mode' : 'Video Mode'}
              </span>
            </div>
          </div>
          
          {/* Camera Controls */}
          <div className="bg-black/90 p-6 flex items-center justify-center gap-8">
            {cameraMode === 'photo' ? (
              <button
                onClick={capturePhoto}
                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-white" />
              </button>
            ) : (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center ${
                  isRecording ? 'bg-red-600' : ''
                }`}
              >
                {isRecording ? (
                  <Square className="w-8 h-8 text-white fill-white" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-red-600" />
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && previewMedia && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4">
            {previewMedia.type === 'photo' ? (
              <img
                src={previewMedia.data}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={previewMedia.data}
                controls
                autoPlay
                className="max-w-full max-h-full"
              />
            )}
          </div>
          <div className="bg-black/90 p-4 flex justify-center">
            <button
              onClick={() => {
                setShowPreview(false);
                setPreviewMedia(null);
              }}
              className="px-8 py-3 bg-white rounded-lg"
            >
              <span className="text-black font-bold uppercase tracking-wider">Close</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header with Logo and Bell */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-[#5A1A1A] bg-[#220A0A] flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          
          <button 
            onClick={() => navigate("/notifications")}
            className="relative p-2"
          >
            <Bell className="w-6 h-6 text-white/60" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Title Section */}
        <div className="mt-6 sm:mt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-none">
            Rapid
          </h1>
          <h2 className="text-2xl sm:text-3xl text-white/60 leading-none mt-1">
            Response Team
          </h2>
        </div>

        {/* Add Proof Section */}
        <div className="mt-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            ADD PROOF
          </h3>
          <p className="text-sm text-white/60 mt-1">
            Max {MAX_VIDEOS} videos (2 min each) • Unlimited photos
          </p>
          <div className="h-px bg-[#5A1A1A] mt-3" />
        </div>

        {/* Capture Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* Capture Photo Button */}
          <button
            onClick={() => startCamera('photo')}
            className="p-6 rounded-lg bg-[#1A1A1A] hover:bg-[#222222] flex flex-col items-center justify-center transition-all border border-transparent hover:border-white/20"
          >
            <div className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center mb-3">
              <Camera className="w-7 h-7 text-white/60" />
            </div>
            <span className="text-sm text-white font-medium tracking-wider uppercase">
              Capture Photo
            </span>
          </button>

          {/* Capture Video Button */}
          <button
            onClick={() => startCamera('video')}
            disabled={videos.length >= MAX_VIDEOS}
            className={`p-6 rounded-lg flex flex-col items-center justify-center transition-all border border-transparent ${
              videos.length >= MAX_VIDEOS 
                ? 'bg-[#1A1A1A]/50 opacity-50 cursor-not-allowed' 
                : 'bg-[#1A1A1A] hover:bg-[#222222] hover:border-white/20'
            }`}
          >
            <div className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center mb-3">
              <Video className="w-7 h-7 text-white/60" />
            </div>
            <span className="text-sm text-white font-medium tracking-wider uppercase">
              Capture Video
            </span>
            <span className="text-xs text-white/40 mt-1">
              {videos.length}/{MAX_VIDEOS}
            </span>
          </button>
        </div>

        {/* Captured Media Section */}
        {totalMedia > 0 && (
          <div className="mt-6">
            <h4 className="text-sm text-white/60 uppercase tracking-wider mb-3">
              Captured Media ({totalMedia})
            </h4>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Photos */}
              {photos.map((photo) => (
                <div key={photo.id} className="relative aspect-square bg-[#1A1A1A] rounded-lg overflow-hidden group">
                  <img
                    src={photo.data}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => openPreview(photo)}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => deleteMedia(photo.id, 'photo')}
                      className="w-8 h-8 bg-red-500/80 rounded-full flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute top-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                    <Camera className="w-3 h-3 inline" />
                  </div>
                </div>
              ))}
              
              {/* Videos */}
              {videos.map((video) => (
                <div key={video.id} className="relative aspect-square bg-[#1A1A1A] rounded-lg overflow-hidden group">
                  <video
                    src={video.data}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => openPreview(video)}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => deleteMedia(video.id, 'video')}
                      className="w-8 h-8 bg-red-500/80 rounded-full flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute top-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    <span>{formatTime(video.duration)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1 min-h-[20px]" />

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          {/* Preview All Button */}
          {totalMedia > 0 && (
            <button
              onClick={() => openPreview(photos[0] || videos[0])}
              className="w-full h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white tracking-wider uppercase">
                Preview ({totalMedia})
              </span>
            </button>
          )}
          
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={totalMedia === 0 || isSubmitting}
            className="w-full h-14 bg-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm font-bold text-black tracking-wider uppercase">
              {isSubmitting ? "Submitting..." : `Submit Proof (${totalMedia})`}
            </span>
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => navigate("/sos-active")}
            className="w-full h-12 bg-transparent border-2 border-[#FF0000] rounded-lg flex items-center justify-center"
          >
            <span className="text-sm font-bold text-[#FF0000] tracking-wider uppercase">
              Cancel
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#101010] border-t border-white/10 safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = item.isActive || location.pathname === item.path;
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
