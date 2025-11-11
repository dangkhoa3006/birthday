"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Howl } from "howler";
import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";

export default function BirthdayPage() {
  const [age, setAge] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const birthDate = useMemo(() => new Date(2002, 10, 13), []); // 13.11.2002 (month is 0-indexed)

  useEffect(() => {
    const calculateAge = () => {
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge);
    };

    const calculateCountdown = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      
      // Calculate next birthday (13/11)
      let nextBirthday = new Date(currentYear, 10, 13); // November 13 (month is 0-indexed)
      
      // If birthday has passed this year, set it to next year
      if (today > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, 10, 13);
      }
      
      // Calculate time difference
      const diff = nextBirthday.getTime() - today.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdown({ days, hours, minutes });
    };

    calculateAge();
    calculateCountdown();
    
    // Update countdown every second for real-time updates
    const countdownInterval = setInterval(calculateCountdown, 1000);

    // Set window size and check mobile
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMobile(window.innerWidth < 1024);
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
      clearInterval(countdownInterval);
    };
  }, [birthDate]);

  // Extract day, month, year from birth date
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  // Format day with ordinal suffix
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    // Play birthday music if available
    if (!soundRef.current && typeof window !== "undefined") {
      try {
        // Try to load a birthday song - you can add your own music file
        // soundRef.current = new Howl({
        //   src: ["/assets/music/birthday.mp3"],
        //   autoplay: true,
        //   loop: true,
        //   volume: 0.5,
        // });
      } catch {
        console.log("Music file not found");
      }
    }
  };

  const commonProps = {
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
  };

  return (
    <>
      {isMobile ? (
        <MobileLayout {...commonProps} />
      ) : (
        <DesktopLayout {...commonProps} />
      )}
    </>
  );
}
