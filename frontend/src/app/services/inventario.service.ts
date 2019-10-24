import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APPCONFIG } from '../constantes.module';

@Injectable({providedIn: 'root'})

export class InventarioService {
    constructor(private http: HttpClient) { }
    
    obtenerProductos(): Observable<any[]>{
        return this.http.get<any[]>(APPCONFIG.BASE_URL + "/inventario");
    }

    obtenerPedidosPorProducto(id_producto: number): Observable<any[]>{
        return this.http.get<any[]>(APPCONFIG.BASE_URL + "/inventario/pedidosproducto/" + id_producto);
    }

    obtenerDetalleProducto(id_producto: number): Observable<any>{
        return this.http.get<any>(APPCONFIG.BASE_URL + "/inventario/detalleproducto/" + id_producto);
    }

    obtenerPedidosPorProductoValidados(id_producto: number): Observable<any>{
        return this.http.get<any[]>(APPCONFIG.BASE_URL + "/inventario/pedidosvalidados/" + id_producto);
    }

    obtenerPedidosPorProductoSinValidar(id_producto: number): Observable<any>{
        return this.http.get<any[]>(APPCONFIG.BASE_URL + "/inventario/pedidosnovalidados/" + id_producto);
    }
}