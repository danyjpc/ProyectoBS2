import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuard } from '../_guards';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VentasComponent } from '../ventas/ventas.component';
import { VentaService } from 'src/app/services/venta.service';
import { Factura } from 'src/app/models/factura';
@Component({
    selector: 'sel-dash',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit
{
    private sumVentasxSem: number = 0; 
    private facs: Factura[] = new Array();
    private niuClientesxSem: number; 
    private reabProductos: Producto[] = new Array();
    private prodMasVendidos: Producto[] = new Array();

    constructor(private router: Router,public auth: AuthenticationService, public act: AuthGuard,
        private service:VentaService,  private modalService: NgbModal
    ){}

    ngOnInit()
    {
      this.service.ventasxSemana(this.hoyFecha()).subscribe(
        monto =>{
        
          console.log(monto);
        },
        err => {
          console.log(err);
        }
      ); 
      console.log();

    }


    ventasxSem()
    {
      var mxsem = 0;
    
    }

    hoyFecha(){
        var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth()+1;
            var yyyy = hoy.getFullYear();
            console.log(hoy);
            return hoy;
      }

}