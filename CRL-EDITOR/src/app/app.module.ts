import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { EditorCrlComponent } from './editor-crl/editor-crl.component';
import { HeaderCrlEditorComponent } from './header-crl-editor/header-crl-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContenedorEditorComponent } from './contenedor-editor/contenedor-editor.component';
import { ContenedorPrincipalComponent } from './contenedor-principal/contenedor-principal.component';
import { ConsolaCRLComponent } from './consola-crl/consola-crl.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { DynamicComponent2Directive } from './directives/dynamic-component2.directive';
import { ContenerdorGraficosComponent } from './contenerdor-graficos/contenerdor-graficos.component';
import { GraficoComponent } from './grafico/grafico.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorCrlComponent,
    HeaderCrlEditorComponent,
    ContenedorEditorComponent,
    ContenedorPrincipalComponent,
    ConsolaCRLComponent,
    DynamicComponent2Directive,
    DynamicComponentDirective,
    ContenerdorGraficosComponent,
    GraficoComponent,
  ],
  imports: [
    BrowserModule, MatTabsModule, BrowserAnimationsModule, MatFormFieldModule, MatCheckboxModule, FormsModule,MatInputModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
