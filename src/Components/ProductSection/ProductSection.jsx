import React from "react";
import { storeData } from "../../assets/data/dummyData";
import ProductSectionItem from "./ProductSectionItem";
import { filterProducts } from "../../features/slices/productsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const ProductSection = () => {
  const dispatch = useDispatch();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            Seasonal Capsule
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 mt-1">
            Summer T-Shirt Collection (30% OFF)
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-light max-w-lg">
            Cut from 240 GSM organic ring-spun cotton. Pre-shrunk, heavyweight drape, and double-needle stitched.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Link
            to="/filteredProducts/T-Shirts"
            onClick={() => dispatch(filterProducts("T-Shirts"))}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors group"
          >
            <span>View All T-Shirts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {storeData.slice(0, 6).map((product, index) => {
          return (
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <ProductSectionItem
                id={product.id}
                name={product.name}
                img={product.img}
                text={product.text}
                price={product.price}
                totalPrice={product.totalPrice}
                color={product.color}
                size={product.size}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;
