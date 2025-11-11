"use client";

export default function Curtain() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none animate-fade-in" style={{ animationDuration: '0.01s' }}>
      {/* Left curtain */}
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-black via-gray-900 to-black animate-curtain-left" />

      {/* Right curtain */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black via-gray-900 to-black animate-curtain-right" />
    </div>
  );
}

