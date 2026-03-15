import { motion } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';

interface MetricCardProps {
  title: string;
  value: string | number | undefined;
  unit: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  gradientClass: string;
  accentColor: string;
  trend: number;
  loading: boolean;
}

const MetricCard = ({ title, value, unit, icon: Icon, gradientClass, accentColor, trend, loading }: MetricCardProps) => {
  if (loading) return <SkeletonLoader className="h-40 w-full" />;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass-card relative overflow-hidden p-5 sm:p-6"
    >
      <div className={`absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r ${gradientClass}`} />
      <div className="relative">
        <Icon className="absolute -right-2 -top-2 h-12 w-12 opacity-[0.12] text-foreground" />
        <span className="font-outfit text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <motion.span
          key={String(value)}
          animate={{ color: ['#FFFFFF', accentColor, '#FFFFFF'] }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[clamp(2rem,8vw,3rem)] font-medium tracking-tighter"
        >
          {value}
        </motion.span>
        {unit && <span className="font-outfit text-sm text-muted-foreground">{unit}</span>}
      </div>

      <div className="mt-3 flex items-center gap-1">
        <span className={`text-xs font-mono ${trend > 0 ? 'text-stress-high' : trend < 0 ? 'text-stress-low' : 'text-muted-foreground'}`}>
          {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">vs last</span>
      </div>
    </motion.div>
  );
};

export default MetricCard;
