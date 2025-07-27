import { CompanyContactBean } from "./companyContactBean";
import { CompanyImageBean } from "./companyImageBean";


export interface CompanyBean {

  idCompany?: number;

  createAt: Date;
  rfc: string;
  lastModifUser?: string;
  createUser?: string;
  enabled: boolean;
  lastModif: Date;
  deleted: boolean;

  image: CompanyImageBean;

  legalName: string;
  commercialName?: string;
  fiscalRegime?: string;
  countryCodeIso3: string;

  stateProvince?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  addressComplement?: string;

  contactName?: string;
  position?: string;
  email?: string;
  mobileNumber?: string;
  phoneNumber?: string;
  language?: string;

  timezone?: string;
  currency?: string;
  websiteUrl?: string;
  industry?: string;
  employeeCount?: number;

  billingEmail?: string;
  billingAddress?: string;
  paymentTerms?: string;
  paymentMethod?: string;
  bankAccount?: string;

  logoUrl?: string;
  classification?: string;
  integrationType?: string;
  contractSigned?: boolean;

  notes?: string;

  contacts: CompanyContactBean[];
}
