
import { Cog, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-10 w-full">
      <div className="glass-card dark:glass-card light:glass-card-light mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center floating-gear">
                <Cog className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold orbitron bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SISTEM TPM
              </h1>
              <p className="text-sm text-muted-foreground">Total Productive Maintenance</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={() => navigate('/login')}
              className="btn-primary flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Panel</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
