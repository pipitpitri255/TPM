
export interface FormData {
  name: string;
  contact: string;
  title: string;
  description: string;
}

export interface Priority {
  id: string;
  label: string;
  description: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
  emoji: string;
}

export interface RequestType {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
}
