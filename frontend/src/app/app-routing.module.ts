import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TareasComponent} from './/components/tareas/tareas.component';
import { LoginComponent } from './components/login';
import { AuthGuard } from './components/_guards';
import { Role } from './models/role';

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
    data: { roles: [Role.Admin] }
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
