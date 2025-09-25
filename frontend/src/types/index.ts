export interface ContactFormData {
  name: string;
  email: string;
  whatsapp: string;
  location: string;
  expertise: string;
  message: string;
}

export interface NewsletterData {
  email: string;
  source: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SocialLink {
  icon: any;
  href: string;
  label: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon: any;
  color: string;
  description: string;
}

export interface Stat {
  number: string;
  label: string;
}
