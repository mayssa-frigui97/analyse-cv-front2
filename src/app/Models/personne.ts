import { Candidature } from './candidature';
import { Cv } from './cv';
export class Personne {

    public id:number;

    public nom:string;

    public etatCivil?:string;

    public dateNaiss?:Date;

    public adresse?: string;

    public tel?: number;

    public email: string;

    public avatar: string;

    public recommande: boolean;

    public cv: Cv;

    public candidatures: Candidature[];
}

