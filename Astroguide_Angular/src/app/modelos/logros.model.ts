export class Logros {
    id?: number;
    Nombre_del_Logro: string |null | undefined;
    Rareza?: string | null | undefined;
    leccion_id:number | null | undefined; 
    
    constructor(id: number, Nombre_del_Logro: string, Rareza: string, user_id: number, leccion_id: number) {
        this.id = id;
        this.Nombre_del_Logro = Nombre_del_Logro;
        this.Rareza = Rareza;
        this.leccion_id = leccion_id;
        
    }

}
