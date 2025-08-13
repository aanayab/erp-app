import { ScreenImageBean } from "./screenImageBean";


export interface ScreenBean   {    
    idScreen?: string;
    enabled?: boolean;
    image?: ScreenImageBean ;
    path?: string;
    alias?: string;
    componente?: string;
    deleted?: boolean;    
    createAt?: Date;
    lastModif?: Date;
    createUser?: string;
    lastModifUser?: string;
}



