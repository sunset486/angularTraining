import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CategoryModel, CategoryResponse} from '../interfaces/category-resource';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
  private getUrl: "/get-categories"
  private postUrl: "add-new-category"

  constructor(private http: HttpClient) { }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`https://localhost:7020/get-categories`,
    {responseType: 'json'})
  }

  addCategory(categoryBody: CategoryModel): Observable<Category>{
    return this.http.post<CategoryResponse>(`https://localhost:7020/add-new-category`, categoryBody,
    {headers: new HttpHeaders({
      "Authorization": "Bearer "+ localStorage.getItem("token")
    })})
  }
}
