import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo, TipoString } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Literal extends Exprecion {

    constructor(private valor: any, liena: number, columna: number, private tipo: number) {
        super(liena, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        switch (this.tipo) {
            case Tipo.INT:
                return { value: Number(this.valor), tipo: Tipo.INT }
            case Tipo.DOUBLE:
                return { value: Number(this.valor), tipo: Tipo.DOUBLE }
            case Tipo.STRING:
                return { value: this.valor, tipo: Tipo.STRING }
            case Tipo.CHAR:
                return { value: this.valor, tipo: Tipo.CHAR }
            case Tipo.BOOLEAN:
                return { value: this.valor, tipo: Tipo.BOOLEAN }
            default:
                return { value: null, tipo: Tipo.ERROR }
        }
    }

    public graficar(scope: Scope, graphviz: GraficoDot, padre: string) {
        let num = graphviz.declaraciones.length + 1;
        let node = "nodo" + num + ' [label="<f0> '+TipoString[this.tipo]+' |<f1> ' + this.valor + '"];';
        graphviz.declaraciones.push(node);
        if (padre.length != 0) {
            let relacion = padre + ' -> ' + "nodo" + num
            graphviz.relaciones.push(relacion);
        }
    }
}