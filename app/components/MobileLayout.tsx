"use client";

import Confetti from "react-confetti";
import DateHeader from "./DateHeader";
import MainTitle from "./MainTitle";
import BornSection from "./BornSection";
import CountdownBox from "./CountdownBox";
import AgeSection from "./AgeSection";
import CelebrateButton from "./CelebrateButton";
import BackgroundImage from "./BackgroundImage";
import Curtain from "./Curtain";

interface MobileLayoutProps {
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

export default function MobileLayout({
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
}: MobileLayoutProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white animate-fade-in">
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

      {/* Header block */}
      <div className="mt-10 flex flex-col items-center text-center leading-relaxed tracking-wide z-10 relative">
        <DateHeader
          day={day}
          month={month}
          year={year}
          getOrdinalSuffix={getOrdinalSuffix}
          monthNames={monthNames}
        />
        {/* thêm khoảng cách giữa header và title */}
        <div className="mt-3">
          <MainTitle />
        </div>
      </div>

      {/* Centered main group */}
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        {/* Countdown */}
        <div className="flex flex-row gap-3 items-center justify-center w-full max-w-[260px] px-2">
          <CountdownBox value={countdown.days} label="DAY" color="pink" position={{ left: "0", top: "0" }} delay="0.4s" />
          <CountdownBox value={countdown.hours} label="HOUR" color="blue" position={{ left: "0", top: "0" }} delay="0.5s" showDot />
          <CountdownBox value={countdown.minutes} label="MINUTE" color="red" position={{ left: "0", top: "0" }} delay="0.55s" />
        </div>

        {/* Born & Age */}
        <div className="mt-4 flex flex-row justify-center items-center gap-16 w-full">
          <BornSection year={year} />
          <AgeSection age={age} />
        </div>

        {/* Celebrate Button */}
        <div className="mt-6">
          <CelebrateButton onClick={handleCelebrate} />
        </div>
      </div>
    </div>
  );
}
