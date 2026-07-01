import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { WEDDING_DETAILS, SCRIPTURE_VERSE } from '../data';

export default function InvitationSection() {
  const { groom, bride } = WEDDING_DETAILS;
  const { text, reference, translation } = SCRIPTURE_VERSE;

  return (
    <section id="invitation" className="py-24 px-4 md:px-8 bg-cream-100 flex flex-col items-center justify-center relative overflow-hidden min-h-screen">
      {/* Decorative vertical divider line */}
      <div className="absolute top-0 w-[1px] h-20 bg-gradient-to-b from-transparent to-gold-400" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* PANEL 1: Formal Invitation (Screen 3) - takes 7 columns on desktop */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 bg-white p-8 md:p-12 rounded-[60px] border border-gold-300/30 shadow-lg relative wedding-frame text-center"
        >
          {/* Miniature Arch gold line decor */}
          <div className="absolute inset-4 border border-gold-200/20 rounded-[45px] pointer-events-none" />

          {/* Golden Flower bouquet outline in corner */}
          <div className="absolute top-4 left-4 w-16 h-16 opacity-30 text-gold-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2C11.5 4 10 7 10 9C10 11 11.5 12 12 12C12.5 12 14 11 14 9C14 7 12.5 4 12 2Z" />
              <path d="M6 8C7 9.5 9.5 10 10.5 10C11.5 10 12 9.5 12 9C12 8.5 11 6 9.5 5C8 4 5.5 6.5 6 8Z" />
              <path d="M18 8C17 9.5 14.5 10 13.5 10C12.5 10 12 9.5 12 9C12 8.5 13 6 14.5 5C16 4 18.5 6.5 18 8Z" />
              <path d="M12 12V22" />
            </svg>
          </div>

          <span className="font-script text-5xl text-gold-600 block mb-6">
            R &amp; M
          </span>

          <p className="text-[11px] font-serif tracking-[0.25em] uppercase text-sage-600 leading-relaxed max-w-md mx-auto mb-8">
            IT IS WITH THE GREATER JOY THAT<br/>
            TOGETHER WITH OUR FAMILIES WE,
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-sage-950 font-normal leading-tight tracking-wide my-4 text-gold-glow">
            {groom}<br/>
            <span className="font-script text-4xl text-gold-500 lowercase my-1 block">and</span>
            {bride}
          </h2>

          {/* Elegant floral flourish divider */}
          <div className="my-8 flex justify-center text-gold-400">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16">
              <path d="M30 10C24 4 16 10 10 10M30 10C36 16 44 10 50 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <circle cx="30" cy="10" r="3" fill="currentColor"/>
            </svg>
          </div>

          <p className="text-sm font-serif text-sage-700 leading-relaxed max-w-md mx-auto italic">
            Warmly request the honor of your presence to share in the celebration of our marriage.
          </p>
        </motion.div>

        {/* PANEL 2: Scripture Verse (Screen 4) - takes 5 columns on desktop */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-5 flex flex-col justify-center bg-sage-800 text-cream-50 p-8 md:p-10 rounded-[60px] border border-sage-700 shadow-lg text-center relative h-full min-h-[350px]"
        >
          {/* Subtle Organic Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none rounded-[60px]"
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L0 40V0L20 20zm0 0l20 20V0L20 20z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
               }} 
          />

          <div className="absolute inset-4 border border-gold-400/20 rounded-[45px] pointer-events-none" />

          {/* Beautiful Quote Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-sage-700/60 rounded-full border border-gold-400/30 text-gold-300">
              <Quote className="w-5 h-5 fill-gold-300/10" />
            </div>
          </div>

          {/* Scripture Label */}
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-gold-300 mb-1">
            {reference}
          </span>
          <span className="text-[9px] font-sans tracking-widest uppercase text-sage-300 block mb-6">
            &mdash; {translation} &mdash;
          </span>

          {/* Scripture Body */}
          <blockquote className="font-serif text-lg md:text-xl font-light italic leading-relaxed tracking-wide text-cream-100 max-w-xs mx-auto mb-4">
            &ldquo;{text}&rdquo;
          </blockquote>

          {/* Golden Divider */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </motion.div>

      </div>
    </section>
  );
}
