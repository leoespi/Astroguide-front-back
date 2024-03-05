import { Injectable } from '@angular/core';
import { Logros } from '../modelos/logros.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogrosService {
  url= "http://127.0.0.1:8000/api/logro/"

  constructor(private http: HttpClient) { }

  getLogros(): Observable<any> {
    return this.http.get(this.url);
  }
  addLogro(logros: Logros): Observable<any> {
    return this.http.post (this.url, logros);
  }

  getLogro(id: string): Observable<any> {
    return this.http.get (this.url+id);
  }

  updateLogro (id: string, logros: Logros): Observable<any> {
    return this.http.put (this.url+id, logros);
  }

  deleteLogro(id: string): Observable<any> {
    return this.http.delete (this.url+id);
  }
}

