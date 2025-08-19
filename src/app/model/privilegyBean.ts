import { ActionBean } from "./actionBean";
import { ScreenBean } from "./screenBean";

export interface PrivilegyBean {
  idPrivilegy?: number;
  authority: string;
  screen: ScreenBean;
  action: ActionBean;
  idGrupo: number;
  grupo: string;


   enabled?: boolean;

   createAt?: Date;   


   deleted?: boolean;

   lastModif? :Date ;

	createUser?:string;

	lastModifUser?:string;
}
