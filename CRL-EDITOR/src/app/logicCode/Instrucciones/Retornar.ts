import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Retornar extends Instruccion {
    private exprecion:Exprecion;
    constructor(exprecion:Exprecion,linea:number,columna:number) {
        super(linea,columna);
        this.exprecion = exprecion;
    }
    
    public ejecutar(scope: Scope){
        const valor = this.exprecion.ejecutar(scope);
        return valor;
    }
    
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo-" + subNameNode + "-" + nume;
        let decl = node + '[label = "<n>Retorno"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));

        let nume2 = graphviz.declaraciones.length + 1;
        let node2 = "nodo-" + subNameNode + "-" + nume2;
        let decl2 = node2 + '[label = "<n>Exprecion"];'
        graphviz.declaraciones.push(decl2);
        graphviz.relaciones.push((node + ':n -> ' + node2 + ':n'));
    }
}