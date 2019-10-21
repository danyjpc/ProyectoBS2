import { Component, OnInit } from '@angular/core';
import {Proveedor} from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  public items:Proveedor[];
  public item: Proveedor=new Proveedor();
  constructor(private service:ProveedoresService,private http2: HttpClient, 
    private router: Router, private modalService: NgbModal) { }

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
    this.item=new Proveedor();
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
    this.service.findbyId(value.id_proveedor).subscribe(
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
