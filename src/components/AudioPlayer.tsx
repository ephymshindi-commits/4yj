import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Sparkles, ChevronUp, ChevronDown, Radio } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Track {
  name: string;
  artist: string;
  url: string;
}

const PLAYLIST: Track[] = [
  {
    name: "To 4YJ Angel",
    artist: "Your Birthday Serenade",
    url: "https://res.cloudinary.com/dnaw2g9c0/video/upload/v1782155620/4yJ_Birthday_g5pwgs.mp3",
  },
  {
    name: "Gymnopédie No. 1",
    artist: "Erik Satie",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Erik_Satie_-_Gymnop%C3%A9die_No_1_-_performed_by_La_Tempesta.mp3",
  },
  {
    name: "Golden Serenade",
    artist: "Romantic Acoustic",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showSelector, setShowSelector] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Hide tooltip after 7 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  // Sync track URL when track index changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = PLAYLIST[currentTrackIndex].url;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Audio switched but blocked on autoplay rules", err);
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrackIndex]);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[currentTrackIndex].url);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45; // Immersive but gentle background volume
      
      // Auto-fallback helper: if Satie fails, gracefully swap to SoundHelix
      audioRef.current.onerror = () => {
        console.warn("Track failed to load, trying fallback track");
        const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
        setCurrentTrackIndex(nextIndex);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch((err) => {
          console.error("Audio playback barred by mobile/browser interaction constraints", err);
          // Standard modern fallback: alert them gently
          setShowTooltip(true);
        });
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setShowSelector(false);
    
    // Explicit player activation
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[index].url);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }
    
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setShowTooltip(false);
          })
          .catch((err) => console.log("Play failed", err));
      }
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Immersive Tooltip */}
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
              Tap the golden button to enable the tender classic background soundtrack.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playlist Selector Dropup Panel */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-2 p-2 rounded-2xl glass-panel bg-black/90 border border-gold-400/20 shadow-2xl min-w-[210px]"
          >
            <div className="px-2.5 py-1.5 border-b border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
              <span>Select ambient soundscape</span>
              <Radio className="w-3 h-3 text-gold-400 animate-pulse" />
            </div>
            <div className="space-y-1 mt-1">
              {PLAYLIST.map((track, idx) => (
                <button
                  key={track.name}
                  onClick={() => selectTrack(idx)}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                    idx === currentTrackIndex
                      ? "bg-gold-400/10 text-gold-400 border border-gold-400/20"
                      : "text-zinc-300 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div>
                    <p className="font-medium truncate">{track.name}</p>
                    <p className="text-[10px] text-zinc-500 font-sans">{track.artist}</p>
                  </div>
                  {idx === currentTrackIndex && isPlaying && (
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 bg-gold-400 h-1.5 animate-[pulse_0.4s_infinite_alternate]" />
                      <span className="w-0.5 bg-gold-400 h-2.5 animate-[pulse_0.6s_infinite_alternate]" />
                      <span className="w-0.5 bg-gold-400 h-1 animate-[pulse_0.3s_infinite_alternate]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        {/* Track Playlist Trigger Dropup button */}
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="p-2.5 rounded-full bg-black/60 border border-white/10 hover:border-gold-400/30 text-white hover:text-gold-400 shadow-xl backdrop-blur-md transition-all active:scale-95"
          title="Change Soundscape"
        >
          {showSelector ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Major Play/Pause Audio Dial */}
        <motion.button
          id="bg-music-toggle"
          onClick={togglePlayback}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center p-3.5 rounded-full shadow-2xl transition-all duration-300 ${
            isPlaying
              ? "bg-gold-400 text-black shadow-gold-400/20"
              : "bg-black/95 text-gold-400 border border-gold-400/45 backdrop-blur-md"
          }`}
          aria-label="Toggle background music"
        >
          {isPlaying ? (
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-5 h-5" />
              <div className="flex gap-0.5 items-end h-3.5 pr-0.5">
                <span className="w-0.5 bg-black h-2.5 animate-[pulse_0.4s_infinite_alternate]" />
                <span className="w-0.5 bg-black h-4 animate-[pulse_0.6s_infinite_alternate]" />
                <span className="w-0.5 bg-black h-1.5 animate-[pulse_0.3s_infinite_alternate]" />
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

      <div className="mt-1.5 mr-1 text-[9px] font-mono tracking-wider text-zinc-500 uppercase select-none pointer-events-none hidden md:block">
        Soundtrack: {PLAYLIST[currentTrackIndex].name}
      </div>
    </div>
  );
}
