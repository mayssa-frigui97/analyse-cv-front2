import { UserRole } from './../Enums/UserRole';
import { Equipe } from "./equipe";
import { Personne } from './personne';

export class Collaborateur extends Personne{

    public cin: number;

    public telPro: number;

    public emailPro: string;

    public poste: string;

    public salaire: number;

    public dateEmb: Date;

    public nomUtilisateur: string;

    public motDePasse: string;

    public role :UserRole;

    public evaluation: number;

    public equipe :Equipe;

    public notifications?: Notification[];
}
