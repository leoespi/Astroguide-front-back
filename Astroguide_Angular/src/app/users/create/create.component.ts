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
import { Users } from '../../modelos/users.model';
import { UsersService } from '../../servicios/users.service'; 



@Component({
  selector: 'app-create',
  standalone: true,
  providers: [UsersService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDividerModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  value = '';
  token: string | null = null;


  usersForm = this.fb.group({
    
    name: '',
    email:'',
    password:'',
    
  });

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private usersService: UsersService, private aRoute: ActivatedRoute) {
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
      this.usersService.getUsers(this.token ).subscribe(
        data => {
          this.usersForm.setValue({
            
            
            name: data.name,
            email: data.email,
            password: data.password
            
          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }


  agregarUsers(): void {
    const users: Users = {
      name: this.usersForm.get('name')?.value,
      email: this.usersForm.get('email')?.value,
      username: this.usersForm.get('password')?.value
  }

    if (this.id != null) {
      this.usersService.updateUsers(this.id, users, this.token).subscribe(
        data => {
          this._router.navigate(['/users/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/users/index']);
        }
      );

    } else {
      this.usersService.addUsers(users, this.token).subscribe(data => {
        console.log(data);
        this._router.navigate(['/users/index']);
      },
        err => {
          console.log(err);
          this._router.navigate(['/users/index']);
        }
      );
    }



  }




}
