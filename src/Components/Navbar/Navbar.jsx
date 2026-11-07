import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/slices/authSlice";
import { filterProducts } from "../../features/slices/productsSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  LogOut,
  Menu,
  X,
  Search,
  Sparkles,
  Truck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.user.user);
  const { name, image } = user || {};
  const [openCart, setOpenCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    "Hoodies",
    "Dresses",
    "Suits",
    "Shoes",
    "T-Shirts",
    "Jeans",
    "Jackets",
    "Bags",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Check if query matches a category
    const matchedCategory = categories.find((c) =>
      c.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    if (matchedCategory) {
      dispatch(filterProducts(matchedCategory));
      navigate(`/filteredProducts/${matchedCategory}`);
    } else {
      dispatch(filterProducts("T-Shirts"));
      navigate(`/filteredProducts/T-Shirts`);
    }
    setSearchOpen(false);
    setSearchQuery("");
  };

  const displayName = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "Guest";

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      {/* 1. Top Announcement Bar */}
      <div className="bg-brand-950 text-slate-300 text-xs py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-400/20 text-amber-300 font-semibold text-[10px] tracking-wider uppercase border border-amber-400/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              SS / 2026 EDITORIAL
            </span>
            <span className="hidden sm:inline font-medium text-slate-300">
              Complimentary worldwide shipping on orders above $100
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-400 text-[11px]">
            <span className="hidden md:flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Express 48h Dispatch
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              100% Certified Authentic
            </span>
            <span className="text-amber-400 font-semibold tracking-wide">
              VIP Code: AURA20
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-slate-200/80 py-3"
            : "bg-white/90 backdrop-blur-md border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <img
                  className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                  src={logo}
                  alt="AURA Luxury Brand"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-display font-black tracking-tighter text-slate-950 uppercase leading-none">
                  AURA<span className="text-indigo-600">.</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  Haute Couture
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 pl-4">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat}
                  to={`/filteredProducts/${cat}`}
                  onClick={() => dispatch(filterProducts(cat))}
                  className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Desktop Search Toggle Button */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium transition-all"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Search catalog...</span>
                <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-white text-[10px] text-slate-400 font-mono shadow-xs">
                  /
                </kbd>
              </button>
            </div>

            {/* Wishlist Link */}
            <Link
              to="/filteredProducts/Dresses"
              onClick={() => dispatch(filterProducts("Dresses"))}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-700 hover:text-rose-600 transition-colors" />
              <span className="hidden xl:inline">Wishlist</span>
            </Link>

            {/* Shopping Bag Button with Bouncing Counter */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setOpenCart(true)}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white shadow-md shadow-slate-950/20 hover:shadow-indigo-600/30 transition-all cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                {totalAmount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                  >
                    {totalAmount}
                  </motion.span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold tracking-wide uppercase">
                Bag
              </span>
            </motion.button>

            {/* User Profile / Logout */}
            <div className="flex items-center pl-2 sm:pl-3 border-l border-slate-200">
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors text-left"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={displayName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {displayName.charAt(0)}
                    </div>
                  )}
                  <div className="hidden xl:flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      VIP Member
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu on Hover/Click */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform origin-top-right">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Signed in as</p>
                    <p className="text-xs text-indigo-600 truncate">{displayName}</p>
                  </div>
                  <Link
                    to="/filteredProducts/Suits"
                    onClick={() => dispatch(filterProducts("Suits"))}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors mt-1"
                  >
                    <span>My Orders</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                  <button
                    onClick={() => dispatch(logout())}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Search Popdown Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-100 bg-slate-50/90 backdrop-blur-md px-4 py-3"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="max-w-2xl mx-auto flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by category (e.g. Hoodies, Suits, Shoes, Dresses, Bags)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img className="h-9 w-auto" src={logo} alt="AURA" />
                    <span className="text-xl font-display font-black tracking-tight text-slate-900">
                      AURA<span className="text-indigo-600">.</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="pt-6">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-3">
                    Departments
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/filteredProducts/${cat}`}
                        onClick={() => {
                          dispatch(filterProducts(cat));
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <span>{cat}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    dispatch(logout());
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wider hover:bg-rose-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({displayName})</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Modal Component */}
      {openCart && <Cart openModal={openCart} setOpen={setOpenCart} />}
    </header>
  );
};

export default Navbar;
