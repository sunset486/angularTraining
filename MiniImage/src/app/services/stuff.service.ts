import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Stuff } from '../models/stuff';
import { StuffResource } from '../interfaces/stuff-resource';

@Injectable()
export class StuffService {
  private getUrl = "get-stuff"
  private getOneUrl = "get-one-stuff"
  private postUrl = "add-new-stuff"
  private updateUrl = "update-stuff"

  constructor(private http: HttpClient) { }

  getStuff() : Observable<Stuff[]> {
    return this.http.get<Stuff[]>(`${environment.apiUrl}/${this.getUrl}`)
  }

  getOneStuff(id: number): Observable<Stuff>{
    return this.http.get<Stuff>(`${environment.apiUrl}/${this.getOneUrl}/${id}`)
  }

  addStuff(stuffBody: StuffResource): Observable<Stuff>{
    return this.http.post<Stuff>(`${environment.apiUrl}/${this.postUrl}`, stuffBody,
    {headers: new HttpHeaders({
      "Authorization": "Bearer "+ localStorage.getItem("token")
    })})
  }

  updateStuff(id: number, productBody: StuffResource): Observable<Stuff>{
    return this.http.put<Stuff>(`${environment.apiUrl}/${this.updateUrl}/${id}`, {id, productBody},
    {headers: new HttpHeaders({
      "Authorization": "Bearer "+ localStorage.getItem("token")
    })})
  }
}
