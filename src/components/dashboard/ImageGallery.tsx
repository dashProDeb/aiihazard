import { useState } from 'react';
import { X, ZoomIn, MapPin, Calendar } from 'lucide-react';
import { Hazard } from '@/types/hazard';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ImageGalleryProps {
  hazards: Hazard[];
}

export function ImageGallery({ hazards }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Hazard | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (hazardId: string) => {
    setImageErrors((prev) => new Set(prev).add(hazardId));
  };

  const getImageSrc = (hazard: Hazard) => {
    if (imageErrors.has(hazard.id)) {
      return '/placeholder.svg';
    }
    return hazard.imageUrl;
  };

  // Only show pothole hazards — images from public/images/potholes/
  const potholeHazards = hazards.filter((h) => h.type === 'pothole');

  return (
    <>
      <div className="glass-panel p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Pothole Images
          </h3>
          <span className="text-xs text-muted-foreground">
            {potholeHazards.length} images · public/images/potholes
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {potholeHazards.map((hazard) => (
            <button
              key={hazard.id}
              onClick={() => setSelectedImage(hazard)}
              className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all"
            >
              <img
                src={getImageSrc(hazard)}
                alt={`${hazard.type} detection`}
                onError={() => handleImageError(hazard.id)}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full',
                      hazard.severity === 'high' && 'bg-severity-high',
                      hazard.severity === 'medium' && 'bg-severity-medium',
                      hazard.severity === 'low' && 'bg-severity-low'
                    )}
                  />
                  <span className="text-xs text-foreground capitalize">{hazard.type}</span>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-background/80 backdrop-blur-sm p-1.5 rounded-md">
                  <ZoomIn className="w-3 h-3 text-foreground" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span
                className={cn(
                  'w-3 h-3 rounded-full',
                  selectedImage?.severity === 'high' && 'bg-severity-high',
                  selectedImage?.severity === 'medium' && 'bg-severity-medium',
                  selectedImage?.severity === 'low' && 'bg-severity-low'
                )}
              />
              <span className="capitalize">{selectedImage?.type}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground capitalize">
                {selectedImage?.severity} severity
              </span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={getImageSrc(selectedImage)}
                alt={`${selectedImage.type} detection`}
                onError={() => handleImageError(selectedImage.id)}
                className="w-full aspect-video object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedImage.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(selectedImage.timestamp), 'MMM d, yyyy HH:mm')}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">GPS Coordinates</p>
                  <p className="font-mono text-sm">
                    {selectedImage.latitude.toFixed(6)}, {selectedImage.longitude.toFixed(6)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">AI Confidence</p>
                  <p className="font-mono text-sm text-primary">{selectedImage.confidence}%</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
