import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Award } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-indigo-500" />,
      title: "Complimentary Express",
      desc: "Carbon-neutral 48h delivery on orders exceeding $100.",
    },
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: "Guaranteed Authenticity",
      desc: "Every single piece hand-inspected by certified connoisseurs.",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-emerald-500" />,
      title: "30-Day Effortless Returns",
      desc: "Prepaid return label and full refund within 48 hours of receipt.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      title: "Encrypted Transactions",
      desc: "256-bit SSL tokenized checkout with multi-currency support.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 shadow-xs">
              {item.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 text-base">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
