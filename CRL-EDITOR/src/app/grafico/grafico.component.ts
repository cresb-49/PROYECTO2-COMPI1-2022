import { Component, OnInit } from '@angular/core';

import { graphviz }  from 'd3-graphviz';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  titulo:string = 'Grafico .dot';
  constructor() { }

  ngOnInit(): void {
    
  }

  d3(){
    graphviz('#graph').renderDot('digraph {a -> b}');
  }

}
