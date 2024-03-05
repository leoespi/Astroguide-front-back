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
    
    

    addQuiz(quiz : Quiz):Observable<any>{
      return this.http.post(this.url,quiz);
    }

    getQuiz():Observable<any>{
      return this.http.get(this.url);
    }
    
    updateQuiz(id:string, quiz :Quiz):Observable<any>{
      return this.http.put(this.url+id,quiz);         
    }

    deleteQuiz(id:string):Observable<any>{
      return this.http.delete(this.url+id);
    }


    getLogros(): Observable<any> {
      return this.http.get(this.logrosUrl);
    }

}
