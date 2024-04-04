export class Lecciones {

    id?: number;
    Nombre_de_la_leccion: string | null| undefined;
    Contenido: string  | null| undefined ;
    Tipo_de_leccion: string  | null| undefined;

    constructor(id: number, Nombre_de_la_leccion: string, Contenido: string,Tipo_de_leccion: string,
        )
        {
        this.id = id;
        this.Nombre_de_la_leccion = Nombre_de_la_leccion;
        this.Contenido = Contenido;
        this.Tipo_de_leccion = Tipo_de_leccion;
      }
}
