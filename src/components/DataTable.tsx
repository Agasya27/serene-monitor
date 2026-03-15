import { motion, AnimatePresence } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';

interface DataRow {
  heart_rate: number;
  temperature: number;
  stress: string;
  time: string;
}

interface DataTableProps {
  history: DataRow[];
  loading: boolean;
}

const DataTable = ({ history, loading }: DataTableProps) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <SkeletonLoader key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="max-h-[320px] overflow-y-auto custom-scrollbar overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[480px]">
          <thead className="sticky top-0 z-10" style={{ background: '#080F1A' }}>
            <tr>
              {['Time', 'Heart Rate', 'Temp', 'Stress'].map((head) => (
                <th
                  key={head}
                  className="p-4 font-outfit text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground border-b border-border"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {history.map((row, i) => (
                <motion.tr
                  key={row.time}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`group transition-colors hover:bg-[rgba(255,255,255,0.025)] ${
                    i === 0 ? 'bg-[rgba(0,210,255,0.05)] border-l-[3px] border-l-cyan-400' : ''
                  }`}
                >
                  <td className="p-4 font-mono text-xs text-muted-foreground">
                    {new Date(row.time).toLocaleTimeString()}
                  </td>
                  <td className="p-4 font-mono text-xs text-foreground/90">{row.heart_rate} BPM</td>
                  <td className="p-4 font-mono text-xs text-foreground/90">{row.temperature}°C</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase stress-badge-${row.stress}`}
                    >
                      {row.stress}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
