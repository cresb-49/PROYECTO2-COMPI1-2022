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
  tabs:string[]=['main.crl'];
  editors: EditorCrlComponent[]=[];
  selected = new FormControl(0);
  tabtitle: string = '';
  tipedCode: CodigoCRL[]=[];

  ngAfterViewInit(): void {
    this.generateComponent();
  }

  generateComponent(){
    const viewContainerRef = this.dynamic.viewContainerRef;
    const componentRef = viewContainerRef.createComponent<EditorCrlComponent>(EditorCrlComponent);
    componentRef.instance.hide=true;
    this.editors.push(componentRef.instance)
  }


  addTab() {
    if (this.tabtitle != '') {
      this.tabs.push(this.tabtitle + '.crl');
      this.generateComponent();
      this.tabtitle = '';
    }
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
    const viewContainerRef = this.dynamic.viewContainerRef;
    viewContainerRef.remove(index);
    this.editors.splice(index,1);
  }

  getAllCode(){
    this.editors.forEach((edit:EditorCrlComponent)=>{
      console.log(edit.getCodeCRL());
    });
  }

  enabledEditor(index:number){
    this.editors.forEach((edit:EditorCrlComponent)=>{
      edit.visibilidad(false);
    });
    this.editors[index].visibilidad(true);
  }
}