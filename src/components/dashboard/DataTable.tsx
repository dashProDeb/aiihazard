import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ArrowUpDown, Filter, Search, MapPin, AlertTriangle, Zap } from 'lucide-react';
import { Hazard } from '@/types/hazard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps {
  hazards: Hazard[];
  onHazardSelect: (hazard: Hazard) => void;
}

type SortField = 'timestamp' | 'severity' | 'type' | 'confidence';
type SortDirection = 'asc' | 'desc';

const severityOrder = { high: 3, medium: 2, low: 1 };

export function DataTable({ hazards, onHazardSelect }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredAndSortedHazards = useMemo(() => {
    let result = [...hazards];

    // Filter by search
    if (searchQuery) {
      result = result.filter(
        (h) =>
          h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.id.includes(searchQuery)
      );
    }

    // Filter by severity
    if (severityFilter !== 'all') {
      result = result.filter((h) => h.severity === severityFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      result = result.filter((h) => h.type === typeFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'timestamp':
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case 'severity':
          comparison = severityOrder[a.severity] - severityOrder[b.severity];
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'confidence':
          comparison = a.confidence - b.confidence;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [hazards, searchQuery, severityFilter, typeFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground -ml-3"
    >
      {children}
      <ArrowUpDown className="ml-1 h-3 w-3" />
    </Button>
  );

  return (
    <div className="glass-panel p-4 space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Hazard Records
        </h3>
        <span className="text-xs text-muted-foreground">
          {filteredAndSortedHazards.length} records
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50 border-border"
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[130px] bg-secondary/50">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[130px] bg-secondary/50">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pothole">Pothole</SelectItem>
            <SelectItem value="crack">Crack</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[100px]">
                <SortButton field="type">Type</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="severity">Severity</SortButton>
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>
                <SortButton field="timestamp">Time</SortButton>
              </TableHead>
              <TableHead className="text-right">
                <SortButton field="confidence">Confidence</SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedHazards.map((hazard) => (
              <TableRow
                key={hazard.id}
                className="border-border cursor-pointer hover:bg-secondary/50"
                onClick={() => onHazardSelect(hazard)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {hazard.type === 'pothole' ? (
                      <AlertTriangle className="w-4 h-4 text-primary" />
                    ) : (
                      <Zap className="w-4 h-4 text-accent" />
                    )}
                    <span className="capitalize text-sm">{hazard.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      hazard.severity === 'high' && 'bg-severity-high/20 text-severity-high',
                      hazard.severity === 'medium' && 'bg-severity-medium/20 text-severity-medium',
                      hazard.severity === 'low' && 'bg-severity-low/20 text-severity-low'
                    )}
                  >
                    {hazard.severity}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm truncate max-w-[150px]">{hazard.location}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(hazard.timestamp), 'MMM d, HH:mm')}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm font-mono text-primary">{hazard.confidence}%</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
