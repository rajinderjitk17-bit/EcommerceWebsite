import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ProductCard from "./ProductCard";
import Error from "../Error/Error";
import {
  filterProducts,
  filterGender,
  sortByPrice,
  filterByColor,
  filterBySize,
} from "../../features/slices/productsSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ArrowDownUp,
  RotateCcw,
  Palette,
  SlidersHorizontal,
} from "lucide-react";

const FilteredProducts = () => {
  const products = useSelector((state) => state.products.filteredProducts);
  const error = useSelector((state) => state.products.error);
  const { type } = useParams();
  const dispatch = useDispatch();

  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [sizeMenuOpen, setSizeMenuOpen] = useState(false);
  const [activeGender, setActiveGender] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");

  const colorButtons = [
    "red",
    "green",
    "purple",
    "yellow",
    "orange",
    "blue",
    "black",
    "brown",
  ];
  const sizeButtons = ["S", "M", "L", "XL"];

  const handleGenderFilter = (gender) => {
    setActiveGender(gender);
    dispatch(filterGender(gender));
  };

  const handleColorFilter = (color) => {
    setActiveColor(color);
    setColorMenuOpen(false);
    dispatch(filterByColor(color));
  };

  const handleSizeFilter = (size) => {
    setActiveSize(size);
    setSizeMenuOpen(false);
    dispatch(filterBySize(size));
  };

  const handleResetFilters = () => {
    setActiveGender("");
    setActiveColor("");
    setActiveSize("");
    dispatch(filterProducts(type));
  };

  const matchingProducts = products.filter((p) => p.type === type);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-500">Collections</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 font-bold uppercase">{type}</span>
        </nav>

        {/* Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <span className="text-indigo-600 font-mono text-xs font-semibold uppercase tracking-widest">
              Curated Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mt-1">
              {type}
            </h1>
            <p className="text-sm text-slate-500 font-light mt-1">
              Discover artisanally crafted {type.toLowerCase()} designed for modern elegance.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {matchingProducts.length} {matchingProducts.length === 1 ? "piece" : "pieces"} found
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Gender Filters */}
            <div className="inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200/80">
              {["male", "female"].map((g) => {
                const isSelected = activeGender === g;
                return (
                  <button
                    key={g}
                    onClick={() => handleGenderFilter(g)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      isSelected
                        ? "bg-brand-950 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>

            {/* Price Sort Button */}
            <button
              onClick={() => dispatch(sortByPrice())}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <ArrowDownUp className="w-3.5 h-3.5 text-slate-500" />
              <span>Highest Price</span>
            </button>

            {/* Color Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setColorMenuOpen(!colorMenuOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5 text-slate-500" />
                <span>{activeColor ? `Color: ${activeColor}` : "Select Color"}</span>
                {activeColor && (
                  <span
                    className="w-3 h-3 rounded-full border border-slate-300 ml-1"
                    style={{ backgroundColor: activeColor }}
                  />
                )}
              </button>

              <AnimatePresence>
                {colorMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-30 grid grid-cols-2 gap-1"
                  >
                    {colorButtons.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorFilter(color)}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs capitalize hover:bg-slate-50 text-left cursor-pointer"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="truncate">{color}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Size Filter Dropdown (disabled for Bags/Shoes) */}
            {type !== "Bags" && type !== "Shoes" && (
              <div className="relative">
                <button
                  onClick={() => setSizeMenuOpen(!sizeMenuOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  <span>{activeSize ? `Size: ${activeSize}` : "Select Size"}</span>
                </button>

                <AnimatePresence>
                  {sizeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-30 space-y-1"
                    >
                      {sizeButtons.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeFilter(size)}
                          className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-mono font-bold hover:bg-slate-50 text-slate-800 cursor-pointer"
                        >
                          Size {size}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Clear Filters Reset Button */}
          <div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Product Grid / Error State */}
        {error || matchingProducts.length === 0 ? (
          <Error onReset={handleResetFilters} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
          >
            {matchingProducts.map((product, index) => {
              return (
                <div key={product.id || index} className="w-full flex justify-center">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    text={product.text}
                    img={product.img}
                    price={product.price}
                    colors={product.color}
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FilteredProducts;
