import { Collaborateur } from "./collaborateur";

export class Notification {

  public id: number;

  public date: Date;

  public description :string;

  public lu: boolean;

  public collaborateur :Collaborateur;
}
