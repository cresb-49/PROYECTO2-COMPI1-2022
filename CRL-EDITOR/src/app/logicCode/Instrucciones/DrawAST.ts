import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class DrawAST extends Instruccion{

    constructor(private id:string,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        //TODO: realizar la logica del DRAW AST
    }
    
}