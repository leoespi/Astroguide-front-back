import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedsService } from '../../servicios/feeds.service'; // Asegúrate de importar el servicio correcto
import { Feeds } from '../../modelos/feeds'; // Asegúrate de importar el modelo correcto
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  providers: [FeedsService], // Asegúrate de incluir el servicio en los proveedores
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  id: string | null;

  listarFeeds: Feeds[] = [];
  token: string | null = null;
  clave: string | null = null;


  constructor(private feedService: FeedsService, private router: Router, private aRouter: ActivatedRoute) {

    this.id=this.aRouter.snapshot.paramMap.get('id');


   }

  ngOnInit(): void {
    this.recuperarToken();
    this.cargarFeeds();
  }

  cargarFeeds(): void {
    this.feedService.getFeeds(this.token).subscribe(
      (data: any) => {
        console.log(data);
        this.listarFeeds = data.feeds; // Modificación: Asigna data.feeds en lugar de data
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

  eliminarFeeds(id: any): void {
    this.feedService.deleteFeeds(id, this.token).subscribe(
      data => {
        this.cargarFeeds();
      },
      error => {
        console.log(error);
      }
    );
  }

  editarFeeds(id: any): void {
    this.router.navigateByUrl("/feeds/editar/" + id);
  }
}
