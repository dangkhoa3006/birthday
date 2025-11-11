"use client";

import { useState } from "react";
import Confetti from "react-confetti";
import DateHeader from "./DateHeader";
import MainTitle from "./MainTitle";
import BornSection from "./BornSection";
import CountdownBox from "./CountdownBox";
import AgeSection from "./AgeSection";
import CelebrateButton from "./CelebrateButton";
import BackgroundImage from "./BackgroundImage";
import Curtain from "./Curtain";

interface DesktopLayoutProps {
  age: number;
  countdown: { days: number; hours: number; minutes: number };
  day: number;
  month: number;
  year: number;
  getOrdinalSuffix: (day: number) => string;
  monthNames: string[];
  windowSize: { width: number; height: number };
  showConfetti: boolean;
  handleCelebrate: () => void;
}

export default function DesktopLayout({
  age,
  countdown,
  day,
  month,
  year,
  getOrdinalSuffix,
  monthNames,
  windowSize,
  showConfetti,
  handleCelebrate,
}: DesktopLayoutProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white animate-fade-in" style={{ minHeight: "1080px" }}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <Curtain />
      <BackgroundImage />
      <DateHeader 
        day={day} 
        month={month} 
        year={year} 
        getOrdinalSuffix={getOrdinalSuffix}
        monthNames={monthNames}
      />
      <MainTitle />
      <BornSection year={year} />
      
      {/* Desktop Countdown Boxes - absolute positioning */}
      <div className="hidden lg:block">
        <CountdownBox
          value={countdown.days}
          label="DAY"
          color="pink"
          position={{ left: "469px", top: "342px" }}
          delay="0.4s"
        />
        <CountdownBox
          value={countdown.hours}
          label="HOUR"
          color="blue"
          position={{ left: "839px", top: "342px" }}
          delay="0.5s"
          showDot={true}
        />
        <CountdownBox
          value={countdown.minutes}
          label="MINUTE"
          color="red"
          position={{ left: "1209px", top: "342px" }}
          delay="0.55s"
        />
      </div>
      
      <AgeSection age={age} />
      <CelebrateButton onClick={handleCelebrate} />
    </div>
  );
}

