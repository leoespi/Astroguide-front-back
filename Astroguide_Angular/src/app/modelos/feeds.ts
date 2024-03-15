export class Feeds {
    id?: number;
    
    content :string | null | undefined;
    user_id :number | null | undefined;
    nombre?:string | null | undefined; 
    //categoria_id :number | null | undefined;


        constructor(id: number, user_id: number, content: string, name:string) {
            this.id = id;
            this.content = content;
            this.user_id = user_id;
            this.nombre = name;
            //this.categoria_id = categoria_id;
        }
}
