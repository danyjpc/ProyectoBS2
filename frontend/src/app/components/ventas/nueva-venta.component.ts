import {Component, OnInit, ViewChild} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router'
import { Factura } from 'src/app/models/factura';
import { VentaService } from 'src/app/services/venta.service';
import { DatePipe } from '@angular/common';
import { Producto } from 'src/app/models/producto';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter,  map } from 'rxjs/operators';
import { Observable, Subject, merge } from 'rxjs';
import { Detalle_factura } from 'src/app/models/detalle_factura';
import { Clientes } from 'src/app/models/clientes';

@Component({
    selector: 'nueva-venta',
    templateUrl: 'nueva-venta.component.html',
})

export class NuevaVentaComponent implements OnInit
{
    //Aca va la declaracion de variables
    public listFactura: Factura[];
    public fac: Factura = new Factura();
    public hayProductos: boolean;
    public productos: Producto[];
    public prod: Producto;

    public listDetalleFactura: Detalle_factura[];
    public detf: Detalle_factura = new Detalle_factura();

    public clientes: Clientes[] = new Array(); 
    public cli: Clientes = new Clientes();
    public hayClientes: boolean;

    public fecha:Date;
    
    
    constructor(
    private service: VentaService,
    private http2: HttpClient,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router, 
    private route: ActivatedRoute
    ){}
    ngOnInit(): void {
        this.obtenerProductos();
        this.obtenerClientes();
        this.fecha = this.hoyFecha();
    }

    obtenerProductos(){
       this.service.obtenerProductos().subscribe(items =>{
            this.productos = items;
            if(items!=null && items.length!=0) this.hayProductos = true; else; this.hayProductos = false;
        });
        
    }

    @ViewChild('instanceP') instanceP: NgbTypeahead;
    focusP$ = new Subject<string>()
    clickP$ = new Subject<string>()
    searchprod = (text$: Observable<string>) => {
        const debouncedTextProd$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clickWithClosedPopupProd$ = this.clickP$.pipe(filter(() => !this.instanceP.isPopupOpen()));
        const inputFocusProd$ = this.focusP$; 
        return merge(debouncedTextProd$, inputFocusProd$, clickWithClosedPopupProd$).pipe(
            map(term => (term === ""? this.productos
            :this.productos.filter(v => v.nom_producto.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0,10)
            )
        )
    }
    rFormatterProd = (result: {nom_producto: string}) => result.nom_producto; 
    iFormatterProd = (x: {nom_producto:string}) => x.nom_producto;

    obtenerClientes(){
      this.service.obtenerClientes().subscribe(items =>{
           this.clientes = items;
           if(items!=null && items.length!=0) this.hayClientes = true; else; this.hayClientes = false;
          
       });
       
   }
  
   @ViewChild('instanceC') instanceC: NgbTypeahead;
   focusC$ = new Subject<string>()
   clickC$ = new Subject<string>()
   searchcli = (text$: Observable<string>) => {
       const debouncedTextCli$ = text$.pipe(debounceTime(200), distinctUntilChanged());
       const clickWithClosedPopupCli$ = this.clickC$;/* .pipe(filter(() => !this.instanceC.isPopupOpen())); */
       const inputFocusCli$ = this.focusC$; 
       return merge(debouncedTextCli$, inputFocusCli$, clickWithClosedPopupCli$).pipe(
           map(term => (term === ""? this.clientes
           :this.clientes.filter(v => v.nit.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0,10)
           )
       )
   }
   rFormatterCli = (result: {nit: string}) => result.nit; 
   iFormatterCli = (x: {nit:string}) => x.nit;
    
    agregarProducto(content)
    {
        this.detf = new Detalle_factura();
        if(this.verificarNombreProducto)
        {
            console.log(this.prod.nom_producto);
            this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
                
              }, (reason) => {
          
              });
        }
    }

    verificarNombreProducto(): boolean{
        if(typeof this.prod == 'string'){
          return false;
        }else{
          return true;
        }
      }

      hoyFecha(){
        var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth()+1;
            var yyyy = hoy.getFullYear();
            return hoy;
      }
 
}