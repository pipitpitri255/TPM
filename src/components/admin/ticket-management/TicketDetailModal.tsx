
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/form/FileUpload';

interface Ticket {
  id: string;
  title: string;
  description: string;
  requester_name: string;
  status: string;
  priority: string;
  departments?: { name: string };
  technicians?: { name: string };
  assigned_technician_id?: string;
  before_photos?: string[];
  admin_notes?: string;
  after_description?: string;
  requester_notes?: string;
}

interface Technician {
  id: string;
  name: string;
}

interface TicketDetailModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  technicians: Technician[];
  onTicketUpdated: () => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const TicketDetailModal = ({ 
  ticket, 
  isOpen, 
  onClose, 
  technicians, 
  onTicketUpdated,
  getStatusColor,
  getPriorityColor
}: TicketDetailModalProps) => {
  const { toast } = useToast();
  const [updateData, setUpdateData] = useState({
    status: '',
    assigned_technician_id: '',
    admin_notes: '',
    after_description: '',
    requester_notes: ''
  });
  const [afterPhotos, setAfterPhotos] = useState<File[]>([]);

  // Reset form data when ticket changes
  useEffect(() => {
    if (ticket) {
      setUpdateData({
        status: ticket.status || '',
        assigned_technician_id: ticket.assigned_technician_id || 'unassigned',
        admin_notes: ticket.admin_notes || '',
        after_description: ticket.after_description || '',
        requester_notes: ticket.requester_notes || ''
      });
    }
  }, [ticket]);

  const handleUpdateTicket = async () => {
    if (!ticket) return;

    try {
      const updatePayload: any = {
        updated_at: new Date().toISOString()
      };

      // Only update fields that have values
      if (updateData.status && updateData.status !== ticket.status) {
        updatePayload.status = updateData.status;
      }
      if (updateData.assigned_technician_id !== ticket.assigned_technician_id) {
        updatePayload.assigned_technician_id = updateData.assigned_technician_id === 'unassigned' ? null : updateData.assigned_technician_id;
      }
      if (updateData.admin_notes.trim()) {
        updatePayload.admin_notes = updateData.admin_notes;
      }
      if (updateData.after_description.trim()) {
        updatePayload.after_description = updateData.after_description;
      }
      if (updateData.requester_notes.trim()) {
        updatePayload.requester_notes = updateData.requester_notes;
      }

      const { error } = await supabase
        .from('tickets')
        .update(updatePayload)
        .eq('id', ticket.id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Tiket berhasil diupdate"
      });

      onTicketUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast({
        title: "Error",
        description: "Gagal mengupdate tiket",
        variant: "destructive"
      });
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <DialogTitle>Detail Tiket - {ticket.id}</DialogTitle>
          <DialogDescription>
            Informasi lengkap tiket TPM
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detail</TabsTrigger>
            <TabsTrigger value="photos">Foto & Catatan</TabsTrigger>
            <TabsTrigger value="assign">Assignment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Judul</Label>
                <p className="font-medium mt-1">{ticket.title}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Requester</Label>
                <p className="mt-1">{ticket.requester_name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Prioritas</Label>
                <div className="mt-1">
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Department</Label>
                <p className="mt-1">{ticket.departments?.name || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Teknisi</Label>
                <p className="mt-1">{ticket.technicians?.name || 'Unassigned'}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Deskripsi</Label>
              <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted rounded-md">{ticket.description}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium">Foto Before (dari User)</Label>
              {ticket.before_photos && ticket.before_photos.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {ticket.before_photos.map((photo: string, index: number) => (
                    <img key={index} src={photo} alt={`Before ${index + 1}`} className="w-full h-24 object-cover rounded border" />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-2 p-3 bg-muted rounded-md">Tidak ada foto before</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium">Catatan untuk Pemohon</Label>
              <Textarea
                value={updateData.requester_notes}
                onChange={(e) => setUpdateData({...updateData, requester_notes: e.target.value})}
                placeholder="Tambahkan catatan untuk pemohon..."
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Upload Foto Kondisi After</Label>
              <div className="mt-2">
                <FileUpload 
                  uploadedFiles={afterPhotos}
                  setUploadedFiles={setAfterPhotos}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Deskripsi Kondisi After</Label>
              <Textarea
                value={updateData.after_description}
                onChange={(e) => setUpdateData({...updateData, after_description: e.target.value})}
                placeholder="Jelaskan kondisi setelah perbaikan..."
                className="mt-2"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="assign" className="space-y-4 mt-4">
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-3">Informasi Assignment Saat Ini</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Status Saat Ini</Label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Teknisi Saat Ini</Label>
                    <p className="font-medium mt-1">{ticket.technicians?.name || 'Belum di-assign'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Update Assignment</h3>
                
                <div>
                  <Label className="text-sm font-medium">Assign ke Teknisi</Label>
                  <Select 
                    value={updateData.assigned_technician_id} 
                    onValueChange={(value) => {
                      console.log('Selected technician:', value);
                      setUpdateData({...updateData, assigned_technician_id: value});
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Pilih teknisi..." />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {technicians.map((tech) => (
                        <SelectItem key={tech.id} value={tech.id}>
                          {tech.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Update Status</Label>
                  <Select 
                    value={updateData.status} 
                    onValueChange={(value) => {
                      console.log('Selected status:', value);
                      setUpdateData({...updateData, status: value});
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Pilih status..." />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Menunggu Material">Menunggu Material</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                      <SelectItem value="Reject">Reject</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Catatan Admin</Label>
                  <Textarea
                    value={updateData.admin_notes}
                    onChange={(e) => setUpdateData({...updateData, admin_notes: e.target.value})}
                    placeholder="Tambahkan catatan admin..."
                    className="mt-2"
                  />
                </div>
                
                <Button 
                  className="w-full btn-primary bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                  onClick={handleUpdateTicket}
                >
                  Update Tiket
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailModal;
