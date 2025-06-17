
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileUpload = ({ uploadedFiles, setUploadedFiles }: FileUploadProps) => {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        toast({
          title: "Format file tidak didukung",
          description: "Hanya file gambar (JPG, PNG, GIF) yang diperbolehkan.",
          variant: "destructive"
        });
        return false;
      }
      
      if (!isValidSize) {
        toast({
          title: "File terlalu besar",
          description: "Ukuran file maksimal 10MB.",
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });

    if (uploadedFiles.length + validFiles.length > 5) {
      toast({
        title: "Batas upload tercapai",
        description: "Maksimal 5 file gambar yang dapat diupload.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="file-upload" className="text-sm font-semibold">Upload Foto ({uploadedFiles.length}/5)</Label>
      <div className="border-2 border-dashed bg-white border-blue-300 dark:bg-[hsl(222_47%_11%)] dark:border-white/50 rounded-xl p-6 text-center hover:border-blue-500/50 dark:hover:border-white/75 transition-colors">
        <input
          type="file"
          id="file-upload"
          name="files"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 mx-auto mb-2 text-white dark:text-white" />
          <p className="text-sm text-gray-800 dark:text-white">
            Klik untuk upload gambar (Max 5 files, 10MB per file)
          </p>
          <p className="text-xs text-gray-800 dark:text-white mt-1">
            Format: JPG, PNG, GIF
          </p>
        </label>
      </div>
      
      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <div className="glass-card p-2 rounded-lg">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {file.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
