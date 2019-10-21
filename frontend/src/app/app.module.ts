import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TareasComponent } from './components/tareas/tareas.component';

import {TareasService} from 'src/app/services/tareas.service';
import { LoginComponent } from './components/login';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './components/_helpers';
import { APP_BASE_HREF } from '@angular/common';
import { EmpleadosComponent } from './components/empleados/empleado.component';
import { CrearEmpleadoComponent } from './components/empleados/crear-empleado.component';
import { EditarEmpleadoComponent } from './components/empleados/editar-empleado.component';
import { EmpleadosInComponent } from './components/empleados/empleadoin.component';
import { RolesComponent } from './components/roles/roles.component';
import { CrearRolesComponent } from './components/roles/crear-roles.component';
import { RolesinComponent } from './components/roles/rolesin.component';
import { EditarRolComponent } from './components/roles/editar-rol.component';
import { AsignarPermisosComponent } from './components/roles/asignar-permisos.component';

import { NuevaVentaComponent } from './components/ventas/nueva-venta.component';
import { VentaService } from './services/venta.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TareasComponent, 
    LoginComponent,
    EmpleadosComponent, 
    CrearEmpleadoComponent,
    EditarEmpleadoComponent, 
    EmpleadosInComponent, 
    RolesComponent, 
    CrearRolesComponent, 
    RolesinComponent,
    EditarRolComponent, 
    AsignarPermisosComponent,
    NuevaVentaComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //TareasService
    //Por ahora se esta usando este back end falso solo para simulacion de que si funciona el jwt, aca iria esta parte
    { provide: APP_BASE_HREF, useValue: '/' },
    //fakeBackendProvider
    VentaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
