import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Puestos } from 'src/app/models/puesto';
import { PuestosService } from 'src/app/services/puestos.service';

@Component({
    selector: 'puestos',
    templateUrl: 'puestos.component.html',
})

export class PuestosComponent implements OnInit{
    //Aca va la declaracion de variables
    public listPuestos: Puestos[];
    public puestos: boolean= false;;
    constructor(
        private router: Router,
        private service: PuestosService
    ){}

    ngOnInit(){
        this.service.findList().subscribe(
            items=>{
                this.listPuestos= items;
                if(this.listPuestos.length ==0){
                    this.puestos = true;
                }
            }, 
            err=>{
                console.log(err);
            }
        );
        
    }

    crearPuesto(){
        this.router.navigate(['/crear-puesto'])
    }

    editarPuesto(value){
        this.router.navigate(['/editar-puesto', value.cod_puesto])
    }



    
}