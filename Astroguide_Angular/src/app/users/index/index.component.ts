import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../servicios/users.service';
import { Users } from '../../modelos/users.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  providers: [UsersService],
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  id: string | null;
  listaUserss: Users[]=[];

  constructor(private usersService: UsersService, private _router: Router, private aRouter: ActivatedRoute ) { 
    this.id=this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargaUsers();
  }
  cargaUsers(): void{
    this.usersService.getUserss( localStorage.getItem('acces_token')).subscribe(data=>{
      this.listaUserss = data;
      console.log(data);
    },
    err =>{
      console.log(err);
    }
    )
  }
  eliminarUsers(id:any): void {
    this.usersService.deleteUsers(id).subscribe(data=>{
      this.cargaUsers();
    },
    error =>{
      console.log(error);
    });
  }

  editarUsers(id:any): void{
    this._router.navigateByUrl("/users/editar/"+id);
  }



}
