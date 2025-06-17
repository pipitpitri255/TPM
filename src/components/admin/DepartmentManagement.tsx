import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Department {
  id: string;
  name: string;
  description: string;
}

interface DepartmentManagementProps {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

const DepartmentManagement = ({ departments, setDepartments }: DepartmentManagementProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingDepartment) {
        // Update existing department
        const { error } = await supabase
          .from('departments')
          .update({
            name: formData.name,
            description: formData.description,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingDepartment.id);

        if (error) throw error;

        setDepartments(prev => prev.map(dept => 
          dept.id === editingDepartment.id 
            ? { ...dept, name: formData.name, description: formData.description }
            : dept
        ));

        toast({
          title: "Berhasil",
          description: "Departemen berhasil diupdate"
        });
      } else {
        // Create new department
        const { data, error } = await supabase
          .from('departments')
          .insert({
            name: formData.name,
            description: formData.description
          })
          .select()
          .single();

        if (error) throw error;

        setDepartments(prev => [...prev, data]);

        toast({
          title: "Berhasil",
          description: "Departemen berhasil ditambahkan"
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving department:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan departemen",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      description: department.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('departments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDepartments(prev => prev.filter(dept => dept.id !== id));
      
      toast({
        title: "Berhasil",
        description: "Departemen berhasil dihapus"
      });
    } catch (error) {
      console.error('Error deleting department:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus departemen",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingDepartment(null);
    setIsDialogOpen(false);
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manajemen Departemen</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary" onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Departemen
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-white/20">
              <DialogHeader>
                <DialogTitle>
                  {editingDepartment ? 'Edit Departemen' : 'Tambah Departemen Baru'}
                </DialogTitle>
                <DialogDescription>
                  {editingDepartment ? 'Update informasi departemen' : 'Tambahkan departemen baru ke sistem'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Departemen</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-futuristic"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-futuristic"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit" className="btn-primary">
                    {editingDepartment ? 'Update' : 'Simpan'}
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
              <TableHead>Nama Departemen</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>{department.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(department)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(department.id)}>
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

export default DepartmentManagement;