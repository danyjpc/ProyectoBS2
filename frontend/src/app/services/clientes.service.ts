import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Persona } from '../models/persona';
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

  
  getNuevosxSem(){
    return this.http.get<number>(APPCONFIG.BASE_URL + "/account/nclien");
  }



  findList(): Observable<Persona[]> {
    return this.http.get<Persona[]>(APPCONFIG.BASE_URL + "/clientes", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }  

  findListIn(): Observable<Persona[]> {
    return this.http.get<Persona[]>(APPCONFIG.BASE_URL + "/clientes/inhabilitados", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findbyId(item: number): Observable<Persona> {
    return this.http.get<Persona>(APPCONFIG.BASE_URL+"/clientes/"+item);
  }

  guardar(item: Persona): Observable<Persona> {
    return this.http.post<Persona>(APPCONFIG.BASE_URL+"/clientes",item);
  }


  editar(item: Persona): Observable<Persona> {
    return this.http.put<Persona>(APPCONFIG.BASE_URL+"/clientes/"+item.id_persona,item);
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
