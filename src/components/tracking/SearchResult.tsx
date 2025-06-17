
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, Clock, User, MapPin, AlertTriangle, Eye } from 'lucide-react';

interface SearchResultProps {
  searchResult: any;
  onViewDetail: () => void;
}

const SearchResult = ({ searchResult, onViewDetail }: SearchResultProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Menunggu Material': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Closed': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Reject': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'Open': return 20;
      case 'In Progress': return 60;
      case 'Menunggu Material': return 75;
      case 'Closed': return 100;
      case 'Reject': return 0;
      default: return 0;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!searchResult) return null;

  const progress = getProgressPercentage(searchResult.status);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Ticket className="w-5 h-5 text-green-400" />
          <h4 className="text-lg font-semibold text-green-400">Tiket Ditemukan</h4>
        </div>
        <Button 
          onClick={onViewDetail} 
          className="btn-primary bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Eye className="w-4 h-4 mr-2" />
          Lihat Detail
        </Button>
      </div>

      <Card className="glass-card border-white/20">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-2">{searchResult.title}</CardTitle>
              <CardDescription className="text-sm">
                Tiket #{searchResult.id}
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={getStatusColor(searchResult.status)}>
                {searchResult.status}
              </Badge>
              <Badge className={getPriorityColor(searchResult.priority)}>
                Prioritas {searchResult.priority}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Pemohon</p>
                  <p className="text-sm text-muted-foreground">{searchResult.requester_name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-sm font-medium">Lokasi</p>
                  <p className="text-sm text-muted-foreground">
                    {searchResult.departments?.name} - {searchResult.areas?.name}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-sm font-medium">Prioritas</p>
                  <p className="text-sm text-muted-foreground">{searchResult.priority}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-sm font-medium">Dibuat</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(searchResult.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Deskripsi Masalah</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {searchResult.description}
            </p>
          </div>

          {/* Assigned Info */}
          <div className="bg-muted/20 rounded-lg p-4">
            <p className="text-sm font-medium mb-1">Ditangani oleh</p>
            <p className="text-sm text-muted-foreground">{searchResult.technicians?.name || 'Belum di-assign'}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Update terakhir: {formatDate(searchResult.updated_at)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchResult;
