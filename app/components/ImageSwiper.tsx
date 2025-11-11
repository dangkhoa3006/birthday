"use client";

import { motion, useAnimationFrame } from "framer-motion";
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
  const total = images.length;

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setRadius(250);
        } else if (window.innerWidth < 1024) {
          setRadius(450);
        } else {
          setRadius(750);
        }
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Animation quay liên tục
  useAnimationFrame((t) => {
    if (!ref.current) return;
    const rotation = t / 50; // tốc độ quay (chậm hơn)
    ref.current.style.transform = `translateZ(-${radius}px) rotateY(${rotation}deg)`;
  });

  return (
    <div 
      className="absolute bottom-[50px] md:bottom-[80px] lg:bottom-[100px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] lg:w-[900px] lg:h-[900px] animate-fade-in overflow-visible z-10"
      style={{ 
        animationDelay: '0.8s',
        perspective: '1500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div 
        ref={ref} 
        className="relative w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px]"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {images.map((src, i) => {
          const imageSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : window.innerWidth < 1024 ? 250 : 450;
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
      </motion.div>
    </div>
  );
}
