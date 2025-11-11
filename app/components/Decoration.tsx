"use client";

import Image from "next/image";

export default function Decoration() {
  return (
    <div className="absolute left-[4.43%] top-[6.39%] w-[4.5%] h-[4.44%] animate-fade-in" style={{ animationDelay: '0.05s' }}>
      <Image src="/assets/group.png" alt="Decoration" fill className="object-contain" />
    </div>
  );
}

