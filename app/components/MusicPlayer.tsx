"use client";

import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  src?: string;
}

export default function MusicPlayer({ src = "/assets/music/birthday.mp3" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedMuted = localStorage.getItem("musicMuted");
    const savedPlaying = localStorage.getItem("musicPlaying");
    
    if (savedMuted === "true") {
      setIsMuted(true);
    }
    
    if (savedPlaying === "true" && savedMuted !== "true") {
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      // Tự động phát lại nếu không bị mute
      if (!isMuted) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Tự động phát khi user đã tương tác với trang
    const handleUserInteraction = async () => {
      if (!hasInteracted && !isMuted && audio.paused) {
        setHasInteracted(true);
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          // Browser chặn autoplay, đợi user click vào nút
        }
      }
    };

    // Lắng nghe các sự kiện tương tác
    const events = ["click", "touchstart", "keydown"];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [hasInteracted, isMuted]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      localStorage.setItem("musicPlaying", "false");
    } else {
      try {
        await audioRef.current.play();
        localStorage.setItem("musicPlaying", "true");
      } catch (error) {
        console.log("Không thể phát nhạc:", error);
      }
    }
  };

  const toggleMute = async () => {
    if (!audioRef.current) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.muted = newMuted;
    localStorage.setItem("musicMuted", newMuted.toString());

    if (newMuted) {
      audioRef.current.pause();
      localStorage.setItem("musicPlaying", "false");
    } else {
      setHasInteracted(true);
      try {
        await audioRef.current.play();
        localStorage.setItem("musicPlaying", "true");
      } catch (error) {
        console.log("Không thể phát nhạc:", error);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        muted={isMuted}
        style={{ display: "none" }}
      />
      
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex gap-2">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-white/30 hover:border-white/50"
          aria-label={isPlaying ? "Tạm dừng" : "Phát nhạc"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-white/30 hover:border-white/50"
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {isMuted ? (
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

