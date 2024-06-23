

export interface EmailBean  {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  template: string;
  params: Map<String,any>
  files?: any[];
}

