import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Persona } from 'src/app/models/persona';
import { ClienteService } from 'src/app/services/clientes.service';
import { UserInfo } from 'src/app/models/userinfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router, private service: ClienteService, private serviceU: UserService) { }

  public cliente: Persona = new Persona();
  public usuario: UserInfo = new UserInfo();

  ngOnInit() {
  }

  guardar() {
    this.cliente.habilitado = true;
    this.service.guardar(this.cliente).subscribe(
      items => {
        console.log("Persona creada "+items.id_persona)
        this.usuario.cod_empleado = items.id_persona;
        this.usuario.estado_activo = 1;
        console.log("Usuario "+this.usuario.cod_empleado, this.usuario.email, this.usuario.password);
        this.serviceU.crear(this.usuario).subscribe(
          data => {
            localStorage.setItem('usr', data.email);

            this.router.navigate(['/catalogo-log']);
          },
          error => {
            console.log("Ocurrio un error ...");
          }
        );
      }
    );
  }

}
