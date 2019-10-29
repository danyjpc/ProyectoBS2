import {Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/models/factura';
import { ClienteService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { Detalle_factura } from 'src/app/models/detalle_factura';

@Component({
    selector: 'ventas',
    templateUrl: 'ventas.component.html',
})

export class VentasComponent implements OnInit
{
    public arrFacturas: Factura[];
    public hayFacturas: boolean;
    public factura: Factura = new Factura();

    public detallesFactura: Detalle_factura[];

    public cliFactura: Cliente;

    constructor(
        private service: VentaService,
        private serviceCli: ClienteService,
        private http2: HttpClient,
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router, 
        private route: ActivatedRoute
        ){}

    ngOnInit(): void
    {
        this.obtenerFacturas();
    }    

    obtenerFacturas()
    {
        this.service.obtenerFacturas().subscribe(
            facs => {
                this.arrFacturas = facs; 
                if (this.arrFacturas != null || this.arrFacturas.length != 0) this.hayFacturas = true; else this.hayFacturas = false
            }
        )
    }

    verDetalles(modalDetalles, item){
        this.factura = item;
        this.service.obtenerDetallesFacxFac(this.factura.id_factura).subscribe(dfac => {
            this.detallesFactura = dfac;
            this.modalService.open(modalDetalles, {size: 'lg'}).result.then((result) => {

                }, (reason) => {
                })
            
        }, err => {
            console.log(err);
        });
    }
}