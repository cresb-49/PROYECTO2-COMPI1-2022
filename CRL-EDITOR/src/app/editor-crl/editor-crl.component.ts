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
    this.codigoPrueba(aceEditor);
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


  codigoPrueba(aceEditor:any){
aceEditor.setValue(`import clase.crl
import aritmetica.crl
Incertesa 0.00023
    
Int global1 = 45;
Char charGlobal;
        
Void Principal():
  Int valor = 6
  String cadena1,cadena2,cadena3,cadena4,cadena5
  Double dou
  Si(true):
    hacer(23)
  Sino:
    hacer(45)
        
Int hacer(Int index):
  Mientras(false):
  Para(Int x = 0;x<index;++):
    Mostrar("Hola prueba de codigo")
  Para(Int x = 0;x<index;--):
    Mostrar("Hola prueba de codigo2")`);
  }
}