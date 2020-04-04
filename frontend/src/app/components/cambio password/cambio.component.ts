import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { EmpleadoService } from "src/app/services/empleado.service";
import { Persona } from "src/app/models/persona";
import { CambioPass } from "src/app/models/cambio";

@Component({
  selector: "cambiar-contrasenia",
  templateUrl: "cambio.component.html"
})
export class CambioPassword implements OnInit {
  //Aca va la declaracion de variables
  public user: CambioPass = new CambioPass();
  public pass: boolean;
  constructor(private router: Router, private service: EmpleadoService) {}

  ngOnInit() {}

  guardar() {
    if (this.user.PasswordNuevo == this.user.PasswordConfirmar) {
        this.pass= false;
      this.user.email = localStorage.getItem("usr");
      this.service.editarPass(this.user).subscribe(items => {
        this.router.navigate(["/tareas"]);
      });
    }else{
        this.pass = true;
    }
  }
}
