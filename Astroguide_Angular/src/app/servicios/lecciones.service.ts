import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lecciones } from '../modelos/lecciones.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeccionesService {
  url='http://127.0.0.1:8000/api/lecciones/';
  constructor(private http:HttpClient){

  }
  addLecciones(leccion: Lecciones, access_token:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};
    return this.http.post(this.url,leccion, options );
  }

 

  getLecciones( access_token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};

    return this.http.get(this.url, options);
  }
  
  updateLeccion(id: string, leccion: Lecciones , access_token:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};

    return this.http.put(this.url+id,leccion,options);         
  }

  deleteLeccion(id: string, access_token:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};


    return this.http.delete(this.url+id, options);
  }

  
    
    




}
