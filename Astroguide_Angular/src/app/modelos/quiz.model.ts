export class Quiz {
    id?: number;
    Titulo :string | null | undefined;
    Duracion:number | null | undefined;
    Pregunta:string | null | undefined;
    RespuestaCorrecta:string | null | undefined;	
    Respuesta2:string | null | undefined;	
    Respuesta3:string | null | undefined;
    Respuesta4:string | null | undefined;

    Pregunta2:string | null | undefined;
    RespuestaCorrecta2:string | null | undefined;	
    Respuesta5:string | null | undefined;	
    Respuesta6:string | null | undefined;
    Respuesta7:string | null | undefined;
    
    Pregunta3:string | null | undefined;
    RespuestaCorrecta3:string | null | undefined;	
    Respuesta8:string | null | undefined;	
    Respuesta9:string | null | undefined;
    Respuesta10:string | null | undefined;
    logro_id:number | null | undefined; 


    constructor ( id: number, Titulo :string, Duracion:number, Pregunta:string, RespuestaCorrecta:string, Respuesta2:string, Respuesta3:string, Respuesta4:string, 
        Pregunta2:string, RespuestaCorrecta2:string, Respuesta5:string, Respuesta6:string, Respuesta7:string,
        Pregunta3:string, RespuestaCorrecta3:string, Respuesta8:string, Respuesta9:string, Respuesta10:string, logro_id:number,  

         ) {
        this.id = id;
        this.Titulo = Titulo;
        this.Duracion = Duracion;
        this.Pregunta = Pregunta;
        this.RespuestaCorrecta = RespuestaCorrecta;
        this.Respuesta2 = Respuesta2;
        this.Respuesta3 = Respuesta3;
        this.Respuesta4 = Respuesta4;

        this.Pregunta2 = Pregunta2;
        this.RespuestaCorrecta2 = RespuestaCorrecta2;
        this.Respuesta5 = Respuesta5;
        this.Respuesta6 = Respuesta6;
        this.Respuesta7 = Respuesta7;

        this.Pregunta3 = Pregunta3;
        this.RespuestaCorrecta3 = RespuestaCorrecta3;
        this.Respuesta8 = Respuesta8;
        this.Respuesta9 = Respuesta9;
        this.Respuesta10 = Respuesta10;
        this.logro_id = logro_id;
        
        

        


        
    }



}
