import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Shirt, Compass, CalendarPlus } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';


export default function DetailsSection() {
  const { date, time, venue, theme } = WEDDING_DETAILS;

  // Google Calendar Link generator
  const getGoogleCalendarLink = () => {
    const title = encodeURIComponent("Rodney & Mathogonolo's Traditional Wedding");
    const dates = "20260905T090000Z/20260905T180000Z"; // 11:00 AM SAST (GMT+2) is 09:00 UTC
    const details = encodeURIComponent("Celebrate the traditional wedding union of Rodney and Mathogonolo. Theme: Traditional Attire.");
    const location = encodeURIComponent(`${venue.name}, ${venue.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const openDirections = () => {
    const query = encodeURIComponent(`${venue.name}, ${venue.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section id="details" className="py-24 px-4 md:px-8 bg-cream-50 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Curved background line decorations */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-gold-300" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M-10,30 C30,40 40,10 70,20 C90,25 110,10 110,10" strokeWidth="0.5" strokeDasharray="3 3" />
        <path d="M-10,70 C20,60 50,80 80,60 C100,50 110,80 110,80" strokeWidth="0.5" strokeDasharray="3 3" />
      </svg>

      <div className="w-full max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-xs font-serif text-sage-600 tracking-[0.3em] uppercase block mb-1">
            Celebration
          </span>
          <h2 className="font-display text-4xl text-sage-900 tracking-[0.15em] font-light">
            DETAILS
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CARD 1: Venue, Date & Time (Screen 5) - takes 7 columns on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[48px] border border-gold-300/30 shadow-lg flex flex-col justify-between relative wedding-frame"
          >
            {/* Corner floral spray decoration (Screen 5 Bottom Right arrangement) */}
            <div className="absolute bottom-4 right-4 w-28 h-28 opacity-80 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform rotate-12">
                <circle cx="65" cy="65" r="15" fill="#FAF7F2" stroke="#E5DEC9" strokeWidth="0.5"/>
                <path d="M45 45C35 55 45 65 55 60C65 55 70 40 55 35" fill="#FAF5E8" stroke="#D4AF37" strokeWidth="0.5"/>
                <path d="M75 75C80 85 95 85 90 70C85 55 70 65 75 75Z" fill="#8A9A86" opacity="0.65"/>
                <path d="M30 65C35 75 48 80 50 95C40 90 30 75 30 65Z" fill="#6E846B" opacity="0.8"/>
              </svg>
            </div>

            <div className="space-y-8 z-10">
              {/* Venue Row */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-sage-50 rounded-2xl border border-gold-300/20 text-sage-700 mt-1 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h4 className="font-display text-sm tracking-[0.2em] uppercase text-sage-900 font-medium mb-1">
                    VENUE
                  </h4>
                  <p className="font-serif text-lg font-semibold text-sage-950 mb-0.5">
                    {venue.name}
                  </p>
                  <p className="font-serif text-sm text-sage-500 italic">
                    (Hillside View)
                  </p>
                  <p className="font-sans text-xs text-sage-600 mt-1.5 leading-relaxed">
                    {venue.address}
                  </p>
                </div>
              </div>

              {/* Date Row */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-sage-50 rounded-2xl border border-gold-300/20 text-sage-700 mt-1 flex-shrink-0">
                  <Calendar className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h4 className="font-display text-sm tracking-[0.2em] uppercase text-sage-900 font-medium mb-1">
                    DATE
                  </h4>
                  <p className="font-serif text-lg text-sage-800 font-medium">
                    {date}
                  </p>
                </div>
              </div>

              {/* Time Row */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-sage-50 rounded-2xl border border-gold-300/20 text-sage-700 mt-1 flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h4 className="font-display text-sm tracking-[0.2em] uppercase text-sage-900 font-medium mb-1">
                    TIME
                  </h4>
                  <p className="font-serif text-lg text-sage-800 font-medium">
                    {time}
                  </p>
                  <p className="text-[11px] font-sans text-sage-500 tracking-wider uppercase mt-0.5">
                    Service starts promptly at 11:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Practical Action Buttons */}
            <div className="mt-12 flex flex-wrap gap-3 z-10">
              <button
                id="btn-directions"
                onClick={openDirections}
                className="flex items-center gap-2 bg-sage-800 hover:bg-sage-700 text-gold-100 font-serif text-xs tracking-widest uppercase px-5 py-3 rounded-full border border-gold-400/50 shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-gold-300" />
                Get Directions
              </button>

              <a
                href={getGoogleCalendarLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-cream-100 hover:bg-cream-200 text-sage-800 font-serif text-xs tracking-widest uppercase px-5 py-3 rounded-full border border-gold-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <CalendarPlus className="w-4 h-4 text-gold-600" />
                Add To Calendar
              </a>
            </div>
          </motion.div>

          {/* CARD 2: Theme / Dress Code (Screen 6) - takes 5 columns on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200 p-8 md:p-10 rounded-[48px] border border-gold-300/30 shadow-lg flex flex-col justify-between text-center relative overflow-hidden"
          >
            {/* Elegant silk-like draping background pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-repeat bg-center pointer-events-none"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 20 50 10 T100 10' fill='none' stroke='%23B38F43' stroke-width='1.5'/%3E%3C/svg%3E")`
                 }}
            />

            <div className="absolute inset-4 border border-gold-300/20 rounded-[38px] pointer-events-none" />

            {/* Theme Label */}
            <div className="flex flex-col items-center mt-4">
              <div className="p-3 bg-white/80 rounded-full border border-gold-300/20 text-gold-500 mb-6 shadow-xs">
                <Shirt className="w-6 h-6" />
              </div>
              <span className="font-script text-4xl text-gold-600 block">
                Theme
              </span>
              <span className="font-script text-2xl text-gold-300 block">
                Colour Palette: Sage Green/ Shades of Green and Nude
              </span>

            </div>

            {/* Theme Content */}
            <div className="my-6">
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-sage-900 font-light tracking-wide uppercase leading-tight text-gold-glow">
                Traditional
              </h3>
              <p className="font-display text-xl md:text-2xl text-sage-800 font-semibold tracking-wider mt-1">
                ATTIRE
              </p>

            </div>

            {/* Culturally specific descriptive text */}
            <p className="font-serif text-sm text-sage-600 italic leading-relaxed max-w-xs mx-auto mb-4">
              &ldquo;We kindly invite our beloved guests to dress in their finest, vibrant traditional attire to honor and celebrate our rich cultural heritage.&rdquo;
            </p>

            <div className="mt-4">
              <span className="inline-block border border-gold-400/40 rounded-full px-4 py-1 text-[10px] font-serif text-gold-700 bg-white/60 tracking-widest uppercase">
                &bull; Chic &amp; Cultural &bull;
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
