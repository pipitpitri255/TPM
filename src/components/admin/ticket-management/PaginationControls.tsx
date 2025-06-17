
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Halaman {currentPage} dari {totalPages}
      </p>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="glass-card border-white/20"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="glass-card border-white/20"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
