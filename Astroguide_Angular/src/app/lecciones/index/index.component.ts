import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeccionesService } from '../../servicios/lecciones.service';
import { Lecciones} from '../../modelos/lecciones.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-index',
  standalone: true,
  providers:[LeccionesService],
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
  
export class IndexComponent {
  id: string | null;
  listarLecciones: Lecciones[] = [];

  constructor(private leccionesService: LeccionesService, private router: Router, private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarLecciones();
  }

  cargarLecciones(): void {
    this.leccionesService.getLecciones().subscribe(
      data => {
        
        this.listarLecciones = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  eliminarLeccion(id: any): void {
    this.leccionesService.deleteLeccion(id).subscribe(data => {
        this.cargarLecciones();
      },
      error => {
        console.log(error);
      }
    );
  }

  editarLeccion(id: any): void {
    this.router.navigateByUrl("/lecciones/editar/"+id);
  }
}
