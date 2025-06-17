
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { departments, lineAreaData } from '@/constants/formData';

interface DepartmentFieldsProps {
  selectedDepartment: string;
  selectedLineArea: string;
  setSelectedDepartment: (value: string) => void;
  setSelectedLineArea: (value: string) => void;
}

const DepartmentFields = ({ 
  selectedDepartment, 
  selectedLineArea, 
  setSelectedDepartment, 
  setSelectedLineArea 
}: DepartmentFieldsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="department-select" className="text-sm font-semibold">Departemen *</Label>
        <Select name="department" value={selectedDepartment} onValueChange={(value) => {
          setSelectedDepartment(value);
          setSelectedLineArea('');
        }}>
          <SelectTrigger id="department-select" className="input-futuristic">
            <SelectValue placeholder="Pilih departemen" />
          </SelectTrigger>
          <SelectContent className="glass-card border-white/20">
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="line-area-select" className="text-sm font-semibold">Line/Area *</Label>
        <Select name="lineArea" value={selectedLineArea} onValueChange={setSelectedLineArea} disabled={!selectedDepartment}>
          <SelectTrigger id="line-area-select" className="input-futuristic">
            <SelectValue placeholder="Pilih line/area" />
          </SelectTrigger>
          <SelectContent className="glass-card border-white/20">
            {selectedDepartment && lineAreaData[selectedDepartment]?.map((area) => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DepartmentFields;
