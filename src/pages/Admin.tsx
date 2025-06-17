
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, BarChart3, Settings, FileText, Database, Users, Wrench, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import Background3D from '@/components/Background3D';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import DashboardTab from '@/components/admin/DashboardTab';
import TicketManagementTab from '@/components/admin/TicketManagementTab';
import MasterDataTab from '@/components/admin/MasterDataTab';
import ReportsTab from '@/components/admin/ReportsTab';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tickets' | 'masters' | 'reports'>('dashboard');

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigateToTab = (tab: string) => {
    setActiveTab(tab as 'dashboard' | 'tickets' | 'masters' | 'reports');
  };

  const handleFilterPriorityTickets = () => {
    // This function will be used to filter priority tickets in the ticket management tab
    console.log('Filtering priority tickets');
  };

  return (
    <div className="min-h-screen relative overflow-hidden cyber-grid">
      <Background3D />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="glass-card dark:glass-card light:glass-card-light mx-4 mt-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold orbitron">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">TPM Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button onClick={handleLogout} variant="outline" className="glass-card border-white/20">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center my-8">
          <div className="glass-card dark:glass-card light:glass-card-light p-2 rounded-2xl">
            <div className="flex space-x-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'tickets', label: 'Manajemen Tiket', icon: FileText },
                { id: 'masters', label: 'Input Master', icon: Database },
                { id: 'reports', label: 'Report', icon: TrendingUp }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-semibold">{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          {activeTab === 'dashboard' && (
            <DashboardTab 
              onNavigateToTab={handleNavigateToTab}
              onFilterPriorityTickets={handleFilterPriorityTickets}
            />
          )}
          {activeTab === 'tickets' && <TicketManagementTab />}
          {activeTab === 'masters' && <MasterDataTab />}
          {activeTab === 'reports' && <ReportsTab />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
