import React from "react";
import clothes from "../../assets/images/clothes.jpg";
import { filterProducts } from "../../features/slices/productsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Sparkles, Tag, ArrowRight } from "lucide-react";

const NavigateButtons = () => {
  const categories = [
    { name: "Hoodies", tag: "Most Wanted", highlight: "Heavyweight Fleece" },
    { name: "Dresses", tag: "New Drop", highlight: "Silk & Satin Silhouettes" },
    { name: "Suits", tag: "Artisanal", highlight: "Italian Wool Tailoring" },
    { name: "Shoes", tag: "Trending", highlight: "Minimalist Footwear" },
    { name: "T-Shirts", tag: "30% OFF", highlight: "240 GSM Organic Cotton" },
    { name: "Jeans", tag: "Essential", highlight: "Japanese Selvedge Denim" },
    { name: "Jackets", tag: "Winter Capsule", highlight: "Thermal Technical Outerwear" },
    { name: "Bags", tag: "Handcrafted", highlight: "Full-Grain Leather Totes" },
  ];

  const dispatch = useDispatch();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Curated Departments
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 mt-1">
            Shop Haute Couture Collections
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-lg font-light">
            Individually tailored garments designed to transcend temporary trends.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Link
            to="/filteredProducts/Suits"
            onClick={() => dispatch(filterProducts("Suits"))}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group transition-colors"
          >
            <span>Browse Full Runway Archive</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-14">
        {categories.map((cat, index) => {
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={"/filteredProducts/" + cat.name}
                onClick={() => dispatch(filterProducts(cat.name))}
                className="group relative block p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all overflow-hidden h-full flex flex-col justify-between"
              >
                {/* Subtle top decoration */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    {cat.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {cat.highlight}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Editorial Split Hero Promotional Banner */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-950/25 bg-brand-950 border border-slate-800"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 text-white z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Mid-Season VIP Clearance
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-[1.1]">
              UP TO <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">50% OFF</span> THE ARCHIVE
            </h3>

            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-lg font-light">
              Elevate your daily uniform. Handpicked statement coats, organic essential layers, and handcrafted leather accessories at exclusive seasonal pricing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/filteredProducts/Hoodies"
                onClick={() => dispatch(filterProducts("Hoodies"))}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-brand-950 font-bold text-sm shadow-xl hover:bg-brand-cream transition-all group"
              >
                <span>Shop Private Sale</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Automatically applied at checkout</span>
              </div>
            </div>
          </div>

          {/* Right Imagery Column */}
          <div className="lg:col-span-5 h-[320px] sm:h-[400px] lg:h-full relative overflow-hidden">
            <img
              className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-700"
              src={clothes}
              alt="Luxury editorial campaign"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-950 via-brand-950/20 to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NavigateButtons;
