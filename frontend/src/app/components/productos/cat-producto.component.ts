import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cat-producto',
  templateUrl: './cat-producto.component.html'
})
export class CatProductoComponent implements OnInit {

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