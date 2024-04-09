import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../servicios/comment.service'; // Asegúrate de importar el servicio correcto
import { Comment } from '../../modelos/comment'; // Asegúrate de importar el modelo correcto
import { ActivatedRoute, Router } from '@angular/router';

@Component({ selector: 'app-index',
 standalone: true,
  imports: [CommonModule],
   templateUrl: './index.component.html',
    styleUrl: './index.component.scss'
   })
   
export class IndexComponent {
  id: string | null;

  listarComments: Comment[] = [];
  token: string | null = null;

  constructor(private commentService: CommentService, private router: Router, private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.recuperarToken();
    this.cargarComments();
  }

  cargarComments(): void {
    this.commentService.getComments(this.token).subscribe(
      data => {
        console.log(data);
        this.listarComments = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  
  recuperarToken() {
    this.token = localStorage.getItem('clave');
    if (this.token == null) {
      this.router.navigate(['/']);
    }
  }

  eliminarComment(id: any): void {
    this.commentService.deleteComment(id, this.token).subscribe(
      data => {
        this.cargarComments();
      },
      error => {
        console.log(error);
      }
    );
  }


}
