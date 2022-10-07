import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Stuff } from '../models/stuff';

@Injectable()
export class StuffService {
  private url = "get-stuff"

  constructor(private http: HttpClient) { }

  getStuff() : Observable<Stuff[]> {
    return this.http.get<Stuff[]>(`${environment.apiUrl}/${this.url}`)
  }
}
