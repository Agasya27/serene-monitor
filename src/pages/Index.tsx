import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import MetricCard from '@/components/MetricCard';
import StressGauge from '@/components/StressGauge';
import LiveChart from '@/components/LiveChart';
import DataTable from '@/components/DataTable';

interface DataPoint {
  heart_rate: number;
  temperature: number;
  stress: string;
  time: string;
}

const generateMockData = (): DataPoint => ({
  heart_rate: Math.floor(Math.random() * (105 - 65 + 1)) + 65,
  temperature: parseFloat((Math.random() * (37.8 - 36.2) + 36.2).toFixed(1)),
  stress: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
  time: new Date().toISOString(),
});

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ThermIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-3-9c.55 0 1 .45 1 1v3h-2V5c0-.55.45-1 1-1z" />
  </svg>
);

const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
  </svg>
);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  const [history, setHistory] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/data');
      const newData: DataPoint = await res.json();
      setHistory((prev) => [newData, ...prev].slice(0, 50));
    } catch {
      setHistory((prev) => [generateMockData(), ...prev].slice(0, 50));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const poll = setInterval(fetchData, 2000);
    return () => clearInterval(poll);
  }, [fetchData]);

  const current = history[0] || ({} as DataPoint);
  const prev = history[1] || current;

  const stressGradient =
    current.stress === 'high'
      ? 'from-stress-high to-orange-500'
      : current.stress === 'medium'
        ? 'from-stress-medium to-orange-400'
        : 'from-stress-low to-teal-400';

  const stressAccent =
    current.stress === 'high' ? '#FF4560' : current.stress === 'medium' ? '#FFB800' : '#00E5A0';

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-400/30">
      <Navbar />

      <motion.main
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl p-4 sm:p-6 space-y-6"
      >
        {/* Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
          <motion.div variants={fadeUp}>
            <MetricCard
              title="Heart Rate"
              value={current.heart_rate}
              unit="BPM"
              icon={HeartIcon}
              gradientClass="from-cyan-400 to-blue-600"
              accentColor="#00D2FF"
              trend={current.heart_rate - (prev.heart_rate || 0)}
              loading={loading}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <MetricCard
              title="Temperature"
              value={current.temperature}
              unit="°C"
              icon={ThermIcon}
              gradientClass="from-violet-500 to-purple-600"
              accentColor="#886FFF"
              trend={parseFloat(((current.temperature || 0) - (prev.temperature || 0)).toFixed(1))}
              loading={loading}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <MetricCard
              title="Stress Level"
              value={current.stress?.toUpperCase()}
              unit=""
              icon={BrainIcon}
              gradientClass={stressGradient}
              accentColor={stressAccent}
              trend={0}
              loading={loading}
            />
          </motion.div>
        </div>

        {/* Stress Gauge */}
        <motion.div variants={fadeUp}>
          <StressGauge level={current.stress} loading={loading} />
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <motion.div variants={fadeUp}>
            <LiveChart
              title="Heart Rate History"
              data={history.map((h) => h.heart_rate).reverse()}
              color="#00D2FF"
              loading={loading}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <LiveChart
              title="Temperature History"
              data={history.map((h) => h.temperature).reverse()}
              color="#886FFF"
              loading={loading}
            />
          </motion.div>
        </div>

        {/* Data Table */}
        <motion.div variants={fadeUp}>
          <DataTable history={history} loading={loading} />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Index;
