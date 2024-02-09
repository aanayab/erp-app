import { ActionBean } from "./actionBean";
import { AuthorityBean } from "./authorityBean";
import { GroupBean } from "./groupBean";
import { ScreenBean } from "./screenBean";

export interface PrivilegyBean  {
  idPrivilegy?: number;
  action: ActionBean;
  authority?: AuthorityBean;
  grupo: GroupBean;
  screen: ScreenBean;
}

