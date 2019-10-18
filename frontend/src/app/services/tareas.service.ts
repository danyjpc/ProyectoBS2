import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from 'src/app/models/tarea';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class TareasService {

  constructor(private http: HttpClient) { }

  findList(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(APPCONFIG.BASE_URL + "/tareas", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  guardar(item: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(APPCONFIG.BASE_URL+"/tareas",item);
  }
  eliminarPorId(cod_tarea: number): Observable<any> {
    return this.http.delete(APPCONFIG.BASE_URL+"/tareas/"+cod_tarea);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
