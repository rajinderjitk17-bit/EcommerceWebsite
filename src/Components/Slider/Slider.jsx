import React, { useEffect, useState } from "react";
import {
  nextSlide,
  prevSlide,
  dotSlide,
} from "../../features/slices/sliderSlice";
import { useSelector, useDispatch } from "react-redux";
import { sliderData } from "../../assets/data/dummyData";
import { motion, AnimatePresence } from "framer-motion";

const Slider = () => {
  const slideIndex = useSelector((state) => state.slider.value);
  const dispatch = useDispatch();
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slider every 4.5 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      dispatch(nextSlide(slideIndex + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [dispatch, slideIndex, isPaused]);

  const currentSlide = sliderData[slideIndex] || sliderData[0];

  return (
    <div
      className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 font-inter"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              className="w-full h-full object-cover object-center"
              src={currentSlide.img}
              alt={currentSlide.text || "hero banner"}
            />

            {/* Gradient Overlay for contrast & readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

            {/* Text Overlay with Framer Motion Stagger */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider w-fit mb-3"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Featured Collection 2026
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.55 }}
                className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md"
              >
                {currentSlide.text}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55 }}
                className="text-slate-200 text-sm sm:text-base mt-2 line-clamp-2 max-w-lg"
              >
                Discover premium fabrics, trending cuts, and seasonal discounts
                up to 50% off across all departments.
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 -translate-y-1/2 left-4 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-lg transition-colors cursor-pointer border border-white/40"
          onClick={() => dispatch(prevSlide(slideIndex - 1))}
          aria-label="Previous Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-lg transition-colors cursor-pointer border border-white/40"
          onClick={() => dispatch(nextSlide(slideIndex + 1))}
          aria-label="Next Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </motion.button>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
          {sliderData.map((dot, index) => {
            const isActive = index === slideIndex;
            return (
              <button
                key={dot.id}
                onClick={() => dispatch(dotSlide(index))}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-7 h-2.5 bg-gradient-to-r from-emerald-400 to-teal-300"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
