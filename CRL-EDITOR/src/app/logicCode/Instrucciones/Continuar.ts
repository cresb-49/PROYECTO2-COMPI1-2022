import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Continuar extends Instruccion {
    constructor(linea:number,columna:number) {
        super(linea,columna);
    }
    public ejecutar(scope: Scope) {
        //TODO:Realizar la logica de Continuar - continue js
    }
}