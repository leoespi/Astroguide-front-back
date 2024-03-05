import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { Login } from '../../modelos/login.model';
import { Router } from '@angular/router';
import { Users } from '../../modelos/users.model';
import { GlobalComponent } from '../../global/global.component';




@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  
  loginForm = this.fb.group({
    email: '',
    password: ''
  });

  respuesta: Login | null = null;
  clave: string | null = null;
  usuario: Users| null = null;


  constructor(private fb: FormBuilder, private loginService: LoginService, private _router: Router) {

  }

  ngOnInit(): void {
    this.clave=localStorage.getItem("clave");
    if (this.clave) {
      this._router.navigate(['/users/index']);
     
      
    }
  }

  ngOnChanges(): void {

  }

  login(): void {

    console.log(this.loginForm.get('email')?.value! + this.loginForm.get('password')?.value);
    
    
    this.loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .subscribe( rs => {
        this.respuesta = rs;
       
        if (this.respuesta != null) {
          GlobalComponent.respuesta = this.respuesta;
          localStorage.setItem('clave', this.respuesta.acccess_token);
          window.location.reload();
        }
      }, err => {
        console.log(err);
      });
  }

}
