import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { User } from './models/user';
import { NombrePermisos } from './models/nombre_permisos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  currentUser: User;
  user: string;
  public nombres: NombrePermisos = new NombrePermisos();


  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.user= localStorage.getItem('usr');
    
    
  }

  ngOnInit() {
    var perms = localStorage.getItem('permisos');
    if(perms){
      
    if(perms.indexOf("1") != -1){
      this.nombres.admin_roles = true;
    }
    if(perms.indexOf("2") !=-1){
      this.nombres.admin_empleados=true;
    }
    if(perms.indexOf("3") !=-1){
      this.nombres.admin_categorias=true;
    }
    if(perms.indexOf("4") !=-1){
      this.nombres.admin_clientes=true;
    }
    if(perms.indexOf("5") !=-1){
      this.nombres.admin_dimensiones=true;
    }
    if(perms.indexOf("6") !=-1){
      this.nombres.admin_facturas=true;
    }
    if(perms.indexOf("7") !=-1){
      this.nombres.admin_productos=true;
    }
    if(perms.indexOf("8") !=-1){
      this.nombres.admin_proveedores=true;
    }
    if(perms.indexOf("9") !=-1){
      this.nombres.admin_puestos=true;
    }
    if(perms.indexOf("10") !=-1){
      this.nombres.admin_unidad_medida=true;
    }
    if(perms.indexOf("11") !=-1){
      this.nombres.asignar_credenciales=true;
    }
    if(perms.indexOf("12") !=-1){
      this.nombres.admin_kardex=true;
    }
    }
  }

  get isAdmin() {
    //Verifico si el usuario esta logeado, ya que si lo esta tiene que cargar su current en el local storage
    return this.currentUser && this.currentUser.role === Role.Admin;
}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
  
}
