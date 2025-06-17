
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { priorityLevels } from '@/constants/formData';
import { Priority } from '@/types/form';

interface PrioritySelectorProps {
  selectedPriority: string;
  setSelectedPriority: (value: string) => void;
}

const PrioritySelector = ({ selectedPriority, setSelectedPriority }: PrioritySelectorProps) => {
  const getBadgeClasses = (priority: Priority) => {
    const colorClasses = {
      green: 'text-green-400 border-green-400/50 bg-green-500/10',
      yellow: 'text-yellow-400 border-yellow-400/50 bg-yellow-500/10',
      orange: 'text-orange-400 border-orange-400/50 bg-orange-500/10',
      red: 'text-red-400 border-red-400/50 bg-red-500/10'
    };
    return colorClasses[priority.color] || '';
  };

  const getCardClasses = (priority: Priority, isSelected: boolean) => {
    const baseClasses = "cursor-pointer transition-all duration-300 hover:scale-[1.02]";
    
    if (isSelected) {
      const selectedClasses = {
        green: 'ring-2 ring-green-500 bg-green-500/10 border-green-500/30',
        yellow: 'ring-2 ring-yellow-500 bg-yellow-500/10 border-yellow-500/30',
        orange: 'ring-2 ring-orange-500 bg-orange-500/10 border-orange-500/30',
        red: 'ring-2 ring-red-500 bg-red-500/10 border-red-500/30'
      };
      return `${baseClasses} ${selectedClasses[priority.color] || 'ring-2 ring-blue-500 bg-blue-500/10 border-blue-500/30'}`;
    }
    
    return `${baseClasses} border-white/20 hover:border-white/40`;
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="priority-group" className="text-sm font-semibold">Level Prioritas</Label>
      <RadioGroup value={selectedPriority} onValueChange={setSelectedPriority} id="priority-group">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {priorityLevels.map((priority) => {
            const isSelected = selectedPriority === priority.id;
            
            return (
              <div key={priority.id}>
                <Card className={getCardClasses(priority, isSelected)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem 
                        value={priority.id} 
                        id={`priority-${priority.id}`}
                        className="border-white/50 text-white"
                      />
                      <label htmlFor={`priority-${priority.id}`} className="cursor-pointer flex items-center space-x-2">
                        <span className="text-2xl">{priority.emoji}</span>
                        <div className="flex-1">
                          <Badge 
                            variant="outline" 
                            className={getBadgeClasses(priority)}
                          >
                            {priority.label}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {priority.description}
                          </p>
                        </div>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};

export default PrioritySelector;
