import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const LANGUAGE_KEY = 'pfa_language';

// Available languages
export const LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
};

// Translations - Conversational Hindi (not textbook style)
export const translations = {
  en: {
    // Common
    appName: 'Rapid',
    appSubtitle: 'Response Team',
    tagline: 'where empathy meets action.',
    taglineSubtext: 'A collective for the conscious citizen.',
    secureAccess: 'Secure Access',
    privacyEnsured: 'Privacy Ensured',
    proceed: 'Proceed',
    submit: 'Submit',
    cancel: 'Cancel',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Navigation
    navHome: 'Home',
    navCommunity: 'Community',
    navSOS: 'SOS',
    navProfile: 'Profile',
    
    // Login Screen
    loginTitle: 'Mobile Number',
    loginPlaceholder: 'Enter your mobile number',
    loginProceed: 'Proceed',
    loginSending: 'Sending...',
    
    // OTP Screen
    otpTitle: 'Enter the 6 digit OTP received on your mobile number.',
    otpResend: 'Resend OTP',
    otpResendIn: 'Resend OTP in',
    otpVerify: 'Verify',
    otpVerifying: 'Verifying...',
    otpSentTo: 'OTP sent to',
    otpVerified: 'OTP verified! Please complete your profile.',
    
    // Profile/Create Account Screen
    profileTitle: 'How would you like to use PFA?',
    profileSubtitle: 'Choose the option that best describes you',
    roleIndividual: 'Individual',
    roleIndividualDesc: 'Personal volunteer account',
    roleNGO: 'NGO',
    roleNGODesc: 'Animal Welfare Organization',
    roleSchool: 'School',
    roleSchoolDesc: 'Educational Institution',
    roleVet: 'Veterinarian',
    roleVetDesc: 'Veterinary Clinic',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Your Name',
    emailAddress: 'Email Address',
    emailOptional: '(Optional)',
    emailPlaceholder: 'name@example.com',
    address: 'Address',
    addressPlaceholder: 'Your Address',
    district: 'District',
    districtPlaceholder: 'Your District',
    autoPopulate: 'Auto Populate',
    detecting: 'Detecting...',
    createAccount: 'Create Account',
    creating: 'Creating...',
    
    // Account Success Screen
    accountCreated: 'Account Successfully Created!',
    welcomeMessage: 'Welcome to Rapid Response Team! You are now ready to make a difference.',
    proceedToDashboard: 'Proceed to Dashboard',
    
    // Dashboard Screen
    hello: 'Hello',
    welcomeToPFA: 'Welcome to People for Animals.',
    locationDetecting: 'Detecting location...',
    locationNotAvailable: 'Location not available',
    sosHoldInstruction: 'Press and hold for 3 seconds to activate',
    sosHelp: 'HELP',
    
    // SOS Active Screen
    sosActivated: 'SOS Activated!',
    elapsedTime: 'Elapsed Time',
    stopSOS: 'Stop SOS',
    addProof: 'Add Proof',
    sosActive: 'Active',
    
    // SOS History/Tab Screen
    sosAlerts: 'SOS Alerts',
    current: 'Current',
    past: 'Past',
    myAlerts: 'My Alerts',
    noActiveAlerts: 'No active alerts in your area',
    attending: 'Attending',
    attend: 'Attend',
    history: 'History',
    resolved: 'Resolved',
    closed: 'Closed',
    chat: 'Chat',
    kmAway: 'km away',
    from: 'from',
    
    // Add Proof Screen
    addProofTitle: 'Add Proof',
    addProofSubtitle: 'Max 4 videos (2 min each) • Unlimited photos',
    capturePhoto: 'Capture Photo',
    captureVideo: 'Capture Video',
    photoMode: 'Photo Mode',
    videoMode: 'Video Mode',
    capturedMedia: 'Captured Media',
    preview: 'Preview',
    submitProof: 'Submit Proof',
    
    // Community Screen
    communityTitle: 'Community',
    localVolunteerNetwork: 'Local Volunteer Network',
    volunteersInArea: 'Volunteers in your area',
    yourDistrict: 'Your District',
    availableNow: 'Available Now',
    busy: 'Busy',
    offline: 'Offline',
    message: 'Message',
    
    // Chat Screen
    chatTitle: 'Chat',
    typeMessage: 'Type a message...',
    send: 'Send',
    online: 'Online',
    
    // Notifications Screen  
    notificationsTitle: 'Notifications',
    noNotifications: 'No notifications yet',
    sosAlert: 'SOS Alert',
    newAlert: 'New Alert',
    alertNearby: 'Alert nearby',
    responding: 'Responding',
    viewAlert: 'View Alert',
    dismiss: 'Dismiss',
    minutesAgo: '{mins} mins ago',
    justNow: 'Just now',
    
    // User Profile Screen
    profileMenuHelp: 'Help & Support',
    profileMenuLogout: 'Log Out',
    profileMenuLanguage: 'Language',
    joinedDaysAgo: 'Joined {days} days ago',
    editProfile: 'Edit profile coming soon!',
    loggedOut: 'Logged out successfully',
    changeLanguage: 'Change Language',
    
    // Help & Support
    helpSupportTitle: 'Help & Support',
    helpSupportSubtitle: 'How can we assist you today?',
    reportBug: 'Report a Bug',
    reportBugDesc: 'Found an issue? Let us know',
    reportUser: 'Report a User',
    reportUserDesc: 'Report inappropriate behavior',
    
    // Report Bug Screen
    reportBugTitle: 'Report a Bug',
    bugDescription: 'Describe the bug or issue you encountered...',
    submitBug: 'Submit Bug',
    bugSubmitted: 'Bug report submitted successfully! Thank you for your feedback.',
    
    // Report User Screen
    reportUserTitle: 'Report a User',
    selectUser: 'Select User',
    searchByName: 'Search by name...',
    noUsersFound: 'No users found',
    issueDetails: 'Details of Issue Faced',
    issueDetailsPlaceholder: 'Describe the issue you experienced with this user...',
    submitReport: 'Submit Report',
    reportSubmitted: 'User report submitted successfully! Our team will review it.',
    
    // Notifications
    notificationsTitle: 'Notifications',
    noNotifications: 'No notifications yet',
    viewAlert: 'View Alert',
    dismiss: 'Dismiss',
    
    // Errors & Messages
    errorPhoneRequired: 'Please enter a valid 10-digit mobile number',
    errorOTPRequired: 'Please enter the complete 6-digit OTP',
    errorRoleRequired: 'Please select a role',
    errorNameRequired: 'Please enter your full name',
    errorSelectUser: 'Please select a user to report',
    errorDescribeIssue: 'Please describe the issue you faced',
    errorCaptureFirst: 'Please capture at least one photo or video',
    errorCameraAccess: 'Unable to access camera. Please check permissions.',
    errorLocationAccess: 'Location access denied. Please enable location permissions.',
    
    // Language
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
  },
  
  hi: {
    // Common - Conversational Hindi
    appName: 'Rapid',
    appSubtitle: 'Response Team',
    tagline: 'जहाँ दया और काम मिलते हैं।',
    taglineSubtext: 'जागरूक नागरिकों का एक समूह।',
    secureAccess: 'सुरक्षित एक्सेस',
    privacyEnsured: 'प्राइवेसी का ध्यान',
    proceed: 'आगे बढ़ें',
    submit: 'भेजें',
    cancel: 'रद्द करें',
    back: 'वापस',
    next: 'अगला',
    done: 'हो गया',
    loading: 'लोड हो रहा है...',
    error: 'कुछ गड़बड़ हुई',
    success: 'हो गया!',
    
    // Navigation
    navHome: 'होम',
    navCommunity: 'कम्युनिटी',
    navSOS: 'SOS',
    navProfile: 'प्रोफाइल',
    
    // Login Screen
    loginTitle: 'मोबाइल नंबर',
    loginPlaceholder: 'अपना मोबाइल नंबर डालें',
    loginProceed: 'आगे बढ़ें',
    loginSending: 'भेज रहे हैं...',
    
    // OTP Screen
    otpTitle: 'अपने मोबाइल पर आया 6 अंकों का OTP डालें।',
    otpResend: 'OTP दोबारा भेजें',
    otpResendIn: 'OTP दोबारा भेजें',
    otpVerify: 'वेरिफाई करें',
    otpVerifying: 'चेक कर रहे हैं...',
    otpSentTo: 'OTP भेजा गया',
    otpVerified: 'OTP वेरिफाई हो गया! अब अपनी प्रोफाइल पूरी करें।',
    
    // Profile/Create Account Screen
    profileTitle: 'आप PFA का इस्तेमाल कैसे करना चाहते हैं?',
    profileSubtitle: 'जो आपके लिए सही हो वो चुनें',
    roleIndividual: 'व्यक्तिगत',
    roleIndividualDesc: 'खुद के लिए वॉलंटियर अकाउंट',
    roleNGO: 'NGO',
    roleNGODesc: 'जानवरों की भलाई संस्था',
    roleSchool: 'स्कूल',
    roleSchoolDesc: 'शैक्षणिक संस्थान',
    roleVet: 'डॉक्टर',
    roleVetDesc: 'पशु चिकित्सालय',
    fullName: 'पूरा नाम',
    fullNamePlaceholder: 'आपका नाम',
    emailAddress: 'ईमेल',
    emailOptional: '(ज़रूरी नहीं)',
    emailPlaceholder: 'name@example.com',
    address: 'पता',
    addressPlaceholder: 'आपका पता',
    district: 'जिला',
    districtPlaceholder: 'आपका जिला',
    autoPopulate: 'अपने आप भरें',
    detecting: 'ढूंढ रहे हैं...',
    createAccount: 'अकाउंट बनाएं',
    creating: 'बना रहे हैं...',
    
    // Account Success Screen
    accountCreated: 'अकाउंट बन गया!',
    welcomeMessage: 'Rapid Response Team में आपका स्वागत है! अब आप फर्क ला सकते हैं।',
    proceedToDashboard: 'डैशबोर्ड पर जाएं',
    
    // Dashboard Screen
    hello: 'नमस्ते',
    welcomeToPFA: 'People for Animals में आपका स्वागत है।',
    locationDetecting: 'लोकेशन ढूंढ रहे हैं...',
    locationNotAvailable: 'लोकेशन नहीं मिली',
    sosHoldInstruction: '3 सेकंड दबाकर रखें SOS के लिए',
    sosHelp: 'मदद',
    
    // SOS Active Screen
    sosActivated: 'SOS चालू हो गया!',
    elapsedTime: 'समय बीता',
    stopSOS: 'SOS बंद करें',
    addProof: 'सबूत जोड़ें',
    sosActive: 'चालू',
    
    // Add Proof Screen
    addProofTitle: 'सबूत जोड़ें',
    addProofSubtitle: 'ज़्यादा से ज़्यादा 4 वीडियो (2 मिनट) • कितनी भी फोटो',
    capturePhoto: 'फोटो लें',
    captureVideo: 'वीडियो लें',
    photoMode: 'फोटो मोड',
    videoMode: 'वीडियो मोड',
    capturedMedia: 'लिया हुआ मीडिया',
    preview: 'देखें',
    submitProof: 'सबूत भेजें',
    
    // Community Screen
    communityTitle: 'कम्युनिटी',
    localVolunteerNetwork: 'लोकल वॉलंटियर नेटवर्क',
    volunteersInArea: 'आपके एरिया में वॉलंटियर्स',
    yourDistrict: 'आपका जिला',
    availableNow: 'अभी उपलब्ध',
    busy: 'व्यस्त',
    offline: 'ऑफलाइन',
    message: 'मैसेज',
    
    // Chat Screen
    chatTitle: 'चैट',
    typeMessage: 'मैसेज लिखें...',
    send: 'भेजें',
    online: 'ऑनलाइन',
    
    // Notifications Screen
    notificationsTitle: 'नोटिफिकेशन',
    noNotifications: 'अभी कोई नोटिफिकेशन नहीं',
    sosAlert: 'SOS अलर्ट',
    newAlert: 'नया अलर्ट',
    alertNearby: 'पास में अलर्ट',
    responding: 'जवाब दे रहे हैं',
    viewAlert: 'अलर्ट देखें',
    dismiss: 'हटाएं',
    minutesAgo: '{mins} मिनट पहले',
    justNow: 'अभी',
    
    // User Profile Screen
    profileMenuHelp: 'मदद और सहायता',
    profileMenuLogout: 'लॉग आउट',
    profileMenuLanguage: 'भाषा',
    joinedDaysAgo: '{days} दिन पहले जुड़े',
    editProfile: 'प्रोफाइल एडिट जल्द आ रहा है!',
    loggedOut: 'लॉग आउट हो गया',
    changeLanguage: 'भाषा बदलें',
    
    // Help & Support
    helpSupportTitle: 'मदद और सहायता',
    helpSupportSubtitle: 'हम आपकी कैसे मदद कर सकते हैं?',
    reportBug: 'बग रिपोर्ट करें',
    reportBugDesc: 'कोई दिक्कत मिली? हमें बताएं',
    reportUser: 'यूज़र रिपोर्ट करें',
    reportUserDesc: 'गलत बर्ताव की शिकायत करें',
    
    // Report Bug Screen
    reportBugTitle: 'बग रिपोर्ट करें',
    bugDescription: 'आपको क्या दिक्कत आई, बताएं...',
    submitBug: 'भेजें',
    bugSubmitted: 'रिपोर्ट भेज दी गई! फीडबैक के लिए शुक्रिया।',
    
    // Report User Screen
    reportUserTitle: 'यूज़र रिपोर्ट करें',
    selectUser: 'यूज़र चुनें',
    searchByName: 'नाम से खोजें...',
    noUsersFound: 'कोई यूज़र नहीं मिला',
    issueDetails: 'क्या दिक्कत हुई',
    issueDetailsPlaceholder: 'इस यूज़र के साथ क्या प्रॉब्लम हुई, बताएं...',
    submitReport: 'रिपोर्ट भेजें',
    reportSubmitted: 'रिपोर्ट भेज दी गई! हमारी टीम देखेगी।',
    
    // Notifications
    notificationsTitle: 'नोटिफिकेशन',
    noNotifications: 'अभी कोई नोटिफिकेशन नहीं',
    viewAlert: 'अलर्ट देखें',
    dismiss: 'हटाएं',
    
    // Errors & Messages
    errorPhoneRequired: 'सही 10 अंकों का मोबाइल नंबर डालें',
    errorOTPRequired: 'पूरा 6 अंकों का OTP डालें',
    errorRoleRequired: 'कृपया एक विकल्प चुनें',
    errorNameRequired: 'अपना नाम डालें',
    errorSelectUser: 'रिपोर्ट करने के लिए यूज़र चुनें',
    errorDescribeIssue: 'क्या दिक्कत हुई, बताएं',
    errorCaptureFirst: 'पहले कम से कम एक फोटो या वीडियो लें',
    errorCameraAccess: 'कैमरा एक्सेस नहीं मिला। परमिशन चेक करें।',
    errorLocationAccess: 'लोकेशन एक्सेस नहीं दी। परमिशन ऑन करें।',
    
    // Language
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem(LANGUAGE_KEY);
    if (savedLang && LANGUAGES[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);
  
  // Change language and save to localStorage
  const changeLanguage = (langCode) => {
    if (LANGUAGES[langCode]) {
      setLanguage(langCode);
      localStorage.setItem(LANGUAGE_KEY, langCode);
    }
  };
  
  // Get translation for a key
  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || translations.en[key] || key;
    
    // Replace parameters like {days}
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
  };
  
  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      t,
      isHindi: language === 'hi',
      isEnglish: language === 'en',
      languages: LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use language
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      changeLanguage: () => {},
      t: (key) => translations.en[key] || key,
      isHindi: false,
      isEnglish: true,
      languages: LANGUAGES
    };
  }
  return context;
}

export default LanguageContext;
