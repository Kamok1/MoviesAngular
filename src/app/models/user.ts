import { Role } from "./role-enum";

export class User{
  id! : number;
  displayName!: string;
  description!: string;
  role!: Role;
}
