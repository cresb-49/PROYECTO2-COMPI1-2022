import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Asignacion extends Instruccion{

    constructor(private id:string,private valor:Exprecion,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        //TODO:Realizar la logica de la asignacion de valor de una variable
    }
    
}