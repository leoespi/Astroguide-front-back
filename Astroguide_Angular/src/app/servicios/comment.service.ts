import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../modelos/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  private url = 'http://127.0.0.1:8000/api/feed/comments/';
  // Otros URLs relacionados con comentarios si los hay...

  userUrl = 'http://127.0.0.1:8000/api/user';

  constructor(private http: HttpClient) { }

  getComments(access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers };
    return this.http.get(this.url, options);
  }

  

  

  deleteComment(id: string, access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers };
    return this.http.delete(`${this.url}/${id}`, options);
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
