import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
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
                result = andLogico[this.equivaletInt(valorIzquierdo)][this.equivaletInt(valorDerecha)];
                return { value: result, tipo: Tipo.BOOLEAN }
            case OpcionLogica.OR:
                result = orLogico[this.equivaletInt(valorIzquierdo)][this.equivaletInt(valorDerecha)];
                return { value: result, tipo: Tipo.BOOLEAN }
            case OpcionLogica.XOR:
                result = xorLogico[this.equivaletInt(valorIzquierdo)][this.equivaletInt(valorDerecha)];
                return { value: result, tipo: Tipo.BOOLEAN }
            case OpcionLogica.NOT:
                result = !valorDerecha;
                return { value: result, tipo: Tipo.BOOLEAN }
            default:
                return { value: null, tipo: Tipo.ERROR }
        }
    }
    private equivaletInt(value: any): number {
        if (value) {
            return 1;
        } else {
            return 0;
        }
    }

}