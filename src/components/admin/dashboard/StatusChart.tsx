
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const StatusChart = () => {
  const statusData = [
    { name: 'Open', value: 25, color: '#3b82f6' },
    { name: 'In Progress', value: 35, color: '#f59e0b' },
    { name: 'Menunggu Material', value: 15, color: '#8b5cf6' },
    { name: 'Closed', value: 25, color: '#10b981' }
  ];

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle>Status Distribusi</CardTitle>
        <CardDescription>Distribusi status tiket saat ini</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatusChart;
