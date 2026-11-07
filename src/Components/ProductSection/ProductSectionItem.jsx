import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/slices/cartSlice";
import { motion } from "framer-motion";

const ProductSectionItem = ({
  id,
  img,
  name,
  text,
  size,
  price,
  color,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const defaultSize = size && size.length > 0 ? size[0] : "M";
  const defaultColor = color && color.length > 0 ? color[0] : "black";

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: id,
        img: img,
        text: text,
        amount: 1,
        price: price,
        totalPrice: totalPrice || price,
        name: name,
        size: defaultSize,
        color: defaultColor,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/60 overflow-hidden flex flex-col font-inter transition-shadow"
    >
      {/* Image Area with SALE Badge */}
      <div className="relative h-80 w-full overflow-hidden bg-slate-100 group">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3.5 right-3.5 z-10 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
          SALE 30%
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {name}
            </h3>
            <span className="text-lg font-extrabold text-indigo-600 shrink-0">
              ${price}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {text}
          </p>
        </div>

        {/* Sizes and Colors Attributes */}
        <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="text-slate-400 font-medium">Size:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-800">
              {defaultSize}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="text-slate-400 font-medium">Color:</span>
            <span
              className="w-4 h-4 rounded-full border border-slate-300 shadow-inner"
              style={{ backgroundColor: defaultColor }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 mt-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
              added
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-slate-900 hover:bg-indigo-600 text-white shadow-md hover:shadow-indigo-600/30"
            }`}
          >
            {added ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSectionItem;
