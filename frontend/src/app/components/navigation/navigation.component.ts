import { Component, OnInit } from "@angular/core";
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
