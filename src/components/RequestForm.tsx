
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Settings, Wrench, Package, HeadphonesIcon } from 'lucide-react';
import RequestTypeCard from './RequestTypeCard';
import BasicInfoFields from './form/BasicInfoFields';
import DepartmentFields from './form/DepartmentFields';
import FileUpload from './form/FileUpload';
import PrioritySelector from './form/PrioritySelector';
import QRCodeModal from './QRCodeModal';
import { useToast } from '@/hooks/use-toast';
import { requestTypes } from '@/constants/formData';
import { FormData } from '@/types/form';

const RequestForm = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedLineArea, setSelectedLineArea] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    title: '',
    description: ''
  });
  const [showQRModal, setShowQRModal] = useState(false);
  const [generatedTicketNumber, setGeneratedTicketNumber] = useState('');

  const getIconComponent = (iconName: string) => {
    const iconProps = { className: "w-6 h-6 text-white" };
    switch (iconName) {
      case 'Settings':
        return <Settings {...iconProps} />;
      case 'Wrench':
        return <Wrench {...iconProps} />;
      case 'Package':
        return <Package {...iconProps} />;
      case 'HeadphonesIcon':
        return <HeadphonesIcon {...iconProps} />;
      default:
        return <Settings {...iconProps} />;
    }
  };

  const generateTicketNumber = () => {
    const now = new Date();
    const dateString = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNumber = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `TPM-${dateString}-${randomNumber}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !formData.name || !selectedDepartment) {
      toast({
        title: "Form tidak lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi.",
        variant: "destructive"
      });
      return;
    }

    // Generate ticket number
    const ticketNumber = generateTicketNumber();
    setGeneratedTicketNumber(ticketNumber);
    
    // Show QR modal
    setShowQRModal(true);

    // Reset form
    setSelectedType('');
    setSelectedDepartment('');
    setSelectedLineArea('');
    setSelectedPriority('');
    setUploadedFiles([]);
    setFormData({ name: '', contact: '', title: '', description: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="glass-card dark:glass-card light:glass-card-light p-6 animate-fade-in">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold orbitron mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ajukan Permintaan Pemeliharaan
          </h3>
          <p className="text-muted-foreground text-sm">
            Lengkapi formulir di bawah untuk meminta bantuan TPM
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type Selection */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-base font-semibold">Jenis Permintaan *</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {requestTypes.map((type) => (
                <RequestTypeCard
                  key={type.id}
                  title={type.title}
                  description={type.description}
                  icon={getIconComponent(type.iconName)}
                  isSelected={selectedType === type.id}
                  onClick={() => setSelectedType(type.id)}
                  color={type.color}
                />
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <BasicInfoFields formData={formData} setFormData={setFormData} />

          {/* Department and Line/Area */}
          <DepartmentFields
            selectedDepartment={selectedDepartment}
            selectedLineArea={selectedLineArea}
            setSelectedDepartment={setSelectedDepartment}
            setSelectedLineArea={setSelectedLineArea}
          />

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title-input" className="text-sm font-semibold">Judul Masalah</Label>
            <Input
              id="title-input"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="input-futuristic"
              placeholder="Ringkasan singkat masalah yang dihadapi"
            />
          </div>

          {/* File Upload */}
          <FileUpload uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description-input" className="text-sm font-semibold">Deskripsi Kondisi Saat Ini</Label>
            <Textarea
              id="description-input"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-futuristic min-h-[100px]"
              placeholder="Jelaskan kondisi masalah secara detail, termasuk gejala yang terjadi dan dampak pada operasional"
            />
          </div>

          {/* Priority Level */}
          <PrioritySelector
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button type="submit" className="btn-primary text-base px-8 py-3">
              Ajukan Permintaan Tiket Job TPM
            </Button>
          </div>
        </form>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        ticketNumber={generatedTicketNumber}
      />
    </div>
  );
};

export default RequestForm;
