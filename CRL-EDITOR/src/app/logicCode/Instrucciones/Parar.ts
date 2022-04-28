import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Parar extends Instruccion{

    constructor(linea : number, columna : number){
        super(linea, columna);
    }

    public ejecutar(scope: Scope) {
        return {linea : this.linea, columna: this.columna, type : 'Parar'};
    }
    
}