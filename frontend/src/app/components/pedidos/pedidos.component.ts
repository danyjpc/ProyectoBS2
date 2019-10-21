import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Kardex } from 'src/app/models/kardex';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
    selector: 'sel-pedidos',
    templateUrl: 'pedidos.component.html'
})

export class PedidosComponent implements OnInit {
    private kardexList: Kardex[] = new Array();

    constructor(private router: Router, private route: ActivatedRoute, private service: PedidosService) { }

    ngOnInit() { 
        this.service.obtenerKardex().subscribe(items => {
            this.kardexList = items;
        }, err => {
            console.log(err);
        })
    }
}