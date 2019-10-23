import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Empleado } from '../models/empleado';
import { CambioPass } from '../models/cambio';
import { UserInfo } from '../models/userinfo';
import { Clientes } from '../models/clientes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private http: HttpClient) { }

  findList(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(APPCONFIG.BASE_URL + "/clientes", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  

  findListIn(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(APPCONFIG.BASE_URL + "/clientes/inhabilitados", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findbyId(item: number): Observable<Clientes> {
    return this.http.get<Clientes>(APPCONFIG.BASE_URL+"/clientes/"+item);
  }

  guardar(item: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(APPCONFIG.BASE_URL+"/clientes",item);
  }


  editar(item: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(APPCONFIG.BASE_URL+"/clientes/"+item.id_cliente,item);
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
