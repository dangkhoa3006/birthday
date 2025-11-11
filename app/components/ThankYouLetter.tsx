"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ThankYouLetterProps {
  showLetter: boolean;
  setShowLetter: (show: boolean) => void;
}

export default function ThankYouLetter({ showLetter, setShowLetter }: ThankYouLetterProps) {
  return (
    <>
      {/* Button to open letter */}
      <div className="absolute bottom-[20px] md:bottom-[50px] left-1/2 -translate-x-1/2 z-20 animate-fade-in px-4" style={{ animationDelay: '1s' }}>
        <button
          onClick={() => setShowLetter(true)}
          className="relative px-4 py-3 md:px-8 md:py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-2xl transition-all duration-300 flex items-center gap-2 md:gap-3 overflow-hidden button-glow text-sm md:text-base"
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
      <AnimatePresence>
        {showLetter && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLetter(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            />

            {/* Letter Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-40 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-[90vw] md:max-w-2xl bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
                  <h2 className="text-white text-lg md:text-xl font-semibold" style={{ fontFamily: 'var(--font-montserrat)' }}>
                    Lá thư cảm ơn
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
                    Cảm ơn bạn rất nhiều!
                  </h1>

                  <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed text-sm md:text-base" style={{ fontFamily: 'var(--font-poppins)' }}>
                    <p className="text-center">
                      Thật tuyệt vời khi bạn dành thời gian quý báu để khám phá và trải nghiệm những ý tưởng sáng tạo của chúng tôi.
                    </p>

                    <p className="text-center">
                      Sự quan tâm và ủng hộ của bạn là nguồn động lực lớn lao giúp chúng tôi tiếp tục phát triển và sáng tạo những giải pháp công nghệ tiên tiến.
                    </p>

                    <p className="text-center">
                      Chúng tôi tin rằng với sự hợp tác và tin tưởng lẫn nhau, chúng ta sẽ cùng nhau tạo nên những điều tuyệt vời trong tương lai.
                    </p>

                    <p className="text-center">
                      Chúc bạn luôn thành công, hạnh phúc và gặp nhiều may mắn trong mọi dự án!
                    </p>
                  </div>

                  <div className="border-t border-gray-300 pt-4 md:pt-6 mt-4 md:mt-6">
                    <p className="text-center text-lg md:text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
                      OCTOTECH TEAM
                    </p>
                    <p className="text-center text-gray-600 text-sm md:text-base" style={{ fontFamily: 'var(--font-poppins)' }}>
                      Cảm ơn bạn đã tin tưởng và đồng hành cùng chúng tôi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

