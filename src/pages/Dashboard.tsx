import { useState } from 'react';
import { AlertTriangle, Zap, TrendingUp, MapPin } from 'lucide-react';
import { DashboardSidebar, ViewType } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { LiveStatusPanel } from '@/components/dashboard/LiveStatusPanel';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { HazardMap } from '@/components/dashboard/HazardMap';
import { DataTable } from '@/components/dashboard/DataTable';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { ImageGallery } from '@/components/dashboard/ImageGallery';
import { mockHazards, mockConnectionStatus, mockAnalytics } from '@/data/mockData';
import { Hazard } from '@/types/hazard';

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ViewType>('table');
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null);

  const handleHazardSelect = (hazard: Hazard) => {
    setSelectedHazard(hazard);
    if (activeView !== 'map') {
      setActiveView('map');
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {activeView === 'map' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
              {/* Left Panel - Stats & Status */}
              <div className="lg:col-span-1 space-y-4">
                <LiveStatusPanel status={mockConnectionStatus} />
                
                <div className="space-y-3">
                  <StatsCard
                    title="Total Hazards"
                    value={mockAnalytics.totalHazards}
                    icon={TrendingUp}
                    trend={{ value: 12, isPositive: false }}
                    variant="primary"
                  />
                  <StatsCard
                    title="Potholes"
                    value={mockAnalytics.potholes}
                    icon={AlertTriangle}
                    variant="warning"
                  />
                  <StatsCard
                    title="Cracks"
                    value={mockAnalytics.cracks}
                    icon={Zap}
                    variant="default"
                  />
                  <StatsCard
                    title="High Severity"
                    value={mockAnalytics.highSeverity}
                    icon={MapPin}
                    variant="danger"
                  />
                </div>
              </div>
              
              {/* Right Panel - Map */}
              <div className="lg:col-span-3 h-[calc(100vh-180px)] min-h-[400px]">
                <HazardMap
                  hazards={mockHazards}
                  selectedHazard={selectedHazard}
                  onHazardSelect={handleHazardSelect}
                />
              </div>
            </div>
          )}

          {activeView === 'table' && (
            <div className="h-[calc(100vh-180px)]">
              <DataTable hazards={mockHazards} onHazardSelect={handleHazardSelect} />
            </div>
          )}

          {activeView === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <AnalyticsChart data={mockAnalytics} />
              </div>
              <div className="space-y-4">
                <StatsCard
                  title="Total Hazards"
                  value={mockAnalytics.totalHazards}
                  icon={TrendingUp}
                  trend={{ value: 12, isPositive: false }}
                  variant="primary"
                />
                <StatsCard
                  title="Potholes Detected"
                  value={mockAnalytics.potholes}
                  icon={AlertTriangle}
                  variant="warning"
                />
                <StatsCard
                  title="Cracks Detected"
                  value={mockAnalytics.cracks}
                  icon={Zap}
                />
                <div className="glass-panel p-4">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Severity Breakdown
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-severity-high" />
                        <span className="text-sm">High</span>
                      </div>
                      <span className="font-mono text-sm">{mockAnalytics.highSeverity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-severity-medium" />
                        <span className="text-sm">Medium</span>
                      </div>
                      <span className="font-mono text-sm">{mockAnalytics.mediumSeverity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-severity-low" />
                        <span className="text-sm">Low</span>
                      </div>
                      <span className="font-mono text-sm">{mockAnalytics.lowSeverity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'images' && (
            <ImageGallery hazards={mockHazards} />
          )}
        </main>
      </div>
    </div>
  );
}
