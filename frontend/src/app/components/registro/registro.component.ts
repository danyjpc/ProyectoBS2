import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Persona } from 'src/app/models/persona';
import { ClienteService } from 'src/app/services/clientes.service';
import { UserInfo } from 'src/app/models/userinfo';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router, private service: ClienteService, private serviceU: UserService,
  private serviceRol: RoleService) { }

  public cliente: Persona = new Persona();
  public usuario: UserInfo = new UserInfo();

  ngOnInit() {
  }

  guardar() {
    //Crear persona
    this.cliente.habilitado = true;
    this.service.guardar(this.cliente).subscribe(
      items => {

        //Crear usuario
        this.usuario.cod_empleado = items.id_persona;
        this.usuario.estado_activo = 1;
        this.serviceU.crear(this.usuario).subscribe(
          data => {
            //asignar role a cliente
            this.serviceRol.rolCliente(this.usuario.email).subscribe(items => {
            localStorage.setItem('usr',this.usuario.email);
            this.router.navigate(['/catalogo-log']);
            }
            );    
          },
          error => {
            console.log("Ocurrio un error ...");
          }
        );
      }
    );
  }

}
