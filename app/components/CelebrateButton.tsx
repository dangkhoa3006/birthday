"use client";

import { useRouter } from "next/navigation";

interface CelebrateButtonProps {
  onClick?: () => void;
}

export default function CelebrateButton({ onClick }: CelebrateButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Navigate to letter page
    router.push("/letter");
  };

  return (
    <button
      onClick={handleClick}
      className="relative lg:absolute left-1/2 lg:top-[704px] -translate-x-1/2 translate-y-0 lg:-translate-y-1/2 cursor-pointer hover:opacity-90 transition-opacity animate-fade-in celebrate-button-glow px-4 z-10"
      style={{ animationDelay: '0.7s' }}
    >
      <div className="relative w-[240px] lg:w-[369px] h-[70px] lg:h-[106px]">
        {/* Animated glowing border */}
        <div className="absolute inset-0 border-2 border-white animate-celebrate-border"></div>
        <div className="absolute left-[3px] lg:left-[6px] top-[3px] lg:top-[6px] w-[240px] lg:w-[369px] h-[70px] lg:h-[106px] border-2 border-white animate-celebrate-border-delayed"></div>
        
        {/* Pulsing background glow */}
        <div className="absolute inset-0 bg-white/10 animate-pulse-glow rounded-sm"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-white text-[24px] lg:text-[48px] tracking-[3px] lg:tracking-[8.16px] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ fontFamily: 'var(--font-poppins)' }}>CELEBRATE</p>
        </div>
      </div>
    </button>
  );
}

