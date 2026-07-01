import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Heart } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function SaveTheDateSection() {
  const { date, calendarYear, calendarMonth, calendarDay } = WEDDING_DETAILS;
  
  // Target date: Sept 5, 2026 11:00 AM SAST (GMT+2)
  const targetDate = new Date(calendarYear, calendarMonth, calendarDay, 11, 0, 0).getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isOver: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Calendar days grid calculation for September 2026
  // September 2026 starts on a Tuesday (Index 2). Sunday is Index 0, Monday is Index 1.
  // There are 30 days in September.
  const emptyDaysBefore = Array(2).fill(null); // Sunday and Monday are empty
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const calendarDays = [...emptyDaysBefore, ...monthDays];

  return (
    <section id="save-the-date" className="py-20 px-4 md:px-8 bg-cream-50 relative overflow-hidden flex items-center justify-center min-h-screen">
      {/* Soft botanical background watercolor decorations (CSS-based) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-50 rounded-full blur-3xl opacity-40 -z-10" />

      {/* Main Arch Frame Container (Video Screen 2) */}
      <div className="w-full max-w-2xl bg-white/75 backdrop-blur-sm px-6 py-12 md:p-16 rounded-[120px] md:rounded-[150px] shadow-xl border border-cream-200/60 relative wedding-frame text-center mx-auto">
        {/* Flower arrangements / visual decor in the corners */}
        <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-36 md:h-36 opacity-90 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform rotate-12">
            {/* White rose vector */}
            <circle cx="50" cy="50" r="24" fill="#FAF7F2" stroke="#E5DEC9" strokeWidth="1"/>
            <path d="M40 38C35 45 42 55 50 50C58 45 65 35 50 32C35 29 45 31 40 38Z" fill="#FAF6ED" stroke="#D4AF37" strokeWidth="0.5"/>
            <path d="M50 50C50 62 62 60 62 50C62 40 50 38 50 50Z" fill="#FAF5E8" stroke="#D4AF37" strokeWidth="0.5"/>
            {/* Sage Green Leaves */}
            <path d="M20 20C30 25 35 40 30 50C25 40 10 30 20 20Z" fill="#8A9A86" opacity="0.8"/>
            <path d="M80 30C75 40 82 55 90 60C85 45 75 25 80 30Z" fill="#6E846B" opacity="0.75"/>
          </svg>
        </div>
        <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-24 h-24 md:w-36 md:h-36 opacity-90 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform -rotate-45">
            <circle cx="50" cy="50" r="22" fill="#FAF7F2" stroke="#E5DEC9" strokeWidth="1"/>
            <path d="M40 38C35 45 42 55 50 50C58 45 65 35 50 32C35 29 45 31 40 38Z" fill="#FAF5E8" stroke="#D4AF37" strokeWidth="0.5"/>
            <path d="M55 55C60 68 75 58 65 50" fill="#FAF6ED" stroke="#D4AF37" strokeWidth="0.5"/>
            <path d="M10 60C25 65 40 75 45 90C35 85 20 70 10 60Z" fill="#8A9A86" opacity="0.8"/>
            <path d="M50 10C65 15 70 28 85 30C75 25 60 15 50 10Z" fill="#566a53" opacity="0.75"/>
          </svg>
        </div>

        {/* Small Floating Heart Decor */}
        <div className="flex justify-center mb-4">
          <Heart className="w-5 h-5 text-gold-400 fill-gold-400/20 animate-pulse" />
        </div>

        {/* Title Block (Screen 2: Save the DATE) */}
        <span className="text-sage-600 font-serif text-xs tracking-[0.3em] uppercase block mb-1">
          Save the
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-sage-900 tracking-[0.1em] font-light mb-2">
          DATE
        </h2>
        <p className="text-gold-600 font-serif text-xs tracking-[0.25em] uppercase font-semibold mb-8">
          &bull; WE ARE GETTING MARRIED! &bull;
        </p>

        {/* Calendar Widget (Screen 2 Calendar of Sept 2026) */}
        <div className="max-w-sm mx-auto mb-8 bg-cream-50/50 p-6 rounded-2xl border border-cream-200/50 shadow-inner">
          <h4 className="font-display text-lg text-sage-800 tracking-[0.25em] font-medium mb-4">
            SEPTEMBER 2026
          </h4>
          
          {/* Day of week headers */}
          <div className="grid grid-cols-7 text-xs font-serif text-gold-700/80 tracking-widest border-b border-gold-300/30 pb-2 mb-3">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-3 text-sm font-sans text-sage-800 font-medium">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <span key={`empty-${idx}`} />;
              }
              const isEventDay = day === calendarDay;
              return (
                <div key={`day-${day}`} className="relative flex items-center justify-center">
                  {isEventDay ? (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute w-8 h-8 rounded-full border-2 border-sage-500 bg-sage-500/25 flex items-center justify-center shadow-sm z-10"
                    >
                      <span className="text-sage-950 font-bold text-sm select-none">
                        {day}
                      </span>
                      {/* Floating mini heart */}
                      <span className="absolute -top-1 -right-1 text-[8px] text-gold-600 font-bold">❤</span>
                    </motion.div>
                  ) : (
                    <span className={`w-8 h-8 flex items-center justify-center hover:bg-sage-100/60 rounded-full transition-colors cursor-default ${day === 5 ? 'text-sage-900 font-bold' : ''}`}>
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlighted Event Date Block */}
        <div className="mb-10">
          <p className="font-serif text-gold-600 text-lg md:text-xl font-medium tracking-wide">
            {date}
          </p>
          <p className="text-xs font-serif text-sage-500 tracking-[0.15em] uppercase mt-1">
            Zeerust, North West
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="border-t border-cream-200 pt-8 max-w-md mx-auto">
          <p className="text-xs font-serif text-sage-500 tracking-[0.2em] uppercase mb-4">
            Countdown to our celebration
          </p>
          
          {timeLeft.isOver ? (
            <p className="font-display text-xl text-gold-600 tracking-wider">
              Today is the day! 🎉 Rodney & Mathogonolo are Married!
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-sage-800/5 border border-sage-200/50 rounded-xl py-3 px-1 backdrop-blur-xs">
                <span className="block font-display text-2xl md:text-3xl text-sage-800 font-semibold">{timeLeft.days}</span>
                <span className="block text-[10px] font-serif text-sage-500 uppercase tracking-widest mt-0.5">Days</span>
              </div>
              <div className="bg-sage-800/5 border border-sage-200/50 rounded-xl py-3 px-1 backdrop-blur-xs">
                <span className="block font-display text-2xl md:text-3xl text-sage-800 font-semibold">{timeLeft.hours}</span>
                <span className="block text-[10px] font-serif text-sage-500 uppercase tracking-widest mt-0.5">Hours</span>
              </div>
              <div className="bg-sage-800/5 border border-sage-200/50 rounded-xl py-3 px-1 backdrop-blur-xs">
                <span className="block font-display text-2xl md:text-3xl text-sage-800 font-semibold">{timeLeft.minutes}</span>
                <span className="block text-[10px] font-serif text-sage-500 uppercase tracking-widest mt-0.5">Mins</span>
              </div>
              <div className="bg-sage-800/5 border border-sage-200/50 rounded-xl py-3 px-1 backdrop-blur-xs">
                <span className="block font-display text-2xl md:text-3xl text-sage-800 font-semibold">{timeLeft.seconds}</span>
                <span className="block text-[10px] font-serif text-sage-500 uppercase tracking-widest mt-0.5">Secs</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
