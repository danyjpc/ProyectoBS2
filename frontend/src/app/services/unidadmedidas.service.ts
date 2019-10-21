import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Unidad_medida } from '../models/unidad_medida';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidasService {

  constructor(private http: HttpClient) { }

  findList(): Observable<Unidad_medida[]> {
    return this.http.get<Unidad_medida[]>(APPCONFIG.BASE_URL + "/unidadmedidas", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  guardar(item: Unidad_medida): Observable<Unidad_medida> {
    return this.http.post<Unidad_medida>(APPCONFIG.BASE_URL+"/unidadmedidas",item);
  }
  findbyId(item: number): Observable<Unidad_medida> {
    return this.http.get<Unidad_medida>(APPCONFIG.BASE_URL+"/unidadmedidas/"+item);
  }
  editar(item: Unidad_medida): Observable<Unidad_medida> {
    return this.http.put<Unidad_medida>(APPCONFIG.BASE_URL+"/unidadmedidas/"+item.id_unidad_medida,item);
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
