import { ActionBean } from "./actionBean";
import { AuthorityBean } from "./authorityBean";
import { GroupBean } from "./groupBean";
import { ScreenBean } from "./screenBean";

export interface MenuBean  {
  idMenu?: number;
  authority?: AuthorityBean;
  grupo: GroupBean;
  screen: ScreenBean;
  idParentMenu?: number;
  children: MenuBean[];
}

