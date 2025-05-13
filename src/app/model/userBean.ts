import { AuthorityBean } from './authorityBean';
export interface UserBean {   
    username?: string;
    accountVerified?: number;
    createAt?: Date;   
    email?: string;
    enabled?: boolean;
    failedLoginAttempts?: number;   
    firstName?: string;
    lastModif?: Date;   
    lastName?: string;
    mfaEnabled?: number;  
    mobile?: string;  
    password?: string;
    secret?: string;
    confirmationToken?: string;   
    authorities?: AuthorityBean[];
    idCompany?: number;
    countryCode?: string;
    hidden?: boolean;
    accountLocked?: boolean;
    lockTime?: Date;    
	  createUser?:string;
    lastModifUser?:String;   
  }