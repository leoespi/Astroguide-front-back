import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logros } from '../../modelos/logros.model';
import { LogrosService } from '../../servicios/logros.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Lecciones } from '../../modelos/lecciones.model';
import { LeccionesService } from '../../servicios/lecciones.service';

@Component({
  
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  providers: [LogrosService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaLogros: Logros[]=[]; 
  clave: string | null = null;
  id: string | null;
  token: string | null = null;
  Lecciones: Lecciones[] = [];

  constructor (private logrosServicio: LogrosService,
    private _router: Router, private aRouter: ActivatedRoute,) {
      this.id=this.aRouter.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
      this.loadLecciones();
      this.cargarLogros();

      if(this.clave == null){
        this.clave=localStorage.getItem('clave');
  
      }
    }
    loadLecciones(): void{
        this.logrosServicio.getLecciones(this.token).subscribe(
          Lecciones=> {
            this.Lecciones=Lecciones;
            console.log(this.Lecciones);
          },
          error => {
            console.log(error);
          }
        );
    }

  cargarLogros(): void{
    this.logrosServicio.getLogros().subscribe(
      data=> {
        this.listaLogros = data;
      },
      error => {
        console.log(error);
      });
  }

  eliminarLogro(id:any): void {
    this.logrosServicio.deleteLogro(id).subscribe(
      data=> { 
        this.cargarLogros();
      },
      error =>{
        console.log(error);
      });
  }

  editarLogro(id:any): void {
    this._router.navigateByUrl('/logros/editar/'+id);
  }
}

