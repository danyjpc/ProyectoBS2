import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Proveedor } from 'src/app/models/proveedor';
import { NgbTypeahead, NgbModal, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { DetalleKardex } from 'src/app/models/detalle_kardex';
import { Kardex } from 'src/app/models/kardex';
import { Producto } from 'src/app/models/producto';

@Component({
    selector: 'sel-nuevo-pedido',
    templateUrl: './nuevo-pedido.component.html',
    providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class NuevoPedidoComponent implements OnInit {

    private fecha: Date;
    private tipoOperacion: number = 0;
    private pedido: number = 0;
    private devolucion: number = 1;
    private proveedores: Proveedor[] = new Array();
    private proveedorSeleccionado: Proveedor;
    private productos: any[] = new Array();
    private productoSeleccionado: any;
    private detalleKardexList: DetalleKardex[] = new Array();
    private cantidad: number;
    private precio_unitario: number;
    private nuevoKardex: Kardex = new Kardex;
    private prodEliminar: string = "";
    private cantEliminar: number;
    private precioEliminar: number;

    private productoSeleccionadoEditar: any;
    private productoEditar: any;
    private idProductoEditar: number;
    private cantidadProductoEditar: number;
    private precioProductoEditar: number;

    private paginaActual: number = 1;
    private tamanioPagina: number = 5;

    //Variables para validacion
    private bordeNumFactura: string = "";
    private bordeSerieFactura: string = "";
    private bordeFechaFactura: string = "";
    private bordeProveedor: string = "";

    private bordeProducto: string = "";
    private bordeCantidad: string = "";
    private bordePrecio: string = "";
    private presionoAgregar: boolean;

    private bordeProductoEditar: string = "";
    private bordePrecioEditar: string = "";
    private bordeCantidadEditar: string = "";

    private camposInvalidos: boolean = false;

    private tempValidacion: boolean = false;
    constructor(private router: Router, private service: PedidosService, private modalService: NgbModal) { }

    ngOnInit() { 
        this.service.obtenerProveedores().subscribe(provs => {
            this.proveedores = provs;
        }, err => {
            console.log(err);
        });

        this.service.obtenerProductos().subscribe(prods => {
            this.productos = prods;
        }, err => {
            console.log(err);
        })
    }

    regresar(){
        this.router.navigate(['/pedidos']);
    }

    @ViewChild('campinv') alertCamposInvalidos: ElementRef;

    guardar(){
        if(this.validacionNumFactura() && this.validacionSerieFactura() 
        && this.validacionFecha(this.nuevoKardex.fecha_fac) && this.validacionProveedor()){
            this.camposInvalidos = false;
            console.log(this.fecha)
            this.nuevoKardex.fecha_fac = this.fecha;
            this.nuevoKardex.validado = 0;
            this.nuevoKardex.tipo_operacion = this.tipoOperacion;
            this.nuevoKardex.id_proveedor = this.proveedorSeleccionado.id_proveedor;
            this.service.guardarKardex(this.nuevoKardex).subscribe(kard => {
                for (let i = 0; i < this.detalleKardexList.length; i++) {
                    this.detalleKardexList[i].id_kardex = kard.id_kardex;  
                    this.service.guardarDetalleKardex(this.detalleKardexList[i]).subscribe(detkar => {

                    }, err => {
                        console.log(err);
                    })              
                }
                this.router.navigate(['/pedidos']);
            }, err => {
                console.log(err);
            })
        }else{
            this.camposInvalidos = true;
            this.alertCamposInvalidos.nativeElement.focus();
        }
        
    }

    cancelar(){
        this.router.navigate(['/pedidos']);
    }

    //Typeahead para proveedores
    @ViewChild('instanceProv') instanceProv: NgbTypeahead;
    focusProv$ = new Subject<string>()
    clickProv$ = new Subject<string>()
    searchProv = (text$: Observable<string>) => {
        const debouncedTextProv$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clickWithClosedPopupProv$ = this.clickProv$.pipe(filter(() => !this.instanceProv.isPopupOpen())); 
        const inputFocusProv$ = this.focusProv$; 

        return merge(debouncedTextProv$, inputFocusProv$, clickWithClosedPopupProv$).pipe(
            map(term => (term === ""? this.proveedores.slice(0, 5)
            :this.proveedores.filter(p => (p.nom_proveedor + " - " + p.direccion).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0,5))
            )   
        )
    }
    rFormatterProv = (result: {nom_proveedor: string, direccion: string}) => result.nom_proveedor + " - " + result.direccion;
    iFormatterProv = (x: {nom_proveedor: string, direccion : string}) => x.nom_proveedor + " - " + x.direccion;


    // Typeahead para productos
    @ViewChild('instanceProd') instanceProd: NgbTypeahead;
    focusProd$ = new Subject<string>();
    clickProd$ = new Subject<string>();
    searchProd = (text$: Observable<string>) => {
        const debouncedTextProd$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clickWithClosedPopupProd$ = this.clickProd$.pipe(filter(() => !this.instanceProd.isPopupOpen()));
        const inputFocusProd$ = this.focusProd$;

        return merge(debouncedTextProd$, inputFocusProd$, clickWithClosedPopupProd$).pipe(
            map(term => (term === "" ? this.productos.slice(0, 5)
            : this.productos.filter(p => ("[" + p.cod_producto + "]" + " " + p.nom_producto + " - " + p.categoria).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5))
            )
        )
    }

    rFormatterProd = (result: {cod_producto: string, nom_producto: string, categoria: string}) => "[" + result.cod_producto + "]" + " " + result.nom_producto + " - " + result.categoria;
    iFormatterProd = (x: {cod_producto: string, nom_producto: string, categoria: string}) => "[" + x.cod_producto + "]" + " " + x.nom_producto + " - " + x.categoria;

    @ViewChild('producto') inputProducto: ElementRef;

    agregarProducto(){
        if(this.validacionProducto() && this.validacionCantidadProducto() && this.validacionPrecioUnitario()){
            var obj: DetalleKardex = new DetalleKardex();
            obj.id_producto = this.productoSeleccionado.id_producto;
            obj.cantidad = this.cantidad;
            obj.precio_unitario = this.precio_unitario;

            this.detalleKardexList.push(obj);

            this.cantidad = null;
            this.precio_unitario = null;
            this.productoSeleccionado = null;

            console.log(this.detalleKardexList);

            this.inputProducto.nativeElement.focus();

            this.bordeProducto = "";
            this.bordeCantidad = "";
            this.bordePrecio = "";
        }
    }

    buscarProductoParaDetalle(item): string{
        var nombreProducto = "";
        for (let i = 0; i < this.productos.length; i++) {
            if(this.productos[i].id_producto == item.id_producto){
                nombreProducto = "[" + this.productos[i].cod_producto + "] " + this.productos[i].nom_producto + " - " + this.productos[i].categoria;
                break;
            }            
        }

        return nombreProducto;
    }

    eliminarProducto(modalEliminar, indice, item){
        this.prodEliminar = this.buscarProductoParaDetalle(item);
        this.cantEliminar = item.cantidad;
        this.precioEliminar = item.precio_unitario;
        this.modalService.open(modalEliminar).result.then((result) => {
            this.detalleKardexList.splice(indice, 1);
            this.prodEliminar = null;
        }, (reason) => {

        });
    }

    buscarProductoParaEditar(item): string{
        var producto = null;
        for (let i = 0; i < this.productos.length; i++) {
            if(this.productos[i].id_producto == item.id_producto){
                producto = this.productos[i];
                break;
            }            
        }

        return producto;
    }

    // Typeahead para productos en editar
    @ViewChild('instanceProdEditar') instanceProdEditar: NgbTypeahead;
    focusProdEditar$ = new Subject<string>();
    clickProdEditar$ = new Subject<string>();
    searchProdEditar = (text$: Observable<string>) => {
        const debouncedTextProdEditar$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clickWithClosedPopupProdEditar$ = this.clickProdEditar$;
        const inputFocusProdEditar$ = this.focusProdEditar$;

        return merge(debouncedTextProdEditar$, inputFocusProdEditar$, clickWithClosedPopupProdEditar$).pipe(
            map(term => (term === "" ? this.productos.slice(0, 5)
            : this.productos.filter(p => ("[" + p.cod_producto + "]" + " " + p.nom_producto + " - " + p.categoria).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5))
            )
        )
    }

    rFormatterProdEditar = (result: {cod_producto: string, nom_producto: string, categoria: string}) => "[" + result.cod_producto + "]" + " " + result.nom_producto + " - " + result.categoria;
    iFormatterProdEditar = (x: {cod_producto: string, nom_producto: string, categoria: string}) => "[" + x.cod_producto + "]" + " " + x.nom_producto + " - " + x.categoria;


    editarProducto(modalEditar, indice){
        if(!this.tempValidacion){
            this.idProductoEditar = this.detalleKardexList[indice].id_producto;
            this.cantidadProductoEditar = this.detalleKardexList[indice].cantidad;
            this.precioProductoEditar = this.detalleKardexList[indice].precio_unitario;
            this.productoSeleccionadoEditar = this.buscarProductoParaEditar(this.detalleKardexList[indice]);    
        }else{
            this.productoSeleccionadoEditar = null;
        }
            
        
        
        this.productoEditar = this.detalleKardexList[indice];
        

        this.modalService.open(modalEditar, {size: 'lg'}).result.then((result) => {
            if(this.validacionProductoEditar() && this.validacionCantidadEditar() && this.validacionPrecioEditar()){
                this.tempValidacion = false;
                this.detalleKardexList[indice].id_producto = this.productoSeleccionadoEditar.id_producto;
                this.idProductoEditar = this.detalleKardexList[indice].id_producto;
                
                this.productoSeleccionadoEditar = null;
                this.idProductoEditar = null;
                this.cantidadProductoEditar = null;
                this.precioProductoEditar = null;
                this.productoEditar = null;

                this.bordeProductoEditar = "";
                this.bordeCantidadEditar = "";
                this.bordePrecioEditar = "";
            }else{
                this.tempValidacion = true;
                this.editarProducto(modalEditar, indice);
            }
            

        }, (reason) => {
            this.tempValidacion = false;

            this.detalleKardexList[indice].id_producto = this.idProductoEditar;
            this.detalleKardexList[indice].cantidad = this.cantidadProductoEditar;
            this.detalleKardexList[indice].precio_unitario = this.precioProductoEditar;

            this.productoSeleccionadoEditar = null;
            this.idProductoEditar = null;
            this.cantidadProductoEditar = null;
            this.precioProductoEditar = null;
            this.productoEditar = null;

            this.bordeProductoEditar = "";
            this.bordeCantidadEditar = "";
            this.bordePrecioEditar = "";
        });
    }

    calcularTotal(): number{
        var total: number = 0;
        for (let i = 0; i < this.detalleKardexList.length; i++) {
            total = total + (this.detalleKardexList[i].cantidad * this.detalleKardexList[i].precio_unitario);
        }

        return total;
    }

    //Metodos para la validacion de campos

    //Validacion de datso factura
    validacionNumFactura(): boolean{

        if(this.nuevoKardex.num_factura != null){
            this.bordeNumFactura = this.nuevoKardex.num_factura >= 0 && this.nuevoKardex.num_factura%1 == 0 && !this.esCadenaVacia(this.nuevoKardex.num_factura.toString()) 
            ? "border-success" : "border-danger";
            return this.nuevoKardex.num_factura >= 0 && this.nuevoKardex.num_factura%1 == 0 && !this.esCadenaVacia(this.nuevoKardex.num_factura.toString());
        }else{
            this.bordeNumFactura = "";
            return true;
        }
    }

    validacionSerieFactura(): boolean{
        if(this.nuevoKardex.serie_factura != null){
            this.bordeSerieFactura = !this.esCadenaVacia(this.nuevoKardex.serie_factura)
            ? "border-success" : "border-danger";
            return !this.esCadenaVacia(this.nuevoKardex.serie_factura);
        }else{
            this.bordeSerieFactura = "";
            return true;
        }
    }

    validacionFecha(fecha): boolean{
        if(fecha != null){
            this.bordeFechaFactura = typeof fecha == 'object' ? "border-success" : "border-danger";
            return typeof fecha == 'object';
        }else{
            this.bordeFechaFactura = "";
            return true;
        }
    }

    validacionProveedor(): boolean{
        if(this.proveedorSeleccionado != null){
            this.bordeProveedor = this.proveedorSeleccionado.id_proveedor != undefined ? "border-success" : "border-danger";
            return this.proveedorSeleccionado.id_proveedor != undefined;
        }else{
            this.bordeProveedor = "border-danger";
            return false;
        }
        
    }


    //Validacion para agregar producto
    validacionProducto(): boolean{
        if(this.productoSeleccionado != null){
            this.bordeProducto = this.productoSeleccionado.id_producto != undefined ? "border-success" : "border-danger";
            return this.productoSeleccionado.id_producto != undefined;
        }else{
            this.bordeProducto = "border-danger"
            return false;
        }
    }

    validacionCantidadProducto(): boolean{
        this.bordeCantidad = this.cantidad != null && this.cantidad > 0 ? "border-success" : "border-danger";
        return this.cantidad != null && this.cantidad > 0;
    }

    validacionPrecioUnitario(): boolean{
        this.bordePrecio = this.precio_unitario != null && this.precio_unitario > 0 ? "border-success" : "border-danger";
        return this.precio_unitario != null && this.precio_unitario > 0;
    }

    //Validacion editar producto
    validacionProductoEditar(): boolean{
        if(this.productoSeleccionadoEditar != null){
            this.bordeProductoEditar = this.productoSeleccionadoEditar.id_producto != undefined ? "border-success" : "border-danger";
            return this.productoSeleccionadoEditar.id_producto != undefined;
        }else{
            this.productoSeleccionadoEditar = null;
            this.bordeProductoEditar = "border-danger";
            return false;
        }
    }

    validacionCantidadEditar(): boolean{
        this.bordeCantidadEditar = this.productoEditar.cantidad != null && this.productoEditar.cantidad > 0 ? "border-success" : "border-danger";
        return this.productoEditar.cantidad != null && this.productoEditar.cantidad > 0;
    }

    validacionPrecioEditar(): boolean{
        this.bordePrecioEditar = this.productoEditar.precio_unitario != null && this.productoEditar.precio_unitario > 0 ? "border-success" : "border-danger";
        return this.productoEditar.precio_unitario != null && this.productoEditar.precio_unitario > 0;
    }

    validacionGeneral(): boolean{
        return this.validacionNumFactura() && this.validacionSerieFactura() 
        && this.validacionFecha(this.nuevoKardex.fecha_fac) && this.validacionProducto();
    }

    //True: cadena vacia, False cadena llena
    esCadenaVacia(str: string): boolean{
        if(str != undefined){
            var cont = 0;
            var arrStr = str.split("");
            for (let index = 0; index < arrStr.length; index++) {
                if(arrStr[index] == " "){
                    cont++;
                }
            }

            return cont == arrStr.length;

        }else{
            return true;
        }   
    }

    


}