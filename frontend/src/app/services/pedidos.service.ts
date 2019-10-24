import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kardex } from '../models/kardex';
import { APPCONFIG } from '../constantes.module';
import { Proveedor } from '../models/proveedor';
import { DetalleKardex } from '../models/detalle_kardex';

@Injectable({providedIn: 'root'})
export class PedidosService {
    constructor(private http: HttpClient) { }

    //Devuelve los primeros 10 registros, ordenados por id_kardex en forma ascendente
    obtenerKardexs(): Observable<Kardex[]>{
        return this.http.get<Kardex[]>(APPCONFIG.BASE_URL + "/pedidos");
    }

    obtenerProveedores(): Observable<Proveedor[]>{
        return this.http.get<Proveedor[]>(APPCONFIG.BASE_URL + "/pedidos/proveedores");
    }
    
    obtenerProductos(): Observable<any[]>{
        return this.http.get<any[]>(APPCONFIG.BASE_URL + "/pedidos/productos");
    }

    obtenerKardex(id_kardex: number): Observable<Kardex>{
        return this.http.get<Kardex>(APPCONFIG.BASE_URL + "/pedidos/obtenerkardex/" + id_kardex)
    }

    guardarKardex(item: Kardex): Observable<Kardex>{
        return this.http.post<Kardex>(APPCONFIG.BASE_URL + "/pedidos/guardarkardex", item);
    }

    obtenerDetalleKardex(id_detalle_kardex: number): Observable<DetalleKardex>{
        return this.http.get<DetalleKardex>(APPCONFIG.BASE_URL + "/pedidos/obtenerdetallekardex/" + id_detalle_kardex);
    }

    guardarDetalleKardex(item: DetalleKardex): Observable<DetalleKardex>{
        return this.http.post<DetalleKardex>(APPCONFIG.BASE_URL + "/pedidos/guardardetallekardex", item);
    }

    validarKardex(item: Kardex): Observable<Kardex>{
        return this.http.put<Kardex>(APPCONFIG.BASE_URL + "/pedidos/validarkardex/" + item.id_kardex, item);
    }

    obtenerDetallesPedido(id_kardex: number): Observable<DetalleKardex[]>{
        return this.http.get<DetalleKardex[]>(APPCONFIG.BASE_URL + "/pedidos/obtenerdetallespedidos/" + id_kardex);
    }

    eliminarDetalleKardex(id_detalle_kardex: number): Observable<any>{
        return this.http.delete<any>(APPCONFIG.BASE_URL + "/pedidos/eliminardetalle/" + id_detalle_kardex);
    }

    editarDetalleKardex(item: DetalleKardex): Observable<DetalleKardex>{
        return this.http.put<DetalleKardex>(APPCONFIG.BASE_URL + "/pedidos/editardetalle/" + item.id_detalle_kardex, item);
    }

    actualizarKardex(item: Kardex): Observable<Kardex>{
        return this.http.put<Kardex>(APPCONFIG.BASE_URL + "/pedidos/actualizarkardex/" + item.id_kardex, item);
    }

    verificarValidacion(id_kardex: number): Observable<number>{
        return this.http.get<number>(APPCONFIG.BASE_URL + "/pedidos/verificarvalidacion/" + id_kardex);
    }

    obtenerTotalKardexs(): Observable<number>{
        return this.http.get<number>(APPCONFIG.BASE_URL + "/pedidos/cantidaditems");
    }

    obtenerKardexsPaginacion(pagina: number): Observable<Kardex[]>{
        return this.http.get<Kardex[]>(APPCONFIG.BASE_URL + "/pedidos/pedidospaginacion/" + pagina);
    }
}