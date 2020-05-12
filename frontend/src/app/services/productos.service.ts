import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Producto } from '../models/producto';
import { Dimension } from '../models/dimension';
import { Detalle_factura } from '../models/detalle_factura';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  listStockMinimo(): Observable<Producto[]>
  {
    return this.http.get<Producto[]>(APPCONFIG.BASE_URL + "/productos/stkmin", httpOptions).pipe(
    catchError(this.handleError('findList', []))
    );
  }
  listProdMasVendidos(): Observable<Detalle_factura[]>
  {
    return this.http.get<Detalle_factura[]>(APPCONFIG.BASE_URL + "/productos/masvendidos", httpOptions).pipe(
      catchError(this.handleError('findList', []))
      );
  }
  findList(): Observable<Producto[]> {
    return this.http.get<Producto[]>(APPCONFIG.BASE_URL + "/productos", httpOptions).pipe(
      catchError(this.handleError('findList', []))
    );
  }
  guardar(item: Producto): Observable<Producto> {
    return this.http.post<Producto>(APPCONFIG.BASE_URL+"/productos",item);
  }
  findbyId(item: number): Observable<Producto> {
    return this.http.get<Producto>(APPCONFIG.BASE_URL+"/productos/"+item);
  }
  editar(item: Producto): Observable<Producto> {
    return this.http.put<Producto>(APPCONFIG.BASE_URL+"/productos/"+item.id_producto,item);
  }
  guardarD(item: Dimension): Observable<Dimension> {
    return this.http.post<Dimension>(APPCONFIG.BASE_URL+"/productos/dimension",item);
  }
  obtenerProductoC(item: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(APPCONFIG.BASE_URL+"/productos/cat/"+item);
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
