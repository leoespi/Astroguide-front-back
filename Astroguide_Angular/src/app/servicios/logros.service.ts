import { Injectable } from '@angular/core';
import { Logros } from '../modelos/logros.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogrosService {
  loadLecciones(token: any) {
    throw new Error('Method not implemented.');
  }
  url= "http://127.0.0.1:8000/api/logro"

  constructor(private http: HttpClient) { }

  getLogros(): Observable<any> {
    return this.http.get(this.url);
  }
  addLogro(logros: Logros): Observable<any> {
    return this.http.post (this.url, logros);
  }

  getLogro(id: string): Observable<any> {
    return this.http.get (this.url+"/"+id);
  }

  updateLogro (id: string, logros: Logros): Observable<any> {
    return this.http.put (this.url+"/"+id, logros);
  }

  deleteLogro(id: string): Observable<any> {
    return this.http.delete (this.url+"/"+id);
  }
  getLecciones( access_token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};

    return this.http.get(this.url, options);
  }
}

