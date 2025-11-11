"use client";

interface DateHeaderProps {
  day: number;
  month: number;
  year: number;
  getOrdinalSuffix: (day: number) => string;
  monthNames: string[];
}

export default function DateHeader({ day, month, year, getOrdinalSuffix, monthNames }: DateHeaderProps) {
  return (
    <div className="relative lg:absolute left-1/2 lg:top-[90px] -translate-x-1/2 lg:-translate-y-1/2 animate-fade-in px-4 z-10 w-full" style={{ animationDelay: '0.1s' }}>
      <p className="text-white text-[24px] lg:text-[48px] tracking-[2px] lg:tracking-[10.08px] text-center leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
        <span className="text-[24px] lg:text-[48px]">{day}</span>
        <span className="text-[16px] lg:text-[30.96px] align-super">{getOrdinalSuffix(day)}</span>
        <span className="text-[24px] lg:text-[48px]"> {monthNames[month - 1]} {year}</span>
      </p>
    </div>
  );
}

