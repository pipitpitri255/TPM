import StatsCards from './dashboard/StatsCards';
import TrendChart from './dashboard/TrendChart';
import StatusChart from './dashboard/StatusChart';
import TodayTickets from './dashboard/TodayTickets';
import QuickActions from './dashboard/QuickActions';

interface DashboardTabProps {
  onNavigateToTab: (tab: string) => void;
  onFilterPriorityTickets: () => void;
}

const DashboardTab = ({ onNavigateToTab, onFilterPriorityTickets }: DashboardTabProps) => {
  const handleCreateTicket = () => {
    // Navigate to main page for ticket creation
    window.location.href = '/';
  };

  const handleManageTechnicians = () => {
    onNavigateToTab('masters');
  };

  const handleViewReports = () => {
    onNavigateToTab('reports');
  };

  const handlePriorityTickets = () => {
    onNavigateToTab('tickets');
    onFilterPriorityTickets();
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart />
        <StatusChart />
      </div>

      {/* Today's Tickets & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TodayTickets />
        <QuickActions 
          onCreateTicket={handleCreateTicket}
          onManageTechnicians={handleManageTechnicians}
          onViewReports={handleViewReports}
          onPriorityTickets={handlePriorityTickets}
        />
      </div>
    </div>
  );
};

export default DashboardTab;