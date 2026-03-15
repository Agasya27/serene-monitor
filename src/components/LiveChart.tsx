import { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  type ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import SkeletonLoader from './SkeletonLoader';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface LiveChartProps {
  title: string;
  data: number[];
  color: string;
  loading: boolean;
}

const LiveChart = ({ title, data, color, loading }: LiveChartProps) => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  useEffect(() => {
    chartRef.current?.update('none');
  }, [data]);

  if (loading) return <SkeletonLoader className="h-64 w-full" />;

  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        data,
        borderColor: color,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.45,
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, `${color}44`);
          gradient.addColorStop(1, 'transparent');
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0A1628',
        titleFont: { family: 'DM Mono' as const },
        bodyFont: { family: 'DM Mono' as const },
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: { display: false },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: {
          color: 'rgba(255,255,255,0.3)',
          font: { family: 'DM Mono' as const, size: 10 },
        },
      },
    },
    animation: { duration: 300 } as const,
  };

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-outfit text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
          50 READINGS
        </span>
      </div>
      <div className="h-48">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LiveChart;
