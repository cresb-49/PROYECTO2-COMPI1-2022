import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export enum OpcionLogica {
    AND,
    OR,
    XOR,
    NOT
}

export const andLogico = [
        /*  0    1 */
    /*0*/[false, false],
    /*1*/[false, true],
];

export const orLogico = [
            /*  0   1*/
    /*0*/[false, true],
    /*1*/[true, true],
];

export const xorLogico = [
            /* 0      1 */
    /*0*/[false, true],
    /*1*/[true, false],
];

export class Logica extends Exprecion {

    constructor(private izquierda: Exprecion, private derecha: Exprecion, private tipo: OpcionLogica, linea: number, columna: number) {
        super(linea, columna);
    }


    public ejecutar(scope: Scope): Retorno {
        const valorIzquierdo = this.izquierda.ejecutar(scope);
        const valorDerecha = this.derecha.ejecutar(scope);
        let result: any;
        switch (this.tipo) {
            case OpcionLogica.AND:
                result = andLogico[this.equivaletInt(valorIzquierdo.value)][this.equivaletInt(valorDerecha.value)];
                return { value: result, tipo: Tipo.BOOLEAN }
            case OpcionLogica.OR:
                result = orLogico[this.equivaletInt(valorIzquierdo.value)][this.equivaletInt(valorDerecha.value)];
                return { value: result, tipo: Tipo.BOOLEAN }
            case OpcionLogica.XOR:
                result = xorLogico[this.equivaletInt(valorIzquierdo.value)][this.equivaletInt(valorDerecha.value)];
                return { value: result, tipo: Tipo.BOOLEAN }
            case OpcionLogica.NOT:
                result = !valorDerecha.value;
                return { value: result, tipo: Tipo.BOOLEAN }
            default:
                return { value: null, tipo: Tipo.ERROR }
        }
    }
    private equivaletInt(value: any): number {
        let result = 0;
        if (value) {
            result = 1
        }
        return result;
    }
    private valOperacion = ['&&', '||', '|&', '!'];
    public graficar(scope: Scope, graphviz: GraficoDot, padre: string) {
        let num = graphviz.declaraciones.length + 1;
        let node = "nodo" + num + '[label="' + this.valOperacion[this.tipo] + '",shape="circle"];';
        graphviz.declaraciones.push(node);
        if (padre.length != 0) {
            let relacion = padre + ' -> ' + "nodo" + num
            graphviz.relaciones.push(relacion);
        }
        this.izquierda.graficar(scope, graphviz, ("nodo" + num));
        this.derecha.graficar(scope, graphviz, ("nodo" + num));
    }
}