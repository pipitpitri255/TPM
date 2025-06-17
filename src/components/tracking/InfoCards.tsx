
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, Search, QrCode } from 'lucide-react';

const InfoCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="glass-card border-blue-500/30">
        <CardContent className="p-4 text-center">
          <Ticket className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <p className="text-sm font-semibold text-blue-400">Format Nomor Tiket</p>
          <p className="text-xs text-muted-foreground">TPM-YYYYMMDD-XXXX</p>
        </CardContent>
      </Card>
      
      <Card className="glass-card border-purple-500/30">
        <CardContent className="p-4 text-center">
          <Search className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <p className="text-sm font-semibold text-purple-400">Pencarian Kata Kunci</p>
          <p className="text-xs text-muted-foreground">Berdasarkan deskripsi masalah</p>
        </CardContent>
      </Card>
      
      <Card className="glass-card border-cyan-500/30">
        <CardContent className="p-4 text-center">
          <QrCode className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
          <p className="text-sm font-semibold text-cyan-400">QR Scanner</p>
          <p className="text-xs text-muted-foreground">Akses mobile cepat</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCards;
