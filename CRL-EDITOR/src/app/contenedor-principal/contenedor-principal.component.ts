import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsolaCRLComponent } from '../consola-crl/consola-crl.component';
import { ContenedorEditorComponent } from '../contenedor-editor/contenedor-editor.component';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { Ejecutor } from '../logicCode/Ejecutor';
import { CodigoCRL } from '../models/codeCRL';


@Component({
  selector: 'app-contenedor-principal',
  templateUrl: './contenedor-principal.component.html',
  styleUrls: ['./contenedor-principal.component.css']
})
export class ContenedorPrincipalComponent implements AfterViewInit {
  @ViewChild(DynamicComponentDirective) dynamic: DynamicComponentDirective;
  @ViewChild("inputFile") private inputFile: ElementRef<HTMLInputElement>;

  private contenedorListaEditor: ContenedorEditorComponent;
  private consolaCRL: ConsolaCRLComponent;
  private codeCRL:CodigoCRL[]=[];

  ngAfterViewInit(): void {
    const viewContainerRef = this.dynamic.viewContainerRef;
    const componentRef1 = viewContainerRef.createComponent<ContenedorEditorComponent>(ContenedorEditorComponent);
    this.contenedorListaEditor = componentRef1.instance;
    const componentRef2 = viewContainerRef.createComponent<ConsolaCRLComponent>(ConsolaCRLComponent);
    this.consolaCRL = componentRef2.instance;
  }

  obtenerCodigo() {
    let execution = new Ejecutor(this.contenedorListaEditor.getAllCode(), this.consolaCRL);
    execution.ejecucion();
  }

  obtenerProyectoCompleto() {
    alert("Descargando el proyecto completo");
  }

  onFileSelected(event: any) {
    let code:CodigoCRL[]=[];
    let files = event.srcElement.files;
    for (const iterator of files) {
      let codeCRl = new CodigoCRL("");
      let reader = new FileReader();
      reader.readAsText(iterator);
      reader.onload = ()=>{
        let r = reader.result;
        if(r != undefined || r != null){
          codeCRl.codigo = r.toString();
        }
      }
      code.push(codeCRl);
      codeCRl.nombre = iterator.name;
    }
    this.codeCRL = code;
    console.log(code);
  }

  setCodigoAPP(){
    if(this.codeCRL.length!=0){
      this.contenedorListaEditor.setCodeEnv(this.codeCRL)
    }
    this.codeCRL =[];
    this.inputFile.nativeElement.value='';
  }
}
