import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from 'src/app/models/tarea';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Producto } from '../models/producto';
import { Detalle_factura } from '../models/detalle_factura';
import { Clientes } from '../models/clientes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class VentaService {
    guardar(item: any) {
        throw new Error("Method not implemented.");
    }

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(APPCONFIG.BASE_URL + "/venta/dropproductos", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  obtenerClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(APPCONFIG.BASE_URL + "/venta/dropclientes", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }

/*  nuevoDetalleFactura(): Observable<Detalle_factura>{
    return this.http.post<Detalle_factura>(APPCONFIG.BASE_URL + "venta/adddetalle", httpOptions);
  }*/

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