import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Home, Users, Megaphone, User, Plus, Send, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";

// Mock chat messages
const initialMessages = [
  {
    id: 1,
    sender: "other",
    senderName: "Ananya Rao",
    text: "Hello! I've picked up your SOS alert for the injured dog. I am currently 2km away.",
    time: "10:24 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Thank you so much. I'm waiting near the main gate. The dog seems to have a leg injury.",
    time: "10:26 AM",
  },
  {
    id: 3,
    sender: "other",
    senderName: "Ananya Rao",
    text: "Understood. Please try to keep people away so the animal doesn't get stressed. I'll be there in 10 mins.",
    time: "10:27 AM",
  },
];

export default function ChatScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [hasNotification, setHasNotification] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Get volunteer info from navigation state or use default
  const volunteer = location.state?.volunteer || {
    name: "Ananya Rao",
    initials: "AR",
    status: "available",
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage.trim(),
      time: timeString,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Simulate auto-reply after 2 seconds
    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        sender: "other",
        senderName: volunteer.name,
        text: "Got it! I'm on my way. Will update you shortly.",
        time: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddAttachment = () => {
    toast.info("Attachment options coming soon...");
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME', path: '/home' },
    { id: 'community', icon: Users, label: 'COMMUNITY', path: '/community' },
    { id: 'sos', icon: Megaphone, label: 'SOS', path: '/sos' },
    { id: 'profile', icon: User, label: 'PROFILE', path: '/user-profile' },
  ];

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-32 max-w-lg mx-auto w-full">
        
        {/* Header */}
        <div className="px-5 sm:px-6 md:px-8 pt-12 sm:pt-14">
          {/* Logo Row */}
          <div className="flex items-start justify-between">
            {/* Logo */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent bg-[#1E1E1E] flex items-center justify-center">
              <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
            </div>
            
            {/* Notification Bell */}
            <button 
              className="relative p-2"
              onClick={() => {
                setHasNotification(false);
                toast.info("No new notifications");
              }}
            >
              <Bell className="w-6 h-6 text-foreground" />
              {hasNotification && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-[#FF0000] rounded-full" />
              )}
            </button>
          </div>

          {/* Title Section */}
          <div className="mt-4">
            <h1 
              className="text-3xl sm:text-4xl font-bold text-foreground leading-none"
              style={{ letterSpacing: '-1px' }}
            >
              Rapid
            </h1>
            <h2 
              className="text-xl sm:text-2xl font-normal text-secondary leading-none mt-1"
              style={{ letterSpacing: '-0.5px' }}
            >
              Response Team
            </h2>
          </div>

          {/* Volunteer Info */}
          <div className="mt-4 pt-4 border-t border-[#333333]">
            <div className="flex items-center gap-3">
              {/* Avatar with Status */}
              <div className="relative">
                <div className="w-12 h-12 bg-[#2E2E2E] rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">
                    {volunteer.initials}
                  </span>
                </div>
                {/* Status Indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00FF00] rounded-sm" />
              </div>

              {/* Name and Label */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {volunteer.name}
                </h3>
                <p className="text-xs font-bold text-[#FF0000] tracking-wide uppercase">
                  Volunteer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 md:px-8 mt-4">
          {/* Date Separator */}
          <div className="flex justify-center my-4">
            <span className="text-xs text-[#808080] uppercase tracking-wide">
              Today, 10:23 AM
            </span>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.sender === "other" ? (
                  // Incoming message
                  <div className="flex flex-col items-start">
                    <div className="max-w-[85%] bg-[#1E1E1E] rounded-lg p-4 border-l-4 border-white">
                      <p className="text-base text-foreground leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                    <span className="text-xs text-[#808080] mt-1 ml-1">
                      {message.time}
                    </span>
                  </div>
                ) : (
                  // Outgoing message
                  <div className="flex flex-col items-end">
                    <div className="max-w-[85%] bg-white rounded-lg p-4">
                      <p className="text-base text-[#121212] leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                    <span className="text-xs text-[#808080] mt-1 mr-1">
                      {message.time}
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input Bar */}
      <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 bg-[#1E1E1E] border-t border-[#333333] px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {/* Add Attachment Button */}
          <button
            onClick={handleAddAttachment}
            className="w-10 h-10 bg-[#2E2E2E] rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-[#3a3a3a] transition-colors"
          >
            <Plus className="w-5 h-5 text-foreground" />
          </button>

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full h-10 bg-[#2E2E2E] rounded-lg px-4 text-base text-foreground placeholder:text-[#B3B3B3] focus:outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="w-10 h-10 bg-[#2E2E2E] rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-[#3a3a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#333333] safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const isSOS = item.id === 'sos';
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Icon 
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isSOS ? 'text-[#FF0000]' : 'text-foreground'
                  }`} 
                />
                <span 
                  className={`text-[10px] sm:text-xs mt-1 tracking-[0.5px] ${
                    isSOS ? 'text-[#FF0000] font-bold' : 'text-foreground font-normal'
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
