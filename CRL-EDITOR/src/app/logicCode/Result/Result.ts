import { Declaracion } from "../Instrucciones/Declaracion";
import { Mostrar } from "../Instrucciones/Mostrar";
import { Sentencias } from "../Instrucciones/Sentencias";

export class Result {
    constructor(public instrucciones:any[],public errores:any[],public sentencias:Array<Sentencias>,
        public mostra:Array<Mostrar>,public varaiblesGlobales:Array<Declaracion>) {}
}