import { StatutEntretien } from './../Enums/StatutEntretien';
import { Candidature } from "./candidature";

export class Entretien {

    public id:number;

    public date:Date;

    public duree:string;
    
    public statut: StatutEntretien;

    public raisonAnnulation?: string;

    public candidature :Candidature;
}
