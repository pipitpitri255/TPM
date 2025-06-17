
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { User, MapPin, Clock, AlertTriangle, FileText, Image, CheckCircle, XCircle, Loader, Package } from 'lucide-react';

interface TicketDetailModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

const TicketDetailModal = ({ ticket, isOpen, onClose }: TicketDetailModalProps) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <Clock className="w-4 h-4" />;
      case 'In Progress': return <Loader className="w-4 h-4" />;
      case 'Menunggu Material': return <Package className="w-4 h-4" />;
      case 'Closed': return <CheckCircle className="w-4 h-4" />;
      case 'Reject': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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

  if (!ticket) return null;

  const progress = getProgressPercentage(ticket.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <FileText className="w-6 h-6" />
            <span>Detail Tiket #{ticket.id}</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            Informasi lengkap dan riwayat tiket maintenance
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {getStatusIcon(ticket.status)}
              <span className="font-medium">Progress Tiket</span>
            </div>
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Open</span>
            <span>In Progress</span>
            <span>Menunggu Material</span>
            <span>Closed</span>
          </div>
        </div>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Informasi Tiket</TabsTrigger>
            <TabsTrigger value="photos">Foto Dokumentasi</TabsTrigger>
            <TabsTrigger value="notes">Catatan & Update</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 mt-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Label className="text-sm font-medium flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Judul Tiket</span>
                  </Label>
                  <p className="font-semibold text-lg">{ticket.title}</p>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Label className="text-sm font-medium flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4" />
                    <span>Pemohon</span>
                  </Label>
                  <p className="font-medium">{ticket.requester_name}</p>
                  {ticket.requester_phone && (
                    <p className="text-sm text-muted-foreground mt-1">📞 {ticket.requester_phone}</p>
                  )}
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Label className="text-sm font-medium flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Lokasi</span>
                  </Label>
                  <p className="font-medium">{ticket.departments?.name || 'Tidak diketahui'}</p>
                  <p className="text-sm text-muted-foreground">{ticket.areas?.name || 'Area tidak diketahui'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Label className="text-sm font-medium flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Prioritas</span>
                  </Label>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Label className="text-sm font-medium mb-2 block">Teknisi Assigned</Label>
                  <p className="font-medium">{ticket.technicians?.name || 'Belum di-assign'}</p>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Label className="text-sm font-medium flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Waktu</span>
                  </Label>
                  <div className="space-y-1 text-sm">
                    <p>Dibuat: {formatDate(ticket.created_at)}</p>
                    <p>Update: {formatDate(ticket.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="p-4 bg-muted/20 rounded-lg">
              <Label className="text-sm font-medium mb-3 block">Deskripsi Masalah</Label>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {ticket.description || 'Tidak ada deskripsi'}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-6 mt-6">
            <div>
              <Label className="text-sm font-medium flex items-center space-x-2 mb-4">
                <Image className="w-4 h-4" />
                <span>Foto Before (Kondisi Awal)</span>
              </Label>
              {ticket.before_photos && ticket.before_photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {ticket.before_photos.map((photo: string, index: number) => (
                    <div key={index} className="relative group">
                      <img 
                        src={photo} 
                        alt={`Before ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-lg border border-white/20 cursor-pointer hover:opacity-80 transition-opacity" 
                        onClick={() => window.open(photo, '_blank')}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white text-sm font-medium">Klik untuk memperbesar</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-muted/20 rounded-lg border-2 border-dashed border-muted text-center">
                  <Image className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">Tidak ada foto kondisi awal</p>
                </div>
              )}
            </div>
            
            <div>
              <Label className="text-sm font-medium flex items-center space-x-2 mb-4">
                <Image className="w-4 h-4" />
                <span>Foto After (Hasil Perbaikan) - {ticket.after_photos?.length || 0}/5</span>
              </Label>
              {ticket.after_photos && ticket.after_photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {ticket.after_photos.map((photo: string, index: number) => (
                    <div key={index} className="relative group">
                      <img 
                        src={photo} 
                        alt={`After ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-lg border border-white/20 cursor-pointer hover:opacity-80 transition-opacity" 
                        onClick={() => window.open(photo, '_blank')}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white text-sm font-medium">Klik untuk memperbesar</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-muted/20 rounded-lg border-2 border-dashed border-muted text-center">
                  <Image className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">Belum ada foto hasil perbaikan</p>
                  <p className="text-xs text-muted-foreground mt-1">Foto akan diupload setelah perbaikan selesai</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-6 mt-6">
            <div className="grid gap-6">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Label className="text-sm font-medium mb-3 block text-blue-400">Catatan Admin</Label>
                {ticket.admin_notes ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {ticket.admin_notes}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Belum ada catatan dari admin
                  </p>
                )}
              </div>
              
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Label className="text-sm font-medium mb-3 block text-green-400">Deskripsi Kondisi After</Label>
                {ticket.after_description ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {ticket.after_description}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Belum ada deskripsi kondisi setelah perbaikan
                  </p>
                )}
              </div>
              
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <Label className="text-sm font-medium mb-3 block text-purple-400">Catatan untuk Pemohon</Label>
                {ticket.requester_notes ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {ticket.requester_notes}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Belum ada catatan khusus untuk pemohon
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Tiket Dibuat</p>
                  <p className="text-sm text-muted-foreground">{formatDate(ticket.created_at)}</p>
                  <p className="text-sm">Tiket telah dibuat oleh {ticket.requester_name}</p>
                </div>
              </div>
              
              {ticket.assigned_technician_id && (
                <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Tiket Di-assign</p>
                    <p className="text-sm text-muted-foreground">{formatDate(ticket.updated_at)}</p>
                    <p className="text-sm">Tiket telah di-assign ke {ticket.technicians?.name}</p>
                  </div>
                </div>
              )}
              
              {ticket.status === 'In Progress' && (
                <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Perbaikan Dimulai</p>
                    <p className="text-sm text-muted-foreground">{formatDate(ticket.updated_at)}</p>
                    <p className="text-sm">Teknisi mulai mengerjakan perbaikan</p>
                  </div>
                </div>
              )}
              
              {ticket.status === 'Closed' && (
                <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Tiket Selesai</p>
                    <p className="text-sm text-muted-foreground">{formatDate(ticket.updated_at)}</p>
                    <p className="text-sm">Perbaikan telah selesai dan tiket ditutup</p>
                  </div>
                </div>
              )}
              
              {ticket.status === 'Reject' && (
                <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Tiket Ditolak</p>
                    <p className="text-sm text-muted-foreground">{formatDate(ticket.updated_at)}</p>
                    <p className="text-sm">Tiket ditolak dengan alasan tertentu</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailModal;
