import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Download, FileText, Calendar as CalendarIcon, TrendingUp, Clock, Target } from 'lucide-react';
import { format as formatDate } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ReportsTab = () => {
  const { toast } = useToast();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reportType, setReportType] = useState('summary');
  const [department, setDepartment] = useState('all');

  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', total: 65, resolved: 58, avgTime: 4.2 },
    { month: 'Feb', total: 78, resolved: 71, avgTime: 3.8 },
    { month: 'Mar', total: 90, resolved: 85, avgTime: 4.1 },
    { month: 'Apr', total: 81, resolved: 77, avgTime: 3.9 },
    { month: 'May', total: 95, resolved: 89, avgTime: 4.5 },
    { month: 'Jun', total: 102, resolved: 96, avgTime: 3.7 }
  ];

  const departmentData = [
    { name: 'PRODUKSI SECTION 1', value: 35, color: '#3b82f6' },
    { name: 'PRODUKSI SECTION 2', value: 28, color: '#10b981' },
    { name: 'MAINTENANCE', value: 20, color: '#f59e0b' },
    { name: 'QUALITY', value: 12, color: '#8b5cf6' },
    { name: 'ENGINEERING', value: 5, color: '#ef4444' }
  ];

  const priorityTrendData = [
    { week: 'W1', high: 12, medium: 25, low: 18 },
    { week: 'W2', high: 15, medium: 22, low: 20 },
    { week: 'W3', high: 8, medium: 28, low: 16 },
    { week: 'W4', high: 18, medium: 30, low: 22 }
  ];

  const exportReport = (format: string) => {
    console.log(`Exporting report in ${format} format for type: ${reportType}`);
    
    // Different data based on report type
    let reportData: any = {};
    let filename = '';

    switch (reportType) {
      case 'summary':
        reportData = {
          title: 'Summary Report',
          monthlyData,
          departmentData
        };
        filename = `summary_report_${new Date().toISOString().split('T')[0]}`;
        break;
      case 'detailed':
        reportData = {
          title: 'Detailed Analysis',
          priorityTrendData,
          monthlyData
        };
        filename = `detailed_analysis_${new Date().toISOString().split('T')[0]}`;
        break;
      case 'performance':
        reportData = {
          title: 'Performance Report',
          avgResponseTime: 2.3,
          resolutionRate: 94.2,
          monthlyData
        };
        filename = `performance_report_${new Date().toISOString().split('T')[0]}`;
        break;
      case 'trend':
        reportData = {
          title: 'Trend Analysis',
          priorityTrendData,
          monthlyTrend: monthlyData
        };
        filename = `trend_analysis_${new Date().toISOString().split('T')[0]}`;
        break;
      default:
        reportData = { title: 'General Report' };
        filename = `general_report_${new Date().toISOString().split('T')[0]}`;
    }

    // Create export simulation based on format
    if (format === 'excel' || format === 'csv') {
      let csvContent = "data:text/csv;charset=utf-8,";
      
      if (reportType === 'summary') {
        csvContent += "Month,Total Tickets,Resolved Tickets,Avg Time\n";
        csvContent += monthlyData.map(row => `${row.month},${row.total},${row.resolved},${row.avgTime}`).join("\n");
      } else if (reportType === 'detailed') {
        csvContent += "Week,High Priority,Medium Priority,Low Priority\n";
        csvContent += priorityTrendData.map(row => `${row.week},${row.high},${row.medium},${row.low}`).join("\n");
      } else {
        csvContent += "Department,Tickets\n";
        csvContent += departmentData.map(row => `${row.name},${row.value}`).join("\n");
      }
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${filename}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({ 
        title: "Sukses", 
        description: `Laporan ${reportType} berhasil diunduh dalam format ${format.toUpperCase()}` 
      });
    } else if (format === 'pdf') {
      // Simulate PDF generation
      const pdfContent = `${reportData.title}\n\nDate Range: ${dateFrom ? formatDate(dateFrom, 'PPP') : 'N/A'} - ${dateTo ? formatDate(dateTo, 'PPP') : 'N/A'}\nDepartment: ${department}\n\nData exported successfully.`;
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({ 
        title: "Sukses", 
        description: `Laporan ${reportType} berhasil diunduh dalam format PDF` 
      });
    }
  };

  const generateReport = () => {
    console.log(`Generating ${reportType} report`);
    
    let reportTitle = '';
    switch (reportType) {
      case 'summary':
        reportTitle = 'Summary Report';
        break;
      case 'detailed':
        reportTitle = 'Detailed Analysis';
        break;
      case 'performance':
        reportTitle = 'Performance Report';
        break;
      case 'trend':
        reportTitle = 'Trend Analysis';
        break;
      default:
        reportTitle = 'General Report';
    }
    
    toast({ 
      title: "Sukses", 
      description: `${reportTitle} berhasil digenerate` 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <p className="text-muted-foreground">Generate laporan dan analisis performa TPM</p>
      </div>

      {/* Report Generator */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Generator Laporan</span>
          </CardTitle>
          <CardDescription>Kustomisasi laporan berdasarkan periode dan filter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <Label>Jenis Laporan</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="input-futuristic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="detailed">Detailed Analysis</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="trend">Trend Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Departemen</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="input-futuristic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Departemen</SelectItem>
                  <SelectItem value="prod1">PRODUKSI SECTION 1</SelectItem>
                  <SelectItem value="prod2">PRODUKSI SECTION 2</SelectItem>
                  <SelectItem value="maintenance">MAINTENANCE</SelectItem>
                  <SelectItem value="quality">QUALITY</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tanggal Mulai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal input-futuristic",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? formatDate(dateFrom, "PPP") : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 glass-card border-white/20">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Tanggal Akhir</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal input-futuristic",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? formatDate(dateTo, "PPP") : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 glass-card border-white/20">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="btn-primary" onClick={generateReport}>
              Generate Report
            </Button>
            <Button variant="outline" onClick={() => exportReport('excel')} className="glass-card border-white/20">
              <Download className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" onClick={() => exportReport('pdf')} className="glass-card border-white/20">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" onClick={() => exportReport('csv')} className="glass-card border-white/20">
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Ringkasan Statistik</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Tiket Bulan Ini</h3>
              <p className="text-3xl font-bold text-blue-400">102</p>
              <p className="text-sm text-muted-foreground">+15% dari bulan lalu</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Rata-rata Waktu Penyelesaian</h3>
              <p className="text-3xl font-bold text-green-400">3.7h</p>
              <p className="text-sm text-muted-foreground">-12% dari target</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-lg font-semibold">Response Time</span>
              </div>
              <p className="text-3xl font-bold text-blue-400">2.3h</p>
              <p className="text-sm text-muted-foreground">Target: 2.0h</p>
              <div className="w-full bg-muted/20 rounded-full h-2 mt-2">
                <div className="h-2 rounded-full bg-orange-500" style={{ width: '115%' }} />
              </div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-lg font-semibold">Resolution Rate</span>
              </div>
              <p className="text-3xl font-bold text-green-400">94.2%</p>
              <p className="text-sm text-muted-foreground">Target: 95.0%</p>
              <div className="w-full bg-muted/20 rounded-full h-2 mt-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: '94%' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle>Trend Bulanan</CardTitle>
            <CardDescription>Total tiket vs resolved per bulan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="resolved" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle>Distribusi per Departemen</CardTitle>
            <CardDescription>Jumlah tiket berdasarkan departemen</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Priority Trend */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle>Trend Prioritas</CardTitle>
            <CardDescription>Distribusi prioritas tiket per minggu</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="high" stackId="a" fill="#ef4444" />
                <Bar dataKey="medium" stackId="a" fill="#f59e0b" />
                <Bar dataKey="low" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle>Waktu Respons</CardTitle>
            <CardDescription>Rata-rata waktu respons per bulan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsTab;