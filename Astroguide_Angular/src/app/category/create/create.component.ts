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
import { CategoryService } from '../../servicios/category.service'; // Asegúrate de importar el servicio correcto
import { Category } from '../../modelos/category'; 

@Component({
  selector: 'app-create',
  standalone: true,
  providers:[CategoryService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDividerModule, ReactiveFormsModule ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  categoryForm =  this.fb.group({
    name: ''
  });
  id: string | null;
  token: string | null = null;

  constructor(private fb: FormBuilder, private _router: Router, 
    private categoryService: CategoryService, private aRoute: ActivatedRoute) {
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
      this.categoryService.getCategories(this.token).subscribe(
        data => {
          
          this.categoryForm.patchValue({
           name: data.name,
           
          });
          console.log(data);

        },
        err => {
          console.log(err+"error");
        }
      );
    }

}


agregarCategory(): void {
  const category: Category = {
   name: this.categoryForm.get('name')?.value!,
    
  };

  if (this.id != null) {
    this.categoryService.updateCategory(this.id, category, this.token).subscribe(
      data => {
        this._router.navigate(['/category/index']);
      },
      err => {
        console.log(err);
        this._router.navigate(['/category/index']);
      }
    );
  } else {
    this.categoryService.addCategory(category, this.token).subscribe(
      data => {
        console.log(data);
        this._router.navigate(['/category/index']);
      },
      err => {
        console.log(err);
        this._router.navigate(['/category/index']);
      }
    );
  }
}



}
