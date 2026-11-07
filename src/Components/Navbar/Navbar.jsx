import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/slices/authSlice";
import { Avatar, Tooltip } from "@material-tailwind/react";
import { motion } from "framer-motion";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.user.user);
  const { name, image } = user || {};
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const displayName = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "Guest";

  return (
    <header className="sticky top-0 z-40 w-full font-inter">
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-semibold text-[10px] tracking-wide uppercase border border-red-500/30">
              Limited Offer
            </span>
            <span className="font-medium text-slate-200">
              Summer Sale: Up to 50% OFF Storewide
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Free Worldwide Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure 256-bit Checkout
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 group">
              <img
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                src={logo}
                alt="Store Logo"
              />
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Style<span className="text-indigo-600">Hub</span>
              </span>
            </a>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Wishlist Link */}
            <button
              type="button"
              className="hidden sm:flex items-center gap-1.5 text-slate-700 hover:text-red-500 transition-colors text-sm font-medium cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-5 h-5 text-slate-600 hover:text-red-500 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span>Wishlist</span>
            </button>

            {/* Shopping Bag Button with Animated Badge */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-slate-800 transition-colors cursor-pointer"
              aria-label="Open Cart"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="w-5 h-5 text-slate-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                {totalAmount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-rose-500/30"
                  >
                    {totalAmount}
                  </motion.span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold">
                Bag
              </span>
            </motion.button>

            {/* User Profile & Logout */}
            <div className="flex items-center pl-2 border-l border-slate-200">
              <Tooltip content="Click to Sign Out" placement="bottom">
                <button
                  type="button"
                  onClick={() => dispatch(logout())}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left group cursor-pointer"
                >
                  {image ? (
                    <Avatar
                      src={image}
                      alt={displayName}
                      size="sm"
                      className="border border-indigo-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {displayName.charAt(0)}
                    </div>
                  )}
                  <div className="hidden md:flex flex-col">
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      Hi, {displayName}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-red-500 flex items-center gap-0.5">
                      Sign Out
                    </span>
                  </div>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Modal Dialog */}
      {open && <Cart openModal={open} setOpen={setOpen} />}
    </header>
  );
};

export default Navbar;
