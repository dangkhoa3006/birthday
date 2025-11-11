"use client";

interface ThankYouLetterProps {
  showLetter: boolean;
  setShowLetter: (show: boolean) => void;
}

export default function ThankYouLetter({ showLetter, setShowLetter }: ThankYouLetterProps) {
  return (
    <>
      {/* Button to open letter */}
      <div className="fixed bottom-[80px] md:bottom-[100px] lg:bottom-[120px] left-1/2 -translate-x-1/2 z-50 animate-fade-in px-4 pointer-events-auto" style={{ animationDelay: '1.2s' }}>
        <button
          onClick={() => setShowLetter(true)}
          className="relative px-6 py-3 md:px-8 md:py-4 bg-gray-900/95 hover:bg-gray-800/95 backdrop-blur-md text-white rounded-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 overflow-visible button-glow text-sm md:text-base whitespace-nowrap border-2 border-white/30"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {/* Animated border */}
          <div className="absolute inset-0 rounded-lg border-2 border-white/50 animate-border-spin"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center gap-2 md:gap-3">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm md:text-lg font-semibold">Hãy nhấn vào thư</span>
          </div>
        </button>
      </div>

      {/* Modal Letter */}
      {showLetter && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowLetter(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 animate-modal-backdrop"
          />

          {/* Letter Modal */}
          <div
            className="fixed inset-0 z-40 flex items-center justify-center p-4 animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
              <div className="relative w-full max-w-[90vw] md:max-w-2xl bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
                  <h2 className="text-white text-lg md:text-xl font-semibold" style={{ fontFamily: 'var(--font-montserrat)' }}>
                    Lá thư chúc mừng sinh nhật
                  </h2>
                  <button
                    onClick={() => setShowLetter(false)}
                    className="text-white hover:text-gray-300 transition-colors text-xl md:text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                {/* Letter Content */}
                <div className="p-4 md:p-8 space-y-4 md:space-y-6">
                  <h1 className="text-center text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6" style={{ fontFamily: 'var(--font-montserrat)' }}>
                    Chúc mừng sinh nhật!
                  </h1>

                  <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed text-sm md:text-base" style={{ fontFamily: 'var(--font-poppins)' }}>
                    <p className="text-center">
                      Chúc mừng sinh nhật Công Chúa! 🎉🎂
                    </p>

                    <p className="text-center">
                      Hôm nay là một ngày đặc biệt - ngày Công Chúa chào đời và mang đến niềm vui cho thế giới này. 
                    </p>

                    <p className="text-center">
                      Chúc Công Chúa luôn hạnh phúc, khỏe mạnh và thành công trong mọi điều Công Chúa làm. 
                      Mong rằng năm mới của Công Chúa sẽ tràn đầy những niềm vui, những ước mơ thành hiện thực và những khoảnh khắc đáng nhớ.
                    </p>

                    <p className="text-center">
                      Hãy luôn giữ nụ cười trên môi và trái tim rộng mở để đón nhận tất cả những điều tuyệt vời sắp đến nhé! ✨
                    </p>
                  </div>

                  <div className="border-t border-gray-300 pt-4 md:pt-6 mt-4 md:mt-6">
                    <p className="text-center text-lg md:text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
                      Bụt
                    </p>
                    <p className="text-center text-gray-600 text-sm md:text-base" style={{ fontFamily: 'var(--font-poppins)' }}>
                      Với tất cả tình yêu thương ❤️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}

