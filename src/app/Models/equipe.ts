import { Collaborateur } from "./collaborateur";
import { Pole } from "./pole";

export class Equipe {
    public id:number;

    public nom:string;
    
    public pole :Pole;

    public teamleader :Collaborateur;
}
