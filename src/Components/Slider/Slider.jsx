import React, { useEffect, useState } from "react";
import {
  nextSlide,
  prevSlide,
  dotSlide,
} from "../../features/slices/sliderSlice";
import { filterProducts } from "../../features/slices/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { sliderData } from "../../assets/data/dummyData";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

const Slider = () => {
  const slideIndex = useSelector((state) => state.slider.value);
  const dispatch = useDispatch();
  const [isPaused, setIsPaused] = useState(false);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      dispatch(nextSlide(slideIndex + 1));
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [dispatch, slideIndex, isPaused]);

  const currentSlide = sliderData[slideIndex] || sliderData[0];

  // Map slide ID to category for relevant shop CTA
  const getCategoryForSlide = (id) => {
    switch (parseInt(id)) {
      case 0:
        return "Shoes";
      case 1:
        return "Dresses";
      case 2:
        return "Suits";
      case 3:
        return "Hoodies";
      default:
        return "T-Shirts";
    }
  };

  const targetCategory = getCategoryForSlide(currentSlide.id);

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8 font-sans"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-950/20 bg-brand-950 border border-slate-900/40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image with Ken Burns subtle scale */}
            <img
              className="w-full h-full object-cover object-center filter brightness-[0.88]"
              src={currentSlide.img}
              alt={currentSlide.text || "Haute Couture Editorial"}
            />

            {/* Cinematic Multilayer Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/45 to-transparent opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/40 to-transparent" />

            {/* Editorial Content Showcase */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-16 lg:p-20 max-w-3xl text-white">
              {/* Floating Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-mono uppercase tracking-widest w-fit mb-4 shadow-glass"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Spring / Summer 2026 Editorial Drop</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.08] drop-shadow-md"
              >
                {currentSlide.text}
              </motion.h1>

              {/* Supporting Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55 }}
                className="text-slate-200 text-sm sm:text-base md:text-lg mt-3 line-clamp-2 max-w-xl leading-relaxed font-light"
              >
                Impeccably tailored garments, sustainable natural fibers, and timeless silhouettes engineered for the modern aesthetic visionary.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  to={`/filteredProducts/${targetCategory}`}
                  onClick={() => dispatch(filterProducts(targetCategory))}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white text-brand-950 font-bold text-sm shadow-xl hover:bg-brand-cream hover:shadow-2xl transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-950 group-hover:scale-110 transition-transform" />
                  <span>Explore {targetCategory}</span>
                  <ArrowRight className="w-4 h-4 text-brand-950 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/filteredProducts/Dresses"
                  onClick={() => dispatch(filterProducts("Dresses"))}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-all"
                >
                  <span>View Lookbook</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrow Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 z-20">
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            whileTap={{ scale: 0.92 }}
            className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md text-brand-950 flex items-center justify-center shadow-glass transition-colors cursor-pointer border border-white/40"
            onClick={() => dispatch(prevSlide(slideIndex - 1))}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 z-20">
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            whileTap={{ scale: 0.92 }}
            className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md text-brand-950 flex items-center justify-center shadow-glass transition-colors cursor-pointer border border-white/40"
            onClick={() => dispatch(nextSlide(slideIndex + 1))}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Bottom Pagination & Animated Progress Track */}
        <div className="absolute bottom-6 right-6 sm:right-10 z-20 flex items-center gap-2 bg-brand-950/60 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/15">
          {sliderData.map((item, index) => {
            const isActive = index === slideIndex;
            return (
              <button
                key={item.id}
                onClick={() => dispatch(dotSlide(index))}
                className="group relative py-1 cursor-pointer"
                aria-label={`Slide ${index + 1}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isActive
                      ? "w-8 bg-gradient-to-r from-amber-300 via-indigo-400 to-indigo-500"
                      : "w-2.5 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
          <span className="text-[11px] font-mono font-bold text-slate-300 ml-2">
            0{slideIndex + 1} / 0{sliderData.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Slider;
