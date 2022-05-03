import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo, TipoString } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export enum OpcionRelacional{
    IGUAL,
    DIFERENTE,
    MENOR,
    MAYOR,
    MENOR_IGUAL,
    MAYOR_IGUAL,
    INCERTEZA,
}

export class Relacional extends Exprecion{
    constructor(private izquierda:Exprecion,private derecha:Exprecion,private tipo: OpcionRelacional,private incerteza:number,linea:number,columna:number){
        super(linea,columna);
    }
    public ejecutar(scope: Scope): Retorno {
        const valorIzquierda = this.izquierda.ejecutar(scope);
        const valorDerecha = this.derecha.ejecutar(scope);
        let result:any;
        if(valorIzquierda.tipo == Tipo.ERROR || valorDerecha.tipo == Tipo.ERROR){
            throw new Error("Errores previos antes de ralizar la comparacion , Linea: "+this.linea+" ,Columna: "+this.columna);
        }
        if(valorIzquierda.tipo != valorDerecha.tipo){
            throw new Error("No se puede realizar la comparacion de un \""+TipoString[valorIzquierda.tipo]+"\" y un \""+TipoString[valorDerecha.tipo]+"\" , Linea: "+this.linea+" ,Columna: "+this.columna);
        }
        switch (this.tipo) {
            case OpcionRelacional.IGUAL:
                result = valorIzquierda.value == valorDerecha.value;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.DIFERENTE:
                result = valorIzquierda.value != valorDerecha.value;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.MENOR:
                result = valorIzquierda.value < valorDerecha.value;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.MAYOR:
                result = valorIzquierda.value > valorDerecha.value;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.MENOR_IGUAL:
                result = valorIzquierda.value <= valorDerecha.value;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.MAYOR_IGUAL:
                result = valorIzquierda.value >= valorDerecha.value;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.INCERTEZA:
                result = null;
                return{value:result,tipo:Tipo.BOOLEAN};
            default:
                return{value:null,tipo:Tipo.ERROR};
        }



    }
}