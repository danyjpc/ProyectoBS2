import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuard } from '../_guards';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
@Component({
  selector: 'catalogo',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})

export class CatalogoComponent implements OnInit {
  //Aca va la declaracion de variables

  public items: Producto[];
  public nomCat: String = "";
  public id_cat = 1;
  public itemDetalle: Producto;
  public usr: string;

  constructor(private router: Router, public auth: AuthenticationService, public act: AuthGuard,
    private service: ProductosService, private serviceCat: CategoriasService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.serviceCat.findbyId(this.id_cat).subscribe(
      item => {
        this.nomCat = item.nombre;
      }
    );
    this.service.obtenerProductoC(this.id_cat).subscribe(
      items => {
        this.items = items;
      },
      err => {
        console.log(err);
      }
    );
  }

  filtro(value) {
    this.id_cat = value;
    this.ngOnInit();
  }

  Detalle(content, value) {
    console.log("detalle cod " + value)
    this.service.findbyId(value).subscribe(
      item => {
        this.itemDetalle = item;

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        }, (reason) => { });

      },
      err => {
        console.log(err);
      }
    );

  }

  get logueado() {
    try {
      if (localStorage.getItem('usr') != '' && localStorage.getItem('usr') != null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;

    }

  }

  agregarCarrito(id) {
    var cart = []
    if (localStorage.getItem('carrito') == null) {
      console.log(cart)
      cart.push(id);
      localStorage.setItem('carrito', JSON.stringify(cart));
      this.notificationSuccess('El producto se agreó al carrito correctamente')
    } else {
      cart = JSON.parse(localStorage.getItem('carrito'));

      if (cart.indexOf(id) == -1) {
        cart.push(id);
        localStorage.setItem('carrito', JSON.stringify(cart));
        this.notificationSuccess('El producto se agreó al carrito correctamente')
        
      }else{
        this.notificationWarning('EL producto ya existe en el carrito')
      }

    }
  }

notificationSuccess(mensaje: string) {
  Swal.fire({
    title: 'Success!',
    text: mensaje,
    icon: 'success',
    confirmButtonText: 'Ok'
  })
}

notificationWarning(mensaje: string){
  Swal.fire({
    title: 'Advertencia!',
    text: mensaje,
    icon: 'warning',
    confirmButtonText: 'Ok'
  })
}





}