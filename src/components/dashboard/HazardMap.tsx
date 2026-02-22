import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { Hazard } from '@/types/hazard';
import { format } from 'date-fns';
import 'leaflet/dist/leaflet.css';

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

export function HazardMap({ hazards, selectedHazard, onHazardSelect }: HazardMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [23.8103, 90.4125], // Dhaka, Bangladesh
      zoom: 7,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    mapRef.current = map;
    setIsMapReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Add markers
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    hazards.forEach((hazard) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 24px;
          height: 24px;
          background: ${severityColors[hazard.severity]};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([hazard.latitude, hazard.longitude], { icon })
        .addTo(mapRef.current!)
        .on('click', () => onHazardSelect(hazard));

      const popupContent = `
        <div style="min-width: 200px; padding: 4px;">
          <img src="${hazard.imageUrl}" alt="${hazard.type}" style="width: 100%; height: 96px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span style="font-size: 12px; text-transform: uppercase; font-weight: 600; color: #20b8a8;">${hazard.type}</span>
            <span style="font-size: 12px; padding: 2px 8px; border-radius: 12px; background: ${
              hazard.severity === 'high' ? 'rgba(239,68,68,0.2)' : 
              hazard.severity === 'medium' ? 'rgba(234,179,8,0.2)' : 'rgba(34,197,94,0.2)'
            }; color: ${
              hazard.severity === 'high' ? '#f87171' : 
              hazard.severity === 'medium' ? '#fbbf24' : '#4ade80'
            };">${hazard.severity}</span>
          </div>
          <p style="font-size: 12px; color: #9ca3af; margin: 4px 0;">${hazard.location}</p>
          <p style="font-size: 12px; font-family: monospace; color: #9ca3af; margin: 4px 0;">${hazard.latitude.toFixed(4)}, ${hazard.longitude.toFixed(4)}</p>
          <p style="font-size: 12px; color: #9ca3af; margin: 4px 0;">${format(new Date(hazard.timestamp), 'MMM d, yyyy HH:mm')}</p>
          <p style="font-size: 12px; color: #20b8a8; margin: 4px 0;">Confidence: ${hazard.confidence}%</p>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-popup',
      });

      markersRef.current.push(marker);
    });
  }, [hazards, isMapReady, onHazardSelect]);

  // Handle selected hazard
  useEffect(() => {
    if (!mapRef.current || !selectedHazard) return;

    mapRef.current.flyTo([selectedHazard.latitude, selectedHazard.longitude], 15, {
      duration: 0.5,
    });
  }, [selectedHazard]);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-border">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}
