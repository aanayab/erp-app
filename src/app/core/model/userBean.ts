import { AuthorityBean } from './authorityBean';
export interface UserBean {   
    username?: string;
    accountVerified?: number;
    createAt?: Date;   
    email?: string;
    enabled?: boolean;
    failedLoginAttempts?: number;   
    firstName?: string;
    lastModif?: string;   
    lastName?: string;
    mfaEnabled?: number;  
    mobile?: string;  
    password?: string;
    secret?: string;
    token?: string;   
    authorities?: AuthorityBean[];
    idCompany?: number;
    countryCode?: string;
    hidden?: boolean;
  }