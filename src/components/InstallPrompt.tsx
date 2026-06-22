import React, { useState, useEffect } from "react";
import { Sparkles, ArrowDown, Smartphone, Share, PlusSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // 1. Detect if iOS
    const iosDetection = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true;
    
    // If it's iOS and not already running as installed standalone app, show iOS guide after 4 seconds
    if (iosDetection && !isStandalone) {
      setIsIos(true);
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    // 2. Android/Chrome/Edge standard PWA prompt listener
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait 3.5 seconds to elegantly trigger the entry animation
      setTimeout(() => {
        setShowPrompt(true);
      }, 3500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    setShowPrompt(false);
    
    // Trigger the prompt
    await deferredPrompt.prompt();
    
    // Check results
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("Angel Birthday App standard install accepted");
    }
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm rounded-2xl glass-card-gold p-4.5 shadow-2xl border border-gold-400/25 backdrop-blur-2xl text-white select-none"
        >
          {/* Subtle gold ray layout */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gold-400/5 to-transparent pointer-events-none" />

          {/* Close trigger button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>

          {isIos ? (
            /* Apple iOS specific guide tooltip overlay */
            <div className="space-y-3 font-sans pr-4">
              <div className="flex items-center gap-2 mb-1">
                <Smartphone className="w-5 h-5 text-gold-400 animate-bounce" />
                <span className="text-xs font-bold tracking-widest text-gold-400 font-mono uppercase">
                  Install Special Gift app
                </span>
              </div>
              <p className="text-xs text-zinc-200/90 leading-relaxed font-sans">
                Experience this full cinematic tribute in premium fullscreen layout! Only takes a second:
              </p>
              <div className="bg-black/45 p-2.5 rounded-xl border border-white/5 space-y-2 text-[11px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <Share className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>1. Tap on Safari's <strong>Share</strong> button at bottom raw</span>
                </div>
                <div className="flex items-center gap-2">
                  <PlusSquare className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>2. Select <strong>"Add to Home Screen"</strong></span>
                </div>
              </div>
            </div>
          ) : (
            /* Standard Android / Desktop Chrome browser prompt buttons */
            <div className="space-y-3 font-sans pr-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-gold-400 font-mono uppercase">
                  Install PWA Special App
                </span>
              </div>
              <p className="text-xs text-zinc-200/90 leading-relaxed font-sans">
                Install "To 4YJ Angel" on your Home Screen to easily access this immersive cinematic layout from your phone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex-grow flex items-center justify-center gap-1.5 py-2 px-3 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold rounded-xl transition-all shadow-lg"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>INSTALL NOW</span>
                </button>
                <button
                  onClick={handleClose}
                  className="py-2 px-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/5 text-xs font-medium rounded-xl transition-all"
                >
                  Later
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
