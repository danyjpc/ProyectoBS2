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
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ProductosComponent } from './components/productos/productos.component';
import { UmedidaComponent } from './components/productos/umedida.component';
import { UnidadmedidasService } from 'src/app/services/unidadmedidas.service';
import { CatProductoComponent } from './components/productos/cat-producto.component';
import { CategoriasService } from 'src/app/services/categorias.service';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { EmpleadosComponent } from './components/empleados/empleado.component';
import { CrearEmpleadoComponent } from './components/empleados/crear-empleado.component';
import { EditarEmpleadoComponent } from './components/empleados/editar-empleado.component';
import { EmpleadosInComponent } from './components/empleados/empleadoin.component';
import { RolesComponent } from './components/roles/roles.component';
import { CrearRolesComponent } from './components/roles/crear-roles.component';
import { RolesinComponent } from './components/roles/rolesin.component';
import { EditarRolComponent } from './components/roles/editar-rol.component';
import { AsignarPermisosComponent } from './components/roles/asignar-permisos.component';
import { PuestosComponent } from './components/puestos/puestos.component';
import { CrearPuestoComponent } from './components/puestos/crear-puesto.component';
import { PuestosInComponent } from './components/puestos/puestosin.component';
import { EditarPuestoComponent } from './components/puestos/editar-puesto.component';

import { CambioPassword } from './components/cambio password/cambio.component';
import { AsignarCredencialesComponent } from './components/empleados/asignar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesInComponent } from './components/clientes/clientesin.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente.component';
import { EditarClienteComponent } from './components/clientes/editar-cliente.component';

import { NuevaVentaComponent } from './components/ventas/nueva-venta.component';
import { VentaService } from './services/venta.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TareasComponent, 
    LoginComponent, 
    ProveedoresComponent, 
    ProductosComponent, 
    UmedidaComponent,
    CatProductoComponent,
    EmpleadosComponent, 
    CrearEmpleadoComponent,
    EditarEmpleadoComponent, 
    EmpleadosInComponent, 
    RolesComponent, 
    CrearRolesComponent, 
    RolesinComponent,
    EditarRolComponent, 

    AsignarPermisosComponent, 
    PuestosComponent, 
    CrearPuestoComponent, 
    PuestosInComponent, 
    EditarPuestoComponent, 
    CambioPassword,
    AsignarCredencialesComponent,
    ClientesComponent,
    ClientesInComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    NuevaVentaComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //TareasService
    //Por ahora se esta usando este back end falso solo para simulacion de que si funciona el jwt, aca iria esta parte
    { provide: APP_BASE_HREF, useValue: '/' },
    //fakeBackendProvider
    VentaService,
    ProveedoresService,
    CategoriasService,
    UnidadmedidasService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
