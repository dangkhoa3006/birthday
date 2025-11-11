"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/assets/image/1.jpg",
  "/assets/image/2.jpg",
  "/assets/image/3.jpg",
  "/assets/image/4.jpg",
  "/assets/image/5.jpg",
  "/assets/image/6.jpg",
  "/assets/image/7.jpg",
  "/assets/image/8.jpg",
  "/assets/image/9.jpg",
];

export default function ImageSwiper() {
  const ref = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(600);
  const [imageSize, setImageSize] = useState(500);
  const total = images.length;

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setRadius(350);
          setImageSize(200);
        } else if (window.innerWidth < 1024) {
          setRadius(550);
          setImageSize(300);
        } else {
          setRadius(850);
          setImageSize(500);
        }
      }
    };
    updateRadius();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateRadius);
      return () => window.removeEventListener('resize', updateRadius);
    }
  }, []);

  // Animation quay liên tục - tối ưu với requestAnimationFrame
  useEffect(() => {
    if (!ref.current) return;
    
    let animationId: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rotation = elapsed / 50; // tốc độ quay
      
      if (ref.current) {
        ref.current.style.transform = `translateZ(-${radius}px) rotateY(${rotation}deg)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [radius]);

  return (
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] lg:w-[1000px] lg:h-[1000px] animate-fade-in overflow-visible z-10"
      style={{ 
        animationDelay: '0.8s',
        perspective: '1500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div 
        ref={ref} 
        className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px]"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {images.map((src, i) => {
          const margin = -imageSize / 2;
          return (
            <div
              key={i}
              className="absolute rounded-lg overflow-hidden shadow-2xl bg-black/40"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                left: '50%',
                top: '50%',
                marginLeft: `${margin}px`,
                marginTop: `${margin}px`,
                transform: `rotateY(${(360 / total) * i}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <Image
                src={src}
                alt={`Birthday image ${i + 1}`}
                fill
                className="object-contain rounded-lg"
                priority={i < 3}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
