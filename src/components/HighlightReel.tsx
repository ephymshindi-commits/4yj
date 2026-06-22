import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX, Maximize2, Sparkles, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VIDEOS, VideoAsset } from "../data";

export default function HighlightReel() {
  const [activeVideo, setActiveVideo] = useState<VideoAsset | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll navigation helper
  const scrollLeftBy = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="highlight-reel" className="relative py-24 bg-[#0c0c0e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-gold-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Cinematic Shorts</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-semibold tracking-tight">
              Highlight Reels
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-zinc-400 max-w-sm text-sm font-sans leading-relaxed">
            Beautiful captures in motion — authentic, radiant, and displaying the poise of an exceptional manager and leader.
          </p>
        </div>

        {/* Reels Horizontal Scroll Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar cursor-grab"
            style={{ scrollbarWidth: "none" }}
          >
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                className="snap-start flex-shrink-0 w-[280px] md:w-[320px]"
              >
                <ReelCard video={video} onOpenLightbox={() => setActiveVideo(video)} />
              </div>
            ))}
          </div>

          {/* Prompt swipe helper for desktop / tablet indicator */}
          <div className="hidden md:flex justify-end gap-2 pr-2">
            <button
              onClick={() => scrollLeftBy(-320)}
              className="p-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-gold-500/40 hover:bg-white/5 transition-all text-xs"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scrollLeftBy(320)}
              className="p-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-gold-500/40 hover:bg-white/5 transition-all text-xs"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* IMMERSIVE LIGHTBOX CINEMATIC PLAYER */}
      <AnimatePresence>
        {activeVideo && (
          <CinematicLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// Each Reel Card
interface ReelCardProps {
  video: VideoAsset;
  onOpenLightbox: () => void;
}

function ReelCard({ video, onOpenLightbox }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay muted preview on hover or touch entry
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/10 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenLightbox}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.url}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Floating tag badge */}
      <span className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[9px] font-mono font-semibold tracking-widest text-[#000] bg-gold-400 rounded-full uppercase">
        {video.tag}
      </span>

      {/* Action Center Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-black transition-all"
        >
          <Play className="w-6 h-6 fill-current translate-x-0.5" />
        </motion.div>
      </div>

      {/* Bottom Text Captions */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <span className="text-[10px] font-mono text-gold-400 tracking-wider mb-1 block">
          {video.duration || "PREVIEW"}
        </span>
        <h3 className="font-serif text-lg text-white font-semibold leading-snug group-hover:text-gold-300 transition-colors">
          {video.title}
        </h3>
        <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {video.caption}
        </p>
      </div>
    </motion.div>
  );
}

// Immersive Cinema Lightbox Slider
interface CinematicLightboxProps {
  video: VideoAsset;
  onClose: () => void;
}

function CinematicLightbox({ video, onClose }: CinematicLightboxProps) {
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Escape to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const togglePlay = () => {
    if (!fullscreenVideoRef.current) return;
    if (isPlaying) {
      fullscreenVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      fullscreenVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!fullscreenVideoRef.current) return;
    fullscreenVideoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Outer Click Shield */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-zinc-950/90 pointer-events-none" />

      {/* Close button with high-contrast label */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-gold-400 hover:bg-white/10 transition-all flex items-center gap-1 text-xs tracking-widest font-mono"
        aria-label="Close cinema"
      >
        <span className="hidden sm:inline">CLOSE CINEMA</span>
        <X className="w-5 h-5" />
      </button>

      {/* Video Content Drawer */}
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-white/5 shadow-2xl flex flex-col justify-end"
        onClick={(e) => e.stopPropagation()} // Prevent closing
      >
        {/* Full Size Player */}
        <video
          ref={fullscreenVideoRef}
          src={video.url}
          autoPlay
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
          onClick={togglePlay}
        />

        {/* Ambient Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent pointer-events-none" />

        {/* Media Control Toolbar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <span className="text-[10px] tracking-widest text-gold-400 font-mono uppercase mb-1 block">
            {video.tag}
          </span>
          <h3 className="font-serif text-2xl text-white font-bold mb-2">
            {video.title}
          </h3>
          <p className="text-zinc-300 text-xs md:text-sm font-sans leading-relaxed mb-6">
            {video.caption}
          </p>

          <div className="flex gap-3">
            <button
              onClick={togglePlay}
              className="flex-grow flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-black font-semibold text-xs tracking-wider transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPlaying ? "PAUSE PREVIEW" : "PLAY VIDEO"}</span>
            </button>
            <button
              onClick={toggleMute}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 text-white transition-all"
              aria-label="Toggle Mute"
            >
              {isMuted ? <VolumeX className="w-4.5 h-4.5 text-zinc-400" /> : <Volume2 className="w-4.5 h-4.5 text-gold-400" />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
