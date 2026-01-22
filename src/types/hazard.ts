export type HazardSeverity = 'low' | 'medium' | 'high';
export type HazardType = 'pothole' | 'crack';

export interface Hazard {
  id: string;
  type: HazardType;
  severity: HazardSeverity;
  latitude: number;
  longitude: number;
  timestamp: string;
  imageUrl: string;
  location: string;
  confidence: number;
}

export interface ConnectionStatus {
  isConnected: boolean;
  lastPacketTime: string | null;
  signalStrength: number;
  packetsReceived: number;
}

export interface AnalyticsData {
  totalHazards: number;
  potholes: number;
  cracks: number;
  highSeverity: number;
  mediumSeverity: number;
  lowSeverity: number;
  detectionsByDay: { date: string; count: number }[];
  affectedZones: { zone: string; count: number }[];
}
