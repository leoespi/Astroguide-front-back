import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../modelos/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url='http://127.0.0.1:8000/api/categoria';


  constructor(private http:HttpClient) { }


  getCategories( access_token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};

    return this.http.get(this.url, options);
  }

  addCategory(category: Category, access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers };
    return this.http.post(this.url, category, options);
  }

  updateCategory(id: string, category: Category, access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers };
    return this.http.put(this.url + "/" + id, category, options);
  }

  deleteCategory(id: string, access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers };
    return this.http.delete(this.url + "/" + id, options);
  }


}
