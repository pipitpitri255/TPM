import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
}

const SearchAndFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  priorityFilter,
  setPriorityFilter 
}: SearchAndFiltersProps) => {
  return (
    <Card className="glass-card border-white/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari tiket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-futuristic pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="input-futuristic">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Menunggu Material">Menunggu Material</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="Reject">Reject</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="input-futuristic">
              <SelectValue placeholder="Filter Prioritas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Prioritas</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchAndFilters;