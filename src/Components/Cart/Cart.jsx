import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../features/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Truck,
} from "lucide-react";

const Cart = ({ openModal, setOpen }) => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const FREE_SHIPPING_THRESHOLD = 150;
  const progressPercent = Math.min(
    100,
    Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      setOpen(false);
    }, 2500);
  };

  return (
    <div>
      <Dialog
        size="lg"
        className="rounded-[2.5rem] border-0 shadow-2xl font-sans overflow-hidden bg-white"
        open={openModal}
        handler={() => setOpen(false)}
        animate={{
          mount: { scale: 1, y: 0, opacity: 1 },
          unmount: { scale: 0.95, y: -20, opacity: 0 },
        }}
      >
        {/* Header */}
        <DialogHeader className="flex items-center justify-between border-b border-slate-100 px-6 sm:px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">
                Your Shopping Bag
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                {totalAmount} {totalAmount === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {/* Free Shipping Progress Tracker */}
        {cart.length > 0 && (
          <div className="px-6 sm:px-8 py-3.5 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Truck className="w-3.5 h-3.5 text-indigo-600" />
                {totalPrice >= FREE_SHIPPING_THRESHOLD
                  ? "🎉 You unlocked Complimentary Express Shipping!"
                  : `Add $${FREE_SHIPPING_THRESHOLD - totalPrice} more for Free Worldwide Express`}
              </span>
              <span className="font-bold text-indigo-600">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Body Content */}
        <DialogBody className="p-6 sm:p-8 max-h-[55vh] overflow-y-auto">
          <AnimatePresence>
            {checkoutComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-display font-black text-slate-900">
                  Order Successfully Placed!
                </h4>
                <p className="text-sm text-slate-500 max-w-sm mt-1">
                  Thank you for shopping with AURA. A confirmation email and tracking number are being prepared.
                </p>
              </motion.div>
            ) : cart.length > 0 ? (
              <div className="divide-y divide-slate-100 space-y-4">
                {cart.map((item, index) => {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Image & Info */}
                      <div className="flex items-center gap-4">
                        <img
                          className="h-20 w-20 rounded-2xl object-cover border border-slate-100 shadow-sm"
                          src={item.img}
                          alt={item.name}
                        />
                        <div>
                          <h4 className="text-base font-display font-bold text-slate-900 leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                            {item.text}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono font-semibold text-slate-800 text-[11px]">
                              Size: {item.size}
                            </span>
                            <span className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
                              Color:
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block shadow-inner"
                                style={{ backgroundColor: item.color }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="text-right">
                          <div className="text-base font-mono font-black text-brand-950">
                            ${item.totalPrice}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            Qty: {item.amount} × ${item.price}
                          </div>
                        </div>

                        <Tooltip content="Remove item" placement="top">
                          <button
                            onClick={() => dispatch(removeFromCart(item))}
                            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </Tooltip>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="py-14 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-display font-bold text-slate-800">
                  Your Bag is Empty
                </h4>
                <p className="text-sm text-slate-400 mt-1 max-w-xs font-light">
                  Explore our Haute Couture collections and discover tailored statement pieces.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-brand-950 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Start Exploring
                </button>
              </div>
            )}
          </AnimatePresence>
        </DialogBody>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && !checkoutComplete && (
          <DialogFooter className="border-t border-slate-100 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400">
                Subtotal
              </span>
              <div className="text-2xl font-mono font-black text-brand-950">
                ${totalPrice}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 sm:flex-none px-4 py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                Continue
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 sm:flex-none px-7 py-3 rounded-2xl bg-brand-950 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-950/20 hover:shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </DialogFooter>
        )}
      </Dialog>
    </div>
  );
};

export default Cart;
