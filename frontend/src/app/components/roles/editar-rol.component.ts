import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router'
import { EmpleadoService } from 'src/app/services/empleado.service'
import { Empleado } from 'src/app/models/empleado';
import { isNgTemplate } from '@angular/compiler';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/roles.service';


@Component({
    selector: 'editar-rol',
    templateUrl: 'editar-rol.component.html',
})

export class EditarRolComponent implements OnInit{
    //Aca va la declaracion de variables
    public listRoles: Roles[];
    public rol: Roles = new Roles();
    public estado: boolean;
    constructor(
        private router: Router,
        private service: RoleService,
        private route: ActivatedRoute
    ){}
    ngOnInit(){
        this.route.params.subscribe(params => this.cargar(params.id));
    }

    guardar(){
        if(this.estado){
            this.rol.habilitado=1;
        }else{
            this.rol.habilitado=0;
        }
        this.service.editar(this.rol).subscribe(
            items=>{
                this.router.navigate(['/roles']);
            }
        );
    }

    cargar(id: number){
        if(id > 1){
            this.service.findbyId(id).subscribe(
                items=>{
                    this.rol = items;
                    if(this.rol.habilitado ==1){
                        this.estado = true;
                    }else{
                        this.estado = false;
                    }
                }
            );
        }else{
            this.router.navigate(['/roles']);
        }
        
    }


    
}