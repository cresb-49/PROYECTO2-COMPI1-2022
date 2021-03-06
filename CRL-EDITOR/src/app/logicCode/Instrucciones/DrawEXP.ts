import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class DrawEXP extends Instruccion{
    public ejecutado:boolean = false
    public dotCode:string ='';
    
    constructor(private exprecion:Exprecion,linea:number,columna:number) {
        super(linea,columna);
    }
    
    public ejecutar(scope: Scope) {
        let gr = new GraficoDot();
        this.exprecion.graficar(scope,gr,"");
        this.ejecutado = true;
        let result = 'digraph drawexp {\n\tnode [shape=Mrecord];\n'
        for (const declare of gr.declaraciones) {
            result = result +"\t"+ declare + "\n";
        }
        for (const relacion of gr.relaciones) {
            result = result +"\t"+relacion + "\n";
        }
        result = result + "}";
        this.dotCode = result;
        //console.log(this.dotCode);
    }    

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo_" + subNameNode + "_" + nume;
        let decl = node + '[label = "<n>DibujarEXP"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
    }
}