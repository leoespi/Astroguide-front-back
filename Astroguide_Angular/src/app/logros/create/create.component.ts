import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Logros } from '../../modelos/logros.model';
import { LogrosService } from '../../servicios/logros.service';
import { Lecciones } from '../../modelos/lecciones.model';
import { LeccionesService } from '../../servicios/lecciones.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule],
  providers: [LogrosService, LeccionesService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  value = "";
  token: string | null = null;
  logrosForm = this.fb.group({
    Nombre_del_Logro: '',
    Rareza: '',
    leccion_id: '',
  });
  Lecciones: Lecciones[] = [];
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router,
    private LogrosServicios: LogrosService, private leccionesServicio: LeccionesService, private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('clave');
    this.verEditar();
    this.loadLecciones();
  }

  verEditar(): void {
    if (this.id != null) {
      this.LogrosServicios.getLogro(this.id).subscribe(
        data => {
          this.logrosForm.setValue({
            Nombre_del_Logro: data.Nombre_del_Logro,
            Rareza: data.Rareza,
            leccion_id: data.leccion_id,

          });
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  loadLecciones(): void {
    this.leccionesServicio.getLecciones(this.token).subscribe(
      lecciones => {
        this.Lecciones = lecciones;
        console.log('Se obtuvieron las lecciones=> ' + this.Lecciones);
      },
      error => {
        console.log('No se obtuvieron las lecciones=> ' + error);
      }
    );
  }

  agregarLogro(): void {
    const logro: Logros = {
      Nombre_del_Logro: this.logrosForm.get('Nombre_del_Logro')?.value!,
      Rareza: this.logrosForm.get('Rareza')?.value!,
      leccion_id: Number(this.logrosForm.get('leccion_id')?.value),


    }
    if (this.id != null) {
      this.LogrosServicios.updateLogro(this.id, logro).subscribe(
        data => {
          this.router.navigate(['/logros/index'])
        },
        error => {
          console.log(error);
          this.router.navigate(['/logros/index'])
        }
      )
    } else {
      this.LogrosServicios.addLogro(logro).subscribe(data => {
        console.log(data);
        this.router.navigate(['/logros/index']);
      },
        err => {
          console.log(err);
          this.router.navigate(['/logros/index']);
        })
    }
  }
}
