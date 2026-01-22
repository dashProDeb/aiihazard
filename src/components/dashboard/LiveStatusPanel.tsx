import { Wifi, WifiOff, Radio, Clock, Activity } from 'lucide-react';
import { ConnectionStatus } from '@/types/hazard';
import { cn } from '@/lib/utils';

interface LiveStatusPanelProps {
  status: ConnectionStatus;
}

export function LiveStatusPanel({ status }: LiveStatusPanelProps) {
  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return '--:--:--';
    return new Date(timestamp).toLocaleTimeString();
  };

  const getSignalBars = (strength: number) => {
    const bars = Math.ceil(strength / 25);
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={cn(
          'w-1 rounded-full transition-all',
          i === 0 ? 'h-1.5' : i === 1 ? 'h-2.5' : i === 2 ? 'h-3.5' : 'h-5',
          i < bars ? 'bg-primary' : 'bg-muted'
        )}
      />
    ));
  };

  return (
    <div className="glass-panel p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Live Status
        </h3>
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium',
            status.isConnected
              ? 'bg-status-online/20 text-status-online'
              : 'bg-status-offline/20 text-status-offline'
          )}
        >
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              status.isConnected ? 'bg-status-online status-pulse' : 'bg-status-offline'
            )}
          />
          {status.isConnected ? 'Receiving Data' : 'No Signal'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            {status.isConnected ? (
              <Wifi className="w-4 h-4 text-primary" />
            ) : (
              <WifiOff className="w-4 h-4 text-destructive" />
            )}
            <span className="text-xs">LoRa Signal</span>
          </div>
          <div className="flex items-end gap-0.5 mt-2">
            {getSignalBars(status.signalStrength)}
            <span className="ml-2 text-sm font-mono text-foreground">
              {status.signalStrength}%
            </span>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs">Last Packet</span>
          </div>
          <p className="text-sm font-mono text-foreground mt-2">
            {formatTime(status.lastPacketTime)}
          </p>
        </div>

        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Radio className="w-4 h-4 text-accent" />
            <span className="text-xs">ESP32 Status</span>
          </div>
          <p className="text-sm font-medium text-primary mt-2">Online</p>
        </div>

        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-xs">Packets Received</span>
          </div>
          <p className="text-sm font-mono text-foreground mt-2">
            {status.packetsReceived.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
