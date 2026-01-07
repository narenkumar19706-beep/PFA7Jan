import PawIcon from "@/components/icons/PawIcon";

export default function HomeScreen() {
  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col items-center justify-center px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10 safe-area-top safe-area-bottom max-w-lg mx-auto w-full">
      {/* Logo */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 border border-accent flex items-center justify-center animate-fade-in">
        <PawIcon className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
      </div>

      {/* Welcome Message */}
      <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Welcome to
        </h1>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2">
          Rapid Response Team
        </h2>
        <p className="text-base sm:text-lg text-secondary mt-4">
          You have successfully logged in.
        </p>
        <p className="text-sm text-secondary mt-2 tracking-[1.2px] uppercase">
          More screens coming soon...
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 flex items-center justify-center gap-2">
        <span className="text-[10px] sm:text-xs text-secondary tracking-[0.6px] uppercase font-normal">
          Secure Access
        </span>
        <span className="text-[10px] sm:text-xs text-secondary">•</span>
        <span className="text-[10px] sm:text-xs text-secondary tracking-[0.6px] uppercase font-normal">
          Privacy Ensured
        </span>
      </div>
    </div>
  );
}
