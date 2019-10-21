import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router'
import { EmpleadoService } from 'src/app/services/empleado.service'
import { Empleado } from 'src/app/models/empleado';
import { isNgTemplate } from '@angular/compiler';


@Component({
    selector: 'editar-empleado',
    templateUrl: 'editar-empleado.component.html',
})

export class EditarEmpleadoComponent implements OnInit{
    //Aca va la declaracion de variables
    public listEmpleado: Empleado[];
    public emp: Empleado = new Empleado();
    public estado: boolean;
    constructor(
        private router: Router,
        private service: EmpleadoService,
        private route: ActivatedRoute
    ){}
    ngOnInit(){
        this.route.params.subscribe(params => this.cargar(params.id));
    }

    guardar(){
        if(this.estado){
            this.emp.estado_activo=1;
        }else{
            this.emp.estado_activo=0;
        }
        this.service.editar(this.emp).subscribe(
            items=>{
                this.router.navigate(['/empleado']);
            }
        );
    }

    cargar(id: number){
        this.service.findbyId(id).subscribe(
            items=>{
                this.emp = items;
                if(this.emp.estado_activo ==1){
                    this.estado = true;
                }else{
                    this.estado = false;
                }
            }
        );
    }


    
}