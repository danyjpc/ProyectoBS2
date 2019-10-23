import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from 'src/app/models/tarea';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Producto } from '../models/producto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class VentaService {

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(APPCONFIG.BASE_URL + "/venta/dropproductos", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

  /*findListIn(): Observable<Empleado[]> {
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

  editar(item: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(APPCONFIG.BASE_URL+"/empleados/"+item.cod_empleado,item);
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