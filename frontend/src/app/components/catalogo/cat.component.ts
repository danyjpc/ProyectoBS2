import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Persona } from 'src/app/models/persona';
import { ClienteService } from 'src/app/services/clientes.service';
import { templateJitUrl } from '@angular/compiler';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuard } from '../_guards';

@Component({
    selector: 'catalogo',
    templateUrl: './cat.component.html',
    styleUrls: ['./cat.component.css']
})

export class CatalogoComponent implements OnInit{
    //Aca va la declaracion de variables
    
    
    public usr: string;

    constructor(
        private router: Router,
        public auth: AuthenticationService, 
        public act: AuthGuard
    ){}

    ngOnInit(){
       
        
    }

    get logueado(){
        try {
            if(localStorage.getItem('usr') != '' && localStorage.getItem('usr') != null){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            return false;
            
        }
        
    }

    
     
}