import React from "react";
import { RotateCcw, SearchX } from "lucide-react";
import { motion } from "framer-motion";

const Error = ({ onReset }) => {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md p-10 rounded-[2.5rem] bg-white border border-slate-200/80 shadow-xl flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 shadow-xs">
          <SearchX className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">
          No Matching Pieces Found
        </h3>

        <p className="text-sm text-slate-500 mt-2 font-light leading-relaxed">
          We couldn't find any items matching your selected filter criteria. Try clearing or adjusting your color, size, or gender selection.
        </p>

        {onReset && (
          <button
            onClick={onReset}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-950 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Error;
