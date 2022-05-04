import { Component, OnInit } from '@angular/core';

import { graphviz }  from 'd3-graphviz';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  titulo:string = 'Grafico .dot';

  grap:string = 'digraph {a -> b}';

  constructor() { }

  ngOnInit(): void {
    
  }

  d3(){
    graphviz('#graph').renderDot(this.grap);
  }

  setCodeDot(code:string){
    this.grap=code;
  }
}
