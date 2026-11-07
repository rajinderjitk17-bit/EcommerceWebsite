import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Award, Globe, Leaf } from "lucide-react";
import shoe1 from "../../assets/images/shoe1.jpg";
import suit1 from "../../assets/images/suit1.jpg";

const BrandStory = () => {
  const stats = [
    { value: "50,000+", label: "Garments Crafted & Delivered", icon: <Award className="w-5 h-5 text-amber-500" /> },
    { value: "100%", label: "GOTS-Certified Organic Fibers", icon: <Leaf className="w-5 h-5 text-emerald-500" /> },
    { value: "48h", label: "Express Global Dispatch", icon: <Globe className="w-5 h-5 text-indigo-500" /> },
    { value: "99.4%", label: "Verified 5-Star Connoisseur Reviews", icon: <Sparkles className="w-5 h-5 text-purple-500" /> },
  ];

  return (
    <section className="bg-brand-950 text-white py-20 font-sans border-y border-slate-900 overflow-hidden relative">
      {/* Ambient background glow orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-mono font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              The Art of Modern Sartorial Excellence
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-[1.15]">
              Designed with Precision. <br />
              <span className="bg-gradient-to-r from-amber-200 via-indigo-300 to-white bg-clip-text text-transparent">
                Worn with Unshakable Confidence.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              At AURA, we believe luxury is not about excess—it is defined by impeccable craftsmanship, sustainable traceability, and silhouettes that make a quiet, lasting statement.
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
              From hand-selected Italian wool for our tailored suits to 240 GSM organic ring-spun cotton for our everyday essentials, each collection is refined relentlessly before it ever touches your wardrobe.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-2xl font-mono font-extrabold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Dual Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={shoe1}
                  alt="Handcrafted footwear"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
              </div>
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                <p className="text-xs font-mono text-amber-300 uppercase tracking-wider">
                  Master Tannery
                </p>
                <p className="text-sm font-bold text-white mt-1">
                  Full-Grain Italian Calfskin
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 pt-8">
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  Bespoke Cut
                </p>
                <p className="text-sm font-bold text-white mt-1">
                  Double-Breasted Wool Architecture
                </p>
              </div>
              <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={suit1}
                  alt="Bespoke tailored suit"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
