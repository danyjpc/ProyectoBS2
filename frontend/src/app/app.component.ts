import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { User } from './models/user';
import { NombrePermisos } from './models/nombre_permisos';
import { Clientes } from './models/clientes';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { VentaService } from './services/venta.service';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "frontend";
  currentUser: User;
  user: string;
  public x: number = 0;
  public nombres: NombrePermisos = new NombrePermisos();
  public logeado: string;
  


  ngOnInit() {
    
  }


  constructor(private router: Router, private authenticationService: AuthenticationService, private modalService: NgbModal, private service: VentaService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.user = localStorage.getItem('usr');


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
  get catalogo(){
    var array = localStorage.getItem("permisos");
    if (array) {
      array = JSON.parse(array);
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "13") {
          return false;
        }
      }
      return true;
    }

  }

  get usuario() {
    var array = localStorage.getItem("usr");
    var array2 = localStorage.getItem('permisos')
    if (array != null && array2 != null) {
      this.logeado = array;
      return true;
    } else {
      return false;
    }

  }
  get admin_roles() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "1") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_empleados() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "2") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_categorias() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "3") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_clientes() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "4") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_dimensiones() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "5") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_facturas() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "6") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_productos() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "7") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_proveedores() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "8") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_puestos() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "9") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_unidad_medida() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "10") {
          return true;
        }
      }
      return false;
    }
  }
  get asignar_credenciales() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "11") {
          return true;
        }
      }
      return false;
    }
  }
  get admin_kardex() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "12") {
          return true;
        }
      }
      return false;
    }
  }

    get dashboard() {
    var array = localStorage.getItem("permisos");
    //var array2 = localStorage.getItem('permisos2');
    if (array) {
      array = JSON.parse(array);
      //array2 = JSON.parse(array2);
      //array = array + array2;
      for (var x = 0; x < array.length; x++) {
        if (array[x] == "14") {
          return true;
        }
      }
      return false;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/catalogo"]);
  }
}
