import { ActionBean } from "./actionBean";
import { AuthorityBean } from "./authorityBean";
import { GrupoBean } from "./grupoBean";
import { ScreenBean } from "./screenBean";

export interface MenuBean  {
  idMenu?: number;
  authority?: AuthorityBean;
  grupo: GrupoBean;
  screen: ScreenBean;
  idParentMenu?: number;
  children: MenuBean[];
}

