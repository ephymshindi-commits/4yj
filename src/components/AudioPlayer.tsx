import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const backgroundMusicUrl = "https://assets.mixkit.co/music/preview/mixkit-dreamy-piano-and-strings-1050.mp3";

  // Tooltip timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Safe initialization on mount to prevent browser policy crashes
  useEffect(() => {
    const audio = new Audio(backgroundMusicUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    // Cleanup audio on component unmount
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch((err) => {
          console.log("Audio play blocked by browser policies", err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 max-w-[240px] rounded-xl glass-card-gold px-4 py-2.5 text-xs text-white/90 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5 font-bold text-gold-400 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Cinematic Experience</span>
            </div>
            <p className="text-white/70 leading-relaxed font-sans">
              Tap to enable the tender ambient piano soundtrack for full emotional depth.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="bg-music-toggle"
        onClick={togglePlayback}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className={`flex items-center justify-center p-3.5 rounded-full shadow-2xl transition-all duration-300 ${
          isPlaying
            ? "bg-gold-500 text-black shadow-gold-500/20"
            : "bg-black/80 text-gold-400 border border-gold-500/30 backdrop-blur-md"
        }`}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 animate-bounce" />
            <div className="flex gap-0.5 items-end h-4">
              <span className="w-0.5 bg-black h-2 animate-[pulse_0.4s_infinite_alternate]" />
              <span className="w-0.5 bg-black h-3.5 animate-[pulse_0.6s_infinite_alternate]" />
              <span className="w-0.5 bg-black h-1 animate-[pulse_0.3s_infinite_alternate]" />
              <span className="w-0.5 bg-black h-3 animate-[pulse_0.5s_infinite_alternate]" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <VolumeX className="w-5 h-5 text-white/50" />
            <Music className="w-5 h-5 animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
