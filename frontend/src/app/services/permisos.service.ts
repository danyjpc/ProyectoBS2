import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Roles } from '../models/roles';
import { Permiso } from '../models/permisos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class PermisosService {

  constructor(private http: HttpClient) { }

  findPermisos(): Observable<any[]> {
    return this.http.get<any[]>(APPCONFIG.BASE_URL + "/permisos/"+localStorage.getItem('usr'), httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findListIn(): Observable<Roles[]> {
    return this.http.get<Roles[]>(APPCONFIG.BASE_URL + "/roles/RolesDeshabilitados", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  permisosRol(item: number): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(APPCONFIG.BASE_URL+"/permisos/Role/"+item);
  }

  guardar(item: Roles): Observable<Roles> {
    return this.http.post<Roles>(APPCONFIG.BASE_URL+"/roles/CrearRol",item);
  }

  editar(item: Roles): Observable<Roles> {
    return this.http.put<Roles>(APPCONFIG.BASE_URL+"/roles/Editar/"+item.id,item);
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
