import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class CallFuncion extends Instruccion{

    constructor(private id:string,private parametros:Array<Exprecion>,linea:number,columna:number){
        super(linea,columna);
    }


    public ejecutar(scope: Scope) {
        






        //TODO: realizar la logica para la llamada de funciones
    }
    
}