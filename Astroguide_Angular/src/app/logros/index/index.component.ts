import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logros } from '../../modelos/logros.model';
import { LogrosService } from '../../servicios/logros.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  id: string | null; 

  constructor (private logrosServicio: LogrosService,
    private _router: Router, private aRouter: ActivatedRoute) {
      this.id=this.aRouter.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
      this.cargarLogros();
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

