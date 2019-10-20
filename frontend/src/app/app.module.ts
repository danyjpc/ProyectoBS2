import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TareasComponent } from './components/tareas/tareas.component';

import {TareasService} from 'src/app/services/tareas.service';
import { LoginComponent } from './components/login';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './components/_helpers';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UmedidaComponent } from './components/productos/umedida.component';
import { CatProductoComponent } from './components/productos/cat-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TareasComponent, 
    LoginComponent, ProveedoresComponent, ProductosComponent, UmedidaComponent,
    CatProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    //{ provide: APP_BASE_HREF, useValue: '/' },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
