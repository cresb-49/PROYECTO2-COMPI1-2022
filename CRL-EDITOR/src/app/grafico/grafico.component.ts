import { Component, OnInit } from '@angular/core';

import { graphviz }  from 'd3-graphviz';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  public titulo:string = 'Grafico .dot';

  public grap:string = 'digraph {a -> b}';
  public id:string = ''

  public visualGrafico:string ='visibility: hidden;'
  public visualMostrar:string ='visibility: visible;'

  constructor() { }

  ngOnInit(): void {}

  d3(){
    graphviz('#'+this.id).renderDot(this.grap);
    this.visualGrafico = 'visibility: visible;'
    this.visualMostrar = 'display: none;'
  }

  download(){
    let obj:any=document.getElementById(this.id);
    let svgBody:string = obj.innerHTML;
    if(svgBody.length!=0){
      //let svgContent="<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"4239.54 906.94 3137 1984\">"+svgBody+"</svg>";
      var blob = new Blob([svgBody], { type: 'image/svg+xml'});
      var url = window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.download = ("Grafico#"+this.id);
      anchor.href = url;
      anchor.click();
    }
  }

  public ejecutarVisualizar(){
    this.d3();
  }
}
