
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SearchAndFilters from './ticket-management/SearchAndFilters';
import TicketsTable from './ticket-management/TicketsTable';
import TicketDetailModal from './ticket-management/TicketDetailModal';
import PaginationControls from './ticket-management/PaginationControls';

const TicketManagementTab = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [tickets, setTickets] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchTickets();
    fetchTechnicians();
  }, [currentPage, searchTerm, statusFilter, priorityFilter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('tickets')
        .select(`
          *,
          departments(name),
          areas(name),
          technicians(name)
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%,requester_name.ilike.%${searchTerm}%`);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (priorityFilter !== 'all') {
        query = query.eq('priority', priorityFilter);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      setTickets(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Gagal memuat tiket",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      setTechnicians(data || []);
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-500/20 text-blue-400';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'Menunggu Material': return 'bg-purple-500/20 text-purple-400';
      case 'Closed': return 'bg-green-500/20 text-green-400';
      case 'Reject': return 'bg-red-500/20 text-red-400';
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Manajemen Tiket</h2>
        <p className="text-muted-foreground">Kelola dan pantau semua tiket TPM</p>
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {/* Tickets Table */}
      <TicketsTable
        tickets={tickets}
        loading={loading}
        onViewTicket={handleViewTicket}
        getStatusColor={getStatusColor}
        getPriorityColor={getPriorityColor}
      />

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Ticket Detail Modal */}
      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        technicians={technicians}
        onTicketUpdated={fetchTickets}
        getStatusColor={getStatusColor}
        getPriorityColor={getPriorityColor}
      />
    </div>
  );
};

export default TicketManagementTab;
