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
import { Feeds } from '../../modelos/feeds'; // Asegúrate de importar el modelo correcto
import { FeedsService } from '../../servicios/feeds.service'; // Importa el servicio correspondiente
import { Users } from '../../modelos/users.model';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [FeedsService], // Asegúrate de incluir el servicio en los proveedores
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDividerModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  value = '';



  feedForm = this.fb.group({
    // Define aquí los campos del formulario para la creación del foro
    // Por ejemplo:
    
    content: '',
    user_id: '',

  });

  id: string | null;
  users: Users[] = [];
  
  token: string | null = null;


  constructor(private fb: FormBuilder, private _router: Router,
    private feedServicio: FeedsService, private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.recuperarToken();
    this.loadUsers();
    this.verEditar();
  }

  loadUsers(): void {
    this.feedServicio.getUserss(this.token).subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error(error);
      }
    );
  }

  recuperarToken() {
    this.token = localStorage.getItem('clave');
    if (this.token == null) {
      this._router.navigate(['/']);
    }
  }

  verEditar(): void {
    if(this.id != null) {

      this.feedServicio.getFeeds(this.token).subscribe(
        data => {
          
          this.feedForm.setValue({
            content: data.content,
            user_id: data.user_id,
            
           
  
          });
        },
        err => {
          console.log(err);
        }
      );
    }
      }


      agregarFeeds(): void {
        const feeds: Feeds = {
          content: this.feedForm.get('content')?.value,
          user_id:Number( this.feedForm.get('user_id')?.value),
        };
        console.log(feeds);
        
        if (this.id != null) {
          this.feedServicio.updateFeeds(this.id, feeds, this.token).subscribe(
            data => {
              this._router.navigate(['/feeds/index']);
            },
            err => {
              console.log(err);
              this._router.navigate(['/feeds/index']);
            }
          );
    
        } else {
          this.feedServicio.addFeeds(feeds, this.token).subscribe(
            data => {
            console.log(data);
            this._router.navigate(['/feeds/index']);
          },
            err => {
              console.log(err);
              this._router.navigate(['/feeds/index']);
            }
          );
  
      }
      
      
  
  }
  
    


}


  