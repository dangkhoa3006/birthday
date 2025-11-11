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
    
    // Mặc định: không mute và phát nhạc
    if (savedMuted === "true") {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      // Nếu không có lưu trạng thái hoặc đang phát, tự động phát
      if (savedPlaying !== "false") {
        setIsPlaying(true);
      }
    }
  }, []);

  // Đồng bộ muted state và volume với audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = 0.4; // 40% volume
    }
  }, [isMuted]);

  // Set volume ngay khi audio element được mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // 40% volume
    }
  }, []);

  // Tự động phát nhạc ngay khi component mount
  useEffect(() => {
    const savedMuted = localStorage.getItem("musicMuted");
    if (savedMuted === "true") return;

    let hasPlayed = false;
    
    // Hàm phát nhạc trực tiếp
    const playMusicDirectly = async () => {
      if (hasPlayed) return;
      
      // Đợi audio element sẵn sàng
      if (!audioRef.current) {
        setTimeout(playMusicDirectly, 50);
        return;
      }
      
      const audio = audioRef.current;
      const currentMuted = localStorage.getItem("musicMuted");
      if (currentMuted === "true") return;
      
      if (!audio.paused) {
        hasPlayed = true;
        return;
      }
      
      audio.muted = false;
      audio.volume = 0.4;
      
      // Đợi audio load xong nếu chưa sẵn sàng
      if (audio.readyState < 2) {
        const handleCanPlay = () => {
          playMusicDirectly();
        };
        audio.addEventListener('canplay', handleCanPlay, { once: true });
        audio.addEventListener('loadeddata', handleCanPlay, { once: true });
        audio.addEventListener('canplaythrough', handleCanPlay, { once: true });
        // Nếu sau 1 giây vẫn chưa load, thử phát luôn
        setTimeout(() => {
          if (audio.paused && !hasPlayed) {
            playMusicDirectly();
          }
        }, 1000);
        return;
      }
      
      try {
        await audio.play();
        setIsPlaying(true);
        setHasInteracted(true);
        hasPlayed = true;
        localStorage.setItem("musicPlaying", "true");
        localStorage.setItem("musicMuted", "false");
      } catch {
        // Browser chặn autoplay, sẽ thử lại khi có tương tác
      }
    };

    // Thử phát ngay
    playMusicDirectly();
    
    // Thử phát nhiều lần với delay khác nhau
    const timers = [
      setTimeout(playMusicDirectly, 100),
      setTimeout(playMusicDirectly, 300),
      setTimeout(playMusicDirectly, 500),
      setTimeout(playMusicDirectly, 1000),
      setTimeout(playMusicDirectly, 2000),
    ];

    // Tự động click vào nút play sau khi nó được mount
    const clickPlayButton = () => {
      if (playButtonRef.current && audioRef.current && audioRef.current.paused && !hasPlayed) {
        playButtonRef.current.click();
      }
    };
    
    setTimeout(clickPlayButton, 200);
    setTimeout(clickPlayButton, 500);
    setTimeout(clickPlayButton, 1000);

    // Cleanup
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);


  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handlePlay = () => {
      setIsPlaying(true);
      // Đảm bảo không bị mute và set volume khi phát
      if (!isMuted) {
        audio.muted = false;
        audio.volume = 0.4; // 40% volume
      }
    };
    const handlePause = () => {
      // Chỉ set isPlaying = false nếu thực sự bị pause (không phải do lỗi)
      if (audio.paused) {
        setIsPlaying(false);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      // Tự động phát lại nếu không bị mute
      if (!isMuted) {
        audio.currentTime = 0;
        audio.volume = 0.4; // 40% volume
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Tự động phát khi user đã tương tác với trang (bất kỳ đâu trên trang)
    const handleUserInteraction = async () => {
      const savedMuted = localStorage.getItem("musicMuted");
      
      // Nếu bị mute thì không phát
      if (isMuted || savedMuted === "true") return;
      
      // Nếu đã phát rồi thì không cần làm gì
      if (!audio.paused) return;
      
      setHasInteracted(true);
      
      // Đảm bảo không bị mute và set volume
      audio.muted = false;
      audio.volume = 0.4; // 40% volume
      
      // Đợi audio sẵn sàng nếu chưa load xong
      if (audio.readyState < 2) {
        const tryPlayWhenReady = async () => {
          if (audio && audio.paused) {
            try {
              audio.volume = 0.4;
              await audio.play();
              setIsPlaying(true);
              localStorage.setItem("musicPlaying", "true");
              localStorage.setItem("musicMuted", "false");
            } catch {
              // Không thể phát, sẽ thử lại lần sau
            }
          }
        };
        
        audio.addEventListener('canplay', tryPlayWhenReady, { once: true });
        audio.addEventListener('loadeddata', tryPlayWhenReady, { once: true });
        audio.addEventListener('canplaythrough', tryPlayWhenReady, { once: true });
        
        // Nếu sau 500ms vẫn chưa load, thử phát luôn
        setTimeout(tryPlayWhenReady, 500);
        return;
      }
      
      // Thử phát nhạc ngay
      try {
        await audio.play();
        setIsPlaying(true);
        localStorage.setItem("musicPlaying", "true");
        localStorage.setItem("musicMuted", "false");
      } catch {
        // Nếu vẫn không được, thử lại sau một chút
        setTimeout(async () => {
          if (audio && audio.paused) {
            try {
              audio.volume = 0.4;
              await audio.play();
              setIsPlaying(true);
              localStorage.setItem("musicPlaying", "true");
            } catch {
              // Vẫn không được, sẽ thử lại lần sau khi user tương tác
            }
          }
        }, 100);
      }
    };

    // Lắng nghe các sự kiện tương tác trên toàn bộ document
    // Không dùng once để đảm bảo nhạc phát khi có bất kỳ tương tác nào
    // Bao gồm tất cả các sự kiện touch để phát nhạc khi chạm vào màn hình trên mobile
    const events = [
      "click",           // Click chuột
      "touchstart",      // Bắt đầu chạm (quan trọng nhất cho mobile)
      "touchend",        // Kết thúc chạm
      "touchmove",       // Di chuyển khi chạm (lướt)
      "keydown",         // Nhấn phím
      "mousedown",       // Nhấn chuột
      "mouseup",         // Thả chuột
      "scroll",          // Lướt trang
      "wheel"            // Cuộn bằng chuột
    ];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { passive: true });
    });
    
    // Cũng lắng nghe trên window để đảm bảo bắt được mọi tương tác
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("click", handleUserInteraction, { passive: true });

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      // Xóa event listener trên window
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [hasInteracted, isMuted]);

  const playButtonRef = useRef<HTMLButtonElement | null>(null);

  // Gộp chức năng play/pause và mute/unmute vào 1 nút
  const handleToggle = async () => {
    if (!audioRef.current) return;

    setHasInteracted(true);

    // Đảm bảo volume luôn là 40%
    audioRef.current.volume = 0.4;
    
    // Nếu đang mute, unmute và phát
    if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
      localStorage.setItem("musicMuted", "false");
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        localStorage.setItem("musicPlaying", "true");
      } catch {
        // Không thể phát nhạc
      }
    } 
    // Nếu đang phát, pause
    else if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    } 
    // Nếu đang pause, phát
    else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        localStorage.setItem("musicPlaying", "true");
      } catch {
        // Không thể phát nhạc
      }
    }
  };

  // Tự động click vào nút play sau khi component mount để phát nhạc
  useEffect(() => {
    if (!playButtonRef.current) return;
    
    const savedMuted = localStorage.getItem("musicMuted");
    if (savedMuted === "true") return;
    
    // Đợi một chút rồi tự động click vào nút play
    const timer = setTimeout(() => {
      if (playButtonRef.current && audioRef.current && audioRef.current.paused) {
        playButtonRef.current.click();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        autoPlay
        preload="auto"
        style={{ display: "none" }}
      />
      
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        {/* Nút duy nhất: Play/Pause/Mute */}
        <button
          ref={playButtonRef}
          onClick={handleToggle}
          className="w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-white/30 hover:border-white/50"
          aria-label={
            isMuted 
              ? "Bật âm thanh" 
              : isPlaying 
                ? "Tạm dừng" 
                : "Phát nhạc"
          }
        >
          {isMuted ? (
            // Icon mute
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : isPlaying ? (
            // Icon pause
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            // Icon play
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

