
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendChart = () => {
  const chartData = [
    { name: 'Jan', tiket: 65, resolved: 58 },
    { name: 'Feb', tiket: 78, resolved: 71 },
    { name: 'Mar', tiket: 90, resolved: 85 },
    { name: 'Apr', tiket: 81, resolved: 77 },
    { name: 'May', tiket: 95, resolved: 89 },
    { name: 'Jun', tiket: 102, resolved: 96 }
  ];

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle>Trend Tiket Bulanan</CardTitle>
        <CardDescription>Perbandingan tiket masuk vs diselesaikan</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="tiket" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrendChart;
