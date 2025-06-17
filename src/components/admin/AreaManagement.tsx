import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Area {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  departmentName: string;
}

interface Department {
  id: string;
  name: string;
}

interface AreaManagementProps {
  areas: Area[];
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
  departments: Department[];
}

const AreaManagement = ({ areas, setAreas, departments }: AreaManagementProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<Area | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    departmentId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingArea) {
        // Update existing area
        const { error } = await supabase
          .from('areas')
          .update({
            name: formData.name,
            code: formData.code,
            department_id: formData.departmentId,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingArea.id);

        if (error) throw error;

        const departmentName = departments.find(d => d.id === formData.departmentId)?.name || '';
        
        setAreas(prev => prev.map(area => 
          area.id === editingArea.id 
            ? { 
                ...area, 
                name: formData.name, 
                code: formData.code, 
                departmentId: formData.departmentId,
                departmentName
              }
            : area
        ));

        toast({
          title: "Berhasil",
          description: "Area berhasil diupdate"
        });
      } else {
        // Create new area
        const { data, error } = await supabase
          .from('areas')
          .insert({
            name: formData.name,
            code: formData.code,
            department_id: formData.departmentId
          })
          .select()
          .single();

        if (error) throw error;

        const departmentName = departments.find(d => d.id === formData.departmentId)?.name || '';
        
        setAreas(prev => [...prev, {
          id: data.id,
          name: data.name,
          code: data.code,
          departmentId: data.department_id,
          departmentName
        }]);

        toast({
          title: "Berhasil",
          description: "Area berhasil ditambahkan"
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving area:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan area",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (area: Area) => {
    setEditingArea(area);
    setFormData({
      name: area.name,
      code: area.code,
      departmentId: area.departmentId
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('areas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAreas(prev => prev.filter(area => area.id !== id));
      
      toast({
        title: "Berhasil",
        description: "Area berhasil dihapus"
      });
    } catch (error) {
      console.error('Error deleting area:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus area",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', code: '', departmentId: '' });
    setEditingArea(null);
    setIsDialogOpen(false);
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manajemen Line/Area</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary" onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Area
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-white/20">
              <DialogHeader>
                <DialogTitle>
                  {editingArea ? 'Edit Area' : 'Tambah Area Baru'}
                </DialogTitle>
                <DialogDescription>
                  {editingArea ? 'Update informasi area' : 'Tambahkan area baru ke sistem'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Area</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-futuristic"
                  />
                </div>
                <div>
                  <Label htmlFor="code">Kode Area</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                    className="input-futuristic"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Departemen</Label>
                  <Select 
                    value={formData.departmentId} 
                    onValueChange={(value) => setFormData({ ...formData, departmentId: value })}
                  >
                    <SelectTrigger className="input-futuristic">
                      <SelectValue placeholder="Pilih departemen" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit" className="btn-primary">
                    {editingArea ? 'Update' : 'Simpan'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Area</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead>Departemen</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.id}>
                <TableCell className="font-medium">{area.name}</TableCell>
                <TableCell>{area.code}</TableCell>
                <TableCell>{area.departmentName}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(area)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(area.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AreaManagement;