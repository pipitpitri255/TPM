
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, MapPin, Users } from 'lucide-react';
import DepartmentManagement from './DepartmentManagement';
import AreaManagement from './AreaManagement';
import TechnicianManagement from './TechnicianManagement';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const MasterDataTab = () => {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch departments
      const { data: deptData, error: deptError } = await supabase
        .from('departments')
        .select('*')
        .order('name');
      
      if (deptError) throw deptError;
      setDepartments(deptData || []);

      // Fetch areas with department names
      const { data: areaData, error: areaError } = await supabase
        .from('areas')
        .select(`
          *,
          departments(name)
        `)
        .order('name');
      
      if (areaError) throw areaError;
      
      const formattedAreas = (areaData || []).map(area => ({
        id: area.id,
        name: area.name,
        code: area.code,
        departmentId: area.department_id,
        departmentName: area.departments?.name || ''
      }));
      setAreas(formattedAreas);

      // Fetch technicians
      const { data: techData, error: techError } = await supabase
        .from('technicians')
        .select('*')
        .order('name');
      
      if (techError) throw techError;
      setTechnicians(techData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data master",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Master Data Management</h2>
        <p className="text-muted-foreground">Kelola data master departemen, area, dan teknisi</p>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments" className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <span>Departemen</span>
          </TabsTrigger>
          <TabsTrigger value="areas" className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Line/Area</span>
          </TabsTrigger>
          <TabsTrigger value="technicians" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Teknisi</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <DepartmentManagement 
            departments={departments} 
            setDepartments={setDepartments} 
          />
        </TabsContent>

        <TabsContent value="areas">
          <AreaManagement 
            areas={areas} 
            setAreas={setAreas} 
            departments={departments} 
          />
        </TabsContent>

        <TabsContent value="technicians">
          <TechnicianManagement 
            technicians={technicians} 
            setTechnicians={setTechnicians} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MasterDataTab;
