import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-cat-producto',
  templateUrl: './cat-producto.component.html'
})
export class CatProductoComponent implements OnInit {
  public items:Categoria[];
  public item: Categoria=new Categoria();
  constructor(private service:CategoriasService,private http2: HttpClient, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.service.findList().subscribe(
      items =>{
        this.items=items;
        console.log(items);
      },
      err => {
        console.log(err);
      }
    );
  }

  nuevo(content){
    this.item=new Categoria();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.item.habilitado=1;
      this.service.guardar(this.item).subscribe(
        items => {
          console.log(items);
          this.ngOnInit();
        },
        err => {
          console.log(err);
        }
      );
    }, (reason) => {

    });
  }

  editar(content, value){
    this.service.findbyId(value.id_categoria).subscribe(
      items => {
        this.item=items;
        console.log(this.item);
      },
      err => {
        console.log(err);
      }
    );
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.service.editar(this.item).subscribe(
        items => {
            console.log(items);
            this.ngOnInit();
        },
        err => {
          console.log(err);
        }
      );
    }, (reason) => {

    });
  }
}