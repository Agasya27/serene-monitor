import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader = ({ className = '' }: SkeletonLoaderProps) => (
  <div className={`relative overflow-hidden glass-card ${className}`}>
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(255,255,255,0.03), transparent)',
      }}
      animate={{ x: ['-100%', '100%'] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
    />
  </div>
);

export default SkeletonLoader;
