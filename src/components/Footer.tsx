import React, { useState, useEffect, FormEvent } from "react";
import { Sparkles, Send, Trash, Heart, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Wish {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export default function Footer() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Load guestbook wishes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("4yj_angel_wishes");
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      // Seed initial wishes for a personal touch
      const initial: Wish[] = [
        {
          id: "w1",
          sender: "MshindiSecure Team",
          message: "Thank you for guarding our security and inspiring our progress every single day, Angel. You are our supreme manager!",
          timestamp: "Jun 22, 2026"
        },
        {
          id: "w2",
          sender: "Tech Operations",
          message: "A stellar manager, coordinates, and leader. Your dedication standard is simply peerless. Happy Birthday in advance!",
          timestamp: "Jun 22, 2026"
        }
      ];
      setWishes(initial);
      localStorage.setItem("4yj_angel_wishes", JSON.stringify(initial));
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!sender.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      sender: sender.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem("4yj_angel_wishes", JSON.stringify(updated));

    setSender("");
    setMessage("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to reset the wishes?")) {
      setWishes([]);
      localStorage.removeItem("4yj_angel_wishes");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0c0c0e] to-black py-24 select-none">
      {/* Visual Separation Line with gold spark */}
      <div className="w-full flex justify-center items-center mb-20">
        <span className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400" />
        <Heart className="w-6 h-6 mx-4 text-gold-400 animate-pulse fill-gold-400/20" />
        <span className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* EMOTIONAL CLOSING PANEL */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl glass-card-gold relative overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Background shimmers */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/5 to-transparent pointer-events-none" />
            
            <div className="flex justify-center mb-6">
              <Award className="w-10 h-10 text-gold-400" />
            </div>

            <h3 className="font-serif text-3xl md:text-5xl text-white font-black tracking-tight mb-6">
              To Victory, To Grace, To You.
            </h3>
            
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed md:px-6 mb-8 font-sans">
              "Mshindi" represents victory. But victory is never just a personal milestone — it is the result of elegant steering, structured devotion, and a team grounded under your protective leadership. You keep our world elegant, professional, and secure.
            </p>
            
            <p className="text-gold-400 text-sm font-mono tracking-widest font-semibold">
              HAPPY DEAREST CELEBRATION, 4YJ ANGEL.
            </p>
          </motion.div>
        </div>


        {/* INTERACTIVE DIGITAL WISHING BOARD */}
        <div id="wishes-board" className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Form to Write a Wish */}
          <div className="lg:col-span-1 rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-1.5 text-gold-400 font-mono text-[10px] tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>GUESTBOOK</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-white mb-2">
              Leave a Wish
            </h4>
            <p className="text-zinc-400 text-xs mb-6 leading-relaxed font-sans">
              Type your personal greeting or birthday wish below to live-post it on Angel's special tribute blackboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-1.5 font-semibold">
                  Your Name / Org
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ephy, Operations Team..."
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-gold-400 transition-colors text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-1.5 font-semibold">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your beautiful birthday tribute..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-gold-400 transition-colors resize-none leading-relaxed text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gold-400 hover:bg-gold-500 text-black rounded-xl font-bold tracking-wider transition-all shadow-lg text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>POST WISH</span>
              </button>
            </form>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs text-center"
                >
                  ✨ Posted successfully! Happy celebrating.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Display Wishes Blackboard */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div>
                <h4 className="font-serif text-xl font-bold text-white">
                  The Wishing Blackboard
                </h4>
                <p className="text-zinc-500 text-xs font-sans">
                  Live virtual congrats notes for 4YJ Angel
                </p>
              </div>

              {wishes.length > 0 && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/5 text-zinc-500 hover:text-rose-400 hover:bg-white/5 transition-all font-mono text-[9px] uppercase tracking-wider"
                >
                  <Trash className="w-3 h-3" />
                  <span>RESET</span>
                </button>
              )}
            </div>

            {/* Scrollable board */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="p-5 rounded-xl bg-white/3 border border-white/5 text-white/90 backdrop-blur-md relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-serif font-bold text-sm tracking-wide text-gold-300">
                        {wish.sender}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {wish.timestamp}
                      </span>
                    </div>
                    <p className="text-zinc-300 text-xs md:text-sm font-sans leading-relaxed italic">
                      "{wish.message}"
                    </p>
                    <Heart className="absolute bottom-4 right-4 w-4 h-4 text-gold-400/10" />
                  </motion.div>
                ))}
              </AnimatePresence>

              {wishes.length === 0 && (
                <div className="text-center py-16 text-zinc-500 text-xs font-sans">
                  No wishes posted yet. Be the first to congratulate her!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Outer footer brand mark */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-zinc-600 text-xs font-sans">
            &copy; 11-12-2026. Made with profound devotion & elegance. All Rights Reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-gold-400 text-xs font-mono tracking-wider border border-white/5 transition-all"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
