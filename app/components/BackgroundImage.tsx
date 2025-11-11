"use client";

import Image from "next/image";

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 w-full h-full animate-fade-in z-0">
      <Image
        src="/assets/image1.jpg"
        alt="Background"
        fill
        className="object-cover object-center"
        priority
        style={{ objectPosition: "50% 50%" }}
      />
    </div>
  );
}

