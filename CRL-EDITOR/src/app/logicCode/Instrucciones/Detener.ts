import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Detener extends Instruccion {
    constructor(linea:number,columna:number) {
        super(linea,columna);
    }
    public ejecutar(scope: Scope) {}
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo-" + subNameNode + "-" + nume;
        let decl = node + '[label = "<n>Detener"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
    }
}