import { Instruccion } from "./Instruccion";

export abstract class AsigInstrucciones {
    constructor() {}
    public abstract agregar(instruccion:Instruccion):any;

}