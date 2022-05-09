import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Continuar extends Instruccion {
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        throw new Error("Method not implemented.");
    }
    constructor(linea:number,columna:number) {
        super(linea,columna);
    }
    public ejecutar(scope: Scope) {
        //TODO:Realizar la logica de Continuar - continue js
    }
}