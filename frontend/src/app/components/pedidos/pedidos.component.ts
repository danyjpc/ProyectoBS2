import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Kardex } from 'src/app/models/kardex';
import { PedidosService } from 'src/app/services/pedidos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleKardex } from 'src/app/models/detalle_kardex';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedor } from 'src/app/models/proveedor';
import { DatePipe } from '@angular/common';
import { PermisosService } from 'src/app/services/permisos.service';

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
    private textoAdvertencia: string = "";
    private paginaActual: number = 1;
    private cantidadItems: number;

    private banderaSuper: boolean = false;
    private banderaKardex: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute, private service: PedidosService, private permisosServices: PermisosService,
        private modalService: NgbModal, private proveedorService: ProveedoresService, private datePipe: DatePipe) { }

    ngOnInit() { 
        this.permisosServices.findPermisos().subscribe(perms => {
            
            if(perms.length == 12){
                this.banderaSuper = true;
                
                console.log(perms)
            }else{
                for (let i = 0; i < perms.length; i++) {
                    if(perms[i].cod_permiso == 12){
                        this.banderaKardex = true;
                        break;
                    }
                }
            }

            if(this.banderaKardex || this.banderaSuper){
                console.log(this.banderaSuper)
                this.service.obtenerKardexs().subscribe(items => {
                    this.kardexList = items;
                }, err => {
                    console.log(err);
                });
                this.service.obtenerTotalKardexs().subscribe(cant => {
                    this.cantidadItems = cant * 2;
                }, err => {
                    console.log(err);
                });    
            }else{
                this.router.navigate[('/tareas')]
            }
            
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
            if(validar == 1){
                var kardexActualizar: Kardex = new Kardex();
                kardexActualizar.id_kardex = item.id_kardex;
                kardexActualizar.fecha_fac = item.fecha_fac != null ? item.fecha_fac : this.hoyFecha();
                kardexActualizar.num_factura = item.num_factura;
                kardexActualizar.serie_factura = item.serie_factura;
                kardexActualizar.tipo_operacion = item.tipo_operacion;
                kardexActualizar.validado = 1;
                kardexActualizar.id_proveedor = item.id_proveedor;
                this.modalService.open(modalValidacion).result.then((result) => {
                    this.service.validarKardex(kardexActualizar).subscribe(kar => {
                        this.kardexList = new Array();
                        // this.ngOnInit();
                        this.obtenerRegistros();
                    }, err => {
                        console.log(err);
                    });
                }, (reason) => {
                    
                })
            }else if(validar == 2){
                this.textoAdvertencia = "El pedido no tiene productos agregados.";
                this.modalService.open(modalAdvertencia);
            }else{
                this.textoAdvertencia = "El pedido no tiene datos de facturacion.";
                this.modalService.open(modalAdvertencia);
            }
        }, err => {
            console.log(err);
        })
    }

    obtenerRegistros(){
        this.service.obtenerTotalKardexs().subscribe(tot => {
            this.cantidadItems = tot * 2;
            this.service.obtenerKardexsPaginacion(this.paginaActual).subscribe(kards => {
                this.kardexList = new Array();
                this.kardexList = kards;
            }, err => {
                console.log(err);
            });
        }, err => {
            console.log(err);
        });
        
    }

    eliminarPedido(modalEliminar, item){
        this.modalService.open(modalEliminar).result.then((result) => {
            this.service.eliminarPedido(item.id_kardex).subscribe(item => {
                this.obtenerRegistros();
            }, err => {
                console.log(err);
            });
        }, (reason) => {

        });
    }

    hoyFecha(){
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        
          return hoy;
    }
}