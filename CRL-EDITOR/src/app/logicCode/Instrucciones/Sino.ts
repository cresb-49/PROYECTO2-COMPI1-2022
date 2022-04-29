import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Sino extends Instruccion {

    constructor(private codeFalse:Instruccion|null,linea:number,columna:number){
        super(linea,columna);
    }
    public ejecutar(scope: Scope) {
        //TODO: Realizar la logica para la parte SINO de Si
    }
    
}