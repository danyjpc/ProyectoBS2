import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Roles } from '../models/roles';
import { Puestos } from '../models/puesto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class PuestosService {

  constructor(private http: HttpClient) { }

  findList(): Observable<Puestos[]> {
    return this.http.get<Puestos[]>(APPCONFIG.BASE_URL + "/puestos/habilitado", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findListIn(): Observable<Puestos[]> {
    return this.http.get<Puestos[]>(APPCONFIG.BASE_URL + "/puestos/deshabilitado", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findbyId(item: number): Observable<Puestos> {
    //console.log(item)
    return this.http.get<Puestos>(APPCONFIG.BASE_URL+"/puestos/"+item);
  }

  guardar(item: Puestos): Observable<Puestos> {
    return this.http.post<Puestos>(APPCONFIG.BASE_URL+"/puestos",item);
  }

  editar(item: Puestos): Observable<Puestos> {
    return this.http.put<Puestos>(APPCONFIG.BASE_URL+"/puestos/"+item.cod_puesto,item);
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
