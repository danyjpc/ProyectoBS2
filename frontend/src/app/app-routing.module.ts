import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TareasComponent} from './/components/tareas/tareas.component';

const routes: Routes = [
  //Se configura el componente de inicio
  {
    path: '',
    redirectTo: '//tareas',
    pathMatch: 'full'
  },
  {
    path: 'tareas',
    component: TareasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
