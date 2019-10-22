import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { User } from './models/user';
import { Cliente } from './models/cliente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontend';
  currentUser: User;


  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {}

  get isAdmin() {
    //Verifico si el usuario esta logeado, ya que si lo esta tiene que cargar su current en el local storage
    return this.currentUser && this.currentUser.role === Role.Admin;
}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
  
}
