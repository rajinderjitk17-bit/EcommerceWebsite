import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { singleProduct } from "../../features/slices/productsSlice";
import { addToCart } from "../../features/slices/cartSlice";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Check, Heart, Star } from "lucide-react";

const ProductCard = ({ id, name, text, img, price, colors }) => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  const defaultColor = colors && colors.length > 0 ? colors[0] : "black";

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: id,
        img: img,
        text: text,
        amount: 1,
        price: price,
        totalPrice: price,
        name: name,
        size: "M",
        color: defaultColor,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(!wished);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm rounded-[2rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden flex flex-col font-sans transition-all group"
    >
      <Link
        to={`/filteredProducts/${type}/` + id}
        onClick={() => dispatch(singleProduct(id))}
        className="relative block h-80 w-full overflow-hidden bg-slate-100"
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWish}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-sm cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wished ? "fill-rose-500 text-rose-500" : "text-slate-700"
            }`}
          />
        </button>

        {/* View Piece Overlay */}
        <div className="absolute bottom-3 inset-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="py-2 text-center rounded-xl bg-brand-950/80 backdrop-blur-md text-white text-xs font-semibold shadow-md">
            View Piece Details
          </div>
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Star rating */}
          <div className="flex items-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[11px] font-mono text-slate-400 ml-1.5">
              5.0 (32)
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/filteredProducts/${type}/` + id}
              onClick={() => dispatch(singleProduct(id))}
              className="text-base sm:text-lg font-display font-bold text-slate-900 hover:text-indigo-600 transition-colors leading-snug line-clamp-1"
            >
              {name}
            </Link>
            <span className="text-lg font-mono font-black text-brand-950 shrink-0">
              ${price}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed font-light">
            {text}
          </p>
        </div>

        {/* Color swatches */}
        <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-mono uppercase mr-1">
              Colors:
            </span>
            {colors?.slice(0, 4).map((color, index) => (
              <span
                key={index}
                className="w-3.5 h-3.5 rounded-full border border-white shadow-xs ring-1 ring-slate-200"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {colors && colors.length > 4 && (
              <span className="text-[10px] text-slate-400 font-mono">
                +{colors.length - 4}
              </span>
            )}
          </div>

          <span className="text-[11px] font-mono text-indigo-600 font-semibold uppercase">
            In Stock
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-4 mt-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
                <span>Quick Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
