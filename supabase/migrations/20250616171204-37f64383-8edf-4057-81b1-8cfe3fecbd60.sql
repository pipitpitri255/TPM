
-- Create departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create areas table
CREATE TABLE public.areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create technicians table
CREATE TABLE public.technicians (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  requester_name TEXT NOT NULL,
  requester_phone TEXT,
  department_id UUID REFERENCES public.departments(id),
  area_id UUID REFERENCES public.areas(id),
  priority TEXT CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
  status TEXT CHECK (status IN ('Open', 'In Progress', 'Menunggu Material', 'Closed', 'Reject')) DEFAULT 'Open',
  assigned_technician_id UUID REFERENCES public.technicians(id),
  before_photos TEXT[],
  after_photos TEXT[],
  admin_notes TEXT,
  after_description TEXT,
  requester_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample departments
INSERT INTO public.departments (name, description) VALUES
('ACCOUNTING/FINANCE', 'Departemen Keuangan dan Akuntansi'),
('ENGINEERING', 'Departemen Teknik dan Pengembangan'),
('MAINTENANCE', 'Departemen Perawatan dan Perbaikan'),
('PRODUKSI SECTION 1', 'Departemen Produksi Seksi 1'),
('PRODUKSI SECTION 2', 'Departemen Produksi Seksi 2'),
('QUALITY', 'Departemen Quality Management');

-- Insert sample areas
INSERT INTO public.areas (name, code, department_id) VALUES
('Line Injection 1', 'INJ-1', (SELECT id FROM departments WHERE name = 'PRODUKSI SECTION 1')),
('Line Injection 2', 'INJ-2', (SELECT id FROM departments WHERE name = 'PRODUKSI SECTION 1')),
('Line Assembly A', 'ASM-A', (SELECT id FROM departments WHERE name = 'PRODUKSI SECTION 2')),
('Line Assembly B', 'ASM-B', (SELECT id FROM departments WHERE name = 'PRODUKSI SECTION 2')),
('Quality Lab', 'QC-LAB', (SELECT id FROM departments WHERE name = 'QUALITY')),
('Workshop', 'WS-01', (SELECT id FROM departments WHERE name = 'MAINTENANCE'));

-- Insert sample technicians
INSERT INTO public.technicians (name, phone, email) VALUES
('John Doe', '08123456789', 'john.doe@company.com'),
('Jane Smith', '08234567890', 'jane.smith@company.com'),
('Mike Johnson', '08345678901', 'mike.johnson@company.com'),
('Sarah Wilson', '08456789012', 'sarah.wilson@company.com');

-- Insert sample tickets
INSERT INTO public.tickets (id, title, description, requester_name, requester_phone, department_id, area_id, priority, status, assigned_technician_id) VALUES
('TPM-20241215-0001', 'Kerusakan Conveyor Belt', 'Conveyor belt line 3 mengalami kerusakan pada bagian motor penggerak', 'Ahmad Santoso', '08111234567', (SELECT id FROM departments WHERE name = 'PRODUKSI SECTION 1'), (SELECT id FROM areas WHERE code = 'INJ-1'), 'High', 'In Progress', (SELECT id FROM technicians WHERE name = 'John Doe')),
('TPM-20241215-0002', 'Permintaan Spare Part', 'Dibutuhkan bearing SKF 6205 untuk mesin packaging', 'Siti Nurhaliza', '08222345678', (SELECT id FROM departments WHERE name = 'MAINTENANCE'), (SELECT id FROM areas WHERE code = 'WS-01'), 'Medium', 'Open', NULL),
('TPM-20241215-0003', 'Maintenance Rutin', 'Jadwal maintenance rutin bulanan untuk mesin injection molding', 'Budi Pramono', '08333456789', (SELECT id FROM departments WHERE name = 'PRODUKSI SECTION 2'), (SELECT id FROM areas WHERE code = 'ASM-A'), 'Low', 'Menunggu Material', (SELECT id FROM technicians WHERE name = 'Jane Smith')),
('TPM-20241215-0004', 'Perbaikan Mesin Packaging', 'Mesin packaging mengalami error pada sensor weight checker', 'Dewi Kusuma', '08444567890', (SELECT id FROM departments WHERE name = 'QUALITY'), (SELECT id FROM areas WHERE code = 'QC-LAB'), 'High', 'Closed', (SELECT id FROM technicians WHERE name = 'Mike Johnson'));

-- Enable Row Level Security
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is an admin interface)
CREATE POLICY "Allow all operations on departments" ON public.departments FOR ALL USING (true);
CREATE POLICY "Allow all operations on areas" ON public.areas FOR ALL USING (true);
CREATE POLICY "Allow all operations on technicians" ON public.technicians FOR ALL USING (true);
CREATE POLICY "Allow all operations on tickets" ON public.tickets FOR ALL USING (true);
