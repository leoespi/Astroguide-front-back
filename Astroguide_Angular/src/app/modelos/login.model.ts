import { Users } from "./users.model";

export class Login {

    user: Users;
    acccess_token: string ;

    constructor ( users : Users, access_token : string){
        this.user = users;
        this.acccess_token = access_token;



    }

}
