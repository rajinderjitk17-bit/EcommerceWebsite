import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "Architectural Director, Milan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "The double-breasted suit fits like bespoke Savile Row tailoring. The drape of the wool and subtle shoulder padding are simply perfection.",
      verified: true,
      piece: "Casual Suit 3 • Size L",
    },
    {
      name: "Elena Rostova",
      role: "Creative Strategist, Paris",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "I rarely order silk dresses online, but the craftsmanship here exceeded all expectations. The color saturation and seamwork are flawless.",
      verified: true,
      piece: "Silk Evening Dress • Size S",
    },
    {
      name: "Julian Thorne",
      role: "Product Designer, Tokyo",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "The heavyweight hoodie has ruined all other hoodies for me. The structured hood and brushed French terry cotton feel indestructible.",
      verified: true,
      piece: "Minimalist Hooded Sweatshirt • Size XL",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 font-sans">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-indigo-600 font-mono font-semibold text-xs tracking-widest uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Client Endorsements
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 mt-2">
          Loved by Connoisseurs Worldwide
        </h2>
        <p className="text-sm text-slate-500 mt-2 font-light">
          Real feedback from discerning clients who demand the highest standards in cut, comfort, and longevity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((rev, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 transition-all flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-200/80" />
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-light italic mb-6">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-bold text-slate-900 text-sm">
                      {rev.name}
                    </h4>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {rev.role}
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-mono text-indigo-600 font-semibold mt-2">
                Purchased: {rev.piece}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
