import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronRight, Search, X, Check } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";
import BottomNav from "@/components/BottomNav";

// Mock users data for search
const mockUsers = [
  { id: '1', name: 'Rahul Sharma', district: 'Bangalore' },
  { id: '2', name: 'Priya Patel', district: 'Mumbai' },
  { id: '3', name: 'Amit Kumar', district: 'Delhi' },
  { id: '4', name: 'Sneha Reddy', district: 'Hyderabad' },
  { id: '5', name: 'Vikram Singh', district: 'Chennai' },
  { id: '6', name: 'Anita Desai', district: 'Pune' },
  { id: '7', name: 'Rajesh Nair', district: 'Kochi' },
  { id: '8', name: 'Meera Iyer', district: 'Bangalore' },
  { id: '9', name: 'Karan Malhotra', district: 'Gurgaon' },
  { id: '10', name: 'Divya Krishnan', district: 'Mysore' },
];

export default function ReportUserScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [issueDetails, setIssueDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchRef = useRef(null);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowDropdown(true);
    } else {
      setFilteredUsers([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchQuery(user.name);
    setShowDropdown(false);
  };

  const handleClearUser = () => {
    setSelectedUser(null);
    setSearchQuery("");
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      toast.error("Please select a user to report");
      return;
    }
    
    if (!issueDetails.trim()) {
      toast.error("Please describe the issue you faced");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("User report submitted successfully! Our team will review it.");
    setSelectedUser(null);
    setSearchQuery("");
    setIssueDetails("");
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

        {/* Section Labels */}
        <div className="mt-8">
          <p className="text-xs text-secondary tracking-[0.2em] uppercase">
            HELP
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-sm text-secondary tracking-[0.15em] uppercase">
            REPORT A USER
          </h3>
        </div>

        {/* User Search/Select Field */}
        <div className="mt-6" ref={searchRef}>
          <label className="text-xs text-secondary tracking-[0.2em] uppercase block mb-3">
            SELECT USER
          </label>
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (selectedUser) setSelectedUser(null);
                }}
                onFocus={() => {
                  if (searchQuery.trim() && filteredUsers.length > 0) {
                    setShowDropdown(true);
                  }
                }}
                placeholder="Search by name..."
                className="w-full h-14 pl-12 pr-12 bg-transparent border border-accent text-foreground placeholder-secondary/60 focus:outline-none focus:border-foreground transition-colors text-base"
              />
              {selectedUser && (
                <button
                  onClick={handleClearUser}
                  className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-secondary" />
                </button>
              )}
            </div>

            {/* Selected User Indicator */}
            {selectedUser && (
              <div className="mt-2 flex items-center gap-2 px-4 py-2 border border-green-500/50 bg-green-500/10">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-foreground">{selectedUser.name}</span>
                <span className="text-xs text-secondary">• {selectedUser.district}</span>
              </div>
            )}

            {/* Search Dropdown */}
            {showDropdown && filteredUsers.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1A1A] border border-accent max-h-48 overflow-y-auto z-10">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-accent/50 last:border-b-0"
                  >
                    <div className="text-left">
                      <span className="text-base text-foreground block">{user.name}</span>
                      <span className="text-xs text-secondary">{user.district}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-secondary" />
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {showDropdown && searchQuery.trim() && filteredUsers.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1A1A] border border-accent p-4 z-10">
                <p className="text-sm text-secondary text-center">No users found</p>
              </div>
            )}
          </div>
        </div>

        {/* Issue Details Textarea */}
        <div className="mt-6 flex-1">
          <label className="text-xs text-secondary tracking-[0.2em] uppercase block mb-3">
            DETAILS OF ISSUE FACED
          </label>
          <textarea
            value={issueDetails}
            onChange={(e) => setIssueDetails(e.target.value)}
            placeholder="Describe the issue you experienced with this user..."
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
      <BottomNav activePath="/user-profile" />
    </div>
  );
}
