import { Injectable } from '@angular/core';
import { Categoria } from './categoria.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // tslint:disable-next-line: ban-types
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Categoria[]>{
    const url = `${this.baseUrl}/categorias`;
    return this.http.get<Categoria[]>(url);
  }
}