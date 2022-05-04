import { AfterContentInit, AfterViewInit, Component, ComponentRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
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
export class ContenedorEditorComponent implements AfterContentInit{
  @ViewChild(DynamicComponentDirective) dynamic: DynamicComponentDirective;
  tabs: string[] = [];
  editors: EditorCrlComponent[] = [];
  selected = new FormControl(0);
  tabtitle: string = '';
  tipedCode: CodigoCRL[] = [];

  ngAfterContentInit(): void {
    this.tabtitle='';
  }

  generateComponent(ref:string,code:string) {
    const viewContainerRef = this.dynamic.viewContainerRef;
    const componentRef = viewContainerRef.createComponent<EditorCrlComponent>(EditorCrlComponent);
    componentRef.instance.setCodeRef(ref)
    componentRef.instance.setCode(code)
    this.editors.push(componentRef.instance)
  }

  addTab(code:string) {
    if (this.tabtitle != '') {
      if (this.verificarRegex(this.tabtitle)) {
        if (!this.verificarExistencia(this.tabtitle)) {
          this.tabs.push(this.tabtitle + '.crl');
          this.generateComponent(this.tabtitle+".crl",code);
          this.tabtitle = '';
        } else {
          alert("Ya existe un archivo " + this.tabtitle);
        }
      } else {
        alert("Los nombres de archivos deben corresponder a la exprecion regular '^([a-zA-Z_$][a-zA-Z\\d_$]*)$'");
      }
    }
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
    const viewContainerRef = this.dynamic.viewContainerRef;
    viewContainerRef.remove(index);
    this.editors.splice(index, 1);
  }

  getAllCode() {
    let codigo:Array<CodigoCRL>=[];
    this.editors.forEach((edit: EditorCrlComponent) => {
      codigo.push(new CodigoCRL(edit.getCodeCRL()));
    });

    for(let i = 0; i<this.tabs.length;i++){
      codigo[i].nombre=this.tabs[i];
    }
    return codigo;
  }

  enabledEditor(index: number) {
    this.editors.forEach((edit: EditorCrlComponent) => {
      edit.visibilidad(false);
    });
    this.editors[index].visibilidad(true);
    this.editors[index].setCodeRef(this.tabs[index]);
  }

  verificarExistencia(nameCode: string) {
    let result = this.tabs.filter(x=>x===(nameCode+".crl"));
    return result.length >= 1;
  }

  verificarRegex(nameCode: string) {
    var pattern = new RegExp('^([a-zA-Z_$][a-zA-Z\\d_$]*)$');
    var result = pattern.test(nameCode);
    return result;
  }

  setCodeEnv(code:CodigoCRL[]){
    const viewContainerRef = this.dynamic.viewContainerRef;
    viewContainerRef.clear();
    this.editors =[]
    this.tabs =[];
    code.forEach(element => {
      this.tabtitle = element.nombre.replace(".crl","");
      this.addTab(element.codigo);
    });
  }
}