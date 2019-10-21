import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Proveedor } from '../models/proveedor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  findList(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(APPCONFIG.BASE_URL + "/proveedores", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  guardar(item: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(APPCONFIG.BASE_URL+"/proveedores",item);
  }
  findbyId(item: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(APPCONFIG.BASE_URL+"/proveedores/"+item);
  }
  editar(item: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(APPCONFIG.BASE_URL+"/proveedores/"+item.id_proveedor,item);
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
