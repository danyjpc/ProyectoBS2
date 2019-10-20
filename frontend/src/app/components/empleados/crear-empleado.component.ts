import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router'
import { EmpleadoService } from 'src/app/services/empleado.service'
import { Empleado } from 'src/app/models/empleado';


@Component({
    selector: 'crear-empleado',
    templateUrl: 'crear-empleado.component.html',
})

export class CrearEmpleadoComponent{
    //Aca va la declaracion de variables
    public listEmpleado: Empleado[];
    public emp: Empleado = new Empleado();
    constructor(
        private router: Router,
        private service: EmpleadoService
    ){}

    guardar(){
        this.emp.estado_activo=1;
        this.service.guardar(this.emp).subscribe(
            items=>{
                this.router.navigate(['/empleado']);
            }
        );
    }


    
}