"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackgroundImage from "../components/BackgroundImage";
import ImageSwiper from "../components/ImageSwiper";
import ThankYouLetter from "../components/ThankYouLetter";
import Curtain from "../components/Curtain";

export default function LetterPage() {
  const router = useRouter();
  const [showLetter, setShowLetter] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white animate-fade-in">
      <Curtain />
      <BackgroundImage />
      <ImageSwiper />
      <ThankYouLetter showLetter={showLetter} setShowLetter={setShowLetter} />
      
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 md:top-8 md:left-8 z-20 px-4 py-2 md:px-6 md:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 animate-fade-in text-sm md:text-base"
        style={{ 
          animationDelay: '0.5s',
          fontFamily: 'var(--font-montserrat)'
        }}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-semibold">Quay lại</span>
      </button>
    </div>
  );
}

