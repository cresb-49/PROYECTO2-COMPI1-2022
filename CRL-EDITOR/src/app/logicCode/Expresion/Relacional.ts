import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
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

export class Realacional extends Exprecion{
    constructor(private izquierda:Exprecion,private derecha:Exprecion,private tipo: OpcionRelacional,private incerteza:number,linea:number,columna:number){
        super(linea,columna);
    }
    public ejecutar(scope: Scope): Retorno {
        const valorIzquierda = this.izquierda.ejecutar(scope);
        const valorDerecha = this.derecha.ejecutar(scope);
        let result:any;

        switch (this.tipo) {
            case OpcionRelacional.IGUAL:
                result = valorIzquierda == valorDerecha;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.DIFERENTE:
                result = valorIzquierda != valorDerecha;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.MENOR:
                result = valorIzquierda < valorDerecha;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.MAYOR:
                result = valorIzquierda > valorDerecha;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.MENOR_IGUAL:
                result = valorIzquierda <= valorDerecha;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.MAYOR_IGUAL:
                result = valorIzquierda >= valorDerecha;
                return{value:result,tipo:Tipo.BOOLEAN};
            case OpcionRelacional.INCERTEZA:
                result = null;
                return{value:result,tipo:Tipo.BOOLEAN};
            default:
                return{value:null,tipo:Tipo.ERROR};
        }



    }
}