import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quiz } from '../modelos/quiz.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url='http://127.0.0.1:8000/api/quiz/';
  logrosUrl = 'http://127.0.0.1:8000/api/logro/';
  constructor(private http:HttpClient){
  }
    
    

    addQuiz(quiz : Quiz, access_token:any):Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      });
      const options = { headers: headers};
      return this.http.post(this.url,quiz, options );
    }

    getQuiz(access_token:any):Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      });
      const options = { headers: headers};
      return this.http.get(this.url, options);
    }
    
    updateQuiz(id:string, quiz :Quiz, access_token:any):Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      });
      const options = { headers: headers};
      return this.http.put(this.url+id,quiz, options);         
    }

    deleteQuiz(id:string, access_token:any):Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      });
      const options = { headers: headers};
      return this.http.delete(this.url+id, access_token);
    }


    getLogros(access_token:any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      });
      const options = { headers: headers};
      return this.http.get(this.logrosUrl, options);
    }

}
