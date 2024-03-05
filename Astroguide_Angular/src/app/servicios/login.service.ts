import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url='http://127.0.0.1:8000/api/';


  constructor(private http: HttpClient) { }


  
    login(email:any,password:any): Observable<any> {
      return this.http.post(this.url+"login",{username: email , password : password});
    }
  
    logout(username:string): Observable<any> {
      return this.http.post(this.url+"logout", null);
  
    }

}
