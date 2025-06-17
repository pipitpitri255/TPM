
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/form';

interface BasicInfoFieldsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BasicInfoFields = ({ formData, setFormData }: BasicInfoFieldsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name-input" className="text-sm font-semibold">Nama *</Label>
        <Input
          id="name-input"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input-futuristic"
          placeholder="Masukkan nama lengkap"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contact-input" className="text-sm font-semibold">Kontak</Label>
        <Input
          id="contact-input"
          name="contact"
          value={formData.contact}
          onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
          className="input-futuristic"
          placeholder="Email atau nomor telepon"
        />
      </div>
    </div>
  );
};

export default BasicInfoFields;
