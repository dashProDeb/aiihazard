import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Hazard } from '@/types/hazard';
import { format } from 'date-fns';

interface HazardMapProps {
  hazards: Hazard[];
  selectedHazard: Hazard | null;
  onHazardSelect: (hazard: Hazard) => void;
}

const severityColors = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#ef4444',
};

function createCustomIcon(severity: 'low' | 'medium' | 'high') {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px;
      height: 24px;
      background: ${severityColors[severity]};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function MapController({ selectedHazard }: { selectedHazard: Hazard | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedHazard) {
      map.flyTo([selectedHazard.latitude, selectedHazard.longitude], 15, {
        duration: 0.5,
      });
    }
  }, [selectedHazard, map]);

  return null;
}

export function HazardMap({ hazards, selectedHazard, onHazardSelect }: HazardMapProps) {
  const center: [number, number] = [40.7128, -74.006];

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-border">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapController selectedHazard={selectedHazard} />
        
        {hazards.map((hazard) => (
          <Marker
            key={hazard.id}
            position={[hazard.latitude, hazard.longitude]}
            icon={createCustomIcon(hazard.severity)}
            eventHandlers={{
              click: () => onHazardSelect(hazard),
            }}
          >
            <Popup>
              <div className="min-w-[200px] p-1">
                <img
                  src={hazard.imageUrl}
                  alt={`${hazard.type} detection`}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-primary">
                      {hazard.type}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        hazard.severity === 'high'
                          ? 'bg-red-500/20 text-red-400'
                          : hazard.severity === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {hazard.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{hazard.location}</p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {hazard.latitude.toFixed(4)}, {hazard.longitude.toFixed(4)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(hazard.timestamp), 'MMM d, yyyy HH:mm')}
                  </p>
                  <p className="text-xs text-primary">
                    Confidence: {hazard.confidence}%
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
