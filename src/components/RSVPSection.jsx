import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, CheckCircle2, MessageSquare, AlertCircle, Sparkles, Send, Users, ShieldAlert } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function RSVPSection() {
  const { rsvpContacts } = WEDDING_DETAILS;
  
  // RSVP Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isAttending, setIsAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [willAttendTraditionalCeremony, setWillAttendTraditionalCeremony] = useState(true);
  const [message, setMessage] = useState('');
  const [contactToNotify, setContactToNotify] = useState(rsvpContacts[0].name);

  // Statuses
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRSVP, setSubmittedRSVP] = useState(null);
  const [localRSVPs, setLocalRSVPs] = useState([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Load existing submissions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvps');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalRSVPs(parsed);
        // Check if this specific user has RSVP'd on this device
        const mySavedRsvp = localStorage.getItem('my_wedding_rsvp');
        if (mySavedRsvp) {
          const parsedMy = JSON.parse(mySavedRsvp);
          setSubmittedRSVP(parsedMy);
          setIsSubmitted(true);
        }
      } catch (e) {
        console.error("Error loading RSVPs from localStorage", e);
      }
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }

    const newRsvp = {
      id: `rsvp-${Date.now()}`,
      fullName: fullName.trim(),
      phoneNumber: phone.trim(),
      isAttending,
      guestCount: isAttending ? guestCount : 0,
      dietaryNotes: dietaryNotes.trim() || undefined,
      willAttendTraditionalCeremony: isAttending ? willAttendTraditionalCeremony : false,
      message: message.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    // Update localStorage lists
    const updatedList = [newRsvp, ...localRSVPs.filter(item => item.phoneNumber !== newRsvp.phoneNumber)];
    localStorage.setItem('wedding_rsvps', JSON.stringify(updatedList));
    localStorage.setItem('my_wedding_rsvp', JSON.stringify(newRsvp));

    setLocalRSVPs(updatedList);
    setSubmittedRSVP(newRsvp);
    setIsSubmitted(true);
  };

  // Generate WhatsApp text links
  const getWhatsAppLink = (contactName, contactPhone, rsvpData) => {
    const statusText = rsvpData.isAttending 
      ? `🟢 Attending (bringing ${rsvpData.guestCount} guest(s))` 
      : `🔴 Regretfully Cannot Attend`;
    
    const traditionalText = rsvpData.isAttending 
      ? `\nTraditional Ceremony Attendance: ${rsvpData.willAttendTraditionalCeremony ? 'Yes ✅' : 'No ❌'}`
      : '';
      
    const messageText = rsvpData.message ? `\nWell Wishes: "${rsvpData.message}"` : '';
    const dietText = rsvpData.dietaryNotes ? `\nDietary Notes: ${rsvpData.dietaryNotes}` : '';

    const text = encodeURIComponent(
      `Hi ${contactName}! 🌸\n` +
      `I am RSVPing for Rodney & Mathogonolo's Traditional Wedding!\n\n` +
      `Name: ${rsvpData.fullName}\n` +
      `Phone: ${rsvpData.phoneNumber}\n` +
      `Status: ${statusText}` +
      traditionalText +
      dietText +
      messageText +
      `\n\nThank you!`
    );

    return `https://wa.me/${contactPhone.replace('+', '')}?text=${text}`;
  };

  // Generate SMS link
  const getSMSLink = (contactPhone, rsvpData) => {
    const statusText = rsvpData.isAttending ? `Attending (${rsvpData.guestCount} guests)` : `Regretfully Cannot Attend`;
    const text = encodeURIComponent(
      `RSVP for Rodney & Matlhogonolo's Wedding: Name: ${rsvpData.fullName}. Status: ${statusText}. Phone: ${rsvpData.phoneNumber}.`
    );
    return `sms:${contactPhone}?body=${text}`;
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPassword.trim() === '05092026') {
      setIsAdminAuthenticated(true);
      setAdminError('');
    } else {
      setAdminError('Invalid access code. Please enter the correct Couple Access code (05092026).');
    }
  };

  const clearMyRsvp = () => {
    localStorage.removeItem('my_wedding_rsvp');
    setIsSubmitted(false);
    setSubmittedRSVP(null);
  };

  return (
    <section id="rsvp" className="py-24 px-4 md:px-8 bg-cream-100 relative overflow-hidden flex items-center justify-center min-h-screen">
      {/* Decorative floral background details */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-sage-50/70 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold-50/70 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-serif text-sage-600 tracking-[0.3em] uppercase block mb-1">
            Response
          </span>
          <h2 className="font-display text-4xl text-sage-900 tracking-[0.15em] font-light">
            RSVP TO
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Contacts Grid directly from Video (Screen 7) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
          {rsvpContacts.map((contact, index) => (
            <div 
              key={contact.name}
              className="bg-white p-5 rounded-3xl border border-gold-300/20 shadow-sm flex items-center justify-between hover:border-gold-300 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sage-50 rounded-full text-sage-700 group-hover:bg-sage-100 transition-colors">
                  <Phone className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <h4 className="font-serif text-xs tracking-widest uppercase text-sage-500">
                    Contact Person
                  </h4>
                  <p className="font-serif text-base font-semibold text-sage-950">
                    {contact.name}
                  </p>
                </div>
              </div>
              <a 
                href={`tel:${contact.rawPhone}`}
                className="font-mono text-xs font-medium text-sage-700 bg-cream-100 px-3 py-1.5 rounded-full hover:bg-gold-100 transition-colors"
              >
                {contact.rawPhone}
              </a>
            </div>
          ))}
        </div>

        {/* Form & Success Panel with Framed Card (Screen 7 Style Arch) */}
        <div className="bg-white px-6 py-12 md:p-12 rounded-[60px] shadow-xl border border-cream-200/60 relative wedding-frame max-w-2xl mx-auto">
          <div className="absolute inset-4 border border-gold-200/20 rounded-[45px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="rsvp-form-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-8">
                  <h3 className="font-serif text-xl font-light text-sage-950 italic">
                    Will you join us in our traditional celebration?
                  </h3>
                  <p className="text-xs text-sage-500 mt-1">
                    Please submit your response below before August 5, 2026.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="fullname" className="block text-xs font-serif text-sage-700 tracking-wider uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      required
                      placeholder="e.g. Sipho Modise"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-cream-50 border border-cream-200 focus:border-gold-400 focus:bg-white rounded-2xl px-4 py-3 text-sm text-sage-950 placeholder-sage-400 outline-none transition-all"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-serif text-sage-700 tracking-wider uppercase mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="e.g. 063 028 8766"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-cream-50 border border-cream-200 focus:border-gold-400 focus:bg-white rounded-2xl px-4 py-3 text-sm text-sage-950 placeholder-sage-400 outline-none transition-all"
                    />
                  </div>

                  {/* Attending Toggle */}
                  <div>
                    <span className="block text-xs font-serif text-sage-700 tracking-wider uppercase mb-3">
                      Attendance
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        id="btn-attend-yes"
                        onClick={() => setIsAttending(true)}
                        className={`py-3 px-4 rounded-2xl border text-sm font-serif tracking-wide transition-all cursor-pointer ${
                          isAttending
                            ? 'bg-sage-800 text-gold-100 border-gold-400 shadow-sm'
                            : 'bg-cream-50 text-sage-600 border-cream-200 hover:bg-cream-100'
                        }`}
                      >
                        Yes, I will attend!
                      </button>
                      <button
                        type="button"
                        id="btn-attend-no"
                        onClick={() => setIsAttending(false)}
                        className={`py-3 px-4 rounded-2xl border text-sm font-serif tracking-wide transition-all cursor-pointer ${
                          !isAttending
                            ? 'bg-sage-800 text-gold-100 border-gold-400 shadow-sm'
                            : 'bg-cream-50 text-sage-600 border-cream-200 hover:bg-cream-100'
                        }`}
                      >
                        Regretfully decline
                      </button>
                    </div>
                  </div>

                  {isAttending && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6 pt-2"
                    >
                      {/* Guest Count */}
                      <div className="flex justify-between items-center bg-cream-50/50 p-4 rounded-2xl border border-cream-200">
                        <div className="flex items-center gap-2 text-sage-800">
                          <Users className="w-4 h-4 text-gold-500" />
                          <label htmlFor="guest-count" className="text-xs font-serif tracking-wide uppercase">
                            Number of Guests (including yourself)
                          </label>
                        </div>
                        <select
                          id="guest-count"
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="bg-white border border-cream-200 rounded-xl px-3 py-1.5 text-sm font-sans text-sage-950 focus:outline-none focus:border-gold-400"
                        >
                          {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>


                    </motion.div>
                  )}

                  {/* Message of congratulations */}
                  <div>
                    <label htmlFor="wishes" className="block text-xs font-serif text-sage-700 tracking-wider uppercase mb-2">
                      Well Wishes for Rodney &amp; Matlhogonolo
                    </label>
                    <textarea
                      id="wishes"
                      rows={3}
                      placeholder="Write a message of love and congratulations..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-cream-50 border border-cream-200 focus:border-gold-400 focus:bg-white rounded-2xl px-4 py-3 text-sm text-sage-950 placeholder-sage-400 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="submit-rsvp-form"
                    className="w-full bg-sage-800 hover:bg-sage-700 text-gold-100 font-serif text-xs tracking-widest uppercase py-4 rounded-2xl border-2 border-gold-400/50 shadow-md transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-gold-300 animate-pulse" />
                    Submit Response
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="rsvp-success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center border-2 border-gold-400">
                    <CheckCircle2 className="w-8 h-8 text-gold-500 animate-bounce" />
                  </div>
                </div>

                <span className="font-script text-4xl text-gold-600 block mb-2">
                  Thank You!
                </span>
                <h3 className="font-serif text-2xl text-sage-900 font-light tracking-wide mb-4">
                  Response Submitted Successfully
                </h3>
                
                {submittedRSVP && (
                  <div className="bg-cream-50 border border-cream-200/60 p-6 rounded-3xl max-w-md mx-auto text-left space-y-3 mb-8">
                    <p className="font-serif text-sm text-sage-800">
                      <strong className="text-sage-950 font-semibold font-display text-xs tracking-widest uppercase block mb-1">Guest:</strong> 
                      {submittedRSVP.fullName}
                    </p>
                    <p className="font-serif text-sm text-sage-800">
                      <strong className="text-sage-950 font-semibold font-display text-xs tracking-widest uppercase block mb-1">Attendance:</strong> 
                      {submittedRSVP.isAttending ? `Yes (${submittedRSVP.guestCount} guests) 🟢` : 'No (Declined) 🔴'}
                    </p>
                    {submittedRSVP.isAttending && (
                      <p className="font-serif text-sm text-sage-800">
                        <strong className="text-sage-950 font-semibold font-display text-xs tracking-widest uppercase block mb-1">Traditional Celebration:</strong> 
                        {submittedRSVP.willAttendTraditionalCeremony ? 'Yes, attending traditional celebration ✅' : 'No, not attending traditional celebration ❌'}
                      </p>
                    )}
                    {submittedRSVP.isAttending && submittedRSVP.dietaryNotes && (
                      <p className="font-serif text-sm text-sage-800">
                        <strong className="text-sage-950 font-semibold font-display text-xs tracking-widest uppercase block mb-1">Dietary Requirements:</strong> 
                        {submittedRSVP.dietaryNotes}
                      </p>
                    )}
                    {submittedRSVP.message && (
                      <p className="font-serif text-sm text-sage-800 italic">
                        <strong className="text-sage-950 font-semibold font-display text-xs tracking-widest uppercase block not-italic mb-1">Well Wishes:</strong> 
                        &ldquo;{submittedRSVP.message}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                {/* WhatsApp & SMS direct links from Video Contacts (Screen 7 Contacts) */}
                <div className="space-y-4 border-t border-cream-200 pt-8 max-w-md mx-auto">
                  <p className="text-xs font-serif text-sage-600 tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    Share response directly with the hosts
                  </p>
                  
                  <div className="flex flex-col gap-2.5">
                    {submittedRSVP && rsvpContacts.map(contact => (
                      <div key={contact.name} className="flex flex-col gap-1.5 p-3.5 bg-cream-50/50 border border-cream-200 rounded-2xl">
                        <span className="text-[10px] font-serif text-sage-500 uppercase tracking-widest block mb-1">
                          Send to {contact.name} ({contact.rawPhone}):
                        </span>
                        <div className="flex gap-2">
                          <a
                            href={getWhatsAppLink(contact.name, contact.phone, submittedRSVP)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs py-2.5 px-3 rounded-xl transition-all font-medium"
                          >
                            <MessageSquare className="w-4 h-4 fill-white/10" />
                            WhatsApp link
                          </a>
                          <a
                            href={getSMSLink(contact.phone, submittedRSVP)}
                            className="flex-1 flex items-center justify-center gap-2 bg-sage-800 hover:bg-sage-700 text-gold-100 font-sans text-xs py-2.5 px-3 rounded-xl transition-all font-medium border border-gold-400/20"
                          >
                            <Send className="w-3.5 h-3.5 text-gold-300" />
                            SMS link
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    id="btn-edit-rsvp"
                    onClick={clearMyRsvp}
                    className="text-xs font-serif text-gold-600 hover:text-gold-700 underline cursor-pointer mt-6 block mx-auto focus:outline-none"
                  >
                    Change / Edit RSVP response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ADMIN/COUPLE ACCESS TOGGLE (Perfect utility for hosts to view RSVPs submitted) */}
        <div className="mt-16 text-center">
          <button
            id="btn-admin-panel"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="text-xs font-serif text-sage-500 hover:text-gold-500 tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 mx-auto border border-dashed border-sage-300/60 rounded-full px-4 py-1.5 cursor-pointer bg-white/40 hover:bg-white"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-gold-500" />
            {showAdminPanel ? 'Close Couple Access' : 'Couple Access Dashboard'}
          </button>

          <AnimatePresence>
            {showAdminPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 text-left max-w-xl mx-auto"
              >
                {!isAdminAuthenticated ? (
                  <form onSubmit={handleAdminAuth} className="bg-white border border-gold-300/30 p-6 rounded-3xl shadow-md flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="password"
                        placeholder="Enter Couple Access Code"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full bg-cream-50 border border-cream-200 rounded-xl px-3 py-2 text-xs text-sage-950 placeholder-sage-400 outline-none"
                      />
                      {adminError && <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{adminError}</p>}
                    </div>
                    <button
                      type="submit"
                      className="bg-sage-800 hover:bg-sage-700 text-gold-100 text-xs font-serif tracking-wider uppercase py-2 px-4 rounded-xl cursor-pointer"
                    >
                      Authenticate
                    </button>
                  </form>
                ) : (
                  <div className="bg-white border border-gold-300/30 p-6 rounded-3xl shadow-md space-y-4">
                    <div className="flex justify-between items-center border-b border-cream-200 pb-3">
                      <h4 className="font-display text-sm text-sage-950 font-semibold tracking-wide uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        RSVP Submissions ({localRSVPs.length})
                      </h4>
                      <button
                        onClick={() => {
                          if(confirm("Do you want to reset all responses?")) {
                            localStorage.removeItem('wedding_rsvps');
                            localStorage.removeItem('my_wedding_rsvp');
                            setLocalRSVPs([]);
                            setIsSubmitted(false);
                            setSubmittedRSVP(null);
                          }
                        }}
                        className="text-[10px] font-sans text-rose-500 hover:underline cursor-pointer"
                      >
                        Reset RSVPs
                      </button>
                    </div>

                    {localRSVPs.length === 0 ? (
                      <p className="text-xs text-sage-400 italic text-center py-4">No RSVPs submitted on this browser yet.</p>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                        {localRSVPs.map(r => (
                          <div key={r.id} className="text-xs p-3 bg-cream-50 rounded-xl border border-cream-200/50">
                            <div className="flex justify-between font-serif font-semibold text-sage-900 mb-1">
                              <span>{r.fullName}</span>
                              <span className={r.isAttending ? 'text-emerald-700' : 'text-rose-600'}>
                                {r.isAttending ? `Attending (${r.guestCount} guests)` : 'Declined'}
                              </span>
                            </div>
                            <div className="font-sans text-[10px] text-sage-500 flex flex-wrap gap-x-3 gap-y-1">
                              <span>Phone: {r.phoneNumber}</span>
                              {r.isAttending && <span>Traditional Celebration: {r.willAttendTraditionalCeremony ? 'Yes' : 'No'}</span>}
                              {r.isAttending && r.dietaryNotes && <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/40">Dietary: {r.dietaryNotes}</span>}
                            </div>
                            {r.message && <p className="text-sage-600 italic mt-1 bg-white/60 p-1.5 rounded-lg border border-cream-200/30 font-serif">&ldquo;{r.message}&rdquo;</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
