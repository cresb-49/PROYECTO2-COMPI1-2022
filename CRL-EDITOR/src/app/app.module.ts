import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { EditorCrlComponent } from './editor-crl/editor-crl.component';
import { HeaderCrlEditorComponent } from './header-crl-editor/header-crl-editor.component';
import { ContainerEditorComponent } from './container-editor/container-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorCrlComponent,
    HeaderCrlEditorComponent,
    ContainerEditorComponent
  ],
  imports: [
    BrowserModule,MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
