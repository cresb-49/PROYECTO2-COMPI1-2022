import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class DrawEXP extends Instruccion{

    constructor(private exprecion:Exprecion,linea:number,columna:number) {
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        //TODO: realizar la logica para realizar el draw de una exprecion
    }    
}