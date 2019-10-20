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
    data: { permisos:"1" }
  },
  //Administracion de empleados
  {
    path: 'empleado',
    component: EmpleadosComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },
  {
    path: 'empleadoin',
    component: EmpleadosInComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },
  {
    path: 'crear-empleado',
    component: CrearEmpleadoComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },
  {
    path: 'editar-empleado/:id',
    component: EditarEmpleadoComponent,
    canActivate: [AuthGuard],
    data: { permisos:"1" }
  },

  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
