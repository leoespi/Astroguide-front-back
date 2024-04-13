import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feeds } from '../modelos/feeds';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  url='https://astroguide.api.adsocidm.com/api/feeds/all';

  urldestroy='https://astroguide.api.adsocidm.com/api/feeds';
  
  userUrl = 'https://astroguide.api.adsocidm.com/api/user';


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
    return this.http.put(this.url +"/"+id,feeds, options);         
  }

  deleteFeeds(id:string, access_token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};
    return this.http.delete(this.urldestroy +"/"+id, options);
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
