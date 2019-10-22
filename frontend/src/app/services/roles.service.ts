import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from 'src/app/models/tarea';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Empleado } from '../models/empleado';
import { Roles } from '../models/roles';
import { UserRoles } from '../models/user_role';
import { User } from '../models/user';
import { UserInfo } from '../models/userinfo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http: HttpClient) { }

  findList(): Observable<Roles[]> {
    return this.http.get<Roles[]>(APPCONFIG.BASE_URL + "/roles/RolesHabilitados", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findListIn(): Observable<Roles[]> {
    return this.http.get<Roles[]>(APPCONFIG.BASE_URL + "/roles/RolesDeshabilitados", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  findbyId(item: number): Observable<Roles> {
    return this.http.get<Roles>(APPCONFIG.BASE_URL+"/roles/BuscarRol/"+item);
  }

  guardar(item: Roles): Observable<Roles> {
    return this.http.post<Roles>(APPCONFIG.BASE_URL+"/roles/CrearRol",item);
  }

  rolesUser(item: UserRoles): Observable<UserRoles> {
    return this.http.post<UserRoles>(APPCONFIG.BASE_URL+"/roles/AsignarRolesUsuario",item);
  }

  idUser(item: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(APPCONFIG.BASE_URL+"/usuarios/CodUser/"+item,httpOptions);
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
