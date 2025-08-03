import { AuthorityBean } from "./authorityBean";

export interface GrupoBean {

    idGrupo: number;
    enabled: boolean;
    grupo: string;

    description: string;


    createAt?: Date;

    hidden?: boolean;

    deleted?: boolean;

    lastModif?: Date;

    createUser?: string;

    lastModifUser?: string;

    authorities?: AuthorityBean[];


}
