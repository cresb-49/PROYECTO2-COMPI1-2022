import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppComponent } from './app.component';
import { EditorCrlComponent } from './editor-crl/editor-crl.component';
import { HeaderCrlEditorComponent } from './header-crl-editor/header-crl-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContenedorEditorComponent } from './contenedor-editor/contenedor-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorCrlComponent,
    HeaderCrlEditorComponent,
    ContenedorEditorComponent,
  ],
  imports: [
    BrowserModule,MatTabsModule, BrowserAnimationsModule,MatFormFieldModule,MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
