import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service'
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service'
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Dimension } from 'src/app/models/dimension';
import { Unidad_medida } from 'src/app/models/unidad_medida';
import { UnidadmedidasService } from 'src/app/services/unidadmedidas.service';

@Component({
    selector: 'app-crear-producto',
    templateUrl: './crear-producto.component.html'
})
export class CrearProductosComponent implements OnInit {
    public item: Producto = new Producto();
    public cat: Categoria[];
    public cate: Categoria;
    public itemD: Dimension = new Dimension();
    public listaD: Dimension[] =new Array();
    public uni: Unidad_medida[];
    public unid: Unidad_medida;
    public isCollapsed = true;
    constructor(private service: ProductosService, private http2: HttpClient, private serviceCat: CategoriasService,
        private router: Router, private modalService: NgbModal, private serviceUni: UnidadmedidasService,) { }

    ngOnInit() {
        this.serviceCat.findList().subscribe(
            items => {
                this.cat = items;
            }
        );
        this.serviceUni.findList().subscribe(
            items => {
                this.uni = items;
            }
        );
    }
    //Inicio Typeahead categorias
    @ViewChild('instanceCat') instanceCat: NgbTypeahead;
    focusCat$ = new Subject<string>();
    clickCat$ = new Subject<string>();

    searchCat = (text$: Observable<string>) => {
        const debouncedTextCat$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopupCat$ = this.clickCat$;
        const inputFocusCat$ = this.focusCat$;

        return merge(debouncedTextCat$, inputFocusCat$, clicksWithClosedPopupCat$).pipe(
            map(term => (term === '' ? this.cat
                : this.cat.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    rFormatterCat = (result: { nombre: string }) => result.nombre;
    iFormatterCat = (x: { nombre: string }) => x.nombre;
    //Fin TypeaheaCat

    agregarD(){
        this.itemD.id_unidad_medida=this.unid.id_unidad_medida;
        this.itemD.habilitado=1;
        this.listaD.push(this.itemD);
        this.itemD=new Dimension();
    }

    guardar(){
        this.item.id_categoria = this.cate.id_categoria;
        this.item.habilitado = 1;
        this.service.guardar(this.item).subscribe(
            items => {
                for(var x=0; x<this.listaD.length; x++){
                    this.listaD[x].id_producto=items.id_producto;
                    this.service.guardarD(this.listaD[x]).subscribe(
                        items => {
                            
                        },err => {console.log(err);} 
                    );
                }
                this.router.navigate(['/catalogo-log']);  
            },
            err => {
                console.log(err);
            }
        );
    }

    //Inicio Typeahead categorias
    @ViewChild('instanceUni') instanceUni: NgbTypeahead;
    focusUni$ = new Subject<string>();
    clickUni$ = new Subject<string>();

    searchUni = (text$: Observable<string>) => {
        const debouncedTextUni$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopupUni$ = this.clickUni$;
        const inputFocusUni$ = this.focusUni$;

        return merge(debouncedTextUni$, inputFocusUni$, clicksWithClosedPopupUni$).pipe(
            map(term => (term === '' ? this.uni
                : this.uni.filter(v => v.nom_unidad.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    rFormatterUni = (result: { nom_unidad: string }) => result.nom_unidad;
    iFormatterUni = (x: { nom_unidad: string }) => x.nom_unidad;
    //Fin TypeaheaCat
}
