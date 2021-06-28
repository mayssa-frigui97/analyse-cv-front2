import { Entretien } from './entretien';
import { Personne } from './personne';

export class Candidature {

    public id:number;

    public date:Date;

    public personne :Personne;

    public entretiens :Entretien[];
}

