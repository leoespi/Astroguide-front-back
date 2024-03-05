import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../modelos/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url='http://127.0.0.1:8000/api/user/';
  constructor(private http:HttpClient){
  }
    getUserss(access_token:any):Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      });
      const options = { headers: headers};
      return this.http.get(this.url, options);
    }

    addUsers(users : Users):Observable<any>{
      return this.http.post(this.url,users);
    }

    getUsers(id:string):Observable<any>{
      return this.http.get(this.url+id);
    }
    
    updateUsers(id:string, users:Users):Observable<any>{
      return this.http.put(this.url+id,users);         
    }

    deleteUsers(id:string):Observable<any>{
      return this.http.delete(this.url+id);
    }
}