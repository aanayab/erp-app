
export interface ConfirmationEmailBean {

  to: string;
  confirmationUrl: string; 
  token?: string;
  hidden?: string;
}
