import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditorCrlComponent } from '../editor-crl/editor-crl.component';
import {CodigoCRL} from '../models/codeCRL';

/**
 * @title Tab group with dynamically changing tabs
 */
@Component({
  selector: 'app-contenedor-editor',
  templateUrl: './contenedor-editor.component.html',
  styleUrls: ['./contenedor-editor.component.css']
})
export class ContenedorEditorComponent implements AfterViewInit {
  tabs:string[]=['main'];
  editors: EditorCrlComponent[];
  selected = new FormControl(0);
  tabtitle: string = '';
  tipedCode: CodigoCRL[]=[];
  
  @ViewChildren(EditorCrlComponent) query: QueryList<EditorCrlComponent>;

  ngAfterViewInit(): void {
    this.getAllCode();
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

  getAllCode(){
    this.query.changes.subscribe((items: Array<EditorCrlComponent>) => {
      items.forEach((edittor : EditorCrlComponent)=>{ 
        this.tipedCode.push(new CodigoCRL(edittor.getCodeCRL()))
      });
    });
    this.tabs.forEach((nombre:string)=>{
      this.tipedCode.forEach((codeC : CodigoCRL)=>{
        codeC.nombre = nombre;
      });
    });
    console.log(this.tipedCode);
  }

}