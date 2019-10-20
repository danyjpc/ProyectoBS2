import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TareasComponent} from './/components/tareas/tareas.component';
import { LoginComponent } from './components/login';
import { AuthGuard } from './components/_guards';
import { Role } from './models/role';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import {ProductosComponent} from './components/productos/productos.component';
import  { UmedidaComponent } from './components/productos/umedida.component';
import  { CatProductoComponent } from './components/productos/cat-producto.component';

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
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'umedida',
    component: UmedidaComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'cat-producto',
    component: CatProductoComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
