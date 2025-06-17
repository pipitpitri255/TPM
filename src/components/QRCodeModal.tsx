
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Copy, CheckCircle, Search } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketNumber: string;
}

const QRCodeModal = ({ isOpen, onClose, ticketNumber }: QRCodeModalProps) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ticketNumber) {
      generateQRCode();
    }
  }, [ticketNumber]);

  const generateQRCode = () => {
    // Create a simple QR code using canvas without external library
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 300;
    canvas.width = size;
    canvas.height = size;

    // Fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // Create a simple pattern representing QR code
    ctx.fillStyle = '#000000';
    const cellSize = size / 25;
    
    // Create a mock QR pattern based on ticket number
    const pattern = ticketNumber.split('').map((char, index) => 
      char.charCodeAt(0) + index
    );

    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const shouldFill = (pattern[i % pattern.length] + pattern[j % pattern.length]) % 3 === 0;
        if (shouldFill) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }

    // Add corner markers
    const markerSize = cellSize * 7;
    
    // Top-left corner
    ctx.fillRect(0, 0, markerSize, markerSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(cellSize, cellSize, markerSize - 2 * cellSize, markerSize - 2 * cellSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(2 * cellSize, 2 * cellSize, markerSize - 4 * cellSize, markerSize - 4 * cellSize);

    // Top-right corner
    ctx.fillStyle = '#000000';
    ctx.fillRect(size - markerSize, 0, markerSize, markerSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(size - markerSize + cellSize, cellSize, markerSize - 2 * cellSize, markerSize - 2 * cellSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(size - markerSize + 2 * cellSize, 2 * cellSize, markerSize - 4 * cellSize, markerSize - 4 * cellSize);

    // Bottom-left corner
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, size - markerSize, markerSize, markerSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(cellSize, size - markerSize + cellSize, markerSize - 2 * cellSize, markerSize - 2 * cellSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(2 * cellSize, size - markerSize + 2 * cellSize, markerSize - 4 * cellSize, markerSize - 4 * cellSize);

    setQrCodeDataUrl(canvas.toDataURL());
  };

  const handleCopyTicketNumber = async () => {
    try {
      await navigator.clipboard.writeText(ticketNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy ticket number:', error);
    }
  };

  const handleDownloadQR = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `ticket-${ticketNumber}.png`;
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  const handleTrackTicket = () => {
    // Close modal and trigger track functionality
    onClose();
    // You can emit an event or call a callback to switch to track tab
    window.dispatchEvent(new CustomEvent('trackTicket', { detail: { ticketNumber } }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold orbitron bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Tiket Berhasil Dibuat!
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Simpan QR code dan nomor tiket untuk tracking
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Ticket Number */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Nomor Tiket:</p>
            <div className="flex items-center justify-center space-x-2">
              <code className="bg-muted px-3 py-2 rounded text-lg font-mono font-bold">
                {ticketNumber}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyTicketNumber}
                className="h-8 w-8"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-green-500">Nomor tiket berhasil disalin!</p>
            )}
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            {qrCodeDataUrl && (
              <div className="bg-white p-4 rounded-lg">
                <img 
                  src={qrCodeDataUrl} 
                  alt={`QR Code for ticket ${ticketNumber}`}
                  className="w-64 h-64"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-3">
              <Button 
                onClick={handleDownloadQR}
                className="flex-1"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR
              </Button>
              <Button 
                onClick={handleTrackTicket}
                className="flex-1"
                variant="outline"
              >
                <Search className="w-4 h-4 mr-2" />
                Lacak Tiket
              </Button>
            </div>
            <Button 
              onClick={onClose}
              className="w-full btn-primary"
            >
              Selesai
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
