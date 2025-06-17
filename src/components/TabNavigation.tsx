
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Search } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'request' | 'track';
  onTabChange: (tab: 'request' | 'track') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex justify-center mb-6 mt-6">
      <div className="glass-card dark:glass-card light:glass-card-light p-2 rounded-2xl">
        <div className="flex space-x-2">
          <Button
            onClick={() => onTabChange('request')}
            variant={activeTab === 'request' ? 'default' : 'ghost'}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'request'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="font-semibold">Ajukan Permintaan</span>
          </Button>
          
          <Button
            onClick={() => onTabChange('track')}
            variant={activeTab === 'track' ? 'default' : 'ghost'}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'track'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'hover:bg-white/10'
            }`}
          >
            <Search className="w-4 h-4" />
            <span className="font-semibold">Lacak Tiket</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
