
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SearchSection from './tracking/SearchSection';
import InfoCards from './tracking/InfoCards';
import SearchResult from './tracking/SearchResult';
import TicketDetailModal from './tracking/TicketDetailModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TrackingForm = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if there's a ticket number to search from sessionStorage
    const ticketToSearch = sessionStorage.getItem('searchTicket');
    if (ticketToSearch) {
      setSearchQuery(ticketToSearch);
      sessionStorage.removeItem('searchTicket');
      // Auto-search
      setTimeout(() => handleSearchWithQuery(ticketToSearch), 500);
    }
  }, []);

  const handleSearchWithQuery = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    console.log('Searching for ticket:', query);
    
    try {
      // Search for ticket by ID or title using maybeSingle instead of single
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          departments(name),
          areas(name),
          technicians(name)
        `)
        .or(`id.ilike.%${query}%,title.ilike.%${query}%`)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Search error:', error);
        throw error;
      }

      if (data) {
        console.log('Ticket found:', data);
        setSearchResult(data);
        // Automatically open modal when ticket is found
        setIsModalOpen(true);
        toast({
          title: "Tiket ditemukan",
          description: `Tiket ${data.id} berhasil ditemukan.`,
        });
      } else {
        console.log('No ticket found for query:', query);
        setSearchResult(null);
        setIsModalOpen(false);
        toast({
          title: "Tiket tidak ditemukan",
          description: "Periksa kembali nomor tiket atau kata kunci pencarian.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error searching ticket:', error);
      setSearchResult(null);
      setIsModalOpen(false);
      toast({
        title: "Error",
        description: "Gagal mencari tiket. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async () => {
    handleSearchWithQuery(searchQuery);
  };

  const handleQRScan = () => {
    alert('Fitur QR Scanner akan segera tersedia!');
  };

  const handleViewDetail = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="glass-card dark:glass-card light:glass-card-light border-blue-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold orbitron bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tracking Tiket
          </CardTitle>
          <CardDescription className="text-lg">
            Lacak status permintaan maintenance Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            onQRScan={handleQRScan}
            isSearching={isSearching}
          />
          
          <InfoCards />
        </CardContent>
      </Card>

      {/* Search Results - Show card summary when ticket found */}
      {searchResult && (
        <SearchResult 
          searchResult={searchResult} 
          onViewDetail={handleViewDetail}
        />
      )}
      
      {searchQuery && !searchResult && !isSearching && (
        <Card className="glass-card border-red-500/30">
          <CardContent className="p-6 text-center">
            <p className="text-red-400">Tiket tidak ditemukan. Periksa kembali nomor tiket atau kata kunci pencarian.</p>
          </CardContent>
        </Card>
      )}

      {/* Ticket Detail Modal - Show detailed information with all data */}
      {searchResult && (
        <TicketDetailModal
          ticket={searchResult}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TrackingForm;
