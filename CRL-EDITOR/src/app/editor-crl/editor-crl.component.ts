import { AfterViewInit, Component, ElementRef, ViewChild, Output, EventEmitter, Input } from "@angular/core";

//import * as ace from "ace-builds";
//import { CodigoCRL } from "../models/codeCRL";

@Component({
  selector: 'app-editor-crl',
  templateUrl: './editor-crl.component.html',
  styleUrls: ['./editor-crl.component.css']
})

export class EditorCrlComponent implements AfterViewInit {

  //@ViewChild("editor") private editor: ElementRef<HTMLInputElement>;
  @ViewChild("textbox") private textbox: ElementRef<HTMLInputElement>;
  @ViewChild("contenedor") private contenedor: ElementRef<HTMLElement>;


  codigoRef: string = '';
  mostrar: boolean = true;
  codeCRL: string = "";
  ubicacionEditor: string = "Linea: 1, Columna: 1";


  onKeyDownEvent(event: any) {
    if (event.key == 'Tab') {
      event.preventDefault();
      var start = this.textbox.nativeElement.selectionStart;
      var end = this.textbox.nativeElement.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      if (start != null && end != null) {

        this.textbox.nativeElement.value = this.textbox.nativeElement.value.substring(0, start) +
          "\t" + this.textbox.nativeElement.value.substring(end);

        // put caret at right position again
        this.textbox.nativeElement.selectionStart = this.textbox.nativeElement.selectionEnd = start + 1;
      }
    }
  }
  actualizarCodigo() {
    this.codeCRL = this.textbox.nativeElement.value;
    this.mostrarUbicacion();
  }

  mostrarUbicacion() {
    let start = this.textbox.nativeElement.selectionStart;
    if (start != null) {
      let textLines = this.textbox.nativeElement.value.substr(0, start).split("\n");
      let currentLineNumber = textLines.length;
      let currentColumnIndex = textLines[textLines.length - 1].length;
      this.ubicacionEditor = "Linea: " + (currentLineNumber) + ", Columna: " + (currentColumnIndex + 1);
    }
  }

  ngAfterViewInit(): void {
    
  }
  descargarCodigoEditor() {
    alert("Descargando el codigo");
    console.log(this.codeCRL);
  }

  public getCodeCRL() {
    let temp = '';
    if(this.codeCRL.slice(-1) != '\n'){
      temp = this.codeCRL + "\n";
      this.codeCRL = temp;
    }else{
      temp = this.codeCRL;
    }
    return temp;
  }

  public visibilidad(estado: boolean) {
    if (estado) {
      this.contenedor.nativeElement.classList.remove('display-false');
    } else {
      this.contenedor.nativeElement.classList.add('display-false');
    }
  }

  public setCodeRef(nombre: string) {
    this.codigoRef = nombre;
  }
}