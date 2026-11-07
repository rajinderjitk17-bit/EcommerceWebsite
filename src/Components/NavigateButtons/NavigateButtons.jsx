import React from "react";
import clothes from "../../assets/images/clothes.jpg";
import { filterProducts } from "../../features/slices/productsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavigateButtons = () => {
  const categories = [
    { name: "Hoodies", icon: "🧥", tag: "Hot" },
    { name: "Dresses", icon: "👗", tag: "New" },
    { name: "Suits", icon: "🤵", tag: "Elite" },
    { name: "Shoes", icon: "👟", tag: "Popular" },
    { name: "T-Shirts", icon: "👕", tag: "Sale 30%" },
    { name: "Jeans", icon: "👖", tag: "Trending" },
    { name: "Jackets", icon: "🧥", tag: "Winter" },
    { name: "Bags", icon: "👜", tag: "Luxury" },
  ];

  const dispatch = useDispatch();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 font-inter">
      {/* Category Section Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-indigo-600 font-semibold text-xs tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Browse Collections
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
          Shop By Category
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Explore our most popular departments tailored for your individual style
        </p>
      </div>

      {/* Category Pill Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
        {categories.map((cat, index) => {
          return (
            <motion.div
              key={index}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to={"/filteredProducts/" + cat.name}
                onClick={() => dispatch(filterProducts(cat.name))}
                className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/10 transition-all text-slate-800"
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="font-semibold text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </span>
                {cat.tag && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-600 transition-colors">
                    {cat.tag}
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Hero Promo Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 bg-slate-900"
      >
        <div className="relative h-[360px] sm:h-[420px] md:h-[480px] w-full">
          <img
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            src={clothes}
            alt="Summer season campaign"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

          {/* Banner text & CTA */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 md:p-16 max-w-xl text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider w-fit mb-3 shadow-md">
              Mid-Season Clearance
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              SALES UP TO <span className="text-rose-400">50% OFF</span>
            </h3>
            <p className="text-slate-200 text-sm sm:text-base mt-3 leading-relaxed">
              Upgrade your everyday wardrobe with premium essentials, timeless outerwear, and handcrafted shoes at unbeatable seasonal prices.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                to="/filteredProducts/Hoodies"
                onClick={() => dispatch(filterProducts("Hoodies"))}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-lg hover:bg-slate-100 transition-all hover:gap-3"
              >
                <span>Shop Sale Items</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NavigateButtons;
