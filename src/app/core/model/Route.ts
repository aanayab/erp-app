import { Data } from "./data";
export interface Route  {
  path: string;
  redirectTo: string;
  pathMatch: string;
  Component: string;
  data: Data;
  children: Route[];
}