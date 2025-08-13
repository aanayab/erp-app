import { ActionBean } from "./actionBean";
import { AuthorityBean } from "./authorityBean";
import { GrupoBean } from "./grupoBean";
import { ScreenBean } from "./screenBean";

export interface MenuBean  {
  idMenu?: number;
  name:string;
  authority?: string;
  grupo: GrupoBean;
  idScreen: string;
  idParentMenu?: number;
  children: MenuBean[];
   enabled?: boolean;

   createAt?: Date;   

   deleted?: boolean;

   lastModif? :Date ;

	createUser?:string;

	lastModifUser?:string;

  order: number;
}

