import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditorCrlComponent } from './editor-crl/editor-crl.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorCrlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
