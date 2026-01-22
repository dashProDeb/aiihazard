import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { AnalyticsData } from '@/types/hazard';
import { format } from 'date-fns';

interface AnalyticsChartProps {
  data: AnalyticsData;
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const chartData = data.detectionsByDay.map((d) => ({
    ...d,
    displayDate: format(new Date(d.date), 'MMM d'),
  }));

  return (
    <div className="glass-panel p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Detection Trends
        </h3>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174 72% 46%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(174 72% 46%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" vertical={false} />
            <XAxis
              dataKey="displayDate"
              tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(217 33% 16%)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(222 47% 9% / 0.95)',
                border: '1px solid hsl(217 33% 20%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 96%)',
              }}
              labelStyle={{ color: 'hsl(215 20% 55%)' }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="hsl(174 72% 46%)"
              strokeWidth={2}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Affected Zones */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Most Affected Zones
        </h4>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.affectedZones}
              layout="vertical"
              margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="zone"
                tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(222 47% 9% / 0.95)',
                  border: '1px solid hsl(217 33% 20%)',
                  borderRadius: '8px',
                  color: 'hsl(210 40% 96%)',
                }}
              />
              <Bar dataKey="count" fill="hsl(187 85% 53%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
