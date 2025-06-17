
import { Priority, RequestType } from '@/types/form';

export const departments = [
  'ACCOUNTING/FINANCE',
  'DEPARTEMEN LAINYA',
  'ENGINEERING',
  'FACTORY INNOVATION & TPM',
  'HRD&GA',
  'IT',
  'MAINTENANCE',
  'MARKETING',
  'PPIC & WAREHOUSE',
  'PRODUKSI SECTION 1',
  'PRODUKSI SECTION 2',
  'PRODUKSI SMT',
  'PURCHASE',
  'QMR',
  'QUALITY',
  'R&D',
  'SYSTEM'
];

export const lineAreaData: Record<string, string[]> = {
  'PRODUKSI SECTION 1': ['Line A1', 'Line A2', 'Line A3', 'QC Area A'],
  'PRODUKSI SECTION 2': ['Line B1', 'Line B2', 'Line B3', 'QC Area B'],
  'PRODUKSI SMT': ['SMT Line 1', 'SMT Line 2', 'SMT Line 3', 'SMT QC'],
  'MAINTENANCE': ['Workshop', 'Spare Parts', 'Tool Room', 'Utilities'],
  'QUALITY': ['QC Lab', 'QA Office', 'Inspection Area', 'Calibration Room'],
  'ENGINEERING': ['Design Office', 'Testing Lab', 'R&D Lab', 'Prototype Area'],
  'PPIC & WAREHOUSE': ['Raw Material', 'Finished Goods', 'WIP Storage', 'Shipping'],
  'IT': ['Server Room', 'Network Center', 'User Support', 'Development'],
  'FACTORY INNOVATION & TPM': ['TPM Office', 'Kaizen Center', 'Training Room', 'Analysis Center'],
  'PURCHASE': ['Procurement Office', 'Vendor Area', 'Receiving Dock', 'Inspection Area'],
  'ACCOUNTING/FINANCE': ['Finance Office', 'Accounting Dept', 'Treasury', 'Admin Office'],
  'HRD&GA': ['HR Office', 'Training Center', 'GA Office', 'Facilities'],
  'MARKETING': ['Marketing Office', 'Customer Service', 'Sales Office', 'Showroom'],
  'QMR': ['QMR Office', 'Document Control', 'Audit Room', 'Management Review'],
  'R&D': ['Research Lab', 'Development Center', 'Testing Facility', 'Innovation Hub'],
  'SYSTEM': ['System Office', 'Integration Center', 'Control Room', 'Monitoring Station'],
  'DEPARTEMEN LAINYA': ['Area Umum', 'Kantin', 'Parkir', 'Security Post']
};

export const requestTypes: RequestType[] = [
  {
    id: 'corrective',
    title: 'Tindakan Korektif',
    description: 'Perbaikan untuk mencegah masalah berulang',
    iconName: 'Settings',
    color: 'blue'
  },
  {
    id: 'repair',
    title: 'Perbaikan',
    description: 'Perbaikan kerusakan mesin atau peralatan',
    iconName: 'Wrench',
    color: 'purple'
  },
  {
    id: 'procurement',
    title: 'Pengadaan',
    description: 'Permintaan suku cadang atau material',
    iconName: 'Package',
    color: 'green'
  },
  {
    id: 'support',
    title: 'Dukungan',
    description: 'Bantuan teknis dan konsultasi',
    iconName: 'HeadphonesIcon',
    color: 'orange'
  }
];

export const priorityLevels: Priority[] = [
  { id: 'low', label: 'RENDAH', description: 'Tidak mengganggu produksi', color: 'green', emoji: '🟢' },
  { id: 'medium', label: 'SEDANG', description: 'Berpotensi mengganggu produksi', color: 'yellow', emoji: '🟡' },
  { id: 'high', label: 'TINGGI', description: 'Mengganggu produksi secara signifikan', color: 'orange', emoji: '🟠' },
  { id: 'critical', label: 'KRITIS', description: 'Menghentikan produksi', color: 'red', emoji: '🔴' }
];
