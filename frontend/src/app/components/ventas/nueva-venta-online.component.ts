import { Producto } from 'src/app/models/producto';
import {Component, OnInit, ViewChild} from '@angular/core'
import { Router } from '@angular/router'
import { AuthGuard } from '../_guards';
import { ProductosService } from 'src/app/services/productos.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VentaService } from 'src/app/services/venta.service';
import { Persona } from 'src/app/models/persona';
import { Factura } from 'src/app/models/factura';
import { Detalle_factura } from 'src/app/models/detalle_factura';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'nueva-venta-online',
    templateUrl: 'nueva-venta-online.component.html',
})

export class NuevaVentaOnlineComponent implements OnInit      
{
    private prodCarrito: Producto[] = new Array();
    private personaCliente: Persona = new Persona();
    private totalFactura: number = 0;
    private fecha: Date = new Date();
    private factura: Factura = new Factura();
    private detFactura: Detalle_factura[] = new Array();
    private dFac: Detalle_factura = new Detalle_factura();
    private idUsuCliente: number;

    constructor(private router: Router, public act: AuthGuard,
    private serviceP: ProductosService, private serviceV: VentaService, private modalService: NgbModal,
      ) { }

    ngOnInit()
    {      
        this.prodCarrito = JSON.parse(localStorage.getItem('arrProds'));
        console.log(this.prodCarrito);
        this.totalFactura = JSON.parse(localStorage.getItem('totalCompra'));  
        this.serviceV.obtenerIdUsuCliente(localStorage.getItem("usr")).subscribe(
            item =>
            {
                this.idUsuCliente = item;
                this.factura.id_usu_cliente = item;
                console.log(this.idUsuCliente);
                console.log(item);
                this.obtenerCliente();
                this.crearFactura();
            }, 
            err =>
            {
                console.log(err);
            }
        );
        console.log(this.totalFactura);
        console.log(this.idUsuCliente);
      //  this.obtenerCliente();  
        
    }

    obtenerCliente()
    {
        this.serviceV.obtenerIdPersonaCliente().subscribe( //obtener datos de cliente persona
            item =>
            {
                this.personaCliente = item;
                console.log(item);
            }, 
            err =>
            {
                console.log(err);
            }
        );
           
     //   this.crearFactura(); 

    }

    crearFactura()
    { 
        console.log(this.factura.id_usu_cliente);
        this.factura.estado = 1; 
        this.factura.fecha = this.fecha; 
        this.factura.habilitado = 1; 
        this.factura.id_usu_empleado = null; 
        this.factura.total = this.totalFactura;
       // this.factura.cliente = this.personaCliente;
        this.prodCarrito.forEach(element => {
            this.dFac.cantidad = element.cantidad; 
            this.dFac.id_producto = element.id_producto; 
            this.detFactura.push(Object.assign({}, this.dFac));
        });
        this.serviceV.guardarFactura(this.factura).subscribe(
            fa => {
                console.log(fa);
                console.log(this.factura);
                this.factura = fa[0];
                this.serviceV.guardarDetalleFactura(this.detFactura, fa[0]).subscribe(
                    dts =>
                    {
                        //
                    }
                );
            }
        );

    }

   descargarFactura(idfac)
   {
       console.log(idfac)       
       this.serviceV.generarFacturaPDF(idfac).subscribe(        
            (file: HttpResponse<Blob>) => window.open(file.url, '_blank')
       );
   }
}