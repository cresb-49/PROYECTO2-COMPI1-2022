import { AfterViewInit,Component, ElementRef,ViewChild,Output, EventEmitter, Input } from "@angular/core";

import * as ace from "ace-builds";
import {CodigoCRL} from "../models/codeCRL";

@Component({
  selector: 'app-editor-crl',
  templateUrl: './editor-crl.component.html',
  styleUrls: ['./editor-crl.component.css']
})

export class EditorCrlComponent implements AfterViewInit {
  
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  @ViewChild("contenedor") private contenedor: ElementRef<HTMLElement>;
  

  codigoRef:string='';
  mostrar:boolean = true;
  codeCRL: string = "";

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.setTheme('ace/theme/twilight');
    aceEditor.on("change", () => {
      this.codeCRL = aceEditor.getValue();
    });
  }
  descargarCodigoEditor() {
    alert("Descargando el codigo");
    console.log(this.codeCRL);
  }

  public getCodeCRL(){
    return this.codeCRL;
  }

  public visibilidad(estado:boolean){
    if(estado){
      this.contenedor.nativeElement.classList.remove('display-false');
    }else{
      this.contenedor.nativeElement.classList.add('display-false');
    }
  }

  public setCodeRef(nombre:string){
    this.codigoRef = nombre;
  }

}