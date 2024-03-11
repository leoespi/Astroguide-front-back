import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../servicios/quiz.service';
import { Quiz } from '../../modelos/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Logros } from '../../modelos/logros.model'; // Asegúrate de importar el modelo de Logro


@Component({
  selector: 'app-index',
  standalone: true,
  providers: [QuizService],
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  id: string | null;
  listarQuiz: Quiz[]= [];
  token: string | null = null;
  logros: Logros[] = [];

  constructor (private QuizService: QuizService,private router: Router, private aRouter: ActivatedRoute) {
    
    this.id=this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.recuperarToken();
    this.loadLogros();
    this.cargaQuiz();
  }

  loadLogros(): void {
    this.QuizService.getLogros(this.token).subscribe(
      logros => {
        this.logros = logros;
      },
      error => {
        console.error(error);
      }
    );
  }
  cargaQuiz(): void{
    this.QuizService.getQuiz(this.token).subscribe(data=>{
      console.log(data);
      
      this.listarQuiz = data;
    },
    err =>{
      console.log(err);
    }
    )
  }


  
  recuperarToken(){
    this.token = localStorage.getItem('clave');
    if (this.token == null) {
      this.router.navigate(['/']);
    }
  }


  eliminarQuiz(id:any): void {
    this.QuizService.deleteQuiz(id, this.token).subscribe(
      data=>{
      this.cargaQuiz();
    },
    error =>{
      console.log(error);
    });
  }

  editarQuiz(id:any): void{
    this.router.navigateByUrl("/quiz/editar/"+id);
  }

  







}
