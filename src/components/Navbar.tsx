import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="sticky top-0 z-50 nav-glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10">
            <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="font-outfit font-semibold tracking-tight text-foreground/90 text-sm sm:text-base">
            AI Stress Monitoring System
          </h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden font-mono text-sm font-medium text-muted-foreground sm:block">
            {time.toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-stress-low/10 px-3 py-1 border border-stress-low/20">
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="h-1.5 w-1.5 rounded-full bg-stress-high"
              />
              <span className="font-outfit text-[10px] font-bold uppercase tracking-wider text-stress-low">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
