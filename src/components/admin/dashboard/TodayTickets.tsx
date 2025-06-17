import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TodayTickets = () => {
  const { toast } = useToast();
  const [todayTickets, setTodayTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  useEffect(() => {
    fetchTodayTickets();
  }, []);

  const fetchTodayTickets = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          departments(name),
          areas(name),
          technicians(name)
        `)
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lte('created_at', `${today}T23:59:59.999Z`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodayTickets(data || []);
    } catch (error) {
      console.error('Error fetching today tickets:', error);
      toast({
        title: "Error",
        description: "Gagal memuat tiket hari ini",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-500/20 text-blue-400';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'Menunggu Material': return 'bg-purple-500/20 text-purple-400';
      case 'Closed': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <Card className="glass-card border-white/20 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Daftar Tiket Hari Ini</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : todayTickets.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            Tidak ada tiket baru hari ini
          </div>
        ) : (
          <div className="space-y-4">
            {todayTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-white/10">
                <div className="flex-1">
                  <p className="font-semibold">{ticket.title}</p>
                  <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Assignee: {ticket.technicians?.name || 'Unassigned'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(ticket)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl glass-card border-white/20">
                      <DialogHeader>
                        <DialogTitle>Detail Tiket - {ticket.id}</DialogTitle>
                        <DialogDescription>
                          Informasi lengkap tiket TPM
                        </DialogDescription>
                      </DialogHeader>
                      {selectedTicket && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Judul</label>
                              <p>{selectedTicket.title}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Status</label>
                              <Badge className={getStatusColor(selectedTicket.status)}>
                                {selectedTicket.status}
                              </Badge>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Requester</label>
                              <p>{selectedTicket.requester_name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Prioritas</label>
                              <Badge className={getPriorityColor(selectedTicket.priority)}>
                                {selectedTicket.priority}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Deskripsi</label>
                            <p className="text-sm text-muted-foreground mt-1">{selectedTicket.description}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayTickets;