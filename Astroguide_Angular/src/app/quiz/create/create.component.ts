import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Quiz} from '../../modelos/quiz.model';
import { QuizService } from '../../servicios/quiz.service';
import { Logros } from '../../modelos/logros.model'; // Asegúrate de importar el modelo de Logro


@Component({
  selector: 'app-create',
  standalone: true,
  providers :[QuizService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDividerModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  value = '';
  token: string | null = null;

  quizForm = this.fb.group({
    titulo: '',
    duracion: '',
    pregunta: '',
    respuestaCorrecta: '',
    respuesta2: '',
    respuesta3: '',
    respuesta4: '',

    pregunta2: '',
    respuestaCorrecta2:'',
    respuesta5: '',
    respuesta6: '',
    respuesta7: '',

    pregunta3: '',
    respuestaCorrecta3:'',
    respuesta8: '',
    respuesta9: '',
    respuesta10: '',
    logro_id: '',
    
    			
  });
  logros: Logros[] = []; // Definición de la propiedad logros

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private quizServicio: QuizService, private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.recuperarToken();
    this.loadLogros(); // Llama a la función para cargar los logros al iniciar el componente
    this.verEditar();
    
  }

  loadLogros(): void {
    this.quizServicio.getLogros(this.token).subscribe(
      logros => {
        this.logros = logros;
      },
      error => {
        console.error(error);
      }
    );
  }

  recuperarToken(){
    this.token = localStorage.getItem('clave');
    if (this.token == null) {
      this._router.navigate(['/']);
    }
  }


  verEditar(): void {
    if (this.id != null) {
      this.quizServicio.getQuiz(this.token).subscribe(
        data => {
          this.quizForm.setValue({
            
            titulo: data.titulo,
            duracion: data.Duracion,
            pregunta: data.Pregunta,
            respuestaCorrecta: data.RespuestaCorrecta,
            respuesta2: data.Respuesta2, 
            respuesta3:  data.Respuesta3,
            respuesta4:  data.Respuesta4,

            pregunta2: data.pregunta2,
            respuestaCorrecta2:  data.RespuestaCorrecta2,
            respuesta5: data.Respuesta5,
            respuesta6: data.Respuesta6, 
            respuesta7:  data.Respuesta7,

            pregunta3: data.Pregunta3,
            respuestaCorrecta3:  data.RespuestaCorrecta3,
            respuesta8: data.Respuesta8,
            respuesta9: data.Respuesta9, 
            respuesta10:  data.Respuesta10,
            logro_id: data.Logro,
            


          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }


  agregarFicha(): void {
    const quiz: Quiz = {

      Titulo: this.quizForm.get('titulo')?.value!,
      Duracion: Number(this.quizForm.get('duracion')?.value),
      Pregunta: this.quizForm.get('pregunta')?.value,
      RespuestaCorrecta: this.quizForm.get('respuestaCorrecta')?.value,
      Respuesta2: this.quizForm.get('respuesta2')?.value,
      Respuesta3: this.quizForm.get('respuesta3')?.value,
      Respuesta4:  this.quizForm.get('respuesta4')?.value,

      Pregunta2: this.quizForm.get('pregunta2')?.value,
      RespuestaCorrecta2: this.quizForm.get('respuestaCorrecta2')?.value,
      Respuesta5: this.quizForm.get('respuesta5')?.value,
      Respuesta6: this.quizForm.get('respuesta6')?.value,
      Respuesta7:  this.quizForm.get('respuesta7')?.value,

      Pregunta3: this.quizForm.get('pregunta3')?.value,
      RespuestaCorrecta3: this.quizForm.get('respuestaCorrecta3')?.value,
      Respuesta8: this.quizForm.get('respuesta8')?.value,
      Respuesta9: this.quizForm.get('respuesta9')?.value,
      Respuesta10:  this.quizForm.get('respuesta10')?.value,
      logro_id:Number(this.quizForm.get('logro_id')?.value),
    };
    console.log(quiz);
    

    if (this.id != null) {
      this.quizServicio.updateQuiz(this.id, quiz, this.token).subscribe(
        data => {
          this._router.navigate(['/quiz/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/quiz/index']);
        }
      );

    } else {
      this.quizServicio.addQuiz(quiz, this.token).subscribe(data => {
        console.log(data);
        this._router.navigate(['/quiz/index']);
      },
        err => {
          console.log(err);
          this._router.navigate(['/quiz/index']);
        }
      );
    }



  }
}
