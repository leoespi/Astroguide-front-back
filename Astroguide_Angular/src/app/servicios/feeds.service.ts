import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feeds } from '../modelos/feeds';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  url='http://127.0.0.1:8000/api/feeds/';
  //categoriaUrl = 'http://127.0.0.1:8000/api/categoria/';
  userUrl = 'http://127.0.0.1:8000/api/user/';


  constructor(private http:HttpClient) {

   }

   
   getFeeds(access_token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};
    return this.http.get(this.url, options);
  }

  addFeeds(feeds: Feeds, access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers };
    return this.http.post(this.url, feeds, options);
  }



  updateFeeds(id:string, feeds :Feeds, access_token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};
    return this.http.put(this.url+id,feeds, options);         
  }

  deleteFeeds(id:string, access_token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};
    return this.http.delete(this.url+id, options);
  }

  getUserss(access_token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};
    return this.http.get(this.url, options);
  }




}
