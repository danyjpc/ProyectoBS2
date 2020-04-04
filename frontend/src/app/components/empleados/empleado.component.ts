import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router'
import { EmpleadoService } from 'src/app/services/empleado.service'
import { Persona } from 'src/app/models/persona';

@Component({
    selector: 'empleado',
    templateUrl: 'empleado.component.html',
})

export class EmpleadosComponent implements OnInit{
    //Aca va la declaracion de variables
    public listEmpleado: Persona[];
    public empleados: boolean = false;
    constructor(
        private router: Router,
        private service: EmpleadoService
    ){}

    ngOnInit(){
        this.service.findList().subscribe(
            items=>{
                this.listEmpleado= items;
                if(this.listEmpleado.length == 0){
                    this.empleados = true;
                }
            }, 
            err=>{
                console.log(err);
            }
        );
    }

    crearEmpleado(){
        this.router.navigate(['/crear-empleado'])
    }

    editarEmpleado(value){
        this.router.navigate(['/editar-empleado', value.id_persona])
    }

    credenciales(value){
        this.router.navigate(['/asignar-credenciales', value.id_persona])
    }

    
}