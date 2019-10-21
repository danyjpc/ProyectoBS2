import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Unidad_medida } from 'src/app/models/unidad_medida';
import { UnidadmedidasService } from 'src/app/services/unidadmedidas.service';
@Component({
  selector: 'app-umedida',
  templateUrl: './umedida.componet.html'
})
export class UmedidaComponent implements OnInit {
  public items:Unidad_medida[];
  public item: Unidad_medida=new Unidad_medida();
  constructor(private service:UnidadmedidasService,private http2: HttpClient, private router: Router, private modalService: NgbModal) { }

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
    this.item=new Unidad_medida();
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
    console.log(value.id_unidad_medida);
    this.service.findbyId(value.id_unidad_medida).subscribe(
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