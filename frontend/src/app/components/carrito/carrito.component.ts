import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthGuard } from '../_guards';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { element } from '@angular/core/src/render3';
import { Factura } from 'src/app/models/factura';

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
})

export class CarritoComponent implements OnInit {
  //Aca va la declaracion de variables
  public products: Producto[];
  public cant: Number = 0;
  public cProds: any[];
  public cantProducts: any[];
  public cantidad: Number = 1;
  public total: number =0;
  public carritoVacio: boolean;
  public totalCompra: number =0;
  public fact: Factura  = new Factura();
  
  constructor(private router: Router, public act: AuthGuard,
    private service: ProductosService, private modalService: NgbModal,
  ) { }

  ngOnInit() {
    //Extraigo los valores que se tienen en el carrito de compras 
    try {
      this.cant = JSON.parse(localStorage.getItem('carrito')).length;
      this.cantProducts = JSON.parse(localStorage.getItem('carrito'));
      console.log(this.cantProducts);

    } catch (error) {
      this.carritoVacio = true;
    }
    //Extraigo todos los productos del carrito de compras
    this.extraerProductos();    
  }

  extraerProductos() {
    try {
      var products = []
      for (var x = 0; x < this.cantProducts.length; x++) {
        this.service.findbyId(this.cantProducts[x]).subscribe(
          items => {
            items.cantidad=1;
            products.push(Object.assign({}, items));
            localStorage.setItem('arrProds', JSON.stringify(products));
            this.totalCompra = this.totalCompra + (items.cantidad*items.precio_unitario);
            localStorage.setItem('totalCompra', JSON.stringify(this.totalCompra));
          }
        );
      }
      this.products = products;
     // localStorage.setItem('carrito', JSON.stringify(products));
    } catch (error) {
      console.log('No se encuentran elementos en el carrito');
    }
 

  }



  eliminardelCarrito(indice: number){
    
    this.products.splice(indice,1);
    var cart = JSON.parse(localStorage.getItem('carrito'));
    cart.splice(indice,1);
    localStorage.setItem('carrito', JSON.stringify(cart));
    this.cantProducts = JSON.parse(localStorage.getItem('carrito'));
    
    var products = []
    for (var x = 0; x < this.cantProducts.length; x++) {
      this.service.findbyId(this.cantProducts[x]).subscribe(
        items => {
          products.push(items);
          localStorage.setItem('arrProds', JSON.stringify(products));
          this.totalCompra = this.totalCompra + (items.cantidad*items.precio_unitario);
          localStorage.setItem('totalCompra', JSON.stringify(this.totalCompra));
        }
      );
    }

    if(cart.length == 0){
      localStorage.removeItem('carrito');
      this.cant =0;
      this.carritoVacio= true;
    }
    this.actualizarTotal();
  }


  actualizarTotal(){
    console.log('enrtra')
    this.totalCompra=0
    for(var x =0; x<this.products.length; x++){
      this.totalCompra = this.totalCompra + (this.products[x].cantidad * this.products[x].precio_unitario);
      localStorage.setItem('totalCompra', JSON.stringify(this.totalCompra));
    }
  }

  open(content){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => { });
  }

}