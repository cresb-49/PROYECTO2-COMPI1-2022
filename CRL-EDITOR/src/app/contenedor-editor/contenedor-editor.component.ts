import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval } from 'rxjs';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { EditorCrlComponent } from '../editor-crl/editor-crl.component';
import { CodigoCRL } from '../models/codeCRL';

/**
 * @title Tab group with dynamically changing tabs
 */
@Component({
  selector: 'app-contenedor-editor',
  templateUrl: './contenedor-editor.component.html',
  styleUrls: ['./contenedor-editor.component.css']
})
export class ContenedorEditorComponent implements AfterViewInit{
  @ViewChild(DynamicComponentDirective) dynamic:DynamicComponentDirective;
  tabs:string[]=['main'];
  editors: EditorCrlComponent[];
  selected = new FormControl(0);
  tabtitle: string = '';
  tipedCode: CodigoCRL[]=[];

  ngAfterViewInit(): void {
      this.generateComponent();
      interval(3000).subscribe(()=>{this.generateComponent()})
  }

  generateComponent(){
    this.editors .push(new EditorCrlComponent);
    this.editors[0].codeCRL;

    const viewContainerRef = this.dynamic.viewContainerRef;
    const componentRef = viewContainerRef.createComponent<any>(EditorCrlComponent);
  }

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