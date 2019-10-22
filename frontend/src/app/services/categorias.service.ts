import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Categoria } from '../models/categoria';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }
  findList(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(APPCONFIG.BASE_URL + "/categorias", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  guardar(item: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(APPCONFIG.BASE_URL+"/categorias",item);
  }
  findbyId(item: number): Observable<Categoria> {
    return this.http.get<Categoria>(APPCONFIG.BASE_URL+"/categorias/"+item);
  }
  editar(item: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(APPCONFIG.BASE_URL+"/categorias/"+item.id_categoria,item);
  }
  /*eliminarPorId(cod_tarea: number): Observable<any> {
    return this.http.delete(APPCONFIG.BASE_URL+"/tareas/"+cod_tarea);
  }*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
