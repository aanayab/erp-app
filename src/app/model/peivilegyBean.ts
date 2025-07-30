import { ActionBean } from "./actionBean";
import { AuthorityBean } from "./authorityBean";
import { GrupoBean } from "./grupoBean";
import { ScreenBean } from "./screenBean";

export interface PrivilegyBean  {
  idPrivilegy?: number;
  action: ActionBean;
  authority?: AuthorityBean;
  screen: ScreenBean;
}

