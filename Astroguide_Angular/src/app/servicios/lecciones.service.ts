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
  addLecciones(leccion: Lecciones): Observable<any> {
    return this.http.post(this.url,leccion);
  }

  getLecciones(): Observable<any> {
    return this.http.get(this.url);
  }

  getLeccion(id: string):Observable<any> {
    return this.http.get(this.url);
  }
  
  updateLeccion(id: string, leccion: Lecciones): Observable<any> {
    return this.http.put(this.url+id,leccion);         
  }

  deleteLeccion(id: string): Observable<any> {
    return this.http.delete(this.url+id);
  }

  
    
    




}
