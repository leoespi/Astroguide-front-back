export class Feeds {
    id?: number;
    
    content :string | null | undefined;
    user_id :number | null | undefined; 
    //categoria_id :number | null | undefined;


        constructor(id: number, user_id: number, content: string) {
            this.id = id;
            this.content = content;
            this.user_id = user_id;
            //this.categoria_id = categoria_id;
        }
}
