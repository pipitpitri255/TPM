import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

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
  const [departments, setDepartments] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      fetchAreas(selectedDepartment);
    } else {
      setAreas([]);
    }
  }, [selectedDepartment]);

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAreas = async (departmentName: string) => {
    try {
      const { data, error } = await supabase
        .from('areas')
        .select(`
          *,
          departments!inner(name)
        `)
        .eq('departments.name', departmentName)
        .order('name');
      
      if (error) throw error;
      setAreas(data || []);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setAreas([]);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="department-select" className="text-sm font-semibold">Departemen *</Label>
        <Select 
          name="department" 
          value={selectedDepartment} 
          onValueChange={(value) => {
            setSelectedDepartment(value);
            setSelectedLineArea('');
          }}
          disabled={loading}
        >
          <SelectTrigger id="department-select" className="input-futuristic">
            <SelectValue placeholder={loading ? "Loading..." : "Pilih departemen"} />
          </SelectTrigger>
          <SelectContent className="glass-card border-white/20">
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="line-area-select" className="text-sm font-semibold">Line/Area</Label>
        <Select 
          name="lineArea" 
          value={selectedLineArea} 
          onValueChange={setSelectedLineArea} 
          disabled={!selectedDepartment || areas.length === 0}
        >
          <SelectTrigger id="line-area-select" className="input-futuristic">
            <SelectValue placeholder={
              !selectedDepartment 
                ? "Pilih departemen dulu" 
                : areas.length === 0 
                  ? "Tidak ada area tersedia" 
                  : "Pilih line/area"
            } />
          </SelectTrigger>
          <SelectContent className="glass-card border-white/20">
            {areas.map((area) => (
              <SelectItem key={area.id} value={area.name}>{area.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DepartmentFields;