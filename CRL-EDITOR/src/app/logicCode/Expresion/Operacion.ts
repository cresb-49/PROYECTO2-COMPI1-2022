import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export enum OpcionOperacion{
    SUMA,
    RESTA,
    MUL,
    DIV,
    MOD,
    POT,
}

export class Operacion extends Exprecion{
    
    constructor (private izquierda:Exprecion,private derecha:Exprecion,private tipo:OpcionOperacion,linea:number,columna:number){
        super(linea,columna);
    }
    public ejecutar(scope: Scope): Retorno {
        let result : Retorno;
        result={value:0,tipo:Tipo.INT};
        return result;
    }
}
