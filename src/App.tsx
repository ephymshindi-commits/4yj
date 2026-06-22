import Hero from "./components/Hero";
import HighlightReel from "./components/HighlightReel";
import MemoryGallery from "./components/MemoryGallery";
import LoveNotes from "./components/LoveNotes";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-[#F5F5F7] selection:bg-gold-400 selection:text-black scroll-smooth relative overflow-x-hidden font-sans">
      {/* Background Atmosphere Glows from Immersive UI design */}
      <div className="absolute top-0 left-0 w-full h-full opacity-35 pointer-events-none overflow-hidden z-0">
        <div className="ambient-glow-top"></div>
        <div className="ambient-glow-bottom"></div>
      </div>

      {/* Immersive Background Audio Controller */}
      <div className="relative z-50">
        <AudioPlayer />
      </div>

      {/* Main content elements wrapped safely to overlay on glows */}
      <div className="relative z-10">
        {/* Hero Header Presentation */}
        <Hero />

        {/* Reel Shorts Horizontal Layout */}
        <HighlightReel />

        {/* Responsive Pin Masonry Memory Grid */}
        <MemoryGallery />

        {/* Heartfelt Letter Cards of Ephy & YJ */}
        <LoveNotes />

        {/* Signature & Virtual Guest blackboard */}
        <Footer />
      </div>
    </div>
  );
}
