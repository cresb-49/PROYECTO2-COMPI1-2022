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

  tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  selected = new FormControl(0);
  tabtitle: string = '';

  addTab(selectAfterAdding: boolean) {

    if (this.tabtitle != '') {
      this.tabs.push(this.tabtitle);
    } else {
      this.tabs.push('New');
    }

    this.tabtitle = '';
    
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}