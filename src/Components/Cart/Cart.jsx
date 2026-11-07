import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../features/slices/cartSlice";
import { motion } from "framer-motion";

const Cart = ({ openModal, setOpen }) => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        size="lg"
        className="rounded-3xl border-0 shadow-2xl font-inter overflow-hidden"
        open={openModal}
        handler={() => setOpen(false)}
        animate={{
          mount: { scale: 1, y: 0, opacity: 1 },
          unmount: { scale: 0.95, y: -20, opacity: 0 },
        }}
      >
        {/* Header */}
        <DialogHeader className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🛍️</span>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Your Shopping Bag
            </h3>
            {totalAmount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                {totalAmount} {totalAmount === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </DialogHeader>

        {/* Body */}
        <DialogBody className="p-6 max-h-[60vh] overflow-y-auto">
          {cart.length > 0 ? (
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
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                          {item.text}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-800">
                            Size: {item.size}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
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
                        <div className="text-sm font-bold text-slate-900">
                          ${item.totalPrice}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Qty: {item.amount} × ${item.price}
                        </div>
                      </div>

                      <Tooltip content="Remove one item" placement="top">
                        <button
                          onClick={() => dispatch(removeFromCart(item))}
                          className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer text-xs font-bold"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </Tooltip>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <span className="text-5xl mb-3">🛒</span>
              <h4 className="text-xl font-bold text-slate-800">
                Your Bag is Currently Empty
              </h4>
              <p className="text-sm text-slate-400 mt-1 max-w-xs">
                Explore our collections and add trending items to your bag.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          )}
        </DialogBody>

        {/* Footer */}
        {cart.length > 0 && (
          <DialogFooter className="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <span className="text-xs text-slate-500 font-medium">
                Subtotal
              </span>
              <div className="text-2xl font-black text-slate-900">
                ${totalPrice}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  alert(`Thank you for shopping! Proceeding to checkout for $${totalPrice}`);
                  setOpen(false);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Checkout Now →
              </button>
            </div>
          </DialogFooter>
        )}
      </Dialog>
    </div>
  );
};

export default Cart;
