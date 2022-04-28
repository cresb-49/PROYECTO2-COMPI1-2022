import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConsolaCRLComponent } from '../consola-crl/consola-crl.component';
import { ContenedorEditorComponent } from '../contenedor-editor/contenedor-editor.component';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { Ejecutor } from '../logicCode/Ejecutor';

@Component({
  selector: 'app-contenedor-principal',
  templateUrl: './contenedor-principal.component.html',
  styleUrls: ['./contenedor-principal.component.css']
})
export class ContenedorPrincipalComponent implements AfterViewInit {
  contenedorPrincipal:ContenedorEditorComponent
  consolaCRL:ConsolaCRLComponent

  @ViewChild(DynamicComponentDirective) dynamic: DynamicComponentDirective;
  
  ngAfterViewInit(): void {
    const viewContainerRef = this.dynamic.viewContainerRef;
    const componentRef1 = viewContainerRef.createComponent<ContenedorEditorComponent>(ContenedorEditorComponent);
    this.contenedorPrincipal=componentRef1.instance;
    const componentRef2 = viewContainerRef.createComponent<ConsolaCRLComponent>(ConsolaCRLComponent);
    this.consolaCRL = componentRef2.instance;
  }

  obtenerCodigo(){
    let execution= new Ejecutor(this.contenedorPrincipal.getAllCode());
    execution.ejecucion();
    //alert("Recuperando el codigo CRL");
  }

  obtenerProyectoCompleto(){
    alert("Descargando el proyecto completo");
  }

}
