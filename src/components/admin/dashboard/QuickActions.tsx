import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, TrendingUp, AlertTriangle, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsProps {
  onCreateTicket: () => void;
  onManageTechnicians: () => void;
  onViewReports: () => void;
  onPriorityTickets: () => void;
}

const QuickActions = ({ onCreateTicket, onManageTechnicians, onViewReports, onPriorityTickets }: QuickActionsProps) => {
  const { toast } = useToast();

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wrench className="w-5 h-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          className="w-full btn-primary" 
          size="lg"
          onClick={onCreateTicket}
        >
          <Plus className="w-4 h-4 mr-2" />
          Buat Tiket Baru
        </Button>
        <Button 
          variant="outline" 
          className="w-full glass-card border-white/20" 
          size="lg"
          onClick={onManageTechnicians}
        >
          <Users className="w-4 h-4 mr-2" />
          Kelola Teknisi
        </Button>
        <Button 
          variant="outline" 
          className="w-full glass-card border-white/20" 
          size="lg"
          onClick={onViewReports}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Lihat Laporan
        </Button>
        <Button 
          variant="outline" 
          className="w-full glass-card border-white/20" 
          size="lg"
          onClick={onPriorityTickets}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Tiket Prioritas
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;