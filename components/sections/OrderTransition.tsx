"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, ShieldCheck, ArrowRight } from "lucide-react";

interface OrderTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function OrderTransition({ isVisible, onComplete }: OrderTransitionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
    }
  }, [isVisible, onComplete]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#003C46] transition-opacity duration-500 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00A6C1] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Animated Logo Container */}
        <div className="relative w-32 h-32 mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)]/20 rounded-full animate-ping" />
          <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,130,120,0.3)] border-4 border-[#FF8278]/10">
            <span className="text-[#FF8278] font-black text-4xl tracking-tighter italic">
              HiMe
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Sender deg trygt til bestilling
        </h2>
        
        <div className="flex items-center gap-3 text-[#9BBDC5] text-lg font-medium mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Loader2 className="w-5 h-5 animate-spin" />
          Kobler opp sikker bestillingsportal...
        </div>

        {/* Security badges */}
        <div className="flex items-center gap-8 py-4 px-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00A6C1]" />
            <span className="text-sm text-white/80">Sikker overføring</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/80">Offisiell leverandør</span>
          </div>
        </div>
      </div>

      {/* Progress bar at the bottom */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] animate-[progress_2s_linear_forwards]" style={{ width: '0%' }} />

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
