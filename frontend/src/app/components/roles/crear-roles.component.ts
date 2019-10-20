import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { EmpleadoService } from 'src/app/services/empleado.service'
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/roles.service';


@Component({
    selector: 'crear-roles',
    templateUrl: 'crear-roles.component.html',
})

export class CrearRolesComponent{
    //Aca va la declaracion de variables
    public listRoles: Roles[];
    public rol: Roles = new Roles();
    constructor(
        private router: Router,
        private service: RoleService
    ){}

    guardar(){
        this.rol.habilitado=1;
        this.service.guardar(this.rol).subscribe(
            items=>{
                this.router.navigate(['/roles']);
            }
        );
    }


    
}