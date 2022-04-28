import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
export class ContenedorEditorComponent implements AfterViewInit {
  @ViewChild(DynamicComponentDirective) dynamic: DynamicComponentDirective;
  tabs: string[] = ['main.crl'];
  editors: EditorCrlComponent[] = [];
  selected = new FormControl(0);
  tabtitle: string = '';
  tipedCode: CodigoCRL[] = [];

  ngAfterViewInit(): void {
    this.generateComponent();
  }

  generateComponent() {
    const viewContainerRef = this.dynamic.viewContainerRef;
    const componentRef = viewContainerRef.createComponent<EditorCrlComponent>(EditorCrlComponent);
    this.editors.push(componentRef.instance)
    if (this.editors.length === 1) {
      this.enabledEditor(0);
    }
  }


  addTab() {
    if (this.tabtitle != '') {
      if (this.verificarRegex(this.tabtitle)) {
        if (!this.verificarExistencia(this.tabtitle)) {
          this.tabs.push(this.tabtitle + '.crl');
          this.generateComponent();
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
      codigo.push(new CodigoCRL(edit.codeCRL));
      //console.log(edit.getCodeCRL());
    });
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
    var bandera = false;
    this.tabs.forEach(element => {
      if (element.localeCompare(nameCode) === 0) {
        bandera = true;
      }
    });
    return bandera;
  }

  verificarRegex(nameCode: string) {
    var pattern = new RegExp('^([a-zA-Z_$][a-zA-Z\\d_$]*)$');
    var result = pattern.test(nameCode);
    return result;
  }
}