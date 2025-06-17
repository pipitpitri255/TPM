
import { ReactNode } from 'react';

interface RequestTypeCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  color: string;
}

const RequestTypeCard = ({ title, description, icon, isSelected, onClick, color }: RequestTypeCardProps) => {
  const colorClasses = {
    blue: {
      ring: 'ring-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      gradient: 'from-blue-500/5',
      iconBg: 'from-blue-500 to-blue-600',
      indicator: 'bg-blue-500'
    },
    purple: {
      ring: 'ring-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      gradient: 'from-purple-500/5',
      iconBg: 'from-purple-500 to-purple-600',
      indicator: 'bg-purple-500'
    },
    green: {
      ring: 'ring-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      gradient: 'from-green-500/5',
      iconBg: 'from-green-500 to-green-600',
      indicator: 'bg-green-500'
    },
    orange: {
      ring: 'ring-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      gradient: 'from-orange-500/5',
      iconBg: 'from-orange-500 to-orange-600',
      indicator: 'bg-orange-500'
    }
  };

  const currentColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div
      onClick={onClick}
      className={`glass-card dark:glass-card light:glass-card-light p-4 card-hover relative overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected
          ? `ring-2 ${currentColor.ring} ${currentColor.bg} ${currentColor.border}`
          : 'hover:border-white/30'
      }`}
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentColor.gradient} to-transparent opacity-0 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
      
      <div className="relative z-10 flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${currentColor.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold mb-1 text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
        
        {/* Selection indicator */}
        {isSelected && (
          <div className={`w-5 h-5 ${currentColor.indicator} rounded-full flex items-center justify-center flex-shrink-0`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestTypeCard;
