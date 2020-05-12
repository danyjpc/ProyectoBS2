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
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ClienteService } from 'src/app/services/clientes.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Detalle_factura } from 'src/app/models/detalle_factura';
@Component({
    selector: 'sel-dash',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit
{
    public sumVentasxSem: number = 0; 
    private niuClientesxSem: number = 0; 
    private reabProductos: Producto[] = new Array();
    private prodMasVendidos: Detalle_factura[] = new Array();

    constructor(private router: Router,public auth: AuthenticationService, public act: AuthGuard,
        private service:VentaService, private serviceU:ClienteService, private serviceP:ProductosService,  private modalService: NgbModal
    ){}

    ngOnInit()
    {
      this.ventasxSem();
      this.nclientesxSem();
      this.alertaStock();
      this.masVendidos();

    }


    ventasxSem()
    {
      this.service.ventasxSemana().subscribe(
        monto =>{
          this.sumVentasxSem = monto;
        },
        err => {
          console.log(err);
        }
      ); 
      console.log(this.sumVentasxSem);
    }

    nclientesxSem()
    {
      this.serviceU.getNuevosxSem().subscribe(
        cant => {
          this.niuClientesxSem = cant;
      },
      err =>{
        console.log(err);
      });
      console.log(this.niuClientesxSem);
    }

    alertaStock()
    {
      this.serviceP.listStockMinimo().subscribe(
        items => {
          this.reabProductos = items;
          console.log(this.reabProductos);
        }, 
        err => {
          console.log(err);
        }
      );
      console.log(this.reabProductos);
    }

    masVendidos()
    {
      this.serviceP.listProdMasVendidos().subscribe(
        items =>{
          this.prodMasVendidos = items;
          console.log(items);
        }, 
        err =>
        {
          console.log(err);
        }
      );
    }
  

    hoyFecha(){
        var hoy = new Date();
            var dd = hoy.getDate();
            var mm = (hoy.getMonth()+1);
            var yyyy = hoy.getFullYear();
            console.log(dd + "/" + mm + "/" +yyyy);
            console.log(mm);
            return hoy.getFullYear() - 1;
      }

}