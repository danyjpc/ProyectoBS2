import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Producto } from '../models/producto';
import { Dimension } from '../models/dimension';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }
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
