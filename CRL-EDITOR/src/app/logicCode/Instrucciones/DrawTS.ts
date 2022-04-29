import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class DrawTS extends Instruccion{

    constructor(private s1:number,private s2:number,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        //TODO: realizar la logica para dibujar tabla simbolos
    }
}