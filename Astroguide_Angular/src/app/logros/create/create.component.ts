import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Logros } from '../../modelos/logros.model';
import { LogrosService } from '../../servicios/logros.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LogrosService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  logrosForm= this.fb.group({
    Nombre_del_Logro: '',
    Rareza: '',
  });
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router,
    private LogrosServicios: LogrosService, private aRoute:ActivatedRoute){
      this.id = this.aRoute.snapshot.paramMap.get('id');
    }

  ngOnInit(): void{
    this.verEditar();
  }
  verEditar(): void{
    if(this.id != null) {
      this.LogrosServicios.getLogro(this.id).subscribe(
        data=>{
          this.logrosForm.setValue({
            Nombre_del_Logro: data.Nombre_del_Logro,
            Rareza: data.Rareza,

          });
        },
        error =>{
          console.log(error)
        }
      )
    }
  }

  agregarLogro(): void {
    const logro:Logros = {
      Nombre_del_Logro: this.logrosForm.get('Nombre_del_Logro')?.value!,
      Rareza: this.logrosForm.get('Rareza')?.value!,
      

    }
      if (this.id!=null){
        this.LogrosServicios.updateLogro(this.id, logro).subscribe(
          data => {
            this.router.navigate(['/logros/index'])
          },
          error =>{
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
  