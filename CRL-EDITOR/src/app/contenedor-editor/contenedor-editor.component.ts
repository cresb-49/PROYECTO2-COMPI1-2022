import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Tab group with dynamically changing tabs
 */
@Component({
  selector: 'app-contenedor-editor',
  templateUrl: './contenedor-editor.component.html',
  styleUrls: ['./contenedor-editor.component.css']
})
export class ContenedorEditorComponent {

  tabs = ['main.crl'];
  selected = new FormControl(0);
  tabtitle: string = '';

  addTab(selectAfterAdding: boolean) {
    if (this.tabtitle != '') {
      this.tabs.push(this.tabtitle + '.crl');

      this.tabtitle = '';

      if (selectAfterAdding) {
        this.selected.setValue(this.tabs.length - 1);
      }
    }
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}