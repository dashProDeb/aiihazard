import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'warning' | 'danger';
}

export function StatsCard({ title, value, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary/30 bg-primary/5',
    warning: 'border-severity-medium/30 bg-severity-medium/5',
    danger: 'border-severity-high/30 bg-severity-high/5',
  };

  const iconStyles = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    warning: 'text-severity-medium',
    danger: 'text-severity-high',
  };

  return (
    <div className={cn('glass-panel p-4 border', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs mt-1',
                trend.isPositive ? 'text-status-online' : 'text-status-offline'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs yesterday
            </p>
          )}
        </div>
        <div className={cn('p-2 rounded-lg bg-secondary/50', iconStyles[variant])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
