import { useState } from "react";
import { Quote, Sparkles, Heart, Star, CheckCircle, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LOVE_NOTES, LoveNote } from "../data";

export default function LoveNotes() {
  const [activeZoomImage, setActiveZoomImage] = useState<string | null>(null);

  return (
    <section id="love-notes" className="relative py-24 bg-[#0c0c0e] overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gold-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            <Heart className="w-3.5 h-3.5 fill-gold-400/30 text-gold-400 animate-pulse" />
            <span>HEARTFELT LETTERS</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-tight mb-4">
            Love Notes & Tributes
          </h2>
          <p className="text-zinc-400 max-w-xl text-sm leading-relaxed font-sans">
            Personal reflections and expressions from your closest circles, celebrating the unique impact and warmth you bring into our lives.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {LOVE_NOTES.map((note) => (
            <motion.div
              key={note.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative p-6 md:p-10 rounded-3xl glass-card-gold text-white flex flex-col justify-between shadow-2xl group border border-white/10"
            >
              {/* Gold light aura inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-400/10 transition-colors" />

              {/* Card Quote icon Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  {/* Avatar framing */}
                  <div className="relative">
                    <img
                      src={note.avatar}
                      alt={note.author}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gold-400/60 shadow-lg shadow-gold-500/10"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 bg-gold-400 rounded-full border-2 border-[#121214] text-black">
                      <Star className="w-2.5 h-2.5 fill-current" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold tracking-wide text-white group-hover:text-gold-300 transition-colors">
                      {note.author}
                    </h3>
                    <p className="text-gold-400 text-xs font-mono tracking-wider">
                      {note.role}
                    </p>
                  </div>
                </div>

                <Quote className="w-10 h-10 text-gold-400/15 group-hover:text-gold-400/25 transition-colors fill-current" />
              </div>

              {/* Letter Paragraph message content */}
              <div className="flex-grow space-y-4 mb-8 text-zinc-300 leading-relaxed font-sans text-sm md:text-base">
                {note.message.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? "font-semibold text-white/95" : "text-zinc-300/90"}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Signature and Attachment collage */}
              <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div>
                  <span className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase block mb-1">
                    Authentic Signature
                  </span>
                  <span className="font-serif text-lg italic text-gold-400 font-bold tracking-wide">
                    {note.signature}
                  </span>
                </div>

                {/* Securely Optimized Non-Oversized Attachment Collage */}
                {note.images && note.images.length > 0 && (
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase mr-1 hidden sm:inline">
                      ATTACHMENTS ({note.images.length})
                    </span>
                    <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                      {note.images.map((img, index) => (
                        <div
                          key={index}
                          onClick={() => setActiveZoomImage(img)}
                          className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border border-white/15 cursor-zoom-in hover:border-gold-400/60 transition-all group/img"
                        >
                          <img
                            src={img}
                            alt="Attachment thumb"
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PORTAL ZOOM POPUP LIGHTBOX */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setActiveZoomImage(null)}
          >
            <button
              onClick={() => setActiveZoomImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-gold-400 hover:bg-white/10 transition-all z-10"
              aria-label="Close magnification"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-lg w-full max-h-[80vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeZoomImage}
                alt="Enlarged Note attachment"
                className="w-full h-full object-contain max-h-[80vh] mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
