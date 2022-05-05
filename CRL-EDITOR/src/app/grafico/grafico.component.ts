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

  constructor() { }

  ngOnInit(): void {
    
  }

  d3(){
    graphviz('#'+this.id).renderDot(this.grap);
  }
}
