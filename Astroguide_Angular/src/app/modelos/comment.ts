export class Comment {
    id ?: number;
    user_id?: number;
    feed_id?: number;
    body: string  | null | undefined; 
   

    constructor(id: number, user_id: number, feed_id: number, body: string
     ) {
        this.id = id;
        this.user_id = user_id;
        this.feed_id = feed_id;
        this.body = body;
      }

}
