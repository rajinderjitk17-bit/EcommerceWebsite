import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { motion } from "framer-motion";

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
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 font-inter pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img
                className="h-10 w-auto object-contain brightness-110"
                src={logo}
                alt="StyleHub logo"
              />
              <span className="text-2xl font-black tracking-tight text-white">
                Style<span className="text-indigo-500">Hub</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your destination for premium fashion, timeless seasonal essentials, and curated designer streetwear. Designed for confidence and everyday comfort.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {["Twitter", "Instagram", "Facebook", "LinkedIn"].map((platform) => (
                <span
                  key={platform}
                  className="w-9 h-9 rounded-full bg-slate-900 hover:bg-indigo-600 border border-slate-800 flex items-center justify-center text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {platform.charAt(0)}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {["Hoodies & Sweatshirts", "Summer Dresses", "Tailored Suits", "Running Shoes", "Organic T-Shirts"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a href="#categories" className="hover:text-indigo-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {["Order Tracking", "Shipping Policy", "Easy 30-Day Returns", "Size Guide", "Help & FAQ"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a href="#support" className="hover:text-indigo-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Stay in the Loop
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Subscribe to get exclusive discount drops, seasonal lookbooks, and VIP access.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold tracking-wider uppercase shadow-md transition-colors cursor-pointer"
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe"}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar with User Name Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © {year} <span className="text-slate-300 font-semibold">Rajinder jit kaur</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
