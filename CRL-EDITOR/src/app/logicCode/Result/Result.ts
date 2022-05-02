import { Declaracion } from "../Instrucciones/Declaracion";
import { Importar } from "../Instrucciones/Importar";
import { Mostrar } from "../Instrucciones/Mostrar";
import { Principal } from "../Instrucciones/Principal";
import { Sentencias } from "../Instrucciones/Sentencias";

export class Result {
    constructor(public instrucciones:any[],public errores:any[],public sentencias:Array<Sentencias>,
        public mostra:Array<Mostrar>,public varaiblesGlobales:Array<Declaracion>,public imports:Array<Importar>,public principal:Principal|null) {}
}