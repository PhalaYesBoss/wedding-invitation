import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SaveTheDateSection from './components/SaveTheDateSection';
import InvitationSection from './components/InvitationSection';
import DetailsSection from './components/DetailsSection';
import RSVPSection from './components/RSVPSection';
import GiftingSection from './components/GiftingSection';
import MusicPlayer from './components/MusicPlayer';
import { Menu, X, Heart } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Monitor scroll to update active nav highlight
  useEffect(() => {
    const sections = ['hero', 'save-the-date', 'invitation', 'details', 'rsvp', 'registry'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Welcome' },
    { id: 'save-the-date', label: 'Save the Date' },
    { id: 'invitation', label: 'Invitation' },
    { id: 'details', label: 'Details' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'registry', label: 'Gifts & Vouchers' },
  ];

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 font-sans relative text-sage-900 selection:bg-gold-200 selection:text-sage-950">
      
      {/* 1. STICKY HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-gold-300/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo Monogram */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-script text-3xl font-bold tracking-tighter text-sage-800 hover:text-gold-600 transition-colors cursor-pointer focus:outline-none"
          >
            R&amp;M
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-serif text-[11px] tracking-widest uppercase transition-all duration-300 cursor-pointer focus:outline-none relative py-1.5 ${
                  activeSection === item.id
                    ? 'text-gold-600 font-semibold'
                    : 'text-sage-600 hover:text-sage-900'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gold-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Hamburguer button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-sage-700 hover:text-sage-900 md:hidden cursor-pointer focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gold-300/10 shadow-lg px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-serif text-xs tracking-wider uppercase py-2.5 text-left border-b border-cream-100/60 last:border-none focus:outline-none ${
                  activeSection === item.id
                    ? 'text-gold-600 font-semibold'
                    : 'text-sage-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 2. WEDDING SECTIONS */}
      <main className="pt-16">
        <HeroSection />
        <SaveTheDateSection />
        <InvitationSection />
        <DetailsSection />
        <RSVPSection />
        <GiftingSection />
      </main>

      {/* 3. WEDDING MUSIC PLAYER */}
      <MusicPlayer />

      {/* 4. FOOTER */}
      <footer className="bg-sage-900 text-cream-100 py-16 px-6 text-center border-t border-gold-300/20 relative overflow-hidden">
        {/* Soft watermark background */}
        <div className="absolute inset-0 opacity-[0.02] bg-center bg-repeat pointer-events-none"
             style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='logo.jpg'%3E%3Cpath d='M20 20L0 40V0L20 20zm0 0l20 20V0L20 20z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
             }} 

        />

        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <span className="font-script text-5xl text-gold-300 block">
            Rodney &amp; Matlhogonolo
          </span>
          
          <div className="flex justify-center items-center gap-3 text-gold-400">
            <div className="w-12 h-[1px] bg-gold-400/30" />
            <Heart className="w-4 h-4 fill-gold-400/10" />
            <div className="w-12 h-[1px] bg-gold-400/30" />
          </div>

          <p className="font-serif text-xs tracking-[0.2em] uppercase text-sage-300">
            September 5, 2026 &bull; Zeerust, North West
          </p>

          <p className="font-serif text-[10px] text-sage-400/70 tracking-wider">
            &copy; 2026 Rodney &amp; Matlhogonolo Traditional Wedding. All Rights Reserved.
          </p>

          <p className="font-sans text-[9px] text-sage-500/50 mt-4 tracking-wider uppercase">
            Developed by Makgatlapetse Phala
          </p>
        </div>
      </footer>

    </div>
  );
}
