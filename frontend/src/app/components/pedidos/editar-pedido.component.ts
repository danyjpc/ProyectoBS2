import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Proveedor } from 'src/app/models/proveedor';
import { NgbTypeahead, NgbModal, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, subscribeOn } from 'rxjs/operators';
import { DetalleKardex } from 'src/app/models/detalle_kardex';
import { Kardex } from 'src/app/models/kardex';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'sel-edita-pedido',
    templateUrl: './editar-pedido.component.html',
    providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class EditarPedidoComponent implements OnInit {
    
    //Variable que guarda los detalles de kardex asociados al kardex que se esta editando
    private detallesKardexList: DetalleKardex[] = new Array();

    //Variable que guarda el kardex que se esta editando
    private kardexActual: Kardex = new Kardex();

    //Variable que guarda el parametro id_kardex que viene en la ruta
    private idKardex: number;

    //Variable que guarda la lista de productos para el typeahead de productos para agregarlo
    private productos: any[] = new Array();

    //Variable que guarda el producto seleccionado del typeahead de productos al agregar uno al pedido
    private productoSeleccionado: any;

    //Variable que guarda la lista de proveedores para el typeahead de proveeodres
    private proveedores: Proveedor[] = new Array();

    //Variable que guarda el proveedor seleccionado del typeahead de proveedor 
    private proveedorSeleccionado: Proveedor;

    //Opcion para el select de tipo de operacion
    private pedido: number = 0;

    //Opcion para el select de tipo de operacion
    private devolucion: number = 1;

    //Variable que gaurda el valor de la cantdidad del producto que se va agrega al pedido
    private cantidad: number;

    //Variable que guarda el valor de unitario del producto que se va agrega al pedido
    private precio_unitario: number;

    //Variable que guarda el producto seleccionado en el typeahead de productos en el modal editar
    private productoSeleccionadoEditar: any;

    //Variable que guarda el item seleccionado de la lista de productos para su edicion
    private productoEditar: any;

    //Variable que guarda los id de los detalles de kardex que se elimminaran al guardar
    private detallesParaEliminar: number[] = new Array();

    //Variable que guarda el nombre del prodcuto que se va a eliminar, para mostrarlo en modal de confirmacion
    private prodEliminar: string;
    private cantEliminar: number;
    private precioEliminar: number;

    //Variable que guarda la cantidad inicial del detalle de kardex a editar
    private idProductoEditar: number;

    //Variable que guarda el id_producto inicial del detalle de kardex a editar
    private cantidadProductoEditar: number;

    //Variable que guarda el precio unitario inicial del detalle de kardex a editar
    private precioProductoEditar: number;

    private paginaActual: number = 1;
    private tamanioPagina: number = 5;
    
    constructor(private router: Router, private route: ActivatedRoute, private service: PedidosService, 
        private modalService: NgbModal, private datePipe: DatePipe) { }

    ngOnInit() { 
        this.route.params.subscribe(params => {
            
            this.idKardex = params.id_kardex;
            
            this.service.obtenerKardex(params.id_kardex).subscribe(kard => {
                this.kardexActual = kard;
                if(kard.fecha_fac != null){
                    let fechaTempStr = kard.fecha_fac.toString();
                    fechaTempStr = fechaTempStr + ".000Z"
                    this.kardexActual.fecha_fac = new Date(this.analizarFecha(fechaTempStr));
                }
                
                this.service.obtenerProveedores().subscribe(provs => {
                    this.proveedores = provs;
                    for (let i = 0; i < provs.length; i++) {
                        if(provs[i].id_proveedor == kard.id_proveedor){
                            this.proveedorSeleccionado = provs[i];
                            break;
                        }                        
                    }
                }, err => {
                    console.log(err);
                })
            }, err => {
                console.log(err);
            });

            this.service.obtenerDetallesPedido(params.id_kardex).subscribe(detalles => {
                this.detallesKardexList = detalles;
            }, err => {
                console.log(err);
            });

            this.service.obtenerProductos().subscribe(prods => {
                this.productos = prods;

            }, err => {
                console.log(err);
            });

            
        });
    }

    analizarFecha(fecha: string){
        var arrFec = fecha.split("");
        var ret: string = "";
        for (let i = 0; i < arrFec.length; i++) {
            if(arrFec[i] == "T"){
                arrFec[i+1] = "0";
                arrFec[i+2] = "6";
                break;
            }            
        }

        for (let i = 0; i < arrFec.length; i++) {
            ret = ret + arrFec[i];        
        }

        console.log(ret)

        return ret;
    }



    regresar(){
        this.router.navigate(['/pedidos']);
    }

    guardar(){
        this.service.actualizarKardex(this.kardexActual).subscribe(kard => {
            this.router.navigate(['/pedidos']);
        }, err => {
            console.log(err);
        });

        for (let i = 0; i < this.detallesParaEliminar.length; i++) {
            this.service.eliminarDetalleKardex(this.detallesParaEliminar[i]).subscribe(detk => {

            }, err => {
                console.log(err);
            })  
        }

        for (let i = 0; i < this.detallesKardexList.length; i++) {
            if(this.detallesKardexList[i].id_detalle_kardex != undefined){
                var obj: DetalleKardex = new DetalleKardex();
                obj.cantidad = this.detallesKardexList[i].cantidad;
                obj.precio_unitario = this.detallesKardexList[i].precio_unitario;
                obj.id_kardex = this.detallesKardexList[i].id_kardex;
                obj.id_producto = this.detallesKardexList[i].id_producto;
                obj.id_detalle_kardex = this.detallesKardexList[i].id_detalle_kardex;
                this.service.editarDetalleKardex(obj).subscribe(detk => {
                    obj = null;
                }, err => {
                    console.log(err);
                });
            }else{
                this.service.guardarDetalleKardex(this.detallesKardexList[i]).subscribe(detk => {
                    
                }, err => {
                    console.log(err)
                });
            }            
        }
    }

    cancelar(){
        this.router.navigate(['/pedidos'])
    }

    agregarProducto(){
        var obj: DetalleKardex = new DetalleKardex();
        obj.cantidad = this.cantidad;
        obj.precio_unitario = this.precio_unitario;
        obj.id_kardex = this.idKardex;
        obj.id_producto = this.productoSeleccionado.id_producto;
        this.detallesKardexList.push(obj);
        this.cantidad = null;
        this.precio_unitario = null;
        this.productoSeleccionado = null;
        console.log(this.detallesKardexList);
    }

    // agregarProducto(){
    //     var obj: DetalleKardex = new DetalleKardex();
    //     obj.cantidad = this.cantidad;
    //     obj.precio_unitario = this.precio_unitario;
    //     obj.id_kardex = this.idKardex;
    //     obj.id_producto = this.productoSeleccionado.id_producto;
    //     this.service.guardarDetalleKardex(obj).subscribe(detk => {
    //         this.cantidad = null;
    //         this.precio_unitario = null;
    //         this.productoSeleccionado = null;
    //         this.service.obtenerDetallesPedido(this.idKardex).subscribe(detalles => {
    //             this.detallesKardexList = detalles;
    //         }, err => {
    //             console.log(err);
    //         });
    //     }, err => {
    //         console.log(err);
    //     });
    // }

    eliminarProducto(modalEliminar, i, item){
        this.prodEliminar = this.buscarProductoParaDetalle(item);
        this.cantEliminar = item.cantidad;
        this.precioEliminar = item.precio_unitario;
        this.modalService.open(modalEliminar).result.then((result) => {
            if(item.id_detalle_kardex != undefined){
                this.detallesParaEliminar.push(item.id_detalle_kardex);
            }
            this.detallesKardexList.splice(i, 1);
            this.prodEliminar = null;
            console.log(this.detallesKardexList);
        }, (reason) => {
            console.log(this.detallesKardexList);
        });
        
    }

    // eliminarProducto(modalEliminar, item){
    //     this.modalService.open(modalEliminar).result.then((result) => {
    //         this.service.eliminarDetalleKardex(item.id_detalle_kardex).subscribe(item => {
    //             this.service.obtenerDetallesPedido(this.idKardex).subscribe(detalles => {
    //                 this.detallesKardexList = detalles;
    //             }, err => {
    //                 console.log(err);
    //             });
    //         }, err => {
    //             console.log(err);
    //         })
    //     }, (reason) => {

    //     });
    // }

    // editarProducto(modalEditar, item){
    //     this.service.obtenerDetalleKardex(item.id_detalle_kardex).subscribe(detk => {
    //         this.productoEditar = detk;
    //         for (let i = 0; i < this.productos.length; i++) {
    //             if(this.productos[i].id_producto == item.id_producto){
    //                 this.productoSeleccionadoEditar = this.productos[i];
    //                 break;
    //             }               
    //         }
    //         this.modalService.open(modalEditar, {size: 'lg'}).result.then((result) => {
    //             this.productoEditar.id_producto = this.productoSeleccionadoEditar.id_producto;
    //             this.service.editarDetalleKardex(this.productoEditar).subscribe(p => {
    //                 this.productoEditar = null;
    //                 this.productoSeleccionadoEditar = null;
    //                 this.service.obtenerDetallesPedido(this.idKardex).subscribe(detalles => {
    //                     this.detallesKardexList = detalles;
    //                 }, err => {
    //                     console.log(err);
    //                 });
    //             }, err => {
    //                 console.log(err);
    //             })
    //         }, (reason) => {
    //             this.productoEditar = null;
    //             this.productoSeleccionadoEditar = null;
    //         });
    //     }, err => {
    //         console.log(err);
    //     })
        
    // }

    editarProducto(modalEditar, i, item){
        this.productoEditar = this.detallesKardexList[i];
        this.productoSeleccionadoEditar = this.buscarProductoParaEditar(item);
        this.idProductoEditar = this.detallesKardexList[i].id_producto;
        this.cantidadProductoEditar = this.detallesKardexList[i].cantidad;
        this.precioProductoEditar = this.detallesKardexList[i].precio_unitario;

        this.modalService.open(modalEditar, {size: 'lg'}).result.then((result) => {
            this.detallesKardexList[i].id_producto = this.productoSeleccionadoEditar.id_producto;
            this.idProductoEditar = this.detallesKardexList[i].id_producto;
            
            this.productoSeleccionadoEditar = null;
            this.idProductoEditar = null;
            this.cantidadProductoEditar = null;
            this.precioProductoEditar = null;
            this.productoEditar = null;
            console.log(this.detallesKardexList);

        }, (reason) => {
            this.detallesKardexList[i].id_producto = this.idProductoEditar;
            this.detallesKardexList[i].cantidad = this.cantidadProductoEditar;
            this.detallesKardexList[i].precio_unitario = this.precioProductoEditar;

            this.productoSeleccionadoEditar = null;
            this.idProductoEditar = null;
            this.cantidadProductoEditar = null;
            this.precioProductoEditar = null;
            this.productoEditar = null;
            console.log(this.detallesKardexList);
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

    calcularTotal(): number{
        var total: number = 0;
        for (let i = 0; i < this.detallesKardexList.length; i++) {
            total = total + (this.detallesKardexList[i].cantidad * this.detallesKardexList[i].precio_unitario);
        }

        return total;
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




}