import React from "react";
import { storeData } from "../../assets/data/dummyData";
import ProductSectionItem from "./ProductSectionItem";
import { motion } from "framer-motion";

const ProductSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 font-inter">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
        <div>
          <span className="text-rose-600 font-bold text-xs tracking-wider uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Special Promotion
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Summer T-Shirt Collection (30% OFF)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Breathable, durable, and crafted from 100% organic cotton
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-400">
          Showing 6 curated picks
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
