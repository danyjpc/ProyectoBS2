import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { PermisosService } from 'src/app/services/permisos.service';
import { Permiso } from 'src/app/models/permisos';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    public items: any [];
    public perm: Array<number> = new Array();
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService, 
        private permisos: PermisosService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.perm = new Array();
        const currentUser = this.authenticationService.currentUserValue;
        var p= localStorage.getItem('permisos');
        //console.log(localStorage.getItem('usr'))
        //Verifica si el user esta logeado
        if (currentUser && localStorage.getItem('currentUser') != '' && localStorage.getItem('currentUser') != null) {
            this.llenarStorage();
            // verifica los permisos
            if (route.data.permisos && p.indexOf(route.data.permisos) === -1){
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/catalogo'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    
    llenarStorage(){
        this.perm = new Array();
        this.permisos.findPermisos().subscribe(
            items => {
                this.items = items;
                for(var x=0; x< this.items.length;x++){
                    this.perm.push(this.items[x].cod_permiso);
                }
                localStorage.setItem('permisos',JSON.stringify(this.perm));
            },
            err => {
              console.log(err);
            }
       
          );
          
          
        
    }
}