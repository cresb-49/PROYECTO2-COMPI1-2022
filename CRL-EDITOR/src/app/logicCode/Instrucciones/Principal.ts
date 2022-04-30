import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Principal extends Instruccion {
    
    constructor(private file:string,private instrucciones:Instruccion|null,linea:number,columna:number) {
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        //TODO: Realiozar la logica de la instruccion principal
    }
}