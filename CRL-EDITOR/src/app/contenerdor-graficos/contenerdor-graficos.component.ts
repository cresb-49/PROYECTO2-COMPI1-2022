import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { GraficoComponent } from '../grafico/grafico.component';
import { EncapsuladorGrafico } from '../logicCode/GraficosDot/EncapsuladorGrafico';
import { DrawAST } from '../logicCode/Instrucciones/DrawAST';
import { DrawEXP } from '../logicCode/Instrucciones/DrawEXP';
import { DrawTS } from '../logicCode/Instrucciones/DrawTS';

@Component({
  selector: 'app-contenerdor-graficos',
  templateUrl: './contenerdor-graficos.component.html',
  styleUrls: ['./contenerdor-graficos.component.css']
})
export class ContenerdorGraficosComponent implements OnInit {
  @ViewChild(DynamicComponentDirective) dynamic: DynamicComponentDirective;
  constructor() { }
  ngOnInit(): void { }

  public generateGraficos(array: any[]) {
    const viewContainerRef2 = this.dynamic.viewContainerRef;
    viewContainerRef2.clear();
    for (const grap of array) {
      if (grap instanceof EncapsuladorGrafico) {
        if (grap.obj instanceof DrawEXP) {
          if (grap.obj.ejecutado) {
            const componentRef3 = viewContainerRef2.createComponent<GraficoComponent>(GraficoComponent);
            componentRef3.instance.id = "grafico" + viewContainerRef2.length;
            componentRef3.instance.grap = grap.obj.dotCode;
            componentRef3.instance.titulo = "Instruccion DibujarEXP archivo: " + grap.file + " ,Linea: " + grap.obj.linea + " ,Columna: " + grap.obj.columna;
          }
        } else if (grap.obj instanceof DrawTS) {
          if (grap.obj.ejecutado) {
            const componentRef3 = viewContainerRef2.createComponent<GraficoComponent>(GraficoComponent);
            componentRef3.instance.id = "grafico" + viewContainerRef2.length;
            componentRef3.instance.grap = grap.obj.dotCode;
            componentRef3.instance.titulo = "Instruccion DibujarTS archivo: " + grap.file + " ,Linea: " + grap.obj.linea + " ,Columna: " + grap.obj.columna;
          }
        } else if (grap.obj instanceof DrawAST) {
          if (grap.obj.ejecutado) {
            const componentRef3 = viewContainerRef2.createComponent<GraficoComponent>(GraficoComponent);
            componentRef3.instance.id = "grafico" + viewContainerRef2.length;
            componentRef3.instance.grap = grap.obj.dotCode;
            componentRef3.instance.titulo = "Instruccion DibujarAST archivo: " + grap.file + " ,Linea: " + grap.obj.linea + " ,Columna: " + grap.obj.columna;
          }
        }
      }
    }
  }
}
