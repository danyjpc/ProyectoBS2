import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { EmpleadoService } from 'src/app/services/empleado.service'
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/roles.service';

@Component({
    selector: 'rolesin',
    templateUrl: 'rolesin.component.html',
})

export class RolesinComponent implements OnInit{
    //Aca va la declaracion de variables
    public listRoles: Roles[];
    public roles: boolean = false;
    constructor(
        private router: Router,
        private service: RoleService
    ){}

    ngOnInit(){
        this.service.findListIn().subscribe(
            items=>{
                this.listRoles= items;
                if(this.listRoles.length ==0){
                    this.roles= true;
                }
            }, 
            err=>{
                console.log(err);
            }
        );
    }

    crearRol(){
        this.router.navigate(['/crear-roles'])
    }

    editarRol(value){
        this.router.navigate(['/editar-rol', value.id])
    }

    
}