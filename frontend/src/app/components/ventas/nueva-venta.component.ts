import {Component, OnInit, ViewChild} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router'
import { EmpleadoService } from 'src/app/services/empleado.service'
import { Factura } from 'src/app/models/factura';
import { VentaService } from 'src/app/services/venta.service';
import { DatePipe } from '@angular/common';
import { Producto } from 'src/app/models/producto';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter,  map } from 'rxjs/operators';
import { Observable, Subject, merge } from 'rxjs';

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

    constructor(
    private service: VentaService,
    private http2: HttpClient,
    private datePipe: DatePipe,
    private router: Router, 
    private route: ActivatedRoute
    ){}
    ngOnInit(): void {
        this.obtenerProductos();
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
    rFormatterProd = (result: {nombre: string}) => result.nombre; 
    iFormatterProd = (x: {nombre:string}) => x.nombre;

}