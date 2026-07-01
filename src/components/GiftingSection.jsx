import React from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Sparkles, CreditCard, ShoppingBag } from 'lucide-react';

export default function GiftingSection() {
  return (
    <section id="registry" className="py-24 px-4 md:px-8 bg-cream-50 relative overflow-hidden flex items-center justify-center min-h-screen">
      {/* Decorative top divider line */}
      <div className="absolute top-0 w-[1px] h-20 bg-gradient-to-b from-transparent to-gold-400" />

      <div className="w-full max-w-4xl z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-serif text-sage-600 tracking-[0.3em] uppercase block mb-1">
            Gifting Guide
          </span>
          <h2 className="font-display text-4xl text-sage-900 tracking-[0.15em] font-light">
            GIFTS &amp; VOUCHERS
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Elegant Editorial Card describing Gifting wishes */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 rounded-[60px] border border-gold-300/20 shadow-xl max-w-3xl mx-auto relative wedding-frame text-center"
        >
          {/* Internal line decoration */}
          <div className="absolute inset-4 border border-gold-200/10 rounded-[45px] pointer-events-none" />

          {/* Heart decorative monogram */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-sage-50 border border-gold-300/20 flex items-center justify-center text-gold-500 shadow-xs">
              <Gift className="w-6 h-6" />
            </div>
          </div>

          <h3 className="font-serif text-2xl text-sage-950 font-light italic mb-6">
            &ldquo;Your presence is our greatest present&rdquo;
          </h3>

          <div className="max-w-2xl mx-auto space-y-6 text-sage-700 font-serif leading-relaxed text-sm md:text-base">
            <p>
              The greatest gift we could receive is sharing our special day with you. We are incredibly blessed by your love, support, and friendship as we begin our beautiful journey together as husband and wife.
            </p>
            <p className="font-medium text-sage-900">
              Please note that we have not registered for specific store items. 
              Instead, everyone is warmly welcome to bring their own chosen physical gifts, gift cards, or shopping vouchers to help us establish our home.
            </p>
          </div>

          {/* Elegant Icon Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto mt-12 mb-2">
            <div className="p-5 bg-cream-50/50 rounded-2xl border border-cream-200 flex flex-col items-center">
              <ShoppingBag className="w-5 h-5 text-gold-500 mb-2" />
              <span className="text-xs font-serif font-bold text-sage-900 uppercase tracking-wider">Physical Gifts</span>
              <span className="text-[10px] text-sage-500 mt-1 font-sans">Bring to our celebration</span>
            </div>
            <div className="p-5 bg-cream-50/50 rounded-2xl border border-cream-200 flex flex-col items-center">
              <CreditCard className="w-5 h-5 text-gold-500 mb-2" />
              <span className="text-xs font-serif font-bold text-sage-900 uppercase tracking-wider">Gift Vouchers</span>
              <span className="text-[10px] text-sage-500 mt-1 font-sans">From your favorite home store</span>
            </div>
            <div className="p-5 bg-cream-50/50 rounded-2xl border border-cream-200 flex flex-col items-center">
              <Sparkles className="w-5 h-5 text-gold-500 mb-2" />
              <span className="text-xs font-serif font-bold text-sage-900 uppercase tracking-wider">Cash Envelopes</span>
              <span className="text-[10px] text-sage-500 mt-1 font-sans">Traditional blessing envelope</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
