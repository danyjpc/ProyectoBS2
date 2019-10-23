import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public items:Producto[];
  public item: Producto=new Producto();
  constructor(private service:ProductosService,private http2: HttpClient, private router: Router, private modalService: NgbModal) { }

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

  crearProducto(){
    this.router.navigate(['/crear-producto'])
  }

  editar(){
    this.router.navigate(['/crear-producto'])
  }

}
