import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../servicios/quiz.service';
import { Quiz } from '../../modelos/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor (private QuizService: QuizService,private router: Router, private aRouter: ActivatedRoute) {
    
    this.id=this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.cargaQuiz();
  }
  cargaQuiz(): void{
    this.QuizService.getQuiz().subscribe(data=>{
      console.log(data);
      
      this.listarQuiz = data;
    },
    err =>{
      console.log(err);
    }
    )
  }
  eliminarQuiz(id:any): void {
    this.QuizService.deleteQuiz(id).subscribe(data=>{
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
