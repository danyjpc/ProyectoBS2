import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from 'src/app/models/tarea';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Empleado } from '../models/empleado';
import { CambioPass } from '../models/cambio';
import { UserInfo } from '../models/userinfo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {

  constructor(private http: HttpClient) { }

  findList(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(APPCONFIG.BASE_URL + "/empleados/habilitado", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findListIn(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(APPCONFIG.BASE_URL + "/empleados/deshabilitado", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findbyId(item: number): Observable<Empleado> {
    return this.http.get<Empleado>(APPCONFIG.BASE_URL+"/empleados/"+item);
  }

  guardar(item: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(APPCONFIG.BASE_URL+"/empleados",item);
  }

  crearuser(item: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(APPCONFIG.BASE_URL+"/account/CrearUsuario",item);
  }

  editar(item: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(APPCONFIG.BASE_URL+"/empleados/"+item.cod_empleado,item);
  }

  editarPass(item: CambioPass): Observable<CambioPass> {
    return this.http.put<CambioPass>(APPCONFIG.BASE_URL+"/usuarios/EditarPassword/"+localStorage.getItem('usr'),item);
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
