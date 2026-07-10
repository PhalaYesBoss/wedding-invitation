import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function HeroSection() {
  const { groom, bride } = WEDDING_DETAILS;

  return (
    <section id="hero" className="min-h-screen relative flex flex-col md:flex-row bg-cream-100 overflow-hidden">
      {/* LEFT PANEL: Sage Green Floral Pattern (Video Screen 1 Left Side) */}
      <div className="w-full md:w-5/12 bg-sage-800 relative flex flex-col items-center justify-center py-16 px-8 md:py-0 border-b-4 md:border-b-0 md:border-r-4 border-gold-300">
        {/* Organic Floral Watermark Overlay */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none bg-repeat pattern-floral" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }} 
        />
        
        {/* Top/Side decorative botanical flourish */}
        <div className="absolute top-8 left-8 text-yellow-300/40 font-serif text-xs tracking-[0.2em] uppercase writing-mode-vertical">
          traditional celebration
        </div>

        {/* Golden Wax Seal & Dried Flowers (Screen 1 Seal) */}
        <div className="relative flex flex-col items-center">
          {/* Dried Baby's Breath / Flower twigs sticking out behind the seal */}
          <div className="absolute -top-12 flex flex-col items-center opacity-85 pointer-events-none">
            <svg width="40" height="70" viewBox="0 0 40 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 70C20 70 20 40 22 25C23 15 28 5 28 5M20 70C20 70 18 45 15 35C12 25 8 12 8 12" stroke="#FAF8F5" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.6"/>
              <circle cx="28" cy="5" r="2" fill="#D4AF37"/>
              <circle cx="8" cy="12" r="2.5" fill="#D4AF37" opacity="0.8"/>
              <circle cx="18" cy="22" r="2" fill="#D4AF37" opacity="0.9"/>
              <circle cx="26" cy="32" r="1.5" fill="#FAF8F5" opacity="0.8"/>
              <circle cx="12" cy="42" r="1.5" fill="#FAF8F5" opacity="0.8"/>
            </svg>
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-600 via-gold-400 to-gold-700 p-0.5 shadow-xl flex items-center justify-center wax-seal relative z-10 hover:rotate-6 transition-transform duration-500"
          >
            <div className="w-[88px] h-[88px] rounded-full bg-gold-600 flex items-center justify-center border border-gold-300/40 relative">
              {/* Embossed Ring */}
              <div className="absolute inset-2 border border-gold-400/40 rounded-full" />
              {/* Embossed Initials */}
              <span className="font-script text-2xl text-gold-100 font-bold select-none text-shadow-sm tracking-tighter">
                R &amp; M
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <span className="text-gold-200 font-serif tracking-[0.3em] uppercase text-xs">
            Honoring Tradition &bull; Embracing Love
          </span>
          <h2 className="text-cream-50 font-serif text-3xl font-light mt-2 tracking-wide">
            05.09.2026
          </h2>
        </motion.div>
      </div>

      {/* RIGHT PANEL: Off-white Cover Text with traditional branding (Video Screen 1 & 8) */}
      <div className="w-full md:w-7/12 relative flex flex-col justify-between p-8 md:p-16 lg:p-24">
        {/* Subtle decorative gold framing corners */}
        <div className="absolute inset-8 border border-gold-300/25 pointer-events-none rounded-sm">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold-400" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold-400" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold-400" />
        </div>

        {/* Header Invitation Text Spacer */}
        <div className="h-8 md:h-12 z-10" />

        {/* Central Initials and Title (Screen 1 & 8) */}
        <div className="my-auto text-center z-10 py-12 md:py-8 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sage-600 font-serif text-xs md:text-sm tracking-[0.3em] uppercase mb-12 md:mb-16"
          >
            The Wedding Celebration of
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-script text-8xl md:text-9xl text-sage-800 leading-none select-none tracking-tight pt-6"
          >
            R&amp;M
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 flex flex-col items-center"
          >
            {/* Elegant Divider with center diamond */}
            <div className="flex items-center gap-3 w-48 justify-center">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-gold-400" />
              <div className="w-2 h-2 rotate-45 border border-gold-400 bg-cream-100" />
              <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-gold-400" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-sage-900 mt-5 tracking-[0.2em] font-medium text-gold-glow">
              TRADITIONAL
            </h3>
            <p className="font-script text-4xl md:text-5xl text-gold-600 mt-2">
              wedding
            </p>

            <p className="font-serif text-sage-600 text-sm italic mt-8 max-w-sm tracking-wide leading-relaxed">
              &ldquo;We, Rodney and Matlhogonolo, with our famailies and friends by our side celebrate our union .&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Nguni Cattle Image Overlay at bottom (Screen 1 Bottom) */}
        <div className="relative mt-auto w-full flex flex-col items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full max-w-lg overflow-hidden rounded-lg shadow-md border border-gold-200/40 p-1 bg-cream-50"
          >
             
          </motion.div>

          <div className="mt-8 flex flex-col items-center">
            <span className="text-xs font-serif text-sage-600/80 tracking-[0.3em] uppercase mb-2">
              Discover Our Story
            </span>
            <a 
              href="#save-the-date"
              className="p-2 text-sage-700 hover:text-gold-600 transition-colors animate-bounce focus:outline-none"
              aria-label="Scroll down to Save the Date"
            >
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
