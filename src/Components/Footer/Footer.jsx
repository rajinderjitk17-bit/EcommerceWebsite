import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-brand-950 text-slate-300 font-sans pt-20 pb-12 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top VIP Perks Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-white/10 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Complimentary Express</p>
              <p className="text-slate-400 text-[11px]">Carbon-neutral worldwide delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Guaranteed Authenticity</p>
              <p className="text-slate-400 text-[11px]">100% verified certified provenance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">30-Day Effortless Returns</p>
              <p className="text-slate-400 text-[11px]">Complimentary prepaid return labels</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-white/10">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                className="h-10 w-auto object-contain brightness-110"
                src={logo}
                alt="AURA Luxury Brand"
              />
              <span className="text-2xl font-display font-black tracking-tighter text-white uppercase">
                AURA<span className="text-indigo-500">.</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-light">
              Haute Couture and refined everyday garments designed for the modern aesthetic vanguard. Milled from certified sustainable fibers with zero compromise on luxury.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {["Instagram", "Twitter", "Pinterest", "LinkedIn"].map((platform) => (
                <span
                  key={platform}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-indigo-600 border border-white/10 text-[11px] font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Curated Departments */}
          <div>
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-4">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              {["Tailored Suits", "Silk Evening Dresses", "Minimalist Footwear", "Heavyweight Hoodies", "Organic Cotton Tees", "Selvedge Denim"].map(
                (item, idx) => (
                  <li key={idx}>
                    <span className="hover:text-amber-300 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              {["VIP Private Styling", "Order Tracking Portal", "Bespoke Size Consultation", "Care & Maintenance", "Sustainability Report"].map(
                (item, idx) => (
                  <li key={idx}>
                    <span className="hover:text-amber-300 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* VIP Insiders Club */}
          <div>
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              VIP Insiders Club
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-light">
              Receive private salon invitations, seasonal lookbooks, and 15% off your initial order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter private email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400 transition-colors font-sans"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{subscribed ? "✓ You Are on the VIP List" : "Join the Club"}</span>
                {!subscribed && <ArrowRight className="w-3.5 h-3.5" />}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar with User Name Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left font-light">
            © {year} <span className="text-slate-200 font-bold">Rajinder jit kaur</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-slate-400 text-xs font-mono">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
