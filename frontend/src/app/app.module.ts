import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TareasComponent } from './components/tareas/tareas.component';

import {TareasService} from 'src/app/services/tareas.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TareasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TareasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
