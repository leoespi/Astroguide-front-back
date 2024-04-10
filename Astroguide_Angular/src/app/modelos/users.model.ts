export class Users {
    id?: number;
    name :string | null | undefined;

    email :string | null | undefined;
    username:string | null | undefined;
    rol_id?: number;
    
   constructor(id : number, name:string, email:string, username:string, rol_id:number){
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.rol_id = rol_id;
   }
}
