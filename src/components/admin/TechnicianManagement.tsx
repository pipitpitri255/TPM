import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Technician {
  id: string;
  name: string;
  phone: string;
  email?: string;
  is_active?: boolean;
}

interface TechnicianManagementProps {
  technicians: Technician[];
  setTechnicians: React.Dispatch<React.SetStateAction<Technician[]>>;
}

const TechnicianManagement = ({ technicians, setTechnicians }: TechnicianManagementProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState<Technician | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTechnician) {
        // Update existing technician
        const { error } = await supabase
          .from('technicians')
          .update({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingTechnician.id);

        if (error) throw error;

        setTechnicians(prev => prev.map(tech => 
          tech.id === editingTechnician.id 
            ? { ...tech, name: formData.name, phone: formData.phone, email: formData.email }
            : tech
        ));

        toast({
          title: "Berhasil",
          description: "Teknisi berhasil diupdate"
        });
      } else {
        // Create new technician
        const { data, error } = await supabase
          .from('technicians')
          .insert({
            name: formData.name,
            phone: formData.phone,
            email: formData.email
          })
          .select()
          .single();

        if (error) throw error;

        setTechnicians(prev => [...prev, data]);

        toast({
          title: "Berhasil",
          description: "Teknisi berhasil ditambahkan"
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving technician:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan teknisi",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (technician: Technician) => {
    setEditingTechnician(technician);
    setFormData({
      name: technician.name,
      phone: technician.phone,
      email: technician.email || ''
    });
    setIsDialogOpen(true);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('technicians')
        .update({
          is_active: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setTechnicians(prev => prev.map(tech => 
        tech.id === id ? { ...tech, is_active: !currentStatus } : tech
      ));

      toast({
        title: "Berhasil",
        description: `Status teknisi berhasil ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`
      });
    } catch (error) {
      console.error('Error toggling technician status:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status teknisi",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('technicians')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTechnicians(prev => prev.filter(tech => tech.id !== id));
      
      toast({
        title: "Berhasil",
        description: "Teknisi berhasil dihapus"
      });
    } catch (error) {
      console.error('Error deleting technician:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus teknisi",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '' });
    setEditingTechnician(null);
    setIsDialogOpen(false);
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manajemen Teknisi</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary" onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Teknisi
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-white/20">
              <DialogHeader>
                <DialogTitle>
                  {editingTechnician ? 'Edit Teknisi' : 'Tambah Teknisi Baru'}
                </DialogTitle>
                <DialogDescription>
                  {editingTechnician ? 'Update informasi teknisi' : 'Tambahkan teknisi baru ke sistem'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Teknisi</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-futuristic"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="input-futuristic"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (Opsional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-futuristic"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit" className="btn-primary">
                    {editingTechnician ? 'Update' : 'Simpan'}
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
              <TableHead>Nama</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {technicians.map((technician) => (
              <TableRow key={technician.id}>
                <TableCell className="font-medium">{technician.name}</TableCell>
                <TableCell>{technician.phone}</TableCell>
                <TableCell>{technician.email || '-'}</TableCell>
                <TableCell>
                  <Badge 
                    className={technician.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                    onClick={() => handleToggleActive(technician.id, technician.is_active || false)}
                  >
                    {technician.is_active ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(technician)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(technician.id)}>
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

export default TechnicianManagement;