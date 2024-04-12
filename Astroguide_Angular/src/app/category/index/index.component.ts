import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../servicios/category.service'; // Asegúrate de importar el servicio correcto
import { Category } from '../../modelos/category'; // Asegúrate de importar el modelo correcto
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-index',
  standalone: true,
  providers:[CategoryService],
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  id: string | null;
  listarCategory: Category[] = [];
  token: string | null = null;
  clave: string | null = null;

  constructor(private categoryService: CategoryService, private router: Router, private aRouter: ActivatedRoute) {
    this.id=this.aRouter.snapshot.paramMap.get('id');
   }

   ngOnInit(): void {
    this.recuperarToken();
    this.cargarCategory();

    if(this.clave == null){
      this.clave=localStorage.getItem('clave');

    }


    
  }


  cargarCategory(): void {
    this.categoryService.getCategories(this.token).subscribe(
      data => {
        console.log(data);
        
          this.listarCategory = data['Categorias'];
         
      },
      err => {
        console.log(err);
      }
    );
  }
  
  recuperarToken() {
    this.token = localStorage.getItem('clave');
    if (this.token == null) {
      this.router.navigate(['/']);
    }
  }



  eliminarCategory(id: any): void {
    this.categoryService.deleteCategory(id, this.token).subscribe(
      data => {
        this.cargarCategory();
      },
      error => {
        console.log(error);
      }
    );
  }



  editarCategory(id: any): void {
    this.router.navigateByUrl("/category/editar/" + id);
  }


}
