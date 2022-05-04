import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { GraficoComponent } from '../grafico/grafico.component';

@Component({
  selector: 'app-contenerdor-graficos',
  templateUrl: './contenerdor-graficos.component.html',
  styleUrls: ['./contenerdor-graficos.component.css']
})
export class ContenerdorGraficosComponent implements OnInit {
  @ViewChild(DynamicComponentDirective) dynamic: DynamicComponentDirective;
  constructor() {}
  ngOnInit(): void {}

  public generateGraficos(array:any[]){
    const viewContainerRef2 = this.dynamic.viewContainerRef;

    array.forEach(element => {
      const componentRef3 = viewContainerRef2.createComponent<GraficoComponent>(GraficoComponent);
      componentRef3.instance.setCodeDot("");
    });
    
  }
}
