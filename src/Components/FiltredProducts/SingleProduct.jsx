import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../../features/slices/cartSlice";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ShoppingBag,
  Check,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const SingleProduct = () => {
  const product = useSelector((state) => state.products.singleProduct);
  const { type, id } = useParams();
  const dispatch = useDispatch();

  const currentItem =
    product.find((p) => p.id === id) || (product && product[0]) || null;

  const defaultSize = currentItem?.size ? currentItem.size[0] : "M";
  const defaultColor = currentItem?.color ? currentItem.color[0] : "black";

  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-24">
          <h2 className="text-2xl font-bold text-slate-800">Piece Not Found</h2>
          <Link to="/" className="text-indigo-600 text-sm font-bold mt-2 inline-block">
            ← Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: currentItem.id,
        name: currentItem.name,
        img: currentItem.img,
        text: currentItem.text,
        size: selectedSize,
        color: selectedColor,
        price: currentItem.price,
        amount: quantity,
        totalPrice: currentItem.price * quantity,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        {/* Breadcrumb Nav */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link
            to={`/filteredProducts/${type || currentItem.type || "Hoodies"}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {type || currentItem.type || "Collections"}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 font-bold truncate max-w-xs">
            {currentItem.name}
          </span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: High-Res Product Image Stage */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 group"
            >
              <img
                src={currentItem.img}
                alt={currentItem.name}
                className="w-full h-[480px] sm:h-[560px] md:h-[620px] object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />

              <div className="absolute top-6 left-6 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-950/80 backdrop-blur-md text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  VIP 15% OFF Applied
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Information, Swatches, Accordions & CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-mono font-bold text-slate-500 ml-2">
                  5.0 (64 Verified Reviews)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-tight">
                {currentItem.name}
              </h1>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-mono font-extrabold text-brand-950">
                  ${currentItem.price}
                </span>
                <span className="text-base font-mono text-slate-400 line-through">
                  ${Math.round(currentItem.price * 1.25)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold font-mono">
                  Save 20%
                </span>
              </div>

              <p className="text-sm text-slate-600 mt-4 leading-relaxed font-light">
                {currentItem.text}
              </p>
            </div>

            {/* Color Swatch Picker */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                  Select Color: <span className="capitalize text-indigo-600">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {currentItem.color.map((col, idx) => {
                  const isSelected = selectedColor === col;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(col)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-brand-950 scale-110 shadow-md ring-2 ring-indigo-400/50"
                          : "border-slate-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: col }}
                      title={col}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            {currentItem.size && currentItem.size.length > 0 && (
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                    Select Size: <span className="text-indigo-600">{selectedSize}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400 underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {currentItem.size.map((sz, idx) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-12 h-11 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand-950 text-white shadow-md shadow-brand-950/20"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              {/* Stepper */}
              <div className="inline-flex items-center rounded-2xl bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-white text-slate-800 font-bold hover:bg-slate-50 flex items-center justify-center shadow-xs cursor-pointer"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-mono font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-white text-slate-800 font-bold hover:bg-slate-50 flex items-center justify-center shadow-xs cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 w-full py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
                  added
                    ? "bg-emerald-600 text-white shadow-emerald-600/30"
                    : "bg-brand-950 hover:bg-indigo-600 text-white shadow-brand-950/25 hover:shadow-indigo-600/30"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added {quantity} to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Shopping Bag • ${(currentItem.price * quantity)}</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Trust highlights banner */}
            <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 grid grid-cols-3 gap-2 text-center text-slate-700 text-xs">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-[11px]">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-[11px]">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-[11px]">100% Authentic</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              {[
                {
                  id: "details",
                  title: "Materials & Sustainable Craftsmanship",
                  content:
                    "Spun from certified organic long-staple fibers. Milled under rigorous OEKO-TEX® standards with zero harsh chemical softeners. Naturally breathable and hypoallergenic.",
                },
                {
                  id: "care",
                  title: "Garment Care Instructions",
                  content:
                    "Machine wash cold inside-out on gentle cycle with mild detergent. Reshape while damp and lay flat to dry in shade. Cool iron on reverse if desired. Do not tumble dry.",
                },
                {
                  id: "shipping",
                  title: "Global Delivery & Returns Policy",
                  content:
                    "Orders are processed within 24 hours. Express 48h courier dispatch worldwide. Every delivery includes prepaid return labels for our 30-day effortless exchange service.",
                },
              ].map((tab) => {
                const isOpen = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => setActiveTab(isOpen ? "" : tab.id)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-800 hover:text-indigo-600 transition-colors"
                    >
                      <span>{tab.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4 text-xs text-slate-500 font-light leading-relaxed border-t border-slate-100 pt-3"
                        >
                          {tab.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SingleProduct;
