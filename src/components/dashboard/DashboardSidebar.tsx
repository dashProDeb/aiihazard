import { Map, TableProperties, BarChart3, Image, Radio, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ViewType = 'map' | 'table' | 'analytics' | 'images';

interface DashboardSidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const navItems: { id: ViewType; label: string; icon: typeof Map }[] = [
  { id: 'map', label: 'Map View', icon: Map },
  { id: 'table', label: 'Data Table', icon: TableProperties },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'images', label: 'Images', icon: Image },
];

export function DashboardSidebar({ activeView, onViewChange }: DashboardSidebarProps) {
  return (
    <aside className="w-16 lg:w-56 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center lg:justify-start px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Radio className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="hidden lg:block font-semibold text-sidebar-foreground">
            RoadScan AI
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
              activeView === item.id
                ? 'bg-sidebar-accent text-sidebar-primary'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all">
          <Settings className="w-5 h-5 shrink-0" />
          <span className="hidden lg:block">Settings</span>
        </button>
      </div>
    </aside>
  );
}
