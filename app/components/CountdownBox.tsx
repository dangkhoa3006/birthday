"use client";

import { useEffect, useState } from "react";

interface CountdownBoxProps {
  value: number;
  label: string;
  color: "pink" | "blue" | "red";
  position: { left: string; top: string };
  delay: string;
  showDot?: boolean;
}

export default function CountdownBox({ value, label, color, position, delay, showDot = false }: CountdownBoxProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const colorClasses = {
    pink: {
      gradient: "from-pink-500/20 to-pink-600/20",
      accent: "via-pink-400",
    },
    blue: {
      gradient: "from-blue-500/20 to-blue-600/20",
      accent: "via-blue-400",
      dot: "bg-blue-400",
    },
    red: {
      gradient: "from-red-500/20 to-orange-500/20",
      accent: "via-red-400",
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div 
      className={`relative lg:absolute w-[70px] lg:w-[242px] h-[110px] lg:h-[280px] flex flex-col items-center justify-center animate-fade-in z-10 flex-shrink-0`}
      style={{ 
        ...(isDesktop ? { left: position.left, top: position.top } : {}),
        animationDelay: delay,
        animationFillMode: 'forwards'
      }}
    >
      <div className={`relative w-[70px] lg:w-[200px] h-[70px] lg:h-[200px] rounded-xl lg:rounded-2xl border-2 lg:border-4 border-white/30 bg-gradient-to-br ${currentColor.gradient} backdrop-blur-sm`}>
        <div className={`absolute top-0 left-0 right-0 h-1 lg:h-2 bg-gradient-to-r from-transparent ${currentColor.accent} to-transparent rounded-t-xl lg:rounded-t-2xl`}></div>
        {showDot && (
          <div className={`absolute top-1.5 lg:top-4 right-1.5 lg:right-4 w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full ${currentColor.dot} animate-pulse`}></div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-[28px] lg:text-[72px] font-bold text-center drop-shadow-2xl" style={{ fontFamily: 'var(--font-poppins)' }}>
            {String(value).padStart(2, '0')}
          </p>
        </div>
      </div>
      <p className="text-white text-[10px] lg:text-[24px] font-semibold mt-0.5 lg:mt-4 tracking-wider uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
        {label}
      </p>
    </div>
  );
}

