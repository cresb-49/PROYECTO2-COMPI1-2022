import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";
import { Sentencias } from "./Sentencias";

export class Si extends Instruccion implements AsigInstrucciones {

    private condicion: Exprecion;
    private codeTrue: Sentencias | null;
    private codeFalse: Sentencias | null;

    constructor(condicion: Exprecion, codeTrue: Sentencias | null, codeFalse: Sentencias | null, linea: number, columna: number) {
        super(linea, columna);
        this.condicion = condicion;
        this.codeTrue = codeTrue;
        this.codeFalse = codeFalse;
    }

    public ejecutar(scope: Scope) {
        const condicion = this.condicion.ejecutar(scope);
        if (condicion.tipo != Tipo.BOOLEAN) {
            throw new Error("La condicion de Si no es booleana Linea: " + this.linea + " , Columna: " + this.columna);
        }
        if (condicion.value) {
            return this.codeTrue?.ejecutar(scope);
        } else {
            return this.codeFalse?.ejecutar(scope);
        }
    }

    public agregar(instruccion: Instruccion) {
        this.codeTrue?.agregarInstruccion(instruccion);
    }

    public setCodeFalse(codeFalse: Sentencias | null) {
        this.codeFalse = codeFalse;
    }

    public getSentencias(): Sentencias | null {
        return this.codeTrue;
    }

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let nodeSi = "nodo_" + subNameNode + "_" + nume;
        let decl = nodeSi + '[label = "<n>Si"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + nodeSi + ':n'));
        this.codeTrue?.graficar(scope, graphviz, subNameNode, nodeSi);
        if (this.codeFalse != null) {
            let nume = graphviz.declaraciones.length + 1;
            let nodeSino = "nodo_" + subNameNode + "_" + nume;
            let decl = nodeSino + '[label = "<n>Sino"];'
            graphviz.declaraciones.push(decl);
            graphviz.relaciones.push((nodeSi + ':n -> ' + nodeSino + ':n'));
            this.codeFalse.graficar(scope, graphviz, subNameNode, nodeSino);
        }
    }
}