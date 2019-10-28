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

@Component({
    selector: 'app-crear-producto',
    templateUrl: './crear-producto.component.html'
})
export class CrearProductosComponent implements OnInit {
    public item: Producto = new Producto();
    public cat: Categoria[];
    public cate: Categoria;

    constructor(private service: ProductosService, private http2: HttpClient, private serviceCat: CategoriasService,
        private router: Router, private modalService: NgbModal) { }

    ngOnInit() {
        this.serviceCat.findList().subscribe(
            items => {
                this.cat = items;
                console.log(this.cat)
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

    guardar(){
        this.item.id_categoria = this.cate.id_categoria;
        //this.item.habilitado = 1;
        this.service.guardar(this.item).subscribe(
            items => {
                this.router.navigate(['/productos']);
            },
            err => {
                console.log(err);
            }
        );
    }

    nuevo(content){
        //this.item=new Categoria();
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          /*this.service.guardar(this.item).subscribe(
            items => {
              console.log(items);
              this.ngOnInit();
            },
            err => {
              console.log(err);
            }
          );*/
        }, (reason) => {
    
        });
        
      }
}
