import { ScreenImageBean } from "./screenImageBean";


export interface ScreenBean   {    
    screen?: string;
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
    order: number;
}



