
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, QrCode } from 'lucide-react';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  onQRScan: () => void;
  isSearching: boolean;
}

const SearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  onQRScan, 
  isSearching 
}: SearchSectionProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Input
          id="search-input"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Masukkan nomor tiket atau cari berdasarkan kata kunci"
          className="input-futuristic text-lg py-6"
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onSearch}
          disabled={isSearching}
          className="btn-primary px-8 py-6"
        >
          <Search className="w-5 h-5 mr-2" />
          {isSearching ? 'Mencari...' : 'Cari'}
        </Button>
        <Button
          onClick={onQRScan}
          variant="outline"
          className="glass-card border-white/20 hover:border-blue-500/50 px-8 py-6"
        >
          <QrCode className="w-5 h-5 mr-2" />
          Pindai QR
        </Button>
      </div>
    </div>
  );
};

export default SearchSection;
