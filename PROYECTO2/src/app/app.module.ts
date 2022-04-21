import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContenedorTextoComponent } from './contenedor-texto/contenedor-texto.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenedorTextoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
