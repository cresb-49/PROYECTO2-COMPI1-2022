import {Scope} from "../Symbolo/Scope";

export abstract class Instruccion {
    
    public linea:number;
    public columna:number;

    public ref1:number;
    public ref2:number;
    public ref3:number;

    constructor(linea:number,columna:number){
        this.linea = linea;
        this.columna = columna;
    }
    
    public abstract ejecutar(scope :Scope):any;
}