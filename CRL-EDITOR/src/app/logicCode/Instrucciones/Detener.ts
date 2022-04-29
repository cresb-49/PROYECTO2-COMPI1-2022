import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Detener extends Instruccion {
    constructor(linea:number,columna:number) {
        super(linea,columna);
    }
    public ejecutar(scope: Scope) {
        //TODO:Realizar la logica de Detener =  break;
    }
}