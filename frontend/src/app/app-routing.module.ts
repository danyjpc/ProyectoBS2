import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TareasComponent} from './/components/tareas/tareas.component';
import { LoginComponent } from './components/login';
import { AuthGuard } from './components/_guards';
import { Role } from './models/role';
import { EmpleadosComponent } from './components/empleados/empleado.component';
import { CrearEmpleadoComponent } from './components/empleados/crear-empleado.component';
import { EditarEmpleadoComponent } from './components/empleados/editar-empleado.component';
import { EmpleadosInComponent } from './components/empleados/empleadoin.component';
import { RolesComponent } from './components/roles/roles.component';
import { CrearRolesComponent } from './components/roles/crear-roles.component';
import { RolesinComponent } from './components/roles/rolesin.component';
import { EditarRolComponent } from './components/roles/editar-rol.component';
import { AsignarPermisosComponent } from './components/roles/asignar-permisos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

const routes: Routes = [
  //Se configura el componente de inicio
  {
    path: '',
    redirectTo: '//tareas',
    pathMatch: 'full'
  },
  {
    path: 'tareas',
    component: TareasComponent,
    canActivate: [AuthGuard],
    //
  },
  //Administracion de empleados
  {
    path: 'empleado',
    component: EmpleadosComponent,
    canActivate: [AuthGuard],
    data: { permisos:"2" }
  },
  {
    path: 'empleadoin',
    component: EmpleadosInComponent,
    canActivate: [AuthGuard],
    data: { permisos:"2" }
  },
  {
    path: 'crear-empleado',
    component: CrearEmpleadoComponent,
    canActivate: [AuthGuard],
    data: { permisos:"2" }
  },
  {
    path: 'editar-empleado/:id',
    component: EditarEmpleadoComponent,
    canActivate: [AuthGuard],
    data: { permisos:"2" }
  },
  //Administracion de Roles
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },
  {
    path: 'rolesin',
    component: RolesinComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },
  {
    path: 'crear-roles',
    component: CrearRolesComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },
  {
    path: 'editar-rol/:id',
    component: EditarRolComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },
  {
    path: 'asignar-permisos/:id',
    component: AsignarPermisosComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },


  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'pedidos', 
    component: PedidosComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
