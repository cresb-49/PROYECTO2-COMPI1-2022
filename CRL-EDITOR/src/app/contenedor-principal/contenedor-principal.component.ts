import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsolaCRLComponent } from '../consola-crl/consola-crl.component';
import { ContenedorEditorComponent } from '../contenedor-editor/contenedor-editor.component';
import { ContenerdorGraficosComponent } from '../contenerdor-graficos/contenerdor-graficos.component';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { DynamicComponent2Directive } from '../directives/dynamic-component2.directive';
import { Ejecutor } from '../logicCode/Ejecutor';
import { CodigoCRL } from '../models/codeCRL';


@Component({
  selector: 'app-contenedor-principal',
  templateUrl: './contenedor-principal.component.html',
  styleUrls: ['./contenedor-principal.component.css']
})
export class ContenedorPrincipalComponent implements AfterViewInit {
  @ViewChild(DynamicComponentDirective) dynamic: DynamicComponentDirective;
  @ViewChild(DynamicComponent2Directive) dynamic2:DynamicComponent2Directive;
  @ViewChild("inputFile") private inputFile: ElementRef<HTMLInputElement>;

  private contenedorListaEditor: ContenedorEditorComponent;
  private consolaCRL: ConsolaCRLComponent;
  private contendorGrafico: ContenerdorGraficosComponent;
  private codeCRL:CodigoCRL[]=[];

  ngAfterViewInit(): void {
    const viewContainerRef2 = this.dynamic2.viewContainerRef;
    const componentRef3 = viewContainerRef2.createComponent<ContenerdorGraficosComponent>(ContenerdorGraficosComponent);
    const viewContainerRef = this.dynamic.viewContainerRef;
    const componentRef1 = viewContainerRef.createComponent<ContenedorEditorComponent>(ContenedorEditorComponent);
    this.contenedorListaEditor = componentRef1.instance;
    const componentRef2 = viewContainerRef.createComponent<ConsolaCRLComponent>(ConsolaCRLComponent);
    this.consolaCRL = componentRef2.instance;
    this.contendorGrafico = componentRef3.instance;
    console.log(this.contendorGrafico);
    
  }

  obtenerCodigo() {
    let execution = new Ejecutor(this.contenedorListaEditor.getAllCode(), this.consolaCRL,this.contendorGrafico);
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
