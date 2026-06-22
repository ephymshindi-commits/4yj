import React, { useState, useEffect, MouseEvent } from "react";
import { Maximize2, Sparkles, ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PHOTOS, PhotoAsset } from "../data";

export default function MemoryGallery() {
  const [filter, setFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered photo assets
  const filteredPhotos = filter === "All"
    ? PHOTOS
    : PHOTOS.filter(photo => photo.category === filter);

  // Programmatic column mapping to guarantee perfect masonry gutters
  // 3 Columns on desktop
  const col1 = filteredPhotos.filter((_, i) => i % 3 === 0);
  const col2 = filteredPhotos.filter((_, i) => i % 3 === 1);
  const col3 = filteredPhotos.filter((_, i) => i % 3 === 2);

  // 2 Columns on tablet/mid-screens
  const tabletCol1 = filteredPhotos.filter((_, i) => i % 2 === 0);
  const tabletCol2 = filteredPhotos.filter((_, i) => i % 2 === 1);

  const categories = ["All", "Leadership", "Joy", "Elegance", "Warmth"];

  const handlePrev = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev > 0) ? prev - 1 : filteredPhotos.length - 1);
  };

  const handleNext = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev < filteredPhotos.length - 1) ? prev + 1 : 0);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredPhotos]);

  return (
    <section id="gallery" className="relative py-24 bg-[#0a0a0c] overflow-hidden select-none">
      {/* Background soft glowing auras */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gold-400 font-mono text-[10px] tracking-[0.34em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Captured Frames</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-tight mb-4">
            Memory Gallery
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">
            A beautiful, non-linear diary of achievements, grace, and meaningful milestones. Click any image to view details in high resolution.
          </p>
        </div>

        {/* Dynamic Category Filtration Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setLightboxIndex(null); // Reset lightbox selection on tab shift
              }}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                filter === cat
                  ? "bg-gold-400 text-[#000] font-semibold shadow-lg shadow-gold-500/10"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Masonry Columns */}
        <div>
          {/* Desktop Masonry - 3 Columns (hidden below lg) */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            <MasonryColumn items={col1} parentList={filteredPhotos} onOpenIndex={(idx) => setLightboxIndex(idx)} />
            <MasonryColumn items={col2} parentList={filteredPhotos} onOpenIndex={(idx) => setLightboxIndex(idx)} />
            <MasonryColumn items={col3} parentList={filteredPhotos} onOpenIndex={(idx) => setLightboxIndex(idx)} />
          </div>

          {/* Tablet Masonry - 2 Columns (hidden below md, hidden above lg) */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
            <MasonryColumn items={tabletCol1} parentList={filteredPhotos} onOpenIndex={(idx) => setLightboxIndex(idx)} />
            <MasonryColumn items={tabletCol2} parentList={filteredPhotos} onOpenIndex={(idx) => setLightboxIndex(idx)} />
          </div>

          {/* Mobile Layout - Single unified grid list (below md) */}
          <div className="grid md:hidden grid-cols-1 gap-6">
            {filteredPhotos.map((photo, i) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>

          {/* Empty fallback state */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-20 text-zinc-500 text-sm font-sans">
              No memories archived in this filter. Let's make more together!
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX GALLERY SLIDER */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar controls */}
            <div className="w-full flex justify-between items-center z-10 pt-4 px-4">
              <span className="text-xs font-mono tracking-widest text-zinc-400">
                FRAME {lightboxIndex + 1} OF {filteredPhotos.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-gold-400 hover:bg-white/10 transition-all"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage Panel */}
            <div className="flex-grow flex items-center justify-center relative my-4">
              {/* Previous button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 z-20 p-3.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-400 hover:bg-white/10 transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Central Sliding Image Frame */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-4xl max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredPhotos[lightboxIndex].url}
                  alt={filteredPhotos[lightboxIndex].title}
                  loading="lazy"
                  className="w-full h-full max-h-[70vh] object-contain"
                />
              </motion.div>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 z-20 p-3.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-400 hover:bg-white/10 transition-all"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom details card */}
            <div className="w-full max-w-2xl mx-auto bg-white/5 border border-white/5 rounded-2xl p-6 text-center backdrop-blur-xl mb-4 z-10" onClick={(e) => e.stopPropagation()}>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-[9px] font-mono tracking-widest uppercase mb-3">
                <Info className="w-3 h-3" />
                <span>{filteredPhotos[lightboxIndex].category}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm font-sans leading-relaxed">
                {filteredPhotos[lightboxIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Masonry Column Wrapper
interface ColumnProps {
  items: PhotoAsset[];
  parentList: PhotoAsset[];
  onOpenIndex: (index: number) => void;
}

function MasonryColumn({ items, parentList, onOpenIndex }: ColumnProps) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((photo) => {
        const sourceIndex = parentList.findIndex(p => p.id === photo.id);
        return (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => onOpenIndex(sourceIndex)}
          />
        );
      })}
    </div>
  );
}

// Single Photo Card
interface PhotoCardProps {
  photo: PhotoAsset;
  onClick: () => void;
  key?: string | number;
}

function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group cursor-pointer shadow-xl select-none"
      onClick={onClick}
    >
      {/* Photo Loader Container */}
      <div className={`relative w-full ${photo.aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"} overflow-hidden bg-zinc-950`}>
        <img
          src={photo.url}
          alt={photo.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
        />
        {/* Soft elegant vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Floating Spark icons on hover */}
      <span className="absolute top-4 right-4 p-2 rounded-full bg-black/40 border border-white/15 text-gold-400 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md">
        <Maximize2 className="w-3.5 h-3.5" />
      </span>

      {/* Grid metadata details shown at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-transform duration-300">
        <span className="text-[9px] font-mono text-gold-400 tracking-widest uppercase mb-1 block">
          {photo.category}
        </span>
        <h3 className="font-serif text-base text-white font-semibold leading-snug">
          {photo.title}
        </h3>
        <p className="text-zinc-400 text-[11px] font-sans mt-1.5 leading-relaxed line-clamp-2 max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}
