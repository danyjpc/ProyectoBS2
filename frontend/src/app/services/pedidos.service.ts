import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kardex } from '../models/kardex';
import { APPCONFIG } from '../constantes.module';

@Injectable({providedIn: 'root'})
export class PedidosService {
    constructor(private http: HttpClient) { }

    obtenerKardex(): Observable<Kardex[]>{
        return this.http.get<Kardex[]>(APPCONFIG.BASE_URL + "/pedidos");
    }

    
    
}