
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, User } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  requester_name: string;
  departments?: { name: string };
  status: string;
  priority: string;
  technicians?: { name: string };
  created_at: string;
}

interface TicketsTableProps {
  tickets: Ticket[];
  loading: boolean;
  onViewTicket: (ticket: Ticket) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const TicketsTable = ({ 
  tickets, 
  loading, 
  onViewTicket, 
  getStatusColor, 
  getPriorityColor 
}: TicketsTableProps) => {
  return (
    <Card className="glass-card border-white/20">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Tiket</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Departemen</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioritas</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Tidak ada tiket ditemukan
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell>{ticket.requester_name}</TableCell>
                  <TableCell className="text-sm">{ticket.departments?.name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{ticket.technicians?.name || 'Unassigned'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => onViewTicket(ticket)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TicketsTable;
