import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Persona } from 'src/app/models/persona';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
    selector: 'catalogo',
    templateUrl: './cat.component.html',
    styleUrls: ['./cat.component.css']
})

export class CatalogoComponent implements OnInit{
    //Aca va la declaracion de variables
    

    constructor(
        private router: Router,
        private service: ClienteService
    ){}

    ngOnInit(){
        //Aca extraere todos los productos para el catalogo
    }

     
}