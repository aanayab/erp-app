export interface ActionBean {
   idAction: number;
   action: string;
   enabled: boolean;
     createAt?: Date;

    hidden?: boolean;

    deleted?: boolean;

    lastModif?: Date;

    createUser?: string;

    lastModifUser?: string;
}

