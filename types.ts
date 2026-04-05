
export interface Procedure {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  indications: string[];
  preparation: string[];
  whatToExpect: string;
  afterCare: string[];
  duration: string;
  icon: string;
  hasAnvisa: boolean;
}

export interface Condition {
  id: string;
  name: string;
  summary: string;
  details: string;
  treatmentRole: string;
  category: 'Psiquiatria' | 'Neurologia' | 'Dor Crônica';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
