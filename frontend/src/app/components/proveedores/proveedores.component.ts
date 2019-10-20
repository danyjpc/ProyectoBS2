import { Component, OnInit } from '@angular/core';
import {Proveedor} from 'src/app/models/proveedor';
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
  constructor(private http2: HttpClient, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
  }

  nuevo(content){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      
    }, (reason) => {

    });
  }

  editar(content){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      
    }, (reason) => {

    });
  }
}
