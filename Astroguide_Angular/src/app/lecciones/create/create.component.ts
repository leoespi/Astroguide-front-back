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
import { Lecciones} from '../../modelos/lecciones.model';
import { LeccionesService } from '../../servicios/lecciones.service';


@Component({
  selector: 'app-create',
  standalone: true,
  providers:[LeccionesService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDividerModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  //value = '';

  leccionesForm =  this.fb.group({
    Nombre_de_la_leccion: '',
    Contenido: '',
    Tipo_de_leccion: ''    
    			
  });
  id: string | null;
  token: string | null = null;

  constructor(private fb: FormBuilder, private _router: Router, 
  private leccionesServicio: LeccionesService, private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.recuperarToken();
    this.verEditar();
  }

  recuperarToken(){
    this.token = localStorage.getItem('clave');
    if (this.token == null) {
      this._router.navigate(['/']);
    }
  }

  verEditar(): void {
    if (this.id != null) {
      this.leccionesServicio.getLecciones(this.token).subscribe(
        data => {
          
          this.leccionesForm.patchValue({
            Nombre_de_la_leccion: data.Nombre_de_la_leccion,
            Contenido: data.Contenido,
            Tipo_de_leccion: data.Tipo_de_leccion,
          });
          console.log(data);

        },
        err => {
          console.log(err+"error");
        }
      );
    }


  }
  agregarLecciones(): void {
    const leccion: Lecciones = {
      Nombre_de_la_leccion: this.leccionesForm.get('Nombre_de_la_leccion')?.value!,
      Contenido: this.leccionesForm.get('Contenido')?.value!,
      Tipo_de_leccion: this.leccionesForm.get('Tipo_de_leccion')?.value!,
    };
  
    if (this.id != null) {
      this.leccionesServicio.updateLeccion(this.id, leccion, this.token).subscribe(
        data => {
          this._router.navigate(['/lecciones/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/lecciones/index']);
        }
      );
    } else {
      this.leccionesServicio.addLecciones(leccion, this.token).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/lecciones/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/lecciones/index']);
        }
      );
    }
  }

  

}
