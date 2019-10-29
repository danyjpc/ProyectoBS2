import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from 'src/app/models/tarea';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Producto } from '../models/producto';
import { Detalle_factura } from '../models/detalle_factura';
import { Clientes } from '../models/clientes';
import { DetalleKardex } from '../models/detalle_kardex';
import { Factura } from '../models/factura';

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
  obtenerClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(APPCONFIG.BASE_URL + "/venta/dropclientes", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  obtenerDetallesFacxProd(): Observable<Detalle_factura[]> {
    return this.http.get<Detalle_factura[]>(APPCONFIG.BASE_URL + "/venta/getdetxprod", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  obtenerDetallesFacxFac(idfac: number): Observable<Detalle_factura[]> {
    return this.http.get<Detalle_factura[]>(APPCONFIG.BASE_URL + "/venta/getdetxfac/" + idfac, httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  obtenerDetallesKarxProd(): Observable<DetalleKardex[]> {
    return this.http.get<DetalleKardex[]>(APPCONFIG.BASE_URL + "/venta/getdetkxprod", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  guardarFactura(item: Factura): Observable<Factura[]> {
    return this.http.post<Factura[]>(APPCONFIG.BASE_URL+"/venta",item);
  }

  guardarDetalleFactura(item: Detalle_factura[], fac: Factura): Observable<Detalle_factura[]>{
    return this.http.post<Detalle_factura[]>(APPCONFIG.BASE_URL + "/venta/adddetalle/" + fac.id_factura, item);
  }

  obtenerFacturas(): Observable<Factura[]>{
    return this.http.get<Factura[]>(APPCONFIG.BASE_URL + "/venta/getfactura", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
 
  obtenerClienteFactura(idcliente: number): Observable<Clientes>{
    return this.http.get<Clientes>(APPCONFIG.BASE_URL + "/venta/getcliente/" + idcliente, httpOptions)
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