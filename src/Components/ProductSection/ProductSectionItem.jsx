import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/slices/cartSlice";
import { singleProduct } from "../../features/slices/productsSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Check, Heart, Star } from "lucide-react";

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
  const [wished, setWished] = useState(false);

  const defaultSize = size && size.length > 0 ? size[0] : "M";
  const defaultColor = color && color.length > 0 ? color[0] : "black";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(!wished);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm rounded-[2rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden flex flex-col font-sans transition-all group"
    >
      {/* Product Image Stage */}
      <Link
        to={`/filteredProducts/T-Shirts/${id}`}
        onClick={() => dispatch(singleProduct(id))}
        className="relative block h-80 w-full overflow-hidden bg-slate-100"
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
          <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
            SALE 30%
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleHeartClick}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-sm cursor-pointer"
          aria-label="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wished ? "fill-rose-500 text-rose-500" : "text-slate-700"
            }`}
          />
        </button>

        {/* Quick View Pill on Hover */}
        <div className="absolute bottom-3 inset-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="py-2 text-center rounded-xl bg-brand-950/80 backdrop-blur-md text-white text-xs font-semibold shadow-md">
            View Details
          </div>
        </div>
      </Link>

      {/* Product Information Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating stars & review counts */}
          <div className="flex items-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[11px] font-mono text-slate-400 ml-1.5">
              5.0 (48)
            </span>
          </div>

          {/* Product Name & Price */}
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/filteredProducts/T-Shirts/${id}`}
              onClick={() => dispatch(singleProduct(id))}
              className="text-base sm:text-lg font-display font-bold text-slate-900 hover:text-indigo-600 transition-colors leading-snug line-clamp-1"
            >
              {name}
            </Link>
            <div className="text-right shrink-0">
              <span className="text-lg font-mono font-black text-brand-950">
                ${price}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed font-light">
            {text}
          </p>
        </div>

        {/* Sizes and Color Swatches */}
        <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px] font-mono uppercase">Size:</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 font-mono font-bold text-slate-800 text-[11px]">
              {defaultSize}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px] font-mono uppercase">Color:</span>
            <span
              className="w-4 h-4 rounded-full border-2 border-white shadow-md ring-1 ring-slate-200"
              style={{ backgroundColor: defaultColor }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 mt-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAddToCart}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
              added
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-brand-950 hover:bg-indigo-600 text-white shadow-md hover:shadow-indigo-600/30"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSectionItem;
