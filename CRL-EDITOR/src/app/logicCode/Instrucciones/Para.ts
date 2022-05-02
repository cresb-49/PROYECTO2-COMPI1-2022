import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";
import { Sentencias } from "./Sentencias";

export enum opcionPara {
    SUM_PARA,
    RES_PARA
}
export class Para extends Instruccion implements AsigInstrucciones {

    constructor(private varIterator: string, private valVar: Exprecion, private expr: Exprecion, private opPara: number,private sentencias:Sentencias|null,linea: number, columna: number) {
        super(linea, columna);
    }
    public ejecutar(scope: Scope) {
        //TODO: logica para ejecutar el ciclo para
        //return {linea : this.linea, columna: this.columna, type : 'Parar'};
    }
    
    public agregar(instruccion: Instruccion) {
        this.sentencias?.agregarInstruccion(instruccion);
    }
    public getSentencias():Sentencias|null{
        return this.sentencias;
    }
}