import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sel-inventario',
    templateUrl: './inventario.component.html'
})

export class InventarioComponent implements OnInit {

    private productos = new Array();
    private pedidosProducto = new Array();
    private productoDescripcion: any;
    private productoPedidos: any;
    constructor(private router: Router, private route: ActivatedRoute, private service: InventarioService, private modalService: NgbModal) { }

    ngOnInit() { 
        this.service.obtenerProductos().subscribe(prods => {
            this.productos = prods;
        }, err => {
            console.log(err);
        });
    }

    pedidos(modal, producto){
        this.productoPedidos = producto;
        this.pedidosPorProducto(producto);
        this.modalService.open(modal, {size: 'lg'}).result.then((result) => {
            this.productoPedidos = null;
        }, (reason) => {
            this.productoPedidos = null;
        });
    }

    descripcion(modal, producto){
        this.service.obtenerDetalleProducto(producto.id_producto).subscribe(prod => {
            this.productoDescripcion = prod;
            this.modalService.open(modal, {size: 'lg'}).result.then((result) => {
                this.productoDescripcion = null;
            }, (reason) => {
                this.productoDescripcion = null;
            })
        }, err => {
            console.log(err);
        });
        
    }

    pedidosPorProducto(producto){
        this.service.obtenerPedidosPorProducto(producto.id_producto).subscribe(prods => {
            this.pedidosProducto = prods;
        }, err => {
            console.log(err);
        });
    }

    pedidosPorProductoValidados(producto){
        this.service.obtenerPedidosPorProductoValidados(producto.id_producto).subscribe(prods => {
            this.pedidosProducto = prods;
        }, err => {
            console.log(err);
        })
    }

    pedidosPorProductoSinValidar(producto){
        this.service.obtenerPedidosPorProductoSinValidar(producto.id_producto).subscribe(prods => {
            this.pedidosProducto = prods;
        }, err => {
            console.log(err);
        })
    }

    descripcionDeProducto(producto){
        this.service.obtenerDetalleProducto(producto.id_producto).subscribe(prod => {
            this.productoDescripcion = prod;
        }, err => {
            console.log(err);
        })
    }
}