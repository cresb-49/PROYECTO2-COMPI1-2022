import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo, TipoString } from "../Abstracto/Retorno";
import { castIncerteza } from "../CasteoImplicito/TablasTipos";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

const Parser = require('./../Grammar/analizador2');

export enum OpcionRelacional {
    IGUAL,
    DIFERENTE,
    MENOR,
    MAYOR,
    MENOR_IGUAL,
    MAYOR_IGUAL,
    INCERTEZA,
}

export const TipoRelacional = ['==', '!=', '<', '>', '<=', '>=', '~'];

export class Relacional extends Exprecion {

    constructor(private izquierda: Exprecion, private derecha: Exprecion, private tipo: OpcionRelacional, private incerteza: number, linea: number, columna: number) {
        super(linea, columna);
    }
    public ejecutar(scope: Scope): Retorno {
        const valorIzquierda = this.izquierda.ejecutar(scope);
        const valorDerecha = this.derecha.ejecutar(scope);
        let result: any;

        if (this.tipo == OpcionRelacional.INCERTEZA) {
            if (castIncerteza[valorIzquierda.tipo][valorDerecha.tipo] != Tipo.ERROR) {
                if (valorIzquierda.tipo == Tipo.STRING) {
                    //calculo para string en incerteza
                    return { value: this.calcincerteza2(valorIzquierda.value, valorDerecha.value), tipo: Tipo.BOOLEAN };
                } else {
                    //calculo para numeros incerteza
                    return { value: this.calcincerteza(valorIzquierda.value, valorDerecha.value), tipo: Tipo.BOOLEAN };
                }
            } else {
                throw new Error("No se puede calcular incerteza con valores: " + TipoString[valorIzquierda.tipo] + " ~ " + TipoString[valorDerecha.tipo] + " ,Linea: " + this.linea + " ,Columna: " + this.columna);
            }
        } else {
            if (valorIzquierda.tipo == Tipo.ERROR || valorDerecha.tipo == Tipo.ERROR) {
                throw new Error("Errores previos antes de ralizar la comparacion , Linea: " + this.linea + " ,Columna: " + this.columna);
            }
            // if (valorIzquierda.tipo != valorDerecha.tipo) {
            //     throw new Error("No se puede realizar la comparacion de un \"" + TipoString[valorIzquierda.tipo] + "\" y un \"" + TipoString[valorDerecha.tipo] + "\" , Linea: " + this.linea + " ,Columna: " + this.columna);
            // }
            if (!(validarComparacion[valorIzquierda.tipo][valorDerecha.tipo])) {
                throw new Error("No se puede realizar la comparacion de un \"" + TipoString[valorIzquierda.tipo] + "\" y un \"" + TipoString[valorDerecha.tipo] + "\" , Linea: " + this.linea + " ,Columna: " + this.columna);
            }
            switch (this.tipo) {
                case OpcionRelacional.IGUAL:
                    result = valorIzquierda.value == valorDerecha.value;
                    return { value: result, tipo: Tipo.BOOLEAN };
                case OpcionRelacional.DIFERENTE:
                    result = valorIzquierda.value != valorDerecha.value;
                    return { value: result, tipo: Tipo.BOOLEAN };
                case OpcionRelacional.MENOR:
                    result = valorIzquierda.value < valorDerecha.value;
                    return { value: result, tipo: Tipo.BOOLEAN };
                case OpcionRelacional.MAYOR:
                    result = valorIzquierda.value > valorDerecha.value;
                    return { value: result, tipo: Tipo.BOOLEAN };
                case OpcionRelacional.MENOR_IGUAL:
                    result = valorIzquierda.value <= valorDerecha.value;
                    return { value: result, tipo: Tipo.BOOLEAN };
                case OpcionRelacional.MAYOR_IGUAL:
                    result = valorIzquierda.value >= valorDerecha.value;
                    return { value: result, tipo: Tipo.BOOLEAN };
                default:
                    return { value: null, tipo: Tipo.ERROR };
            }
        }
    }
    private calcincerteza(num1: any, num2: any) {
        let calc = num1 - num2;
        let val = Math.abs(calc);
        return (val <= this.incerteza)
    }

    private calcincerteza2(cad1: any, cad2: any) {
        let cadV1: string;
        let cadV2: string;

        try {
            cadV1 = Parser.parse(String(cad1));
            cadV2 = Parser.parse(String(cad2));
        } catch (error) {
            cadV1 = "";
            cadV2 = "";
        }

        cadV1 = cadV1.toLowerCase();
        cadV2 = cadV2.toLowerCase();

        // console.log("cadv1-"+cadV1+"-");
        // console.log("cadv1-"+cadV2+"-");

        return cadV1 === cadV2;
    }

    public graficar(scope: Scope, graphviz: GraficoDot, padre: string) {
        let num = graphviz.declaraciones.length + 1;
        let node = "nodo" + num + ' [label="' + TipoRelacional[this.tipo] + '",shape="circle"];';
        graphviz.declaraciones.push(node);
        if (padre.length != 0) {
            let relacion = padre + ' -> ' + "nodo" + num
            graphviz.relaciones.push(relacion);
        }
        this.izquierda.graficar(scope, graphviz, ("nodo" + num));
        this.derecha.graficar(scope, graphviz, ("nodo" + num));
    }
}

export const validarComparacion =[
            /*  DOUBLE      BOOLEAN     STRING        INT         CHAR       VOID      ERROR*/
/*DOUBLE*/  [    true,       false,     false,        true,       false,     false,    false],
/*BOOLEAN*/ [   false,       true,      false,       false,       false,     false,    false],
/*STRING*/  [   false,       false,      true,       false,       false,     false,    false],
/*INT*/     [    true,       false,     false,        true,       false,     false,    false],
/*CHAR*/    [   false,       false,     false,       false,        true,     false,    false],
/*VOID*/    [   false,       false,     false,       false,       false,     false,    false],
/*ERROR*/   [   false,       false,     false,       false,       false,     false,    false],
];