import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Kardex } from 'src/app/models/kardex';
import { PedidosService } from 'src/app/services/pedidos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleKardex } from 'src/app/models/detalle_kardex';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedor } from 'src/app/models/proveedor';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'sel-pedidos',
    templateUrl: './pedidos.component.html'
})

export class PedidosComponent implements OnInit {
    private kardexList: Kardex[] = new Array();
    private operacion: number;
    private detalleKardexList: DetalleKardex[] = new Array();
    private proveedorDetalle: Proveedor = new Proveedor();
    private kardex: any;
    private mensajeValidacion: string = "";
    private tipoBadge: string = "";

    constructor(private router: Router, private route: ActivatedRoute, private service: PedidosService,
        private modalService: NgbModal, private proveedorService: ProveedoresService, private datePipe: DatePipe) { }

    ngOnInit() { 
        this.service.obtenerKardexs().subscribe(items => {
            this.kardexList = items;
        }, err => {
            console.log(err);
        })
    }

    nuevoPedido(){
        this.router.navigate(['/nuevo-pedido'])
    }

    verDetalles(modalDetalles, item){
        this.kardex = item;
        this.mensajeValidacion = item.validado == 0 ? "Sin validar" : "Validado";
        this.tipoBadge = item.validado == 0 ? "warning" : "success";
        this.operacion = item.tipo_operacion;
        this.service.obtenerDetallesPedido(item.id_kardex).subscribe(kards => {
            this.detalleKardexList = kards;
            this.proveedorService.findbyId(item.id_proveedor).subscribe(prov => {
                this.proveedorDetalle = prov;
                this.modalService.open(modalDetalles, {size: 'lg'}).result.then((result) => {

                }, (reason) => {
                    this.detalleKardexList = new Array();
                    this.operacion = null;
                    this.kardex = null;
                })
            }, err => {
                console.log(err);
            });
            
        }, err => {
            console.log(err);
        });
    }

    calcularTotal(): number{
        var total: number = 0;
        for (let i = 0; i < this.detalleKardexList.length; i++) {
            total = total + (this.detalleKardexList[i].precio_unitario * this.detalleKardexList[i].cantidad);
        }

        return total;
    }

    editar(item){
        this.router.navigate(['/editar-pedido', item.id_kardex])
    }

    validar(modalValidacion, modalAdvertencia, item){
        this.service.verificarValidacion(item.id_kardex).subscribe(validar => {
            if(validar){
                var kardexActualizar: Kardex = new Kardex();
                kardexActualizar.id_kardex = item.id_kardex;
                kardexActualizar.fecha_fac = item.fecha_fac;
                kardexActualizar.num_factura = item.num_factura;
                kardexActualizar.serie_factura = item.serie_factura;
                kardexActualizar.tipo_operacion = item.tipo_operacion;
                kardexActualizar.validado = 1;
                kardexActualizar.id_proveedor = item.id_proveedor;
                this.modalService.open(modalValidacion).result.then((result) => {
                    this.service.validarKardex(kardexActualizar).subscribe(kar => {
                        this.kardexList = new Array();
                        this.ngOnInit();
                    }, err => {
                        console.log(err);
                    });
                }, (reason) => {
                    
                })
            }else{
                this.modalService.open(modalAdvertencia);
            }
        }, err => {
            console.log(err);
        })
    }
}