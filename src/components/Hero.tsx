import { useState, useEffect } from "react";
import { ChevronDown, Calendar, Star, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BIRTHDAY_DATE } from "../data";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(BIRTHDAY_DATE).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isPast: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("highlight-reel");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Video background source optimized with Cloudinary auto transforms
  const backgroundVideoUrl = "https://res.cloudinary.com/dnaw2g9c0/video/upload/f_auto,q_auto/v1782121277/VID-20260616-WA0021_crmmbz.mp4";

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col justify-between text-white select-none">
      {/* Cinematic Fullscreen Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.03]"
          src={backgroundVideoUrl}
        />
        {/* Soft elegant gradient and dark glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0c0c0e]" />
      </div>

      {/* Floating Header Badges */}
      <div className="relative z-10 w-full pt-8 px-6 flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/5 shadow-lg"
        >
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-mono text-gold-300 uppercase font-semibold">
            MshindiSecure Special
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-1.5 text-xs text-white/50 font-mono"
        >
          <Calendar className="w-3.5 h-3.5 text-gold-400" />
          <span>Dec 11, 2026</span>
        </motion.div>
      </div>

      {/* Hero Content Centerpiece */}
      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center justify-center flex-grow">
        {/* Floating Accent Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-4 text-gold-400"
        >
          <Star className="w-6 h-6 fill-gold-400/50 animate-pulse" />
        </motion.div>

        {/* Elegant Display Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white font-black text-white-glow mb-4"
        >
          4YJ Angel
        </motion.h1>

        {/* Cinematic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-sm md:text-base font-sans tracking-wide leading-relaxed text-zinc-300/90 [text-wrap:balance] px-4 mb-12"
        >
          Celebrating the brilliant intellect, radiant elegance, and guiding trust of our esteemed manager at <span className="text-gold-400 font-semibold tracking-wider">MshindiSecure</span>.
        </motion.p>

        {/* LUXURY COUNTDOWN TIMER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-lg lg:max-w-xl mx-auto"
        >
          <div className="text-center font-mono text-[10px] tracking-[0.3em] text-gold-400 uppercase font-semibold mb-5 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gold-400/30" />
            <span>The Birthday Prelude</span>
            <span className="w-8 h-px bg-gold-400/30" />
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-5 px-2">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINS", value: timeLeft.minutes },
              { label: "SECS", value: timeLeft.seconds }
            ].map((unit, index) => (
              <div
                key={unit.label}
                className="relative rounded-2xl glass-panel bg-white/5 border border-white/10 p-3 md:p-5 flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl"
              >
                {/* Background layout gold aura */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gold-400/0 to-gold-400/5 pointer-events-none" />
                
                {/* Visual Number */}
                <span className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-gold-400 text-gold-glow">
                  {String(unit.value).padStart(2, "0")}
                </span>
                
                {/* Subtitle label */}
                <span className="text-[9px] md:text-[10px] tracking-[0.2em] font-mono text-zinc-400 mt-2 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs md:text-sm text-zinc-400/90 font-sans tracking-wide max-w-md mx-auto italic font-light">
            “Counting down to the day the world celebrates you”
          </div>

          {timeLeft.isPast && (
            <motion.p
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mt-6 text-gold-400 text-sm font-sans tracking-widest font-semibold"
            >
              🎉 CELEBRATING HER MAJESTY'S GOLDEN SEASONS! 🎉
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Bottom Scroll indicator */}
      <div className="relative z-10 w-full pb-8 flex flex-col items-center text-center">
        <motion.button
          onClick={scrollToNext}
          whileHover={{ y: 3 }}
          className="flex flex-col items-center text-zinc-400 hover:text-gold-400 transition-colors"
        >
          <span className="text-[10px] tracking-[0.4em] font-mono uppercase mb-2 text-zinc-500 font-semibold">
            Explore Tributes
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-gold-400" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
