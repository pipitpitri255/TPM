
import { Card, CardContent } from '@/components/ui/card';
import { FileText, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    { title: 'Total Tiket', value: '1,234', change: '+12%', icon: FileText, color: 'blue' },
    { title: 'Tiket Aktif', value: '89', change: '+5%', icon: AlertTriangle, color: 'orange' },
    { title: 'Selesai Hari Ini', value: '23', change: '+18%', icon: CheckCircle, color: 'green' },
    { title: 'Rata-rata Waktu', value: '4.2h', change: '-8%', icon: TrendingUp, color: 'purple' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card border-white/20 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm text-${stat.color}-400`}>{stat.change}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
