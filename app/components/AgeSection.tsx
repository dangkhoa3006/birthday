"use client";

interface AgeSectionProps {
  age: number;
}

export default function AgeSection({ age }: AgeSectionProps) {
  return (
    <div
      className="flex flex-col items-center animate-fade-in z-10 flex-shrink-0 lg:absolute lg:left-[1699px] lg:top-[412px] lg:-translate-x-1/2 lg:-translate-y-1/2"
      style={{ animationDelay: "0.6s" }}
    >
      <p
        className="text-gray-200 text-xs uppercase tracking-wider mb-1 lg:hidden text-center"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Age
      </p>
      <p
        className="hidden lg:block text-white text-[14px] lg:text-[28px] font-semibold text-center mb-1 lg:mb-2 tracking-wider uppercase"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        AGE
      </p>
      <div className="hidden lg:block w-[28px] lg:w-[60px] h-[2px] bg-white/60 mb-1.5 lg:mb-3"></div>
      <p
        className="text-white text-2xl lg:text-[64px] font-bold text-center drop-shadow-lg"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {age}
      </p>
    </div>
  );
}

