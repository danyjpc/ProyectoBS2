import {Component, OnInit} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/roles.service';
import { PuestosService } from 'src/app/services/puestos.service';
import { Puestos } from 'src/app/models/puesto';


@Component({
    selector: 'editar-puesto',
    templateUrl: 'editar-puesto.component.html',
})

export class EditarPuestoComponent implements OnInit{
    //Aca va la declaracion de variables
    public puesto: Puestos = new Puestos();
    public estado: boolean;
    constructor(
        private router: Router,
        private service: PuestosService,
        private route: ActivatedRoute
    ){}
    ngOnInit(){
        this.route.params.subscribe(params => this.cargar(params.cod_puesto));
    }

    guardar(){
        if(this.estado){
            this.puesto.habilitado=1;
        }else{
            this.puesto.habilitado=0;
        }
        this.service.editar(this.puesto).subscribe(
            items=>{
                this.router.navigate(['/puestos']);
            }
        );
    }

    cargar(id: number){
            this.service.findbyId(id).subscribe(
                items=>{
                    this.puesto = items;
                    if(this.puesto.habilitado ==1){
                        this.estado = true;
                    }else{
                        this.estado = false;
                    }
                }
            );
        
        
    }


    
}