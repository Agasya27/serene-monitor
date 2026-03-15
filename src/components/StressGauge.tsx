import { motion } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';

const COLORS: Record<string, string> = {
  low: '#00E5A0',
  medium: '#FFB800',
  high: '#FF4560',
};

interface StressGaugeProps {
  level: string | undefined;
  loading: boolean;
}

const StressGauge = ({ level = 'medium', loading }: StressGaugeProps) => {
  if (loading) return <SkeletonLoader className="h-64 w-full" />;

  const rotation: Record<string, number> = { low: 210, medium: 270, high: 330 };
  const rot = rotation[level] || 270;
  const color = COLORS[level] || COLORS.medium;

  return (
    <div className="glass-card relative flex flex-col items-center justify-center p-8 overflow-hidden">
      <motion.div
        animate={{ backgroundColor: color }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 opacity-[0.08] blur-[100px] pointer-events-none"
      />

      <svg
        className="relative z-10 w-[200px] h-[110px] sm:w-[260px] sm:h-[140px]"
        viewBox="0 0 260 140"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5A0" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#FF4560" />
          </linearGradient>
        </defs>
        <path
          d="M 30 130 A 100 100 0 0 1 230 130"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 30 130 A 100 100 0 0 1 230 130"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          className="opacity-40"
        />
        <motion.line
          x1="130" y1="130" x2="130" y2="40"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={{ rotate: rot - 270 }}
          style={{ originX: '130px', originY: '130px' }}
          transition={{ type: 'spring', stiffness: 50, damping: 14 }}
        />
        <circle cx="130" cy="130" r="6" fill="white" />
      </svg>

      <motion.h2
        key={level}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-outfit text-2xl sm:text-4xl font-bold uppercase tracking-tighter mt-4"
        style={{ color }}
      >
        {level} Stress
      </motion.h2>
    </div>
  );
};

export default StressGauge;
